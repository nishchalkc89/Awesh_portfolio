import { MongoClient, Db } from "mongodb";

const uri = process.env.MONGODB_URI!;
let client: MongoClient;
let db: Db;

declare global {
  // eslint-disable-next-line no-var
  var _mongoClient: MongoClient | undefined;
}

export async function getDb(): Promise<Db> {
  if (db) return db;
  if (global._mongoClient) {
    client = global._mongoClient;
  } else {
    client = new MongoClient(uri);
    await client.connect();
    if (process.env.NODE_ENV !== "production") {
      global._mongoClient = client;
    }
  }
  db = client.db("awesh-portfolio");
  return db;
}
