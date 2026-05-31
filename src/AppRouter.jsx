import Hero from './components/Hero.jsx'
import AdminHero from './components/admin/AdminHero.jsx'
import Auth from './components/Auth.jsx'

// ================== User ==================
// Invoices
import Invoices from './components/invoices/Invoices.jsx'
import NewInvoice from './components/invoices/NewInvoice.jsx'

// Payments
import Payments from './components/payments/Payments.jsx'
import PaymentLink from './components/payments/PaymentLink.jsx'

// ================== Admin ==================
// Users
import Users from './components/admin/Users/Users.jsx'
import NewUser from './components/admin/Users/NewUser.jsx'

// Discount Codes
import DiscountCodes from './components/admin/DiscountCodes/DiscountCodes.jsx'
import NewDiscountCode from './components/admin/DiscountCodes/NewDiscountCode.jsx'

// Items
import Items from './components/admin/Items/Items.jsx'
import NewItem from './components/admin/Items/NewItem.jsx'

import { BrowserRouter, Routes, Route } from 'react-router-dom'

export default function AppRouter() {
    return (
        <BrowserRouter>
            <Routes>
                {/* User Routes */}
                <Route path="/" element={<Auth />} />
                <Route path="/home" element={<Hero />} />

                <Route path="/invoices" element={<Invoices />} />
                <Route path="/invoices/new" element={<NewInvoice />} />

                <Route path="/payments" element={<Payments />} />
                <Route path="/pay/:id" element={<PaymentLink />} />

                {/* Admin Routes */}
                <Route path="/admin" element={<AdminHero />} />

                <Route path="/admin/users" element={<Users />} />
                <Route path="/admin/users/new" element={<NewUser />} />
                <Route path="/admin/users/edit/:id" element={<NewUser />} />

                <Route path="/admin/discount-codes" element={<DiscountCodes />} />
                <Route path="/admin/discount-codes/new" element={<NewDiscountCode />} />
                <Route path="/admin/discount-codes/edit/:id" element={<NewDiscountCode />} />

                <Route path="/admin/items" element={<Items />} />
                <Route path="/admin/items/new" element={<NewItem />} />
                <Route path="/admin/items/edit/:id" element={<NewItem />} />
            </Routes>
        </BrowserRouter>
    )
}