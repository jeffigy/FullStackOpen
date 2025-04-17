import app from "../src/app";
import supertest from "supertest";
import { reset } from "drizzle-seed";
import db from "@/db";
import { notesTable } from "@/db/schema";
import { initialNotes, nonExistingId, notesInDb } from "./test-helper";
import assert from "node:assert";
import { NoteSelect } from "@/types/note.type";

const api = supertest(app);

describe("When there are some notes saved initially", () => {
  beforeEach(async () => {
    await db.insert(notesTable).values(initialNotes);
  });

  afterEach(async () => {
    await reset(db, { notesTable });
  });

  test("notes are returned as json", async () => {
    await api
      .get("/api/notes")
      .expect(200)
      .expect("Content-Type", /application\/json/);
  });

  test("all notes are returned", async () => {
    const response = await api.get("/api/notes");

    assert.strictEqual(response.body.length, initialNotes.length);
  });

  test("a specific note is within the returned notes", async () => {
    const response = await api.get("/api/notes");

    const contents = response.body.map((notes: NoteSelect) => notes.content);
    assert(contents.includes("Browser can execute only JavaScript"));
  });

  describe("viewing a specific note", () => {
    test("succeeds with a valid id", async () => {
      const notesAtStart = await notesInDb();

      const noteToView = notesAtStart[0];

      const resultNote = await api
        .get(`/api/notes/${noteToView.noteId}`)
        .expect(200)
        .expect("Content-Type", /application\/json/);

      resultNote.body.createdAt = new Date(resultNote.body.createdAt);

      assert.deepStrictEqual(resultNote.body, noteToView);
    });

    test("fails with statuscode 404 if note does not exist", async () => {
      const validNonexistingId = await nonExistingId();

      await api.get(`/api/notes/${validNonexistingId}`).expect(404);
    });

    test("fails with statuscode 404 id is invalid", async () => {
      const invalidId = "5a3d5da59070081a82a3445";

      await api.get(`/api/notes/${invalidId}`).expect(404);
    });
  });

  describe("addition of a new note", () => {
    test("succeeds with valid data", async () => {
      const newNote = {
        content: "async/await simplifies making async calls",
        important: true,
      };

      await api
        .post("/api/notes")
        .send(newNote)
        .expect(201)
        .expect("Content-Type", /application\/json/);

      const notesAtEnd = await notesInDb();
      assert.strictEqual(notesAtEnd.length, initialNotes.length + 1);

      const contents = notesAtEnd.map((n) => n.content);
      assert(contents.includes("async/await simplifies making async calls"));
    });

    test("fails with status code 400 if data invalid", async () => {
      const newNote = {
        important: true,
      };

      await api.post("/api/notes").send(newNote).expect(400);

      const notesAtEnd = await notesInDb();

      assert.strictEqual(notesAtEnd.length, initialNotes.length);
    });
  });
});
