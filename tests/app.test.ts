import assert from "node:assert/strict";
import { describe, it } from "node:test";

import request from "supertest";

import { createApp } from "../src/app.js";
import type { Database, QueryResult, UserRecord } from "../src/database.js";
import { hashPassword } from "../src/passwords.js";

function createDatabase(rows: UserRecord[] = []): Database {
  return {
    async query<T>(): Promise<QueryResult<T>> {
      return { rows: rows as T[] };
    },
  };
}

describe("demo API", () => {
  it("reports its health", async () => {
    const response = await request(createApp(createDatabase())).get("/health");

    assert.equal(response.status, 200);
    assert.deepEqual(response.body, { status: "ok" });
  });

  it("issues a token for valid credentials", async () => {
    process.env.JWT_SECRET = "a-long-test-secret-that-is-not-used-in-production";
    const database = createDatabase([
      { id: 7, email: "dev@example.com", passwordHash: hashPassword("correct horse") },
    ]);

    const response = await request(createApp(database)).post("/login").send({
      email: "dev@example.com",
      password: "correct horse",
    });

    assert.equal(response.status, 200);
    assert.equal(typeof response.body.token, "string");
  });

  it("rejects invalid credentials", async () => {
    const response = await request(createApp(createDatabase())).post("/login").send({
      email: "unknown@example.com",
      password: "incorrect",
    });

    assert.equal(response.status, 401);
    assert.deepEqual(response.body, { error: "Invalid credentials" });
  });
});