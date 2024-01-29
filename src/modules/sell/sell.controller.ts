import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { CREATED, OK } from 'http-status';
import { addSellToDb, getSellListFromDb } from './sell.service';

export const addSell = catchAsync(async (req, res) => {
  req.body.sellBy = req.user?._id;
  const data = await addSellToDb(req.body);
  return sendResponse(res, {
    data,
    message: 'Sell Smartphone successfully',
    statusCode: CREATED,
    success: true,
  });
});

export const getSellList = catchAsync(async (req, res) => {
  const result = await getSellListFromDb(req.query as Record<string, string>);
  return sendResponse(res, {
    success: true,
    statusCode: OK,
    message: 'Sell list retrieved successfully',
    ...result,
  });
});
