import authCheck from '@/middleware/authCheck';
import { Router } from 'express';
import { addSell, getSellList } from './sell.controller';

const sellRoutes = Router();

sellRoutes.post('/', authCheck('super-admin', 'seller'), addSell);
sellRoutes.get('/', authCheck('super-admin'), getSellList);

export default sellRoutes;
