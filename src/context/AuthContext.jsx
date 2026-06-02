import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext(null)

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        let isMounted = true

        const loadSession = async () => {
            try {
                const response = await fetch('/api/auth/me', {
                    credentials: 'include',
                })

                if (!response.ok) {
                    if (isMounted) {
                        setUser(null)
                    }
                    return
                }

                const data = await response.json()
                if (isMounted) {
                    setUser(data.user ?? null)
                }
            } catch (error) {
                console.error('Error loading session:', error)
                if (isMounted) {
                    setUser(null)
                }
            } finally {
                if (isMounted) {
                    setLoading(false)
                }
            }
        }

        loadSession()

        return () => {
            isMounted = false
        }
    }, [])

    const login = (authUser) => {
        setUser(authUser)
    }

    const logout = async () => {
        try {
            await fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include',
            })
        } catch (error) {
            console.error('Error logging out:', error)
        } finally {
            setUser(null)
        }
    }

    return (
        <AuthContext.Provider value={{ user, loading, login, logout, setUser }}>
            {children}
        </AuthContext.Provider>
    )
}

export function useAuth() {
    const context = useContext(AuthContext)

    if (!context) {
        throw new Error('useAuth must be used inside an AuthProvider')
    }

    return context
}