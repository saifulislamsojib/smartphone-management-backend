import authCheck from '@/middleware/authCheck';
import { Router } from 'express';
import { addSell, getSellList } from './sell.controller';

const sellRoutes = Router();

sellRoutes.post('/', authCheck('admin'), addSell);
sellRoutes.get('/', authCheck('admin'), getSellList);

export default sellRoutes;
