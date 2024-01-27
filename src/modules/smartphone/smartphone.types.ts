import { ObjectId } from 'mongoose';

type TSmartPhone = {
  _id: ObjectId;
  name: string;
  price: number;
  quantity: number;
  releaseDate: Date;
  brand: string;
  model: string;
  operatingSystem: string;
  storageCapacity: number;
  screenSize: number;
  cameraQuality: string;
  batteryLife: string;
  createdAt: Date;
  updatedAt: Date;
  createdBy: ObjectId;
  __v?: number;
};

export default TSmartPhone;
