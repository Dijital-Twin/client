import { useState } from 'react'
import Layout from '../../components/Layout.jsx'
import GrowableTextarea from '../../components/input/GrowableTextarea.jsx'
import { sendToXtts, sendToPipeline } from '../../api/v1/index.js'
import { ThreeDots } from 'react-loading-icons'
import Conversation from '../../components/Conversation.jsx'
import AudioEffect from '../../components/AudioEffect.jsx'

export default function Talk() {
    const [conversations, setConversation] = useState([{ speaker: 'Rachel', text: 'Hi. I am Rachel Green.' }])
    const [currentAudio, setCurrentAudio] = useState(null)
    const [waitingResponse, setWaitingResponse] = useState(false)

    const onSend = (element) => {
        if (element) {
            setWaitingResponse(true)
            const newChat = {
                speaker: 'User',
                text: element.current.value,
            }
            const newConversations = [...conversations, newChat]
            setConversation(newConversations)
            sendToPipeline(newConversations)
                .then((response) => {
                    const newChat = {
                        speaker: 'Rachel',
                        text: response,
                    }
                    sendToXtts(response).then((audio) => {
                        setConversation((prevConversations) => [...prevConversations, newChat])
                        setCurrentAudio(audio)
                        setWaitingResponse(false)
                    })
                })
                .catch((error) => {
                    console.error('An error occurred:', error)
                })
        }
    }

    return (
        <Layout>
            <div className={'flex flex-col justify-between w-full h-[85vh]'}>
                <div className={'flex flex-col space-y-2 h-[80vh] overflow-y-scroll w-2/3 mx-auto'}>
                    {conversations.map((conversation, i) => (
                        <Conversation key={i} text={'  ' + conversation.text} speaker={conversation.speaker} />
                    ))}
                    {waitingResponse && <ThreeDots width={50} fill="#d9ff00" speed={0.3} />}
                </div>
                <div className={'flex flex-col mt-6 w-2/3 mx-auto'}>
                    <GrowableTextarea
                        className={
                            'w-full border border-gray-400 bg-gray-800 rounded-md rounded-r-none px-2 py-1 h-fit text-gray-200 resize-none focus:outline-none overflow-hidden max-h-[20vh] min-h-[4vh]'
                        }
                        onSend={onSend}
                    />
                    <div className="absolute left-1/2 -translate-x-1/2 pointer-events-none z-50">
                        <AudioEffect audioBuffer={currentAudio} />
                    </div>
                </div>
            </div>
            <div className={'absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[40%] mt-10 pointer-events-none'}>
                <img src={'/pattern.svg'} className={'-rotate-2'} alt={'pattern'} />
            </div>
        </Layout>
    )
}
