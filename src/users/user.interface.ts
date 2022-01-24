import mongoose from "mongoose";
import { Hobby } from "../hobbies/hobbies.interface";

export interface User {
  id?: string;
  name: string;
  hobbies?: Hobby[];
}
