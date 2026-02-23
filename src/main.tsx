import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import './index.css'
import {BrowserRouter} from "react-router-dom";
import {Provider} from "react-redux";
import {store} from "./store.ts";
import RouterProvider from "./RouterProvider.tsx";

createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <BrowserRouter>
            <Provider store={store}>
                <RouterProvider/>
            </Provider>
        </BrowserRouter>
    </StrictMode>,
)
