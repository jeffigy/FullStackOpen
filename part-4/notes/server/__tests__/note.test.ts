import app from "../src/app";
import supertest from "supertest";

const api = supertest(app);

describe("GET /api/notes", () => {
  it("should return an array of notes", async () => {
    const res = await api.get("/api/notes");
    expect(res.statusCode).toEqual(200);
    expect(Array.isArray(res.body)).toBe(true);
  });
});
