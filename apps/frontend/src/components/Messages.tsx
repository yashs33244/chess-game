import { useSocket } from '@/hooks/useSocket';
import { useState, useEffect, useRef, useCallback } from 'react';

export const Messages = () => {
  const [messages, setMessages] = useState<{ text: string; sender: string }[]>([]);
  const [input, setInput] = useState('');
  const socket = useSocket();
  const messagesEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!socket) return;

    const handleMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data);
        const { type, payload } = data;

        if (type === 'chat') {
          const { message, sender } = payload;
          setMessages((prevMessages) => [...prevMessages, { text: message, sender }]);
        }
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    };

    socket.addEventListener('message', handleMessage);

    return () => {
      socket.removeEventListener('message', handleMessage);
    };
  }, [socket]);

  const handleSendMessage = useCallback(() => {
    if (input.trim() && socket) {
      const messageData = { type: 'chat', payload: { message: input, sender: 'You' } };
      socket.send(JSON.stringify(messageData));
      setMessages((prevMessages) => [...prevMessages, { text: input, sender: 'You' }]);
      setInput('');
    }
  }, [input, socket]);

  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: 'smooth' });
    }
  }, [messages]);

  return (
    <div
      className="flex flex-col justify-between h-full p-4"
      style={{ backgroundColor: 'var(--bg-color-main)', color: 'var(--text-color-main)' }}
    >
      <h3 className="text-xl font-semibold mb-2">Chat</h3>
      <div
        className="flex-grow overflow-y-auto mb-4 p-2 rounded"
        style={{ backgroundColor: 'var(--bg-color-auxiliary-1)' }}
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-2 p-2 rounded ${message.sender === 'You' ? 'text-right' : 'text-left'}`}
            style={{
              backgroundColor: message.sender === 'You' ? 'var(--bg-color-auxiliary-2)' : 'var(--bg-color-auxiliary-3)',
              color: message.sender === 'You' ? '#000' : '#fff',
            }}
          >
            <strong>{message.sender}:</strong> {message.text}
          </div>
        ))}
        <div ref={messagesEndRef} />
      </div>
      <div className="flex">
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-grow p-2 rounded-l"
          style={{ backgroundColor: 'var(--bg-color-auxiliary-1)', color: 'var(--text-color-main)' }}
          placeholder="Type a message..."
        />
        <button
          onClick={handleSendMessage}
          className="p-2 rounded-r"
          style={{ backgroundColor: 'var(--bg-color-auxiliary-2)', color: 'var(--text-color-main)' }}
        >
          Send
        </button>
      </div>
    </div>
  );
};
