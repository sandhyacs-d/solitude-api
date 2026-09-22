import app from "../src/app.js";
import request from "supertest";
import jwt from "jsonwebtoken";
import { connectTestDb , disconnectTestDB} from "./setup.js";
import User from "../src/models/users.js";

let testUser;

beforeAll(async()=>{
    await connectTestDb();

    testUser = await User.create({
        name : "NoTest",
        email :"NoTest1@gmail.com",
        password : "NoTest123"

    });
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


afterAll(async()=>{
    await disconnectTestDB();
})
