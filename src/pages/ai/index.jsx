import Layout from '../../components/Layout.jsx'
import { useEffect, useState } from 'react'
import GrowableTextarea from '../../components/input/GrowableTextarea.jsx'
import { sendToGpt } from '../../api/v1/index.js'

function Typewriter({ text, typingDelay = 100, speaker }) {
    const [displayedText, setDisplayedText] = useState('');
    useEffect(() => {
        if (speaker === 'User') {
            setDisplayedText(text);
        } else {
            let charIndex = 0;
            const timer = setInterval(() => {
                setDisplayedText((prev) => prev + text[charIndex]);
                charIndex++;
                if (charIndex === text.length-1) {
                    clearInterval(timer);
                }
            }, typingDelay);

            return () => clearInterval(timer);
        }
    }, [text, typingDelay, speaker]);

    return <span>{displayedText}</span>;
}

function Conversation(props) {
    const { speaker, text } = props
    return (
        
        <div className={'bg-yellow-111 w-1/3 rounded-md px-2 py-1'} style={{ marginLeft: speaker === 'User' ? 'auto' : 0 }}>
            <Typewriter text={text} typingDelay={50} speaker={speaker} />
        </div>
    )
}

export default function AI() {
    const [conversations, setConversation] = useState([
        {
            speaker: 'Rachel',
            text: 'Hi. I am Rachel Green.',
        },
    ])

    const onSend = (element) => {
        if (element) {
            const newChat = {
                speaker: 'User',
                text: element.current.value,
            }
            const newConversations = [...conversations, newChat]
            setConversation(newConversations)

            sendToGpt(newConversations).then((response) => {
                const newChat = {
                    speaker: 'Rachel',
                    text: response,
                }
                setConversation((prevConversations) => [...prevConversations, newChat])
            })
        }
    }

    return (
        <Layout>
            <div className={'flex flex-col justify-between w-full h-[85vh]'}>
                <div className={'flex flex-col space-y-2 max-h-[80vh] overflow-y-scroll w-2/3 mx-auto'}>
                    {conversations.map((conversation, i) => (
                        <Conversation key={i} text={conversation.text} speaker={conversation.speaker} />
                    ))}
                </div>
                <div className={'flex flex-col mt-2 w-2/3 mx-auto'}>
                    <GrowableTextarea
                        className={
                            'w-full border border-gray-400 bg-gray-800 rounded-md rounded-r-none px-2 py-1 h-fit text-gray-200 resize-none focus:outline-none overflow-hidden max-h-[20vh] min-h-[4vh]'
                        }
                        onSend={onSend}
                    />
                </div>
            </div>
            <div className={'absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[40%] mt-10 pointer-events-none'}>
                <img src={'/pattern.svg'} className={'-rotate-2'} alt={'pattern'} />
            </div>
        </Layout>
    )
}
