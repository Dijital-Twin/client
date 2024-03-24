import { useAuth0 } from '@auth0/auth0-react'
import { useSelector } from 'react-redux'

function ProfileNavbar() {
    const user = useSelector((state) => state.user)

    return (
        <div className={'flex flex-row items-center space-x-4'}>
            <img src={user.profile_pic ? user.profile_pic : 'https://www.gravatar.com/avatar/'} alt="profile" className={'w-8 h-8 rounded-full'} />
            <p className="text-sm text-white-900">{user.name}</p>
        </div>
    )
}

export default function Navbar() {
    const { isAuthenticated, loginWithRedirect, isLoading } = useAuth0()

    if (isLoading) {
        return <div>Loading...</div>
    }

    return (
        <div className={'flex flex-row justify-between border-b border-opacity-30 border-white px-5 md:px-20 lg:px-40 py-4 max-w-1250p mx-auto'}>
            <div className={'text-white text-lg'}>
                <a href={'/'}>
                    <h1>DIGITAL TWIN</h1>
                </a>
            </div>
            <div className={'flex flex-row items-center uppercase space-x-14 text-white-900'}>
                {!isAuthenticated ? (
                    <button onClick={() => loginWithRedirect()} className="text-sm uppercase">
                        Log in
                    </button>
                ) : (
                    <ProfileNavbar />
                    // <button
                    //     onClick={() => {
                    //         logout({ logoutParams: { returnTo: window.location.origin } })
                    //         handleLogout()
                    //     }}
                    //     className="text-sm uppercase"
                    // >
                    //     Log out
                    // </button>
                )}
            </div>
        </div>
    )
}
