import { useEffect, useState } from 'react'

export default function UserList() {
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

    // Sort users by id in decreasing order
    const sortedUsers = [...users].sort((a, b) => b.id - a.id)
    
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
                            {sortedUsers.map((element) => (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.firstName}</td>
                                    <td>{element.lastName}</td>
                                    <td>{element.email}</td>
                                    <td>{element.role}</td>
                                    <td>
                                        <div className="userActions">
                                            <button className="userActionButton" id="deleteButton">Delete</button>
                                            <button className="userActionButton" id="editButton">Edit</button>
                                            <button className="userActionButton" id="resetPasswordButton">Reset PW</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}