import mongoose from "mongoose";
import { PassionLevel } from "./hobbies.interface";

const HobbiesSchema = new mongoose.Schema({
  passionLevel: {
    type: String,
    enum: Object.values(PassionLevel),
    required: true,
  },
  name: { type: String, required: true },
  year: { type: Number, required: true },
});

export default mongoose.model("Hobbies", HobbiesSchema);
