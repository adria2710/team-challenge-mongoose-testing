const request = require("supertest");
const app = require("../index");
const mongoose = require("mongoose");

beforeAll(async () => {
    await mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });
});

afterAll(async () => {
    await mongoose.connection.close();
});

describe("POST /posts/create", () => {
it("should create a post", async () => {
    const res = await request(app).post("/posts/create").send({
    title: "Test Post",
    body: "This is a test post",
    });
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("_id");
});
});

describe("GET /posts", () => {
it("should get all posts", async () => {
    const res = await request(app).get("/posts");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBeTruthy();
});
});