import mongoose from "mongoose";

export interface Hobby {
  id: string;
  passionLevel: PassionLevel;
  name: string;
  year: number;
  userId: string;
}

export enum PassionLevel {
  MEDIUM = "Medium",
  HIGH = "High",
  LOW = "Low",
  VERY_HIGH = "Very-High",
}
