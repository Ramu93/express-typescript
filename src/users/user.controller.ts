import express from "express";

import { CreateUserDto } from "./dtos/create.dto";
import { User } from "./user.interface";
import userService from "./user.service";

class UserController {
  async createUser(req: express.Request, res: express.Response) {
    const userDto: CreateUserDto = req.body;
    const user: User = await userService.create(userDto);
    res.status(201).json(user);
  }

  async getUsers(req: express.Request, res: express.Response) {
    const users: User[] = await userService.list();
    res.status(200).json(users);
  }

  async getUserById(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    const user: User = await userService.findById(id);

    res.status(200).json(user);
  }

  async deleteUserById(req: express.Request, res: express.Response) {
    const id: string = req.params.id;
    let status: string;
    try {
      await userService.deleteById(id);
      status = "success";
    } catch (error) {
      console.error(error);
      status = "failure";
    }
    res.status(200).json({ status });
  }
}

export default new UserController();
