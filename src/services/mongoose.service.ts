import mongoose from "mongoose";
import config from "../config";

class MongooseService {
  private connection;

  connect() {
    mongoose
      .connect(config.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
        useFindAndModify: false,
      })
      .then(() => {
        console.log("MongoDB connected");
      })
      .catch((err) => {
        console.error(`MongoDB connection failed.`, err);
      });
  }

  close() {
    mongoose.connection.close();
  }
}
export default new MongooseService();
