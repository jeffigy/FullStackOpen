import app from "@/app";
import db from "@/db";
import { noteUsersTable } from "@/db/schema";
import { hash } from "bcryptjs";
import { reset } from "drizzle-seed";
import assert from "node:assert";
import supertest from "supertest";

import { usersInDb } from "./test-helper";
const api = supertest(app);

describe("when there is initially one user in db", () => {
  beforeEach(async () => {
    const passwordHash = await hash("sekret", 10);
    await db
      .insert(noteUsersTable)
      .values({ name: "root-name", username: "root", passwordHash });
  });

  afterEach(async () => {
    await reset(db, { noteUsersTable });
  });

  test("creation succeeds with a fresh username", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      name: "Matti Luukkainen",
      username: "mluukkai",
      password: "salainen",
    };

    await api
      .post("/api/auth/signup")
      .send(newUser)
      .expect(201)
      .expect("Content-Type", /application\/json/);

    const usersAtEnd = await usersInDb();
    assert.strictEqual(usersAtEnd.length, usersAtStart.length + 1);

    const usernames = usersAtEnd.map((u) => u.username);
    assert(usernames.includes(newUser.username));
  });

  test("creation fails with proper status and message if username already taken", async () => {
    const usersAtStart = await usersInDb();

    const newUser = {
      name: "Superuser",
      username: "root",
      password: "salainen",
    };

    const result = await api
      .post("/api/auth/signup")
      .send(newUser)
      .expect("Content-Type", /application\/json/);
    expect(result.statusCode).toBe(409);

    const usersAtEnd = await usersInDb();

    assert(result.body.message.includes("Duplicate entry"));

    assert.strictEqual(usersAtEnd.length, usersAtStart.length);
  });
});
