import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  name: { type: String, required: true },
  hobbies: [{ type: mongoose.Types.ObjectId, ref: "Hobbies" }],
});

export default mongoose.model("User", UserSchema);
