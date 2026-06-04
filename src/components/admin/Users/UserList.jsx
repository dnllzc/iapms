import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function UserList({ filters }) {
    const [users, setUsers] = useState([])
    
    useEffect(() => {
        fetch('/api/users')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response failed')
                }
                return response.json()
            })
            .then((data) => {
                setUsers(data)
            })
            .catch((error) => {
                console.error('Error fetching users:', error)
            })
    }, [])

    const handleDelete = (id, first_name, last_name) => {
        return async () => {
            if (!window.confirm('Delete user (#'+ id+ ') ' + first_name + ' ' + last_name + '?')) return

            const payload = { id }

            try {
                const response = await fetch('/api/users/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })

                if (!response.ok) {
                    throw new Error('Failed to delete user')
                }

                // remove from local state
                setUsers((prevUsers) => prevUsers.filter((user) => user.id !== id))
                window.alert(`User (${id}) ${first_name} ${last_name} deleted successfully`)
            } catch (error) {
                console.error('Error deleting user:', error)
                window.alert('Failed to delete user')
            }
        }
    }

    const resetPassword = (id) => {
        return async () => {
            if (!window.confirm('Reset password for user #' + id + '?')) return

            const payload = { id }

            try {
                const response = await fetch('/api/users/reset-password', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })

                if (!response.ok) {
                    throw new Error('Failed to reset password')
                }

                const data = await response.json()
                window.alert(`Password for user #${id} reset successfully. New password: ${data.newPassword}`)
            } catch (error) {
                console.error('Error resetting password:', error)
                window.alert('Failed to reset password')
            }
        }
    }

    const filteredUsers = [...users]
        .sort((a, b) => a.id - b.id)
        .filter((user) => {
            const emailMatch = user.email.toLowerCase().includes(filters.email.toLowerCase())
            const nameMatch = (user.first_name + ' ' + user.last_name).toLowerCase().includes(filters.name.toLowerCase())
            return emailMatch && nameMatch
        })
    
    return (
        <table className="userTable">
                        <thead>
                            <tr>
                                <th>User ID</th>
                                <th>First Name</th>
                                <th>Last Name</th>
                                <th>Email</th>
                                <th>User Role</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredUsers.map((element) => (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.first_name}</td>
                                    <td>{element.last_name}</td>
                                    <td>{element.email}</td>
                                    <td>{element.role}</td>
                                    <td>
                                        <div className="userActions">
                                            <button className="userActionButton" id="deleteButton" onClick={handleDelete(element.id, element.first_name, element.last_name)}>Delete</button>
                                            <Link to={`/admin/users/edit/${element.id}`}><button className="userActionButton" id="editButton">Edit</button></Link>
                                            <button className="userActionButton" id="resetPasswordButton" onClick={resetPassword(element.id)}>Reset PW</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}