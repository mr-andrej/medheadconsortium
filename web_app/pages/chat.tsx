import Talk from 'talkjs';
import { useEffect, useState, useRef } from 'react';

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
    return <div ref={chatboxEl} style={{ height: '500px'}}/>;
}

export default MyChatComponent;