import Layout from '../../components/Layout.jsx'
import '../../styles/output.css'
import ForwardIcon from '../../assets/icons/forward.svg'
import { useState, useEffect, useRef } from 'react'

const Icon = (props) => {
    const { name, size, fill } = props

    const ImportedIconRef = useRef(null)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        setLoading(true)
        const importIcon = async () => {
            try {
                const { default: namedImport } = await import(`../../assets/icons/${name}.svg`)
                ImportedIconRef.current = namedImport
            } catch (err) {
                console.error(`Error importing ${name}.svg:`, err)
            } finally {
                setLoading(false)
            }
        }
        importIcon()
    }, [name])

    if (!loading && ImportedIconRef.current) {
        const { current: ImportedIcon } = ImportedIconRef
        return <ImportedIcon id={name} key={name} width={size} height={size} fill={fill} />
    }

    return null
}

function Card(props) {
    const { text, href, icon, background, col, row, fontSize } = props

    return (
        <div
            className={`flex flex-col justify-between w-full z-50 whitespace-pre text-${fontSize} p-2 rounded-2xl w-full`}
            style={{ fontSize: fontSize, backgroundColor: background, gridColumn: col, gridRow: row }}
        >
            <div className={'flex flex-row justify-between '}>
                <div className={'flex items-center justify-center bg-dark-900 bg-opacity-20 rounded-full w-9 h-9 aspect-square'}>
                    <Icon name={icon} size={24} fill={'#000'} />
                </div>

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
                        key={'asidhasiudas'}
                        text={'Talk\nwith\nRachel'}
                        fontSize={'30px'}
                        icon={'speak'}
                        col={'1 / span 1'}
                        row={'1 / span 2'}
                        background={'#C6F432'}
                    />
                    <Card text={'Chat with\nRachel'} col={'2 / span 1'} row={'1 / span 1'} icon={'conversation'} background={'#C09FF8'} />
                    <Card text={'Create new\nPersona'} icon={'picture'} col={'2 / span 1'} row={'2 / span 1'} background={'#FEC4DD'} />
                </div>
            </div>
            <div className={'absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[60%] mt-10 pointer-events-none'}>
                <img src={'/pattern.svg'} className={'-rotate-2'} alt={'pattern'} />
            </div>
        </Layout>
    )
}
