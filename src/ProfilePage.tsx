import {useDispatch} from "react-redux";
import type {AppDispatch} from "./store.ts";
import {useAppSelector} from "./hooks.ts";
import {useEffect} from "react";
import {getProfile} from "./slice.ts";

export default function ProfilePage() {
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        const token = localStorage.getItem('accessToken');
        console.log('token', token)
        if (!token) {
            throw new Error('token not found')
        }

        dispatch(getProfile(token))
    }, [dispatch])

    const {user, loading} = useAppSelector((state) => state.auth)

    return (
        <>
            {loading && 'Загрузка...'}
            {user ? user.email : 'not authorized'}
        </>
    )
}
