import AppError from '@/errors/AppError';
import { BAD_REQUEST } from 'http-status';
import { FilterQuery, PipelineStage } from 'mongoose';
import SmartPhone from './smartphone.model';
import TSmartPhone from './smartphone.types';

export const addSmartPhoneToDb = (payload: Omit<TSmartPhone, '_id'>) => {
  return new SmartPhone(payload).save();
};

export const getSmartPhoneListFromDb = async (payload: Record<string, string>) => {
  const {
    page,
    limit,
    minPrice,
    maxPrice,
    releaseDate,
    brand,
    model,
    operatingSystem,
    storageCapacity,
    screenSize,
    cameraQuality,
    batteryLife,
    search,
  } = payload;
  const pageNumber = parseInt(page, 10) || 1;
  const limitNumber = parseInt(limit, 10) >= 50 ? 50 : parseInt(limit, 10) || 10;
  const skip = (pageNumber - 1) * limitNumber;

  const filter: FilterQuery<TSmartPhone> = {};
  if (minPrice) {
    filter.price = { $gte: Number(minPrice) };
  }
  if (maxPrice) {
    if (!filter.price) {
      filter.price = {};
    }
    filter.price.$lte = Number(maxPrice);
  }
  if (releaseDate) {
    filter.releaseDate = new Date(releaseDate);
  }
  if (brand) {
    filter.brand = brand;
  }
  if (model) {
    filter.model = model;
  }
  if (operatingSystem) {
    filter.operatingSystem = operatingSystem;
  }
  if (storageCapacity) {
    filter.storageCapacity = Number(storageCapacity);
  }
  if (screenSize) {
    filter.screenSize = Number(screenSize);
  }
  if (cameraQuality) {
    filter.cameraQuality = cameraQuality;
  }
  if (batteryLife) {
    filter.batteryLife = batteryLife;
  }
  if (search) {
    const searchQuery = { $regex: search.trim(), option: 'i' };
    filter.$or = [{ name: searchQuery, brand: searchQuery, model: searchQuery }];
  }

  const pipelines: PipelineStage[] = [
    {
      $match: filter,
    },
    {
      $sort: { createdAt: -1 },
    },
  ];

  pipelines.push({
    $facet: {
      smartphones: [
        {
          $skip: skip,
        },
        {
          $limit: limitNumber,
        },
        {
          $project: { __v: 0 },
        },
      ],
      total: [{ $count: 'count' }],
    },
  });

  const [response] = await SmartPhone.aggregate(pipelines);
  return {
    meta: {
      page: pageNumber,
      limit: limitNumber,
      total: response?.total?.[0]?.count || 0,
    },
    data: { courses: response?.courses },
  };
};

export const getSmartPhoneByIdFromDb = async (id: string) => {
  const data = await SmartPhone.findById(id);

  if (!data) {
    throw new AppError(404, 'Smartphone not found');
  }

  return data;
};

export const updateSmartPhoneToDb = async (id: string, payload: Partial<TSmartPhone>) => {
  const data = await SmartPhone.findByIdAndUpdate(id, payload);

  if (!data) {
    throw new AppError(404, 'Smartphone not found');
  }

  return data;
};

export const deleteSmartPhonesToDb = async (ids: string[]) => {
  const result = await SmartPhone.deleteMany({ _id: { $in: ids } });

  if (!result.deletedCount) {
    throw new AppError(BAD_REQUEST, 'No smartphone detected');
  }

  return result;
};
