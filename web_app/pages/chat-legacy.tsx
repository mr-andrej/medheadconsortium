// pages/chat.tsx

import { useState, useEffect } from 'react';
import Talk from 'talkjs';

const ChatPage = () => {
    const [messages, setMessages] = useState<string[]>([]);
    const [input, setInput] = useState('');

    function MyChatComponent() {
        const [talkLoaded, markTalkLoaded] = useState(false);

        Talk.ready.then(() => markTalkLoaded(true));

        useEffect(() => {
            if (talkLoaded) {
                alert("TalkJS has been loaded");
                // Initialize dummy chat user (hospital) St. Mary Hospital', 'Praed St, Paddington, London'
                const hospital = new Talk.User({
                    id: "1",
                    name: "St. Mary Hospital",
                    email: "emergencies@stmaryhospital.com",
                    photoUrl: "https://i2-prod.mylondon.news/incoming/article18265054.ece/ALTERNATES/s1200b/1_GettyImages-950225094.jpg",
                    welcomeMessage: "You've reached St. Mary Hospital's emergency line. State your emergency responder ID to start the conversation!"
                });

                const emergencyResponder = new Talk.User({
                    id: "2",
                    name: "Bobby Pop",
                    email: "bobby.pop@ursamajorhealth.com",
                });

                // Initialize the TalkJS chat box
                const session = new Talk.Session({
                    appId: "tRoZypch",
                    me: hospital
                });

                const conversationId = Talk.oneOnOneId(hospital, emergencyResponder);
                const conversation = session.getOrCreateConversation(conversationId);
                conversation.setParticipant(hospital);
                conversation.setParticipant(emergencyResponder);

                const chatbox = session.createChatbox();
                chatbox.select(conversation);

                return () => session.destroy();
            }
        }, [talkLoaded]);
    }

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

        const interval = setInterval(() => {
            fetchMessages();
            console.log("Simulated WebSocket Ping #" + Math.floor(Math.random() * (9999999 - 1111111) + 1111111));
        }, 1000);

        return () => {
            clearInterval(interval);
        };
    }, []);

    return (
        <div>
            <h2>Chat</h2>
            <div id="talkjs-container" style={{ height: '500px'}}>
            </div>
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
