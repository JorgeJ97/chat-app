import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { ContextProvider } from './context/Context.jsx'
import { SocketContextProvider } from './context/SocketContext.jsx'


ReactDOM.createRoot(document.getElementById('root')).render(

    <BrowserRouter>
        <ContextProvider>
            <SocketContextProvider>
                <App />
            </SocketContextProvider>
        </ContextProvider>
    </BrowserRouter>
);
