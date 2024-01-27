import { Schema, model } from 'mongoose';
import TSmartPhone from './smartphone.types';

const smartphoneSchema = new Schema<TSmartPhone>(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    releaseDate: {
      type: Date,
      required: true,
    },
    brand: {
      type: String,
      required: true,
      trim: true,
    },
    model: {
      type: String,
      required: true,
      trim: true,
    },
    operatingSystem: {
      type: String,
      required: true,
      trim: true,
    },
    storageCapacity: {
      type: Number,
      required: true,
    },
    screenSize: {
      type: Number,
      required: true,
    },
    cameraQuality: {
      type: String,
      required: true,
      trim: true,
    },
    batteryLife: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true },
);

const SmartPhone = model<TSmartPhone>('SmartPhone', smartphoneSchema);

export default SmartPhone;
