import catchAsync from '@/utils/catchAsync';
import sendResponse from '@/utils/sendResponse';
import { CREATED } from 'http-status';
import { addSellToDb } from './sell.service';

// eslint-disable-next-line import/prefer-default-export
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
