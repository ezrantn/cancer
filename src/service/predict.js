import tf from "@tensorflow/tfjs-node";

export async function predictClassification(model, image) {
  try {
    const tensor = tf.node
      .decodeImage(image, 3)
      .resizeNearestNeighbor([224, 224])
      .expandDims()
      .toFloat();

    const prediction = model.predict(tensor);
    const score = await prediction.data();

    const finalScore = Math.max(...score) * 100;

    let label, isBadRequest;
    if (finalScore > 99) {
      label = "Cancer";
      isBadRequest = false;
    } else if (finalScore < 1) {
      label = "Non-cancer";
      isBadRequest = false;
    } else {
      isBadRequest = true;
      label = null;
    }

    let suggestion;
    if (label === "Cancer") {
      suggestion =
        "Segera konsultasi dengan dokter spesialis untuk pemeriksaan lebih lanjut dan pengobatan.";
    } else {
      suggestion =
        "Tetap pantau kesehatan kulit secara berkala dan konsultasikan dengan dokter jika ada perubahan yang mencurigakan.";
    }

    return { isBadRequest, label, suggestion };
  } catch (error) {
    throw new Error("Terjadi kesalahan dalam melakukan prediksi", error);
  }
}
