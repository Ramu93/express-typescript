import express from "express";
import userService from "./user.service";
import debug from "debug";
import constants from "../constants";

class UserMiddleware {
  async validateRequiredUserBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.name) {
      next();
    } else {
      res.status(400).send({
        error: `Missing required field - name`,
      });
    }
  }

  async validateId(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const id: string = req.params.id;
    if (id.match(constants.OBJECT_ID_PATTERN)) {
      next();
    } else {
      res.status(400).send({
        error: `Invalid id for user.`,
      });
    }
  }

  async validateUserExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const id: string = req.params.id;
    const user = await userService.findById(id);
    if (user) {
      next();
    } else {
      res.status(404).send({
        error: `User with id ${req.params.id} not found`,
      });
    }
  }
}

export default new UserMiddleware();
