import authCheck from '@/middleware/authCheck';
import { Router } from 'express';
import { userRoles } from '../user/user.constant';
import {
  addSmartPhone,
  deleteSmartPhones,
  getSmartPhoneById,
  getSmartPhoneList,
  updateSmartPhone,
} from './smartphone.controller';

const smartPhoneRoutes = Router();

smartPhoneRoutes.post('/', authCheck('super-admin', 'manager'), addSmartPhone);
smartPhoneRoutes.get('/', authCheck(...userRoles), getSmartPhoneList);
smartPhoneRoutes.delete('/', authCheck('super-admin', 'manager'), deleteSmartPhones);
smartPhoneRoutes.get('/:id', authCheck(...userRoles), getSmartPhoneById);
smartPhoneRoutes.patch('/:id', authCheck('super-admin', 'manager'), updateSmartPhone);

export default smartPhoneRoutes;
