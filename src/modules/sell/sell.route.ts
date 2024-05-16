import authCheck from '@/middleware/authCheck';
import { Router } from 'express';
import { userRoles } from '../user/user.constant';
import { addSell, getSellList } from './sell.controller';

const sellRoutes = Router();

sellRoutes.post('/', authCheck('super-admin', 'seller'), addSell);
sellRoutes.get('/', authCheck(...userRoles), getSellList);

export default sellRoutes;
