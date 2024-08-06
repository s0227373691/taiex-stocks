const mongoose = require("mongoose");

main().catch((err) => console.log(err));

async function main() {
  try {
    console.log("connecting mongoDB ...");
    const uri = `mongodb+srv://${process.env.DB_USERNAME}:${process.env.DB_PASSWORD}@cluster0.wehh2.mongodb.net/${process.env.DB_NAME}`;
    await mongoose.connect(uri);
    console.log("MongoDB is connected");
  } catch (error) {
    console.error("Failed to connect mongoDB");
  }
}
