import { useEffect, useState } from 'react'

export default function Typewriter(props) {
    const { text, typingDelay, speaker } = props

    const [displayedText, setDisplayedText] = useState('')

    useEffect(() => {
        if (speaker === 'User') {
            setDisplayedText(text)
        } else {
            let charIndex = 0
            const timer = setInterval(() => {
                setDisplayedText((prev) => prev + text[charIndex])
                charIndex++
                if (charIndex === text.length - 1) {
                    clearInterval(timer)
                }
            }, typingDelay)

            return () => clearInterval(timer)
        }
    }, [text, typingDelay, speaker])

    return <span className={'whitespace-pre'}>{displayedText}</span>
}
