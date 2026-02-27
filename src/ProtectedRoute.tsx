import type {ReactNode} from "react";
import {Navigate} from "react-router-dom";
import {useAppSelector} from "./hooks.ts";

type ProtectedRouteProps = {
    children: ReactNode;
}

export default function ProtectedRoute({children}: ProtectedRouteProps) {
    const {accessToken} = useAppSelector((state) => state.auth);

    if (!accessToken) {
        return <Navigate to="/"/>
    }
    return children;
}