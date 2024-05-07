import { Schema, model } from 'mongoose';
import TSell from './sell.types';

const sellSchema = new Schema<TSell>(
  {
    smartphone: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'Smartphone',
    },
    status: {
      type: String,
      enum: ['done', 'rejected', 'pending', 'ongoing'],
      default: 'pending',
    },
    quantity: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    buyerName: {
      type: String,
      required: true,
      trim: true,
    },
    saleDate: {
      type: Date,
      required: true,
    },
    sellBy: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: 'User',
    },
  },
  { timestamps: true },
);

const Sell = model<TSell>('sell', sellSchema);

export default Sell;
