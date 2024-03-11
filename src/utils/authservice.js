import { useEffect, useState } from 'react';
import { useAuth0 } from '@auth0/auth0-react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { changeUser } from '../store/slices/user.slice';

const useAuthToken = () => {
    const { isAuthenticated, getAccessTokenSilently, user } = useAuth0();
    const [token, setToken] = useState(null);
    const dispatch = useDispatch();

    useEffect(() => {
        const getToken = async () => {
            if (isAuthenticated) {
                const accessToken = await getAccessTokenSilently();
                setToken(accessToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${accessToken}`;
            }
        };
        getToken();
        
        if (isAuthenticated) {
            const { sub, email, name, picture } = user;
            dispatch(changeUser({ id: sub, username: name, bio: email, profile_pic: picture }));
        }

    }, [isAuthenticated, getAccessTokenSilently, dispatch, user]);

    return token;
}

const handleLogout = () => {
    axios.defaults.headers.common['Authorization'] = '';
    window.location.reload();
}

export { useAuthToken, handleLogout };

