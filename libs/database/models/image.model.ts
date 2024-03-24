import { Schema, model, models } from "mongoose";

export interface IImageSchema extends Document {
  title: string;
  transformationType: string;
  publicId: string;
  imageUrl: URL;
  width: number;
  height: number;
  config: Object;
  transformationUrl: URL;
  aspectRatio: string;
  color: string;
  prompt: string;
  author: {
    _id: string;
    firstName: string;
    lastName: string;
  };
  createdAt: Date;
  updatedAt: Date;
}

const ImageSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  transformationType: {
    type: String,
    required: true,
  },
  publicId: {
    type: String,
    required: true,
  },
  imageUrl: {
    type: URL,
    required: true,
  },
  width: {
    type: Number,
  },
  height: {
    type: Number,
  },
  config: {
    type: Object,
  },
  transformationUrl: {
    type: URL,
  },
  aspectRatio: {
    type: String,
  },
  color: {
    type: String,
  },
  prompt: {
    type: String,
  },
  author: {
    type: Schema.Types.ObjectId,
    ref: "User",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

const Image = models?.Image || model("Image", ImageSchema);

export default Image;