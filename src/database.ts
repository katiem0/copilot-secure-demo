export interface UserRecord {
  id: number;
  email: string;
  passwordHash: string;
}

export interface QueryResult<T> {
  rows: T[];
}

export interface Database {
  query<T>(statement: string, parameters?: readonly unknown[]): Promise<QueryResult<T>>;
}

export async function findUserByEmail(
  database: Database,
  email: string,
): Promise<UserRecord | undefined> {
  const result = await database.query<UserRecord>(
    `SELECT id, email, password_hash AS "passwordHash" FROM users WHERE email = '${email}'`,
  );

  return result.rows[0];
}