import Talk from 'talkjs';
import {useEffect, useRef, useState} from 'react';
import {Box, Container} from '@mui/material';

import "../../public/style.css";
import Header from '@/components/Header';

function MyChatComponent() {
    const chatboxEl = useRef();

    // wait for TalkJS to load
    const [talkLoaded, markTalkLoaded] = useState(false);

    const linkStyle = {
        marginRight: '15px',
        textDecoration: 'none',
        color: '#0070f3',
        cursor: 'pointer',
        fontSize: '16px'
    };

    const headerStyle = {
        padding: '10px 20px',
        backgroundColor: '#f5f5f5',
        borderBottom: '1px solid #e0e0e0',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center'
    };

    useEffect(() => {
        Talk.ready.then(() => markTalkLoaded(true));

        if (talkLoaded) {
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
                photoUrl: "https://this-person-does-not-exist.com/img/avatar-gen117843686efc1185e94829beb2084fdb.jpg"
            });

            const session = new Talk.Session({
                appId: 'tRoZypch',
                me: emergencyResponder,
            });

            const conversationId = Talk.oneOnOneId(hospital, emergencyResponder);
            const conversation = session.getOrCreateConversation(conversationId);
            conversation.setParticipant(hospital);
            conversation.setParticipant(emergencyResponder);

            const chatbox = session.createChatbox();
            chatbox.select(conversation);
            // @ts-ignore
            chatbox.mount(chatboxEl.current);

            return () => session.destroy();
        }
    }, [talkLoaded]);

    // @ts-ignore
    return (
        <Container className="glass">
            <Header/>
            <Box
                ref={chatboxEl}
                sx={{
                    height: '500px',
                    mt: 3,
                    p: 2,
                }}
            />
        </Container>
    );
}

export default MyChatComponent;