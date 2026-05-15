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

    function handleLogin(email, password) {
        // Handle login logic here
        fetch('api/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        })
        .then((response) => {
            if (!response.ok) {
                throw new Error('Network response failed')
            }
            return response.json()
        })
        .then((data) => {
            if (data.success) {
                console.log('Login successful:', data.user)
                // Redirect to admin dashboard or perform other actions
                if (data.user.role === 'Admin') {
                    alert('Login successful! Redirecting to admin dashboard...')
                    window.location.href = '/admin';
                } else {
                    alert('Login successful! Redirecting to home page...')
                    window.location.href = '/home';
                }
            } else {
                alert('Login failed: ' + data.message)
                console.error('Login failed:', data.message)
                // Show error message to the user
            }
        })
        .catch((error) => {
            console.error('Error during login:', error)
            alert('An error occurred during login. Please try again.')
            // Show error message to the user
        }).finally(() => {
            // Clear input fields after login attempt
            document.getElementById('email').value = ''
            document.getElementById('password').value = ''
        })
    }
}