import "./App.css";
import {useDispatch} from "react-redux";
import { useNavigate } from "react-router-dom";
import type {AppDispatch} from "./store.ts";
import {type SyntheticEvent, useState} from "react";
import {loginThunk, registerThunk} from "./slice.ts";
import {useAppSelector} from "./hooks.ts";
import {Button} from "./shared/ui/Button/Button.tsx";

export default function App() {
    const dispatch = useDispatch<AppDispatch>();

    const {user} = useAppSelector((state) => state.auth);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('')
    const navigate = useNavigate();


    const handleRegister = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await dispatch(registerThunk({
                email: email,
                name: email,
                password: password
            })).unwrap();

            navigate("/me")
        } catch (error) {
            setError((error as Error)?.message || 'Произошла ошибка при регистрации!!')
        }
    }

    const handleLogin = async (e: SyntheticEvent) => {
        e.preventDefault();

        try {
            await dispatch(loginThunk({
                email: email,
                password: password
            })).unwrap();

            navigate("/me")
        } catch (error) {
            setError((error as Error)?.message || 'Произошла ошибка при входе!!')
        }
    }

    return (
        <>
            <Button>Тестовая кнопка</Button>
            <Button variant='secondary'>Secondary кнопка</Button>
            {/*{user ? user.email :*/}
            {/*    <div style={{*/}
            {/*        display: 'flex',*/}
            {/*        justifyContent: 'center',*/}
            {/*        alignItems: 'center',*/}
            {/*        height: '100vh',*/}
            {/*    }}>*/}
            {/*        <form onSubmit={handleRegister} style={{*/}
            {/*            display: 'flex',*/}
            {/*            flexDirection: 'column',*/}
            {/*            gap: '12px',*/}
            {/*            width: '300px',*/}
            {/*            padding: '32px',*/}
            {/*            borderRadius: '12px',*/}
            {/*            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',*/}
            {/*        }}>*/}
            {/*            <h2 style={{ margin: 0, textAlign: 'center' }}>Вход / Регистрация</h2>*/}

            {/*            {error && (*/}
            {/*                <p style={{ color: 'red', margin: 0, fontSize: '14px' }}>{error}</p>*/}
            {/*            )}*/}

            {/*            <input*/}
            {/*                onChange={(e) => setEmail(e.target.value)}*/}
            {/*                type='email'*/}
            {/*                placeholder='Email'*/}
            {/*                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}*/}
            {/*            />*/}
            {/*            <input*/}
            {/*                onChange={(e) => setPassword(e.target.value)}*/}
            {/*                type='password'*/}
            {/*                placeholder='Пароль'*/}
            {/*                style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}*/}
            {/*            />*/}

            {/*            <button type="submit" style={{*/}
            {/*                padding: '10px',*/}
            {/*                borderRadius: '8px',*/}
            {/*                border: 'none',*/}
            {/*                background: '#4f46e5',*/}
            {/*                color: 'white',*/}
            {/*                cursor: 'pointer',*/}
            {/*                fontWeight: 'bold'*/}
            {/*            }}>*/}
            {/*                Регистрация*/}
            {/*            </button>*/}

            {/*            <button type="button" onClick={handleLogin} style={{*/}
            {/*                padding: '10px',*/}
            {/*                borderRadius: '8px',*/}
            {/*                border: '1px solid #4f46e5',*/}
            {/*                background: 'white',*/}
            {/*                color: '#4f46e5',*/}
            {/*                cursor: 'pointer',*/}
            {/*                fontWeight: 'bold'*/}
            {/*            }}>*/}
            {/*                Войти*/}
            {/*            </button>*/}
            {/*        </form>*/}
            {/*    </div>*/}
            {/*}*/}
        </>
    );
}



