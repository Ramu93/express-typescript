import express from "express";
import hobbiesService from "./hobbies.service";
import debug from "debug";
import constants from "../constants";
import userService from "../users/user.service";
import { PassionLevel } from "./hobbies.interface";

class HobbiesMiddleware {
  async validateRequiredHobbyBodyFields(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      req.body &&
      req.body.userId &&
      req.body.name &&
      req.body.year &&
      req.body.passionLevel
    ) {
      next();
    } else {
      res.status(400).send({
        error: `Missing fields - all fields userId, name, year, and passionLevel are required.`,
      });
    }
  }

  async validateParamPassionLevel(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      req.body &&
      req.body.passionLevel &&
      Object.values(PassionLevel).includes(req.body.passionLevel)
    ) {
      next();
    } else {
      res.status(400).send({
        error: `Invalid value for passionLevel.`,
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
        error: `Invalid id for hobby.`,
      });
    }
  }

  async validateUserIdInBody(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (
      req.body &&
      req.body.userId &&
      req.body.userId.match(constants.OBJECT_ID_PATTERN)
    ) {
      next();
    } else {
      res.status(400).send({
        error: `Invalid id for user.`,
      });
    }
  }

  async validateUserExistsInBody(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.body && req.body.userId) {
      const user = await userService.findById(req.body.userId);
      if (user) {
        next();
      } else {
        res.status(404).send({
          error: `User with id ${req.body.userId} not found`,
        });
      }
    }
  }

  async validateUserIdInParam(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.params.userId.match(constants.OBJECT_ID_PATTERN)) {
      next();
    } else {
      res.status(400).send({
        error: `Invalid id for user.`,
      });
    }
  }

  async validateUserExistsInParam(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    if (req.params.userId) {
      const user = await userService.findById(req.params.userId);
      if (user) {
        next();
      } else {
        res.status(404).send({
          error: `User with id ${req.params.userId} not found`,
        });
      }
    }
  }

  async validateHobbyExists(
    req: express.Request,
    res: express.Response,
    next: express.NextFunction
  ) {
    const id: string = req.params.id;
    const hobby = await hobbiesService.findById(id);
    if (hobby) {
      next();
    } else {
      res.status(404).send({
        error: `Hobby with id ${req.params.id} not found`,
      });
    }
  }
}

export default new HobbiesMiddleware();
