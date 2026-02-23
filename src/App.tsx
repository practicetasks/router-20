import "./App.css";
import {useDispatch} from "react-redux";
import type {AppDispatch} from "./store.ts";
import {type SyntheticEvent, useState} from "react";
import {registerThunk} from "./slice.ts";
import {useAppSelector} from "./hooks.ts";

export default function App() {
    const dispatch = useDispatch<AppDispatch>();

    const {user} = useAppSelector((state) => state.auth)
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e: SyntheticEvent) => {
        e.preventDefault();
        dispatch(registerThunk({
            email: email,
            name: email,
            password: password
        }));
    }

    return (
        <>
            {user ? user.email :
                <div>
                    <form onSubmit={handleSubmit}>
                        <input onChange={(e) => setEmail(e.target.value)} type='email'/>
                        <input onChange={(e) => setPassword(e.target.value)} type='password'/>
                        <button>Регистрация</button>
                    </form>
                </div>
            }
        </>
    )
}



