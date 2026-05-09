import App from './App.jsx'
import Auth from './components/Auth.jsx'
import Invoices from './components/Invoices.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/home" element={<App />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/payments" element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}