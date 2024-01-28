import authCheck from '@/middleware/authCheck';
import { Router } from 'express';
import { addSell } from './sell.controller';

const sellRoutes = Router();

sellRoutes.post('/', authCheck('admin'), addSell);
// sellRoutes.get('/', authCheck('admin', 'user'), getSellList);
// sellRoutes.get('/', authCheck('admin', 'user'));

export default sellRoutes;
