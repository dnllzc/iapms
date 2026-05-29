import { useEffect, useState } from 'react'

export default function ItemList() {
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

    const sortedItems = [...items].sort((a, b) => a.id - b.id)
    
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
                            {sortedItems.map((element) => (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{element.name}</td>
                                    <td>{element.description}</td>
                                    <td>{Number(element.price).toFixed(2)}</td>
                                    <td>
                                        <div className="itemActions">
                                            <button className="itemActionButton" id="deleteButton">Delete</button>
                                            <button className="itemActionButton" id="editButton">Edit</button>
                                            <button className="itemActionButton" id="copyItemButton">Copy</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}