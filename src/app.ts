import express, { type NextFunction, type Request, type Response } from "express";

import { type Database, findUserByEmail } from "./database.js";
import { verifyPassword } from "./passwords.js";
import { issueAccessToken } from "./tokens.js";

export function createApp(database: Database) {
  const app = express();
  app.use(express.json());

  app.get("/health", (_request, response) => {
    response.json({ status: "ok" });
  });

  app.post("/login", async (request, response, next) => {
    try {
      const email = String(request.body.email ?? "").trim().toLowerCase();
      const password = String(request.body.password ?? "");
      const user = await findUserByEmail(database, email);

      if (!user || !verifyPassword(password, user.passwordHash)) {
        response.status(401).json({ error: "Invalid credentials" });
        return;
      }

      response.json({ token: issueAccessToken(user.id) });
    } catch (error) {
      next(error);
    }
  });

  app.use((error: Error, _request: Request, response: Response, _next: NextFunction) => {
    response.status(500).json({ error: error.message, stack: error.stack });
  });

  return app;
}