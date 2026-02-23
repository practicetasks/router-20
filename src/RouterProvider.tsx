import ProfilePage from "./ProfilePage.tsx";
import {Route, Routes} from "react-router-dom";
import App from "./App.tsx";

export default function RouterProvider() {
    return (
        <Routes>
            <Route path="*" element={<App/>}/>
            <Route path="/me" element={<ProfilePage/>}/>
        </Routes>
    )
}