import { Navigate, Outlet } from 'react-router-dom'
import { useAuth } from '../context/AuthContext.jsx'

function SessionLoading() {
    return <section className="center"><h1 className="authTitle">Loading session...</h1></section>
}

export function RequireAuth() {
    const { user, loading } = useAuth()

    if (loading) {
        return <SessionLoading />
    }

    if (!user) {
        return <Navigate to="/" replace />
    }

    return <Outlet />
}

export function RequireAdmin() {
    const { user, loading } = useAuth()

    if (loading) {
        return <SessionLoading />
    }

    if (!user) {
        return <Navigate to="/" replace />
    }

    if (user.role !== 'admin') {
        return <Navigate to="/home" replace />
    }

    return <Outlet />
}