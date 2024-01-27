import authCheck from '@/middleware/authCheck';
import { Router } from 'express';
import {
  addSmartPhone,
  getSmartPhoneById,
  getSmartPhoneList,
  updateSmartPhone,
  deleteSmartPhones,
} from './smartphone.controller';

const smartPhoneRoutes = Router();

smartPhoneRoutes.post('/', authCheck('admin'), addSmartPhone);
smartPhoneRoutes.get('/', authCheck('admin', 'user'), getSmartPhoneList);
smartPhoneRoutes.delete('/', authCheck('admin'), deleteSmartPhones);
smartPhoneRoutes.get('/:id', authCheck('admin', 'user'), getSmartPhoneById);
smartPhoneRoutes.patch('/:id', authCheck('admin'), updateSmartPhone);

export default smartPhoneRoutes;
