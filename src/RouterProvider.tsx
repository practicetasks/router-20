import ProfilePage from "./ProfilePage.tsx";
import {Route, Routes} from "react-router-dom";
import App from "./App.tsx";
import ProtectedRoute from "./ProtectedRoute.tsx";

export default function RouterProvider() {
    return (
        <Routes>
            <Route path="*" element={<App/>}/>
            <Route path="/me" element={<ProtectedRoute><ProfilePage/></ProtectedRoute>}/>
        </Routes>
    )
}