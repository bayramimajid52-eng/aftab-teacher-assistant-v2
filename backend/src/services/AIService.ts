import OpenAI from 'openai';
import dotenv from 'dotenv';

dotenv.config();

// اتصال به OmniRoute به جای اتصال مستقیم به OpenAI یا Gemini
export const aiClient = new OpenAI({
  baseURL: process.env.OMNIROUTE_BASE_URL || 'http://localhost:3000/v1',
  apiKey: process.env.OMNIROUTE_API_KEY || 'sk-omniroute',
});

/**
 * یک تابع نمونه برای گرفتن پاسخ از هوش مصنوعی
 * OmniRoute به صورت خودکار تصمیم می‌گیرد از کدام مدل استفاده کند.
 */
export const generateResponse = async (prompt: string) => {
  try {
    const response = await aiClient.chat.completions.create({
      model: 'auto', // OmniRoute معمولاً از مدل 'auto' یا نام یک مدل خاص پشتیبانی می‌کند
      messages: [
        { role: 'system', content: 'You are Aftab, a helpful AI teaching assistant. You help teachers create lesson plans, quizzes, and educational content.' },
        { role: 'user', content: prompt }
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error('Error connecting to OmniRoute:', error);
    throw new Error('Failed to generate AI response');
  }
};
