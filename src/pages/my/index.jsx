import Layout from '../../components/Layout.jsx'
import '../../styles/output.css'
import ForwardIcon from '../../assets/icons/forward.svg'

import SpeakIcon from '../../assets/icons/speak.svg'
import CreateIcon from '../../assets/icons/create.svg'
import ConversationIcon from '../../assets/icons/conversation.svg'

function Card(props) {
    const { text, href, background, col, row, fontSize, Icon, shadow, blank } = props

    return (
        <div
            className={`flex flex-col justify-between w-full z-50 whitespace-pre text-${fontSize} p-2 rounded-2xl w-full ${shadow} hover:scale-105 transition-transform duration-500 ease-in-out hover:cursor-pointer`}
            style={{ fontSize: fontSize, backgroundColor: background, gridColumn: col, gridRow: row }}
            onClick={() => {
                if (blank) {
                    window.open(href, '_blank')
                    return
                }

                window.location.href = href
            }}
        >
            <div className={'flex flex-row justify-between '}>
                <div className={'flex items-center justify-center bg-dark-900 bg-opacity-20 rounded-full w-10 h-10 p-1.5 aspect-square'}>{Icon}</div>
                <ForwardIcon />
            </div>
            <h2 className={'font-light mt-4'}>{text}</h2>
        </div>
    )
}

export default function My() {
    return (
        <Layout>
            <div className={'flex flex-col w-full items-center'}>
                <div className={'grid grid-rows-2 grid-cols-2 gap-2 w-2/5 drop-shadow-yellow'}>
                    <Card
                        text={'Talk\nwith\nRachel'}
                        href={'/talk'}
                        fontSize={'30px'}
                        col={'1 / span 1'}
                        row={'1 / span 2'}
                        background={'#C6F432'}
                        Icon={<SpeakIcon fill={'#0a0a0a'} strokeWidth={'0px'} />}
                        shadow={'shadow-yellow'}
                    />
                    <Card
                        text={'Chat with\nRachel'}
                        href={'/ai'}
                        col={'2 / span 1'}
                        row={'1 / span 1'}
                        background={'#C09FF8'}
                        Icon={<ConversationIcon size={24} stroke={'#0a0a0a'} />}
                        shadow={'shadow-purple'}
                    />
                    <Card
                        text={'Create new\nPersona'}
                        href={'https://form.jotform.com/240883489673069'}
                        blank={true}
                        col={'2 / span 1'}
                        row={'2 / span 1'}
                        soon={true}
                        background={'#FEC4DD'}
                        Icon={<CreateIcon size={24} stroke={'#0a0a0a'} />}
                        shadow={'shadow-pink'}
                    />
                </div>
            </div>
            <div className={'absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[60%] mt-10 pointer-events-none'}>
                <img src={'/pattern.svg'} className={'-rotate-2'} alt={'pattern'} />
            </div>
        </Layout>
    )
}
