import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import chatRoutes from './routes/chat';
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middlewares
app.use(cors());
app.use(express.json());

// یک مسیر تست ساده برای بررسی سلامت سرور
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', message: 'Aftab Backend is running!' });
});

// TODO: در گام‌های بعدی مسیرهای (Routes) ماژول‌ها را اینجا اضافه می‌کنیم
// app.use('/api/chat', chatRoutes);
app.use('/api/chat', chatRoutes);
app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`);
});
