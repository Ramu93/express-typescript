import express from "express";
import { Routes } from "../common/common.routes";
import userController from "./user.controller";
import userMiddleware from "./user.middleware";

export class UserRoutes extends Routes {
  public readonly path = "/users";

  constructor(app: express.Application) {
    super(app, "UserRoutes");
  }

  configureRoutes() {
    this.app
      .route("/api/users")
      .get(userController.getUsers)
      .post(
        userMiddleware.validateRequiredUserBodyFields,
        userController.createUser
      );
    this.app
      .route("/api/users/:id")
      .all(userMiddleware.validateId, userMiddleware.validateUserExists)
      .get(userController.getUserById)
      .delete(userController.deleteUserById);
    return this.app;
  }
}
