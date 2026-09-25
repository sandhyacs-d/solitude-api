import app from "../src/app.js";
import request from "supertest";
import jwt from "jsonwebtoken";
import { connectTestDb , disconnectTestDB} from "./setup.js";
import User from "../src/models/users.js";
import Entry from "../src/models/entry.js";

let testUser;

beforeAll(async()=>{
    await connectTestDb();

    testUser = await User.create({
        name : "NoTest",
        email :"NoTest1@gmail.com",
        password : "NoTest123"

    });

    secondTestUser = await User.create({
        name : "YesTest",
        email : "Test12@gmail.com",
        password : "Testand123"
    })
})

test("GET /entries requires authentication",async()=>{
    const response = await request(app).get("/entries");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("authHeader not available");
});

test("GET /entries rejects malformed authorization header",async()=>{
    const response = await request(app).get("/entries").set("Authorization","Bearer");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Invalid authorization header");
})

test("GET /entries reject invalid token",async()=>{
    const response = await request(app).get("/entries").set("Authorization","Bearer Fake-token");

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid or expired token");
})

test("GET /entries rejects expired token",async()=>{

    const expiredToken = jwt.sign(
    {userId:"507f1f77bcf86cd799439011"},
    process.env.JWT_SECRET,
    {expiresIn : "-1h" }
    );


    const response = await request(app).get("/entries").set("Authorization",`Bearer ${expiredToken}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Invalid or expired token");
});

test("GET /entries accepts valid token",async()=>{
    const token = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn :"1h"}
    );

    const response = await request(app).get("/entries").set("Authorization",`Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.entries).toEqual(expect.any(Array));
})

test("old token is invalid after password change ",async()=>{
    const oldToken = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    );

    await User.findByIdAndUpdate(
        testUser._id,
        { password : "newPassword123",
        changePasswordAt : new Date(Date.now() +1000)
        }
    )

    await new Promise(resolve => setTimeout(resolve, 1100));

    const newToken = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    );

    const response = await request(app).get("/entries").set("Authorization",`Bearer ${oldToken}`);

    expect(response.status).toBe(401);
    expect(response.body.message).toBe("Token invalid after password change");


    const newResponse = await  request(app).get("/entries").set("Authorization",`Bearer ${newToken}`);

    expect(newResponse.status).toBe(200);
})

//POST
test("POST /entries creates an entry",async ()=>{
    const token = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    )

    const entryData = {
    title: "My first test entry",
    content: "Testing my journal API",
    mood: "calm",
    tags: ["testing", "journal"]
    };

    const response = await request(app).post("/entries").set("Authorization",`Bearer ${token}`).send(entryData);

    expect(response.status).toBe(201);
    expect(response.body.title).toBe(entryData.title);
});

test("GET /entries returns user's entries",async()=>{
    const token = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    )

    const response = await request(app).get("/entries").set("Authorization",`Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.entries).toEqual(expect.any(Array));
    expect(response.body.pagination).toEqual(expect.any(Object));
})

test("GET /entries/:id returns a single entry",async()=>{
    const token = jwt.sign(
    {userId : testUser._id},
    process.env.JWT_SECRET,
    {expiresIn :"1h"}
)

  const entry = await Entry.create({
    title: "Test single entry",
    content: "Testing GET by ID",
    mood: "calm",
    tags: ["testing"],
    user : testUser._id
  })

  const response = await request(app).get(`/entries/${entry._id}`).set("Authorization",`Bearer ${token}`);

  expect(response.status).toBe(200);
  expect(response.body._id).toBe(entry._id.toString());
});

test("PATCH /entries/:id updates a single entry",async()=>{
    const token = jwt.sign(
    {userId : testUser._id},
    process.env.JWT_SECRET,
    {expiresIn :"1h"}
)

  const entry = await Entry.create({
    title: "Test single entry",
    content: "Testing GET by ID",
    mood: "calm",
    tags: ["testing"],
    user : testUser._id
  })

  const response = await request(app).patch(`/entries/${entry._id}`).set("Authorization",`Bearer ${token}`).send({mood : "happy"});

  expect(response.status).toBe(200);
  expect(response.body.mood).toBe("happy");
})

test("DELETE /entries/:id deletes a single entry",async()=>{
    const token = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn :"1h"}
    )

    const entry = await Entry.create({
        title: "Test single entry",
        content: "Testing GET by ID",
        mood: "calm",
        tags: ["testing"],
        user : testUser._id
    })

    const response = await request(app).delete(`/entries/${entry._id}`).set("Authorization",`Bearer ${token}`);

    expect(response.status).toBe(200);
    expect(response.body.message).toBe("Entry successfully deleted");

    const deletedEntry = await Entry.findById(entry._id);

    expect(deletedEntry).toBeNull();
   
})

test("GET /entries/:id prevents access to another user's entry",async()=>{
    const token1 = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn :"1h"}
    )

    const entry = await Entry.create({
        title: "Other user's entry",
        content: "This belongs to another user",
        mood: "calm",
        tags: ["private"],
        user : secondTestUser._id
    })

    const response = await request(app).get(`/entries/${entry._id}`).set("Authorization",`Bearer ${token1}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Entry not found");
})

