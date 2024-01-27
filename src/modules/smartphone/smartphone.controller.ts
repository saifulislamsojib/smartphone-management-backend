import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { CREATED, OK } from 'http-status';
import {
  addSmartPhoneToDb,
  deleteSmartPhonesToDb,
  getSmartPhoneByIdFromDb,
  getSmartPhoneListFromDb,
  updateSmartPhoneToDb,
} from './smartphone.service';

export const getSmartPhoneList = catchAsync(async (req, res) => {
  const result = await getSmartPhoneListFromDb(req.query as Record<string, string>);
  return sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Smartphone list retrieved successfully',
    ...result,
  });
});

export const getSmartPhoneById = catchAsync(async (req, res) => {
  const data = await getSmartPhoneByIdFromDb(req.params.id);
  return sendResponse(res, {
    data,
    message: 'Smartphone retrieved successfully',
    statusCode: OK,
    success: true,
  });
});

export const addSmartPhone = catchAsync(async (req, res) => {
  req.body.createdBy = req.user?._id;
  const data = await addSmartPhoneToDb(req.body);
  return sendResponse(res, {
    data,
    message: 'Smartphone added successfully',
    statusCode: CREATED,
    success: true,
  });
});

export const updateSmartPhone = catchAsync(async (req, res) => {
  const data = await updateSmartPhoneToDb(req.params.id, req.body);
  return sendResponse(res, {
    data,
    message: 'Smartphone updated successfully',
    statusCode: OK,
    success: true,
  });
});

export const deleteSmartPhones = catchAsync(async (req, res) => {
  const data = await deleteSmartPhonesToDb(req.body.ids);
  return sendResponse(res, {
    data,
    message: `${data.deletedCount} Smartphone${data.deletedCount === 1 ? '' : "'s"} deleted successfully`,
    statusCode: OK,
    success: true,
  });
});
