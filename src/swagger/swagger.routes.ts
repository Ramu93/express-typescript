import express from "express";
import fs from "fs";
import swaggerUi from "swagger-ui-express";
import { Routes } from "../common/common.routes";
import * as swaggerDoc from "./swagger.json";

export class SwaggerRoutes extends Routes {
  private swaggerFile: any;
  private swaggerData: any;
  private customCss: any;

  constructor(app: express.Application) {
    super(app, "SwaggerRoutes");
    this.swaggerFile = process.cwd() + "/src/swagger/swagger.json";
    this.swaggerData = fs.readFileSync(this.swaggerFile, "utf8");
  }

  configureRoutes(): express.Application {
    this.app
      .route("/api-docs")
      .get(swaggerUi.serve, swaggerUi.setup(swaggerDoc));
    return this.app;
  }
}
