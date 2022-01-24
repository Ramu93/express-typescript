import mongoose from "mongoose";

import model from "./hobbies.schema";
import { Hobby } from "./hobbies.interface";
import { Service } from "../common/common.service";
import { CreateHobbyDto } from "./dtos/create.dto";
import userService from "../users/user.service";
class HobbiesService implements Service {
  private readonly model;

  constructor(model) {
    this.model = model;
  }

  async create(hobbyDto: CreateHobbyDto): Promise<Hobby> {
    const hobby = await this.model.create(hobbyDto);
    await userService.addHobbyToUser(hobbyDto.userId, hobby._id);
    return hobby;
  }

  list(): Promise<Hobby[]> {
    return this.model.find({}).exec();
  }

  findById(id: string): Promise<Hobby> {
    return this.model.findById(id);
  }

  async deleteById(hobbyId: string, userId: string): Promise<boolean> {
    try {
      const isDeletedFromUser = await userService.removeHobbyFromUser(
        userId,
        hobbyId
      );
      if (isDeletedFromUser) {
        await this.model.deleteOne({ _id: mongoose.Types.ObjectId(hobbyId) });
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

export default new HobbiesService(model);
