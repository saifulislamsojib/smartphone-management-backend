import AppError from '@/errors/AppError';
import { BAD_REQUEST, NOT_FOUND } from 'http-status';
import SmartPhone from '../smartphone/smartphone.model';
import Sell from './sell.model';
import TSell from './sell.types';

// eslint-disable-next-line import/prefer-default-export
export const addSellToDb = async (payload: Omit<TSell, '_id'>) => {
  // check quantity of the product
  const smartPhone = await SmartPhone.findById(payload.smartphone).select('quantity');
  if (!smartPhone) {
    throw new AppError(NOT_FOUND, 'Smartphone not found!');
  }
  if (smartPhone.quantity < Number(payload.quantity)) {
    throw new AppError(BAD_REQUEST, `Stock limit Overed. Current stock is ${smartPhone.quantity}`);
  }

  const sell = new Sell(payload).save();

  // update the smartphone quantity
  await SmartPhone.updateOne(
    { _id: smartPhone._id },
    { $inc: { quantity: Number(payload.quantity) * -1 } },
  );
  return sell;
};
