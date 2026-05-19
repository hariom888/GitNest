import 'dotenv/config';
import connectDB from './config/db.js';
import createApp from './app.js';

if (!process.env.JWT_SECRET) {
  console.error('FATAL: JWT_SECRET is not configured. Server cannot start securely.');
  process.exit(1);
}

const PORT = process.env.PORT || 5000;

const app = createApp();

if (process.env.NODE_ENV !== 'test') {
  connectDB();
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
