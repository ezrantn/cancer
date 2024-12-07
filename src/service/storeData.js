import { Firestore } from "@google-cloud/firestore";
import process from "node:process";
import dotenv from 'dotenv';
dotenv.config();

export async function storeData(id, data) {
  const db = new Firestore({
    projectId: process.env.PROJECT_ID,
  });

  const predictCollection = db.collection("predictions");
  return predictCollection.doc(id).set(data);
}
