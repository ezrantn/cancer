import tf from "@tensorflow/tfjs-node";
import process from "node:process";
import dotenv from 'dotenv';
dotenv.config();

export async function loadModel() {
  return tf.loadGraphModel(process.env.MODEL_URL);
}
