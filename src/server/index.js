"use strict";

import Hapi from "@hapi/hapi";
import process from "node:process";
import { loadModel } from "../service/loadModel.js";
import { routes } from "./routes.js";

const init = async () => {
  const server = Hapi.server({
    port: 3000,
    host: "localhost",
    routes: {
      cors: {
        origin: ["*"],
      },
    },
  });

  const model = await loadModel();
  server.app.model = model;

  server.route(routes);

  server.ext("onPreResponse", function (request, h) {
    const response = request.response;

    if (response.isBoom) {
      const newResponse = h.response({
        status: "fail",
        message: response.message,
      });

      newResponse.code(response.output.statusCode);

      return newResponse;
    }

    return h.continue;
  });

  await server.start();
  console.log("Server running on %s", server.info.uri);
};

process.on("unhandledRejection", (err) => {
  console.log(err);
  process.exit(1);
});

init();
