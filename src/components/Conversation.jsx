import Typewriter from './Typewriter.jsx'

export default function Conversation(props) {
    const { speaker, text } = props

    return (
        <div className={'bg-yellow-111 w-2/3 md:w-3/5 lg:w-1/3 rounded-md px-2 py-1'} style={{ marginLeft: speaker === 'User' ? 'auto' : 0 }}>
            <Typewriter text={text} typingDelay={50} speaker={speaker} />
        </div>
    )
}
