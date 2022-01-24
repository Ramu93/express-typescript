import { PassionLevel } from "../hobbies.interface";

export interface CreateHobbyDto {
  userId: string;
  name: string;
  passionLevel: PassionLevel;
  year: number;
}
