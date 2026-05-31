import { useEffect, useState } from 'react'
import './NewUser.css'
import '../../main.css'
import NavBar from '../NavBar'
import { Link } from 'react-router-dom'

export default function NewUser() {
    const pathname = window.location.pathname
    const editMode = pathname.includes('/edit')
    const id = editMode ? pathname.split('/').pop() : null

    const [first_name, setFirstName] = useState('')
    const [last_name, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [role, setRole] = useState('employee')

    useEffect(() => {
        if (!editMode || !id) {
            return
        }

        const loadUser = async () => {
            try {
                const response = await fetch(`/api/users/${id}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch user details')
                }

                const data = await response.json()

                setFirstName(data.first_name ?? '')
                setLastName(data.last_name ?? '')
                setEmail(data.email ?? '')
                setPassword(data.password ?? '')
                setRole(data.role ?? 'employee')
            } catch (error) {
                console.error('Error fetching user details:', error)
            }
        }

        loadUser()
    }, [editMode, id])

    const handleNewUser = async (e) => {
        e.preventDefault()

        const payload = {
            first_name,
            last_name,
            email,
            password,
            role
        }

        if (!editMode) {
            if (payload.password === '') {
                payload.password = Math.random().toString(36).slice(-8)
            }

            try {
                const response = await fetch('/api/users/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })

                if (!response.ok) {
                    throw new Error('Failed to create user')
                }

            } catch (error) {
                console.error('Error creating user:', error)
            }
        } else {
            try {
                const response = await fetch(`/api/users/edit/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })

                if (!response.ok) {
                    throw new Error('Failed to update user')
                }

            } catch (error) {
                console.error('Error updating user:', error)
            }
        }

        alert(`User has been saved successfully!\n\nFull name: ${payload.first_name} ${payload.last_name}\nUser role: ${payload.role}\nEmail: ${payload.email}\nPassword: ${payload.password}`)
        window.location.href = '/admin/users'
    }

    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="newUserPage">
                <section className="newUserHeader">
                    <h1 className="newUserTitle">{editMode ? 'Edit User' : 'New User'}</h1>
                </section>

                <section className="newUserInfo">
                    <form className="newUserForm" onSubmit={handleNewUser}>
                        <input type="text" name="first_name" placeholder="First Name" className="newUserInput" value={first_name} onChange={(event) => setFirstName(event.target.value)} />
                        <input type="text" name="last_name" placeholder="Last Name" className="newUserInput" value={last_name} onChange={(event) => setLastName(event.target.value)} />
                        <input type="text" name="email" placeholder="Email" className="newUserInput" value={email} onChange={(event) => setEmail(event.target.value)} />
                        <input type="text" name="password" placeholder="Password" className="newUserInput" value={password} onChange={(event) => setPassword(event.target.value)} />
                        <div className="newUserRole" role="radiogroup" aria-label="User role">
                            <label className="newUserRadioOption">
                                <input type="radio" name="role" value="employee" checked={role === 'employee'} onChange={() => setRole('employee')} />
                                <span>Employee</span>
                            </label>
                            <label className="newUserRadioOption">
                                <input type="radio" name="role" value="admin" checked={role === 'admin'} onChange={() => setRole('admin')} />
                                <span>Admin</span>
                            </label>
                        </div>
                        <div className="newUserButtons">
                            <Link to="/admin/users"><button className="newUserActionButton" id="newUserCancelButton" type="button">Cancel</button></Link>
                            <button className="newUserActionButton" id="newUserCodeSaveButton" type="submit">Save</button>
                        </div>
                    </form>
                </section>
            </section>
        </>
    )
}