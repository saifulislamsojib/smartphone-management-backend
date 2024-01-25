import env from 'dotenv';

// env config
env.config();

const configs = {
  port: process.env.PORT || 5000,
  origin: '*',
  db_url: process.env.DB_URI!,
  node_env: process.env.NODE_ENV,
  bcrypt_salt_rounds: parseInt(process.env.BCRYPT_SALT_ROUNDS || '0', 10),
  jwt_access_secret: process.env.JWT_ACCESS_SECRET,
  jwt_access_expires_in: process.env.JWT_ACCESS_EXPIRES_IN,
} as const;

export default configs;
