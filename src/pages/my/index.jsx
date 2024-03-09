import Layout from '../../components/Layout.jsx'
import '../../styles/output.css'
import ForwardIcon from '../../assets/icons/forward.svg'
import SpeakIcon from '../../assets/icons/speak.svg'
import ConversationIcon from '../../assets/icons/conversation.svg'
import PictureIcon from '../../assets/icons/picture.svg'

function Card(props) {
    const {text, href, icon, background, col, row, fontSize} = props

    return (
        <div className={`flex flex-col justify-between w-full z-50 whitespace-pre text-${fontSize} p-2 rounded-2xl w-full`}
            style={{fontSize: fontSize, backgroundColor: background, gridColumn: col, gridRow: row}}
        >
            <div className={"flex flex-row justify-between "}>
                <div className={"flex items-center justify-center bg-dark-900 bg-opacity-20 rounded-full w-9 h-9 aspect-square"}>
                    {icon}
                </div>

                <ForwardIcon />
            </div>
            <h2 className={"font-light"}>
                {text}
            </h2>
        </div>
    )
}

export default function My() {
    return (
        <Layout>
            <div className={"flex flex-col w-full items-center"}>
                <div className={"grid grid-rows-2 grid-cols-2 gap-2 w-2/5 drop-shadow-yellow"}>
                    <Card text={"Talk\nwith\nRachel"}
                          fontSize={"30px"}
                          icon={<SpeakIcon/>}
                          col={"1 / span 1"}
                          row={"1 / span 2"}
                          background={"#C6F432"}
                    />
                    <Card text={"Chat with\nRachel"}
                          col={"2 / span 1"}
                          row={"2 / span 1"}
                          icon={<ConversationIcon/>}
                          background={"#C09FF8"}
                    />
                    <Card text={"Create new\nPersona"}
                          icon={<PictureIcon/>}
                          col={"2 / span 1"}
                          row={"1 / span 1"}
                          background={"#FEC4DD"}
                    />
                </div>
            </div>
            <div className={'absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[60%] mt-10 pointer-events-none'}>
                <img src={'/pattern.svg'}
                     className={'-rotate-2'}
                     alt={"pattern"}
                />
            </div>
        </Layout>
    )
}