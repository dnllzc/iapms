import App from './App.jsx'
import Invoices from './components/Invoices.jsx'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/payments" element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}