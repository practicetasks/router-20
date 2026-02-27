import {useDispatch} from "react-redux";
import type {AppDispatch} from "./store.ts";
import {useAppSelector} from "./hooks.ts";
import {useEffect} from "react";
import {getProfile, logOut} from "./slice.ts";
import {useNavigate} from "react-router-dom";

export default function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        if (!token) {
            navigate('/');
            return
        }

        dispatch(getProfile(token))
    }, [dispatch, navigate])

    const {user, loading} = useAppSelector((state) => state.auth);

    const authorizedUser = user!;

    const handleLogout = () => {
        dispatch(logOut());
        navigate('/')
    }

    if (loading) {
        return (
            <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                height: '100vh',
                fontSize: '18px',
                color: '#888'
            }}>
                Загрузка...
            </div>
        );
    }

    return (
        <div style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100vh',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: '16px',
                padding: '40px',
                borderRadius: '12px',
                boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
                width: '300px',
            }}>
                <div style={{
                    width: '80px',
                    height: '80px',
                    borderRadius: '50%',
                    background: '#4f46e5',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    fontSize: '32px',
                    color: 'white',
                    fontWeight: 'bold'
                }}>
                    {authorizedUser.name?.[0]?.toUpperCase()}
                </div>

                <h2 style={{ margin: 0 }}>{authorizedUser.name}</h2>
                <p style={{ margin: 0, color: '#888' }}>{authorizedUser.email}</p>
                <button onClick={handleLogout} >Выйти</button>
            </div>
        </div>
    );
}
