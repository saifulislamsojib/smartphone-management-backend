import bcrypt from 'bcrypt';
import { UNAUTHORIZED } from 'http-status';
import jwt, { JwtPayload } from 'jsonwebtoken';
import AppError from '@/errors/AppError';
import configs from '@/configs';

export const hashPassword = (password: string) => {
  return bcrypt.hash(password, configs.bcrypt_salt_rounds!);
};

export const comparePassword = (plaintextPassword: string, hashedPassword: string) => {
  return bcrypt.compare(plaintextPassword, hashedPassword);
};

export const createJWT = (payload: JwtPayload) => {
  return jwt.sign(payload, configs.jwt_access_secret!, {
    expiresIn: configs.jwt_access_expires_in,
  });
};

export const verifyJWT = (token: string) => {
  try {
    return jwt.verify(token, configs.jwt_access_secret!) as JwtPayload;
  } catch (error) {
    throw new AppError(UNAUTHORIZED, 'Invalid token');
  }
};
