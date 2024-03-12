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
            const { nickname, name, middle_name, family_name, email, picture, sub } = user;
            const fullname = `${name ?? ''} ${middle_name ?? ''} ${family_name ?? ''}`.replace(/\s+/g, ' ').trim();
            dispatch(changeUser({ id: sub, fullname: fullname, username: nickname, email, profile_pic: picture }));
        }

    }, [isAuthenticated, getAccessTokenSilently, dispatch, user]);

    return token;
}

const handleLogout = () => {
    axios.defaults.headers.common['Authorization'] = '';
    window.location.reload();
}

export { useAuthToken, handleLogout };

