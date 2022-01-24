import mongoose from "mongoose";
import model from "./user.schema";
import { CreateUserDto } from "./dtos/create.dto";
import { Service } from "../common/common.service";
import { User } from "./user.interface";

class UserService implements Service {
  private readonly model;

  constructor(model) {
    this.model = model;
  }

  create(user: CreateUserDto): Promise<User> {
    return this.model.create(user);
  }

  list(): Promise<User[]> {
    return this.model.find({}).populate("hobbies").exec();
  }

  findById(id: string): Promise<User> {
    return this.model.findById(id);
  }

  deleteById(id: string): Promise<string> {
    return this.model.deleteOne({ _id: mongoose.Types.ObjectId(id) });
  }

  async addHobbyToUser(
    id: string,
    hobbyId: mongoose.Types.ObjectId
  ): Promise<User> {
    const user = await this.model.findById(id);
    user.hobbies.push(mongoose.Types.ObjectId(hobbyId));
    return user.save();
  }

  async removeHobbyFromUser(id: string, hobbyId: string): Promise<boolean> {
    try {
      const user = await this.model.findById(id);
      const hobbies = user.hobbies.map((hobbyId) => hobbyId.toString());
      const idx = hobbies.indexOf(hobbyId);
      if (idx > -1) {
        hobbies.splice(idx, 1);
        user.hobbies = hobbies;
        await user.save();
        return true;
      } else {
        return false;
      }
    } catch (error) {
      return false;
    }
  }
}

export default new UserService(model);
