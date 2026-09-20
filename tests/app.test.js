import app from "../src/app.js";
import request from "supertest";

test("GET /entries requires authentication",async()=>{
    const response = await request(app).get("/entries");

    expect(response.status).toBe(401);
});