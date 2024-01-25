import { Router } from 'express';
import authRoutes from '@/modules/auth/auth.route';

const apiRoutes = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
];

moduleRoutes.forEach((route) => apiRoutes.use(route.path, route.route));

export default apiRoutes;
