import './main.css'
import './Auth.css'

export default function Auth() {
    return (
        <section className="center">
            <h1 className="authTitle">Authentication</h1>
            <div className="authContainer">
                <input type="text" className="authInput" id="email" placeholder="sample@test.com"></input>
                <input type="password" className="authInput" id="password" placeholder="P@ssw0rd123"></input>
                <button className="authButton" onClick={() => handleLogin(document.getElementById('email').value, document.getElementById('password').value)}>Login</button>
            </div>
        </section>
    )

    async function handleLogin(email, password) {
        try {
            const response = await fetch('/api/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email, password }),
            })

            const data = await response.json()

            if (!response.ok) {
                alert(data.message || 'Login failed')
                console.error('Login failed:', data.message)
                return
            }

            console.log('Login successful:', data.user)

            if (data.user.role === 'admin') {
                alert('Login successful! Redirecting to admin dashboard...')
                window.location.href = '/admin'
            } else {
                alert('Login successful! Redirecting to home page...')
                window.location.href = '/home'
            }
        } catch (error) {
            console.error('Error during login:', error)
            alert('An error occurred during login. Please try again.')
        } finally {
            document.getElementById('email').value = ''
            document.getElementById('password').value = ''
        }
    }
}