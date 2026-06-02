import { useState, useEffect } from 'react'
import './Hero.css'
import './main.css'
import NavBar from './NavBar'
import { Link } from 'react-router-dom'

export default function Hero() {
    const [userName, setUserName] = useState('');

    const getUserName = () => {
        fetch('/api/auth/me')
            .then(response => response.json())
            .then(data => {
                setUserName(data.user.firstName);
            })
            .catch(error => {
                console.error('Error fetching user name:', error);
                setUserName('Employee');
            });
    }

    useEffect(() => {
        getUserName();
    })

    return (
        <>
            <section className="navBar">
                    < NavBar />
            </section>
            <section className="center">
                <div className="heroContent">
                    <h1 className="welcomeTitle">Welcome, {userName}</h1>

                    <div className="buttonContainer">
                        <Link to="/invoices"><button className="invoiceButton">Invoices</button></Link>
                        <Link to="/payments"><button className="paymentButton">Payments</button></Link>
                    </div>
                </div>
            </section>
        </>
    )
}