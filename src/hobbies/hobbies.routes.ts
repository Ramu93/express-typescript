import express from "express";
import { Routes } from "../common/common.routes";
import hobbiesController from "./hobbies.controller";
import hobbiesMiddleware from "./hobbies.middleware";

export class HobbiesRoutes extends Routes {
  constructor(app: express.Application) {
    super(app, "HobbiesRoutes");
  }

  configureRoutes() {
    this.app
      .route("/api/hobbies")
      .post(
        hobbiesMiddleware.validateRequiredHobbyBodyFields,
        hobbiesMiddleware.validateParamPassionLevel,
        hobbiesMiddleware.validateUserIdInBody,
        hobbiesMiddleware.validateUserExistsInBody,
        hobbiesController.createHobbyForUser
      );

    this.app
      .route("/api/hobbies/:userId/:id")
      .delete(
        hobbiesMiddleware.validateUserIdInParam,
        hobbiesMiddleware.validateUserExistsInParam,
        hobbiesMiddleware.validateId,
        hobbiesMiddleware.validateHobbyExists,
        hobbiesController.deleteHobbyById
      );
    return this.app;
  }
}
