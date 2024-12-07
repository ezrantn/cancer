import { getHistories } from "../service/histories.js";
import { predictClassification } from "../service/predict.js";
import { storeData } from "../service/storeData.js";
import crypto from "crypto";

export async function postPredictHandler(request, h) {
  try {
    const { image } = request.payload;
    const { model } = request.server.app;

    const { isBadRequest, label, suggestion } = await predictClassification(
      model,
      image,
    );
    const id = crypto.randomUUID();
    const createdAt = new Date().toISOString();

    const data = {
      id: id,
      result: label,
      suggestion: suggestion,
      createdAt: createdAt,
    };

    if (!isBadRequest) {
      await storeData(id, data);
      const response = h.response({
        status: "success",
        message: "Model is predicted successfully",
        data: data,
      });
      response.code(201);
      return response;
    } else {
      const response = h.response({
        status: "fail",
        message: "Terjadi kesalahan dalam melakukan prediksi",
      });
      response.code(400);
      return response;
    }
  } catch (error) {
    return h.response({ status: "fail", message: error.message }).code(400);
  }
}

export async function getPredictionHistories(request, h) {
  try {
    const histories = await getHistories();

    return h
      .response({
        status: "success",
        data: histories,
      })
      .code(200);
  } catch (error) {
    return h
      .response({
        status: "fail",
        message: "Failed to fetch prediction histories",
      })
      .code(500);
  }
}
