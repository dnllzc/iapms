import Hero from './components/Hero.jsx'
import Auth from './components/Auth.jsx'

import Invoices from './components/invoices/Invoices.jsx'
import NewInvoice from './components/invoices/NewInvoice.jsx'
import Payments from './components/payments/Payments.jsx'

import AdminHero from './components/admin/AdminHero.jsx'
import Users from './components/admin/Users/Users.jsx'
import DiscountCodes from './components/admin/DiscountCodes/DiscountCodes.jsx'
import Items from './components/admin/Items/Items.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Auth />} />
                <Route path="/home" element={<Hero />} />
                <Route path="/invoices" element={<Invoices />} />
                <Route path="/invoices/new" element={<NewInvoice />} />
                <Route path="/payments" element={<Payments />} />

                <Route path="/admin" element={<AdminHero />} />
                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/discount-codes" element={<DiscountCodes />} />
                <Route path="/admin/items" element={<Items />} />
            </Routes>
        </BrowserRouter>
    )
}