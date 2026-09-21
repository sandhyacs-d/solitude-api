import app from "../src/app.js";
import request from "supertest";

test("GET /entries requires authentication",async()=>{
    const response = await request(app).get("/entries");

    expect(response.status).toBe(401);
    expect(response.body.success).toBe(false);
    expect(response.body.message).toBe("authHeader not available");
});

test("GET /entries rejects malformed authorization header",async()=>{
    const response = await request(app).get("/entries").set("Authorization","Bearer");

    expect(response.status).toBe(401);
})

test("GET /entries reject invalid token",async()=>{
    const response = await request(app).get("/entries").set("Authorization","Bearer Fake-token");

    expect(response.status).toBe(401);
})

