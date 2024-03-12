import Layout from '../../components/Layout.jsx'
import Dictaphone from '../../components/Distaphone.jsx'

function Conversation(props) {
    const { speaker, text } = props

    return (
        <div className={'bg-yellow-111 w-1/3 rounded-md px-2 py-1'}
             style={{ marginLeft: speaker === 'User' ? 'auto' : 0 }}
        >
            <p>
                {text}
            </p>
        </div>
    )
}

export default function AI() {
    const conversations = [
        {
            'speaker': 'Rachel',
            'text': 'Hi. I am Rachel Green.',
        },
        {
            'speaker': 'User',
            'text': 'Hi. I am Emir.',
        },
        {
            'speaker': 'User',
            'text': 'Hi. Rachel.',
        },
        {
            'speaker': 'Rachel',
            'text': 'Hi. Emir.',
        },
    ]

    return (
        <Layout>
            <div className={'flex flex-col w-2/3 space-y-2'}>
                {
                    conversations.map((conversation, i) => (
                        <Conversation key={i}
                                      text={conversation.text}
                                      speaker={conversation.speaker}
                        />
                    ))
                }
            </div>
            <div className={'absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[60%] mt-10 pointer-events-none'}>
                <img src={'/pattern.svg'}
                     className={'-rotate-2'}
                     alt={"pattern"}
                />
            </div>
            <Dictaphone />
        </Layout>
    )
}
