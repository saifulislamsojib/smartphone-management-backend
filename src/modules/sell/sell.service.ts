import AppError from '@/errors/AppError';
import { subDays } from 'date-fns/subDays';
import { BAD_REQUEST, NOT_FOUND } from 'http-status';
import { FilterQuery } from 'mongoose';
import SmartPhone from '../smartphone/smartphone.model';
import Sell from './sell.model';
import TSell from './sell.types';

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

export const getSellListFromDb = async (payload: Record<string, string>) => {
  const { page, limit, category } = payload;
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) >= 50 ? 50 : parseInt(limit, 10) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const filter: FilterQuery<TSell> = {};
  const date = new Date().toISOString().split('T')[0];

  if (category === 'daily') {
    filter.saleDate = { $gte: subDays(date, 1) };
  } else if (category === 'weekly') {
    filter.saleDate = { $gte: subDays(date, 7) };
  } else if (category === 'monthly') {
    filter.saleDate = { $gte: subDays(date, 30) };
  } else if (category === 'yearly') {
    filter.saleDate = { $gte: subDays(date, 365) };
  }

  const [response] = await Sell.aggregate([
    {
      $match: filter,
    },
    {
      $sort: { createdAt: -1 },
    },
    {
      $facet: {
        seals: [
          {
            $lookup: {
              from: 'smartphones',
              localField: 'smartphone',
              foreignField: '_id',
              as: 'smartphone',
            },
          },
          {
            $project: {
              _id: 1,
              status: 1,
              buyerName: 1,
              saleDate: 1,
              createdAt: 1,
              quantity: 1,
              'smartphoneInfo._id': { $first: '$smartphone._id' },
              'smartphoneInfo.name': { $first: '$smartphone.name' },
              'smartphoneInfo.price': { $first: '$smartphone.price' },
              'smartphoneInfo.brand': { $first: '$smartphone.brand' },
              'smartphoneInfo.model': { $first: '$smartphone.model' },
              'smartphoneInfo.operatingSystem': {
                $first: '$smartphone.operatingSystem',
              },
            },
          },
          {
            $match: { 'smartphoneInfo._id': { $exists: true } },
          },
          {
            $skip: skip,
          },
          {
            $limit: limitNumber,
          },
        ],
        total: [{ $count: 'count' }],
      },
    },
  ]);
  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total: response?.total?.[0]?.count || 0,
    },
    data: response?.seals,
  };
};
