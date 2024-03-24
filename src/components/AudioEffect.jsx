import { useEffect, useRef, useState } from 'react'

export default function AudioEffect(props) {
    const { audioBuffer } = props
    const canvasRef = useRef(null)
    const requestRef = useRef()
    const [analyser, setAnalyser] = useState(null)
    const audioContextRef = useRef(new (window.AudioContext || window.webkitAudioContext)())

    useEffect(() => {
        const fetchAudioAndPlay = async () => {
            if (!audioBuffer) {
                return
            }

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

            const grad = ctx.createLinearGradient(0, 0, 0, canvas.height)

            grad.addColorStop(0, `hsl(69, 90%, 32%)`)
            grad.addColorStop(0.5, `hsl(69, 90%, 66%)`)
            grad.addColorStop(1, `hsl(69, 90%, 16%)`)

            ctx.strokeStyle = grad

            ctx.shadowBlur = 100
            ctx.shadowColor = `hsl(69, 90%, 66%)`

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
                    normalizedHeight = Math.pow(normalizedHeight, 0.6)
                    barHeight = normalizedHeight * canvas.height
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

    return (
        <div className="neon-border-wrapper w-full">
            <canvas id="neonCanvas" ref={canvasRef} />
        </div>
    )
}
