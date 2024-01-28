import { ObjectId } from 'mongoose';

type TSell = {
  smartphone: ObjectId;
  status: 'done' | 'rejected' | 'pending' | 'ongoing';
  buyerName: string;
  saleDate: Date;
  createdAt: Date;
  updatedAt: Date;
  sellBy: ObjectId;
  quantity: number;
};

export default TSell;
