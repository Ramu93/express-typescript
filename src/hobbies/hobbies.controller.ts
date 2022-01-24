import express from "express";
import { CreateHobbyDto } from "./dtos/create.dto";
import hobbiesService from "./hobbies.service";
import { Hobby } from "./hobbies.interface";

export class HobbiesController {
  async createHobbyForUser(req: express.Request, res: express.Response) {
    const hobbyDto: CreateHobbyDto = req.body;
    const hobby: Hobby = await hobbiesService.create(hobbyDto);
    res.status(201).json(hobby);
  }

  async deleteHobbyById(req: express.Request, res: express.Response) {
    const hobbyId: string = req.params.id;
    const userId: string = req.params.userId;
    let status: string = "success";
    const isDeleted: boolean = await hobbiesService.deleteById(hobbyId, userId);
    if (!isDeleted) {
      status = "failure";
      console.error(`Error deleting hobby ${hobbyId} from user ${userId}`);
    }
    console.log(`Deleted hobby ${hobbyId} from user ${userId}`);
    res.status(201).json({ status });
  }
}

export default new HobbiesController();
