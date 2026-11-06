import { Router } from 'express';
import { generateResponse } from '../services/AIService';

const router = Router();

// مسیر POST برای دریافت پیام از معلم و ارسال پاسخ از هوش مصنوعی
router.post('/', async (req, res) => {
  try {
    const { message } = req.body;

    if (!message) {
      return res.status(400).json({ error: 'Message is required' });
    }

    // فراخوانی سرویس هوش مصنوعی (که به OmniRoute وصل است)
    const aiResponse = await generateResponse(message);

    res.json({ reply: aiResponse });
  } catch (error) {
    console.error('Chat Route Error:', error);
    res.status(500).json({ error: 'Failed to process the message' });
  }
});

export default router;
