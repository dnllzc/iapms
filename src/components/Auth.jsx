import './main.css'
import './Auth.css'

export default function Auth() {
    const testLogin = [
        { email: "admin", password: "123", type: "admin" },
        { email: "user", password: "123", type: "employee" }
    ];

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
        const user = testLogin.find(u => u.email === email && u.password === password);
        if (user) {
            alert("Login successful!");
            // Redirect to the home page
            window.location.href = "/home";
        } else {
            alert("Invalid email or password. Please try again.");
        }
    }
}