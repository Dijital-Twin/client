import { useEffect, useState } from 'react'

export default function Dictaphone() {
    const [isRecording, setisRecording] = useState(false);
    const [note, setNote] = useState(null);
    const [notesStore, setnotesStore] = useState([]);

    const SpeechRecognition =
        window.SpeechRecognition || window.webkitSpeechRecognition;
    const microphone = new SpeechRecognition();

    microphone.continuous = true;
    microphone.interimResults = true;
    microphone.lang = "en-US";

    const startRecordController = () => {
        if (isRecording) {
            microphone.start();
            microphone.onend = () => {
                console.log("continue..");
                microphone.start();
            };
        } else {
            microphone.stop();
            microphone.onend = () => {
                console.log("Stopped microphone on Click");
            };
        }
        microphone.onstart = () => {
            console.log("microphones on");
        };

        microphone.onresult = (event) => {
            const recordingResult = Array.from(event.results)
                .map((result) => result[0])
                .map((result) => result.transcript)
                .join("");
            console.log(recordingResult);
            setNote(recordingResult);
            microphone.onerror = (event) => {
                console.log(event.error);
            };
        };
    };

    const storeNote = () => {
        setNote("");
    };

    useEffect(() => {
        startRecordController();
    }, [isRecording]);

    const startListening = () => {
        SpeechRecognition.startListening({
            continuous: true
        })
    }

    return (
        <div className={"text-white"}>
            <h1>Record Voice Notes</h1>
            <div>
                <div className="noteContainer">
                    <h2>Record Note Here</h2>
                    {isRecording ? <span>Recording... </span> : <span>Stopped </span>}
                    <button className="button" onClick={storeNote} disabled={!note}>
                        Save
                    </button>
                    <button onClick={() => setisRecording((prevState) => !prevState)}>
                        Start/Stop
                    </button>
                    <p>{note}</p>
                </div>
                <div className="noteContainer">
                    <h2>Notes Store</h2>
                    **{notesStore.map((note) => (
                    <p key={note}>{note}</p>
                ))}**
                </div>
            </div>
        </div>
    );
};