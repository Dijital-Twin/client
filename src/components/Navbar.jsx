import { useAuth0 } from '@auth0/auth0-react';
import { handleLogout } from '../utils/authservice';

export default function Navbar() {
    const { isAuthenticated, loginWithRedirect, logout, isLoading } = useAuth0();

    if (isLoading) {
        return <div>Loading...</div>;
    }

    return (
        <div className={'flex flex-row justify-between border-b border-opacity-30 border-white px-40 py-4 max-w-1250p mx-auto'}>
            <div className={'text-white text-lg'}>
                <a href={"/"}>
                    <h1>
                        DIGITAL TWIN
                    </h1>
                </a>
            </div>
            <div className={'flex flex-row items-center uppercase space-x-14 text-white-900'}>
                <a className={'text-sm'}>
                    About us
                </a>
                <a className={'text-sm'}>
                    Characters
                </a>
                <a className={'text-sm'}>
                    Contact
                </a>
                {!isAuthenticated ? (
                    <button onClick={() => loginWithRedirect()} className="text-sm uppercase">
                        Log in
                    </button>
                ) : (
                    <button onClick={() => {
                        logout({ logoutParams: { returnTo: window.location.origin }})
                        handleLogout();
                    }
                    } className="text-sm uppercase">
                        Log out
                    </button>
                )}
            </div>
        </div>
    )
}