import app from "@/app";
import supertest from "supertest";
import db from "@/db";
import { personsTable } from "@/db/schema";
import { PersonInsert, PersonSelect } from "@/types/person.type";
import { clearDb, initialPersons, personsInDb } from "./test-helper";

const api = supertest(app);

// /api/persons
describe("Person API", () => {
  beforeEach(async () => {
    await db.insert(personsTable).values(initialPersons);
  });

  afterEach(async () => {
    await clearDb(personsTable);
  });

  // GET
  describe("Fetching persons", () => {
    test("fails with 404 status if there's no data ", async () => {
      await clearDb(personsTable);
      const res = await api.get("/api/persons");

      expect(res.statusCode).toBe(404);
      expect(res.body).toEqual({ message: "No person found" });
    });

    test("should return all persons when there's data", async () => {
      const res = await api.get("/api/persons");
      expect(res.statusCode).toBe(200);
      expect(Array.isArray(res.body)).toBe(true);

      expect(res.body.length).toEqual(initialPersons.length);
    });
  });

  // POST
  describe("Adding person", () => {
    describe("returns with statusCode 400", () => {
      test("when body is empty", async () => {
        const res = await api.post("/api/persons").send({});
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ message: "Name is required" });
      });

      test("when body has invalid payload", async () => {
        const invalidPayload = {
          firstName: "John",
          lastName: "Doe",
        };

        const res = await api.post("/api/persons").send(invalidPayload);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ message: "Name is required" });
      });

      test("when body has incomplete payload", async () => {
        const incompletePayload = {
          name: "John Doe",
        };
        const res = await api.post("/api/persons").send(incompletePayload);
        expect(res.statusCode).toBe(400);
        expect(res.body).toEqual({ message: "Number is required" });
      });
    });

    test("succeeds with statusCode 201 when body has valid payload", async () => {
      const validPayload: PersonInsert = {
        name: "John Doe",
        number: "09124314323",
      };

      const res = await api.post("/api/persons").send(validPayload);
      const personsAtEnd = await personsInDb();

      expect(res.statusCode).toBe(201);
      expect(personsAtEnd.length).toEqual(initialPersons.length + 1);
      expect(personsAtEnd).toEqual(
        expect.arrayContaining([expect.objectContaining(validPayload)])
      );
    });
  });

  // GET /api/persons/:id
  describe("Viewing a specific person", () => {
    test("succeeds with a valid id", async () => {
      const persons = await personsInDb();

      const personToView = persons[0];

      const res = await api.get(`/api/persons/${personToView.id}`);

      expect(res.statusCode).toBe(200);
      expect(res.body).toEqual(personToView);
    });

    test("fails with statusCode 404 if person does not exist", async () => {
      const nonExistingId = "5a3d5da59070081a82a3445";

      const res = await api.get(`/api/persons/${nonExistingId}`);
      expect(res.statusCode).toBe(404);
    });
  });

  describe("Deleting a person", () => {
    test("succeeds with a valid id", async () => {
      const personsAtStart = await personsInDb();
      const personToDelete = personsAtStart[1];
      const res = await api.delete(`/api/persons/${personToDelete.id}`);

      const personsAtEnd = await personsInDb();
      const contents = personsAtEnd.map((person: PersonSelect) => person.name);

      expect(res.statusCode).toBe(200);
      expect(personsAtEnd.length).toEqual(initialPersons.length - 1);
      expect(contents.includes(personToDelete.name)).toBeFalsy();
    });

    test("fails with statusCode 404 if person does not exist", async () => {
      const nonExistingId = "5a3d5da59070081a82a3445";

      const res = await api.delete(`/api/persons/${nonExistingId}`);
      expect(res.statusCode).toBe(404);
    });
  });
});
