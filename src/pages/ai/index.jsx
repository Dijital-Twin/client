import Layout from '../../components/Layout.jsx'
import { useEffect, useState } from 'react'
import GrowableTextarea from '../../components/input/GrowableTextarea.jsx'
import { sendToGpt, sendToPipeline } from '../../api/v1/index.js'
import Conversation from '../../components/Conversation.jsx'

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

            sendToPipeline(newConversations).then((response) => {
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
