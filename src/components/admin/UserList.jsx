export default function UserList() {
    const testInvoices = [
        { id: 2, email: "employee@example.com", firstName: "Employee", lastName: "User", role: "Employee", status: "Active" },
        { id: 1, email: "admin@example.com", firstName: "Admin", lastName: "User", role: "Admin", status: "Active" },
    ]
    
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
                            {testInvoices.map((element, index) => (
                                <tr key={index}>
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