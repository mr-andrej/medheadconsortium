// pages/chat.tsx

import { useState, useEffect } from 'react';

const ChatPage = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');

    const cleanString = (input: string) => {
        // Remove any non-standard characters (becase Redis is being weird)
        let cleaned = input.replace(/[^a-zA-Z0-9\s!.,?]/g, '');
        // Remove leading 't' if present (a weird bug left behind by redis is it adds a t)
        if (cleaned.startsWith('t')) {
            cleaned = cleaned.substring(1);
        }
        return cleaned;
    };

    const sendMessage = async () => {
        const response = await fetch('http://localhost:9999/api/chat/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(input)
        });

        if (response.ok) {
            setMessages(prevMessages => [...prevMessages, input]);
            setInput('');
        }
    };

    useEffect(() => {
        const fetchMessages = async () => {
            const response = await fetch('http://localhost:9999/api/chat/receive');
            const data = await response.json();
            const cleanedData = data.map((message: string) => cleanString(message));
            setMessages(cleanedData);
        };

        fetchMessages();
    }, []);

    return (
        <div>
            <h2>Chat</h2>
            <div>
                {messages.map((message, index) => (
                    <p key={index}>{message}</p>
                ))}
            </div>
            <div>
                <input
                    type="text"
                    value={input}
                    onChange={e => setInput(e.target.value)}
                />
                <button onClick={sendMessage}>Send</button>
            </div>
        </div>
    );
};

export default ChatPage;
