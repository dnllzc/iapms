import App from './App.jsx'
import {BrowserRouter, Routes, Route} from 'react-router'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<App />} />
                <Route path="/invoices" element={<App />} />
                <Route path="/payments" element={<App />} />
            </Routes>
        </BrowserRouter>
    )
}