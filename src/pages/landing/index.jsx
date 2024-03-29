import { Link } from 'react-router-dom'
import Layout from '../../components/Layout.jsx'
import '../../styles/output.css'

export default function Landing() {
    return (
        <Layout>
            <div className={'flex flex-col text-center mt-10'}>
                <span className={'text-[24px] text-white-900 font-thin'}>Create personal</span>
                <span className={'text-yellow-111 text-[40px]'}>characters for virtual</span>
                <span className={'text-[24px] text-white-900 font-thin'}>companionship and friendship.</span>
            </div>
            <div className={'flex flex-col items-center w-[80%] mt-20'}>
                <img src={'/landing/characters.png'} alt={'Characters'} />
                <span className={'text-white-900 text-sm text-center w-2/3'}>
                    Find your perfect virtual partner or friend through our innovative platform. Experience meaningful connections with AI-powered
                    personalities. Explore the world of Soulmate AI today.
                </span>
            </div>
            <div className={'mt-10 mb-10'}>
                <Link className={'bg-white px-10 py-3 rounded-lg font-semibold'} to={'/my'}>
                    Get Started
                </Link>
            </div>
        </Layout>
    )
}
