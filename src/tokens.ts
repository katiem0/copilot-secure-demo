import jwt from "jsonwebtoken";

export function issueAccessToken(userId: number): string {
  const secret = process.env.JWT_SECRET ?? "demo-secret-do-not-use";

  return jwt.sign({ sub: userId }, secret, { expiresIn: "1h" });
}