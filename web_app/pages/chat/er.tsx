import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';
import { AppBar, Toolbar, Typography, Button, Container, Box } from '@mui/material';

function MyChatComponent() {
    const chatboxEl = useRef();

    // wait for TalkJS to load
    const [talkLoaded, markTalkLoaded] = useState(false);

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
                me: hospital,
            });

            const conversationId = Talk.oneOnOneId(emergencyResponder, hospital);
            const conversation = session.getOrCreateConversation(conversationId);
            conversation.setParticipant(emergencyResponder);
            conversation.setParticipant(hospital);

            const chatbox = session.createChatbox();
            chatbox.select(conversation);
            // @ts-ignore
            chatbox.mount(chatboxEl.current);

            return () => session.destroy();
        }
    }, [talkLoaded]);

    // @ts-ignore
    return (
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h5"
                        style={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            letterSpacing: '1.5px',
                            color: '#fff',
                            marginRight: 'auto'
                        }}
                    >
                        MedHead
                    </Typography>
                    {/* Add other navigation buttons here if needed */}
                </Toolbar>
            </AppBar>
            <Box
                ref={chatboxEl}
                sx={{
                    height: '500px',
                    mt: 3,
                    p: 2,
                    border: '1px solid #e0e0e0',
                    boxShadow: 2,
                    bgcolor: 'background.paper'
                }}
            />
        </Container>
    );
}

export default MyChatComponent;