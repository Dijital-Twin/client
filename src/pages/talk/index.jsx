import { useEffect, useState, useRef } from 'react'
import Layout from '../../components/Layout.jsx'
import GrowableTextarea from '../../components/input/GrowableTextarea.jsx'
import { sendToGpt, sendToXtts } from '../../api/v1/index.js'
import {ThreeDots} from 'react-loading-icons'

const AudioEffect = ({ audioBuffer }) => {
    const canvasRef = useRef(null)
    const requestRef = useRef()
    const [analyser, setAnalyser] = useState(null)
    const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)())

    useEffect(() => {
        const fetchAudioAndPlay = async () => {
            if (audioBuffer) {
                const arrayBuffer = audioBuffer
                const audioContext = audioContextRef.current
                const blob = new Blob([arrayBuffer], { type: 'audio/wav' })
                const url = URL.createObjectURL(blob)
                const audio = new Audio(url)

                audio.addEventListener('error', (e) => {
                    console.error('Error playing audio:', e)
                })

                audioContext
                    .resume()
                    .then(() => {
                        console.log('AudioContext resumed successfully')
                    })
                    .catch((error) => {
                        console.error('Error resuming AudioContext:', error)
                    })

                audio.addEventListener('canplaythrough', () => {
                    const source = audioContext.createMediaElementSource(audio)
                    const analyser = audioContext.createAnalyser()
                    source.connect(analyser)
                    analyser.connect(audioContext.destination)
                    analyser.fftSize = 2048

                    setAnalyser(analyser)
                    audio.play()
                })

                audio.addEventListener('ended', () => {
                    setAnalyser(null)
                })
            }
        }

        fetchAudioAndPlay()

        return () => {
            cancelAnimationFrame(requestRef.current)
            if (analyser) analyser.disconnect()
        }
    }, [audioBuffer])

    useEffect(() => {
        const canvas = canvasRef.current
        canvas.width = window.innerWidth * 0.6
        canvas.height = 50
        const ctx = canvas.getContext('2d')

        const drawVisualization = () => {
            requestRef.current = requestAnimationFrame(drawVisualization)
            ctx.fillStyle = 'rgb(0, 0, 0)'
            ctx.fillRect(0, 0, canvas.width, canvas.height)

            const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);

            grad.addColorStop(0, `hsl(69, 90%, 32%)`);
            grad.addColorStop(0.5, `hsl(69, 90%, 66%)`);
            grad.addColorStop(1, `hsl(69, 90%, 16%)`);

            ctx.strokeStyle = grad;

            ctx.shadowBlur = 100;
            ctx.shadowColor = `hsl(69, 90%, 66%)`;

            if (analyser) {
                canvas.style.display = 'block'
                const bufferLength = analyser.frequencyBinCount
                const dataArray = new Uint8Array(bufferLength)
                analyser.getByteFrequencyData(dataArray)
                const barWidth = (canvas.width / bufferLength) * 2.5
                let barHeight
                let x = 0

                for (let i = 0; i < bufferLength; i++) {
                    let normalizedHeight = dataArray[i] / 255
                    normalizedHeight = Math.pow(normalizedHeight, 0.6);
                    barHeight = normalizedHeight * canvas.height;
                    ctx.fillStyle = `hsl(69, 90%, 66%)`
                    ctx.fillRect(x, canvas.height - barHeight / 2, barWidth, barHeight / 2)

                    x += barWidth + 2
                }
            } else {
                ctx.fillStyle = 'rgb(255, 255, 255)'
                ctx.font = '16px Arial'
                canvas.style.display = 'none'
            }
        }

        drawVisualization()
    }, [analyser])

    return <div className="neon-border-wrapper"><canvas id='neonCanvas' ref={canvasRef} /></div>
}
function Typewriter({ text, typingDelay = 100, speaker }) {
    const [displayedText, setDisplayedText] = useState('');
    console.log(text);
    useEffect(() => {
        if (speaker === 'User') {
            setDisplayedText(text);
        } else {
            let charIndex = 0;
            const timer = setInterval(() => {
                setDisplayedText((prev) => prev + text[charIndex]);
                charIndex++;
                if (charIndex === text.length - 1) {
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

export default function Talk() {
    const [conversations, setConversation] = useState([{ speaker: 'Rachel', text: 'Hi. I am Rachel Green.' }])
    const [currentAudio, setCurrentAudio] = useState(null)
    const [waitingResponse, setWaitingResponse] = useState(false)

    const onSend = (element) => {
        if (element) {
            setWaitingResponse(true);
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
                sendToXtts(response).then((audio) => {
                    setConversation((prevConversations) => [...prevConversations, newChat])
                    setCurrentAudio(audio)
                    setWaitingResponse(false);
                })
            }).catch(error => {
                console.error("An error occurred:", error);
                setIsLoading(false);
            });
        }
    }

    return (
        <Layout>
            <div className='absolute left-1/2 -translate-x-1/2 bottom-0 -translate-y-1/2 pointer-events-none z-50'>
                <AudioEffect audioBuffer={currentAudio} />
            </div>
            <div className={'flex flex-col justify-between w-full h-[85vh]'}>
                <div className={'flex flex-col space-y-2 h-[80vh] overflow-y-scroll w-2/3 mx-auto'}>
                    {conversations.map((conversation, i) => (
                        <Conversation key={i} text={conversation.text} speaker={conversation.speaker} />
                    ))}
                    { waitingResponse && <ThreeDots width={50} fill='#d9ff00' speed={.30}/> }
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