test("PATCH /entries/:id prevents updating another user's entry", async () => { 
    const token1 = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn :"1h"}
    );

    const entry = await Entry.create({
        title: "Other user's entry",
        content: "This belongs to another user",
        mood: "calm",
        tags: ["private"],
        user : secondTestUser._id
    })

    const response = await request(app).patch(`/entries/${entry._id}`).set("Authorization",`Bearer ${token1}`).send({
        mood : "sad"
    });

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Entry not found");
});

test("DELETE /entries/:id prevents deleting another user's entry", async () => {
     const token1 = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn :"1h"}
    );

    const entry = await Entry.create({
        title: "Other user's entry",
        content: "This belongs to another user",
        mood: "calm",
        tags: ["private"],
        user : secondTestUser._id
    });

    const response = await request(app).delete(`/entries/${entry._id}`).set("Authorization",`Bearer ${token1}`);
     
     expect(response.status).toBe(404);
     expect(response.body.success).toBe(false);
     expect(response.body.message).toBe("Entry not found");

     const deletedEntry = await Entry.findById(entry._id);

    expect(deletedEntry).not.toBeNull();



});

test("POST /entries rejects missing title", async () => {
    const token = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn :"1h"}
    );

    const entryData = {
        content: "This belongs to another user",
        mood: "calm",
        tags: ["private"],
    }
 
    
    const response = await request(app).post("/entries").set("Authorization",`Bearer ${token}`).send(entryData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);



});

test("POST /entries rejects missing content", async () => {
    const token = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn :"1h"}
    );

    const entryData = {
        title : "Good Morning",
        mood: "calm",
        tags: ["private"],
    }
 
    
    const response = await request(app).post("/entries").set("Authorization",`Bearer ${token}`).send(entryData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);

});

test("POST /entries rejects invalid mood", async () => {
    const token = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn :"1h"}
    );

    const entryData = {
        title : "Good Morning",
        content :"It was a good morning",
        mood: "depressing",
        tags: ["private"],
    }

    const response = await request(app).post("/entries").set("Authorization",`Bearer ${token}`).send(entryData);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);


});


test("PATCH /entries/:id rejects empty update", async () => {
    const token = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn :"1h"}
    )

    const entry = await Entry.create({
        title: "Test single entry",
        content: "Testing GET by ID",
        mood: "calm",
        tags: ["testing"],
        user : testUser._id
    })

    const response = await request(app).patch(`/entries/${entry._id}`).set("Authorization",`Bearer ${token}`).send();

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Request body must be an object");
});


test("GET /entries/:id rejects invalid entry ID", async () => {
    const token = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    )

    const response = await request(app).get("/entries/not-a-valid-id").set("Authorization",`Bearer ${token}`);

    expect(response.status).toBe(400);
    expect(response.body.success).toBe(false);
});

test("GET /entries/:id returns 404 when entry does not exist", async () => {
    const token = jwt.sign(
        {userId : testUser._id},
        process.env.JWT_SECRET,
        {expiresIn : "1h"}
    )

    const response = await request(app).get("/entries/507f1f77bcf86cd799439011").set("Authorization",`Bearer ${token}`);

    expect(response.status).toBe(404);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("Entry not found");
});




afterAll(async()=>{
    await disconnectTestDB();
})
