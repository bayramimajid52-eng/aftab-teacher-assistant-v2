import { useState } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

function App() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = { role: 'user', content: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      // ارسال پیام به بک‌اند (که به OmniRoute وصل است)
      const response = await fetch('http://localhost:5000/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ message: input }),
      });

      const data = await response.json();
      
      if (data.reply) {
        setMessages((prev) => [...prev, { role: 'assistant', content: data.reply }]);
      } else {
        setMessages((prev) => [...prev, { role: 'assistant', content: 'خطا در دریافت پاسخ.' }]);
      }
    } catch (error) {
      console.error(error);
      setMessages((prev) => [...prev, { role: 'assistant', content: 'ارتباط با سرور برقرار نشد.' }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '80vh', maxWidth: '800px', margin: '0 auto', border: '1px solid #444', borderRadius: '8px', overflow: 'hidden' }}>
      {/* هدر */}
      <header style={{ padding: '1rem', backgroundColor: '#333', borderBottom: '1px solid #444' }}>
        <h2 style={{ margin: 0 }}>☀️ دستیار معلم آفتاب</h2>
        <p style={{ margin: '0.5rem 0 0', fontSize: '0.9rem', color: '#aaa' }}>قدرت گرفته از OmniRoute</p>
      </header>

      {/* ناحیه پیام‌ها */}
      <div style={{ flex: 1, overflowY: 'auto', padding: '1rem', display: 'flex', flexDirection: 'column', gap: '1rem', backgroundColor: '#1a1a1a' }}>
        {messages.length === 0 && (
          <p style={{ textAlign: 'center', color: '#888', marginTop: '2rem' }}>سلام معلم عزیز! چطور می‌توانم در تولید محتوا یا طرح درس به شما کمک کنم؟</p>
        )}
        
        {messages.map((msg, index) => (
          <div key={index} style={{ alignSelf: msg.role === 'user' ? 'flex-start' : 'flex-end', maxWidth: '80%' }}>
            <div style={{
              padding: '0.8rem 1rem',
              borderRadius: '8px',
              backgroundColor: msg.role === 'user' ? '#2563eb' : '#374151',
              color: 'white',
              textAlign: 'right'
            }}>
              {msg.content}
            </div>
          </div>
        ))}
        {isLoading && <p style={{ color: '#888', textAlign: 'center' }}>آفتاب در حال فکر کردن است...</p>}
      </div>

      {/* ناحیه ورودی */}
      <div style={{ padding: '1rem', backgroundColor: '#222', display: 'flex', gap: '0.5rem' }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyPress}
          placeholder="سوال خود را بنویسید..."
          style={{ flex: 1, padding: '0.8rem', borderRadius: '4px', border: '1px solid #444', backgroundColor: '#111', color: 'white' }}
        />
        <button 
          onClick={sendMessage} 
          disabled={isLoading || !input.trim()}
          style={{ padding: '0.8rem 1.5rem', borderRadius: '4px', border: 'none', backgroundColor: isLoading ? '#555' : '#2563eb', color: 'white', cursor: 'pointer' }}
        >
          ارسال
        </button>
      </div>
    </div>
  );
}

export default App;
