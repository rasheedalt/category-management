import dotenv from 'dotenv';

dotenv.config();

export default {
  application: {
    port: process.env.PORT || 5000,
  },
  database: {
    host: process.env.DB_HOST || '127.0.0.1',
    port: process.env.DB_PORT || 5432,
    username: process.env.DB_USER || 'postgres',
    password: process.env.DB_PASSWORD || '',
    database: process.env.DB_NAME || 'category-management',
    showDBlogs: process.env.DB_SHOW_LOGS === 'true',
  },
};
