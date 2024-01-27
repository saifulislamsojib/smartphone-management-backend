import authRoutes from '@/modules/auth/auth.route';
import smartPhoneRoutes from '@/modules/smartphone/smartphone.route';
import { Router } from 'express';

const apiRoutes = Router();

const moduleRoutes = [
  {
    path: '/auth',
    route: authRoutes,
  },
  {
    path: '/smartphone',
    route: smartPhoneRoutes,
  },
];

moduleRoutes.forEach((route) => apiRoutes.use(route.path, route.route));

export default apiRoutes;
