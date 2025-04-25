import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

export const dbName = "habitTracker.db";

const createHabitsTableQuery = `
  CREATE TABLE IF NOT EXISTS habits (
    id TEXT PRIMARY KEY, 
    name TEXT, 
    subtitle TEXT, 
    icon TEXT,
    completed BOOLEAN,
    date TEXT
  );`;

export const getDB = async () => {
  console.log("getting db");
  if (db) {
    return db;
  }

  db = await SQLite.openDatabaseAsync(dbName);

  // setup tables
  await db.withTransactionAsync(async () => {
    if (!db) {
      return;
    }
    await db.execAsync(createHabitsTableQuery);
  });

  return db;
};
