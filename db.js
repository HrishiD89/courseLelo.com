const mongoose = require("mongoose");
require('dotenv').config();

async function connectToMongoDB() {
    try {
        await mongoose.connect(process.env.MONGO_STRING);
        console.log('Successfully connected to MongoDB');
    } catch (error) {
        console.log('Error connecting to MongoDB');
        console.error('Error details:', error);

    }
}
connectToMongoDB();

const Schema = mongoose.Schema;
const objectId = Schema.ObjectId;

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const adminSchema = new Schema({
  email: {
    type: String,
    unique: true,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
});

const courseSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  image: {
    type: String,
    required: true,
  },
  creatorId: objectId,
});

const purchaseSchema = new Schema({
  courseId: objectId,
  userId: objectId,
});

const userModel = mongoose.model("user", userSchema);
const adminModel = mongoose.model("admin", adminSchema);
const courseModel = mongoose.model("course", courseSchema);
const purchaseModel = mongoose.model("purchase", purchaseSchema);

module.export = {
  userModel,
  adminModel,
  courseModel,
  purchaseModel,
};
