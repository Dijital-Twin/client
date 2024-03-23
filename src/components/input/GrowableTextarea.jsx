import { useRef, useState, useEffect } from 'react'
import SendIcon from '../../assets/icons/send.svg'

export default function GrowableTextarea({ className, ...props }) {
    const textareaRef = useRef(null)
    const [text, setText] = useState('');
    const { onSend, onInput } = props

    useEffect(() => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = '5px'
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }, [])

    const handleInput = (e) => {
        setText(e.target.value);
        if (onInput) {
            onInput(e)
        }
        auto_grow()
    }

    const auto_grow = () => {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = '5px'
            textarea.style.height = `${textarea.scrollHeight}px`
        }
    }
    return (
        <div className="flex flex-row items-end relative">
            <textarea value={text} ref={textareaRef} onInput={handleInput} className={className} {...props} />
            <button
                disabled={!text}
                className=" right-0 bottom-0 h-full w-16 rounded-r-md bg-yellow-111 max-h-[4vh] disabled:bg-gray-100 disabled:cursor-not-allowed disabled:opacity-70 hover:opacity-80"x
                onClick={() => {
                    onSend(textareaRef)
                    textareaRef.current.value = ''
                }}
                aria-label="Send message"
            >
                <SendIcon style={{ width: '100%', height: '100%', stroke: '#1F2937' }} />
            </button>
        </div>
    )
}
