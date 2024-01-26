import authCheck from '@/middleware/authCheck';
import validateRequest from '@/middleware/validateRequest';
import { Router } from 'express';
import { changePassword, getCurrentUser, loginUser, registerUser } from './auth.controller';
import { changePasswordSchema, loginUserSchema, registerUserSchema } from './auth.validation';

const authRoutes = Router();

authRoutes.get('/me', authCheck('admin', 'user'), getCurrentUser);
authRoutes.post('/register', validateRequest(registerUserSchema), registerUser);
authRoutes.post('/login', validateRequest(loginUserSchema), loginUser);
authRoutes.post(
  '/change-password',
  authCheck('admin', 'user'),
  validateRequest(changePasswordSchema),
  changePassword,
);

export default authRoutes;
