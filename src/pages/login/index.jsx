import Layout from '../../components/Layout.jsx'
import '../../styles/output.css'
import BasicTextInput from '../../components/input/BasicTextInput.jsx'
import { useState } from 'react'

export default function Login() {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    return (
        <Layout>
            <div className={'flex flex-col space-y-5 text-center mt-10 w-1/4'}>
                <BasicTextInput value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                must={true}
                                placeholder={'Enter username'}
                                label={'Username'}
                />
                <BasicTextInput value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                must={true}
                                password={true}
                                placeholder={'Enter password'}
                                label={'Password'}
                />
                <button className={"bg-yellow-111 w-fit px-6 py-1 rounded-lg"}>
                    Login
                </button>
            </div>
            <div className={'absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[60%] mt-10'}>
                <img src={'/pattern.svg'}
                     className={'-rotate-2'}
                     alt={"pattern"}
                />
            </div>
        </Layout>
    )
}