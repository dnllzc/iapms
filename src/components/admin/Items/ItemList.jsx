import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'

export default function ItemList({ filters }) {
    const [items, setItems] = useState([])
    
    useEffect(() => {
        fetch('/api/items')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response failed')
                }
                return response.json()
            })
            .then((data) => {
                setItems(data)
            })
            .catch((error) => {
                console.error('Error fetching items:', error)
            })
    }, [])

    const filteredItems = [...items]
        .sort((a, b) => a.id - b.id)
        .filter((item) => {
            const nameMatch = item.name.toLowerCase().includes(filters.name.toLowerCase())
            return nameMatch
        })

    const handleDelete = (id, name) => {
        return async () => {
            if (!window.confirm('Delete item (#'+ id+ ') ' + name + '?')) return

            const payload = { id }

            try {
                const response = await fetch('/api/items/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify(payload),
                })

                if (!response.ok) {
                    throw new Error('Failed to delete item')
                }

                // remove from local state
                setItems((prevItems) => prevItems.filter((item) => item.id !== id))
                window.alert(`Item (${id}) ${name} deleted successfully`)
            } catch (error) {
                console.error('Error deleting item:', error)
                window.alert('Failed to delete item')
            }
        }
    }
    
    return (
        <table className="itemTable">
                        <thead>
                            <tr>
                                <th>Item ID</th>
                                <th>Item Name</th>
                                <th>Item Description</th>
                                <th>Price</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {filteredItems.map((element) => (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.name}</td>
                                    <td>{element.description}</td>
                                    <td>{Number(element.price).toFixed(2)}</td>
                                    <td>
                                        <div className="itemActions">
                                            <button className="itemActionButton" id="deleteButton" onClick={handleDelete(element.id, element.name)}>Delete</button>
                                            <Link to={`/admin/items/edit/${element.id}`}><button className="itemActionButton" id="editButton">Edit</button></Link>
                                            <button className="itemActionButton" id="copyItemButton">Copy</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}