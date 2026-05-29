import { useEffect, useState } from 'react'

export default function DiscountCodesList() {
    const [discountCodes, setDiscountCodes] = useState([])
    
    useEffect(() => {
        fetch('/api/discountcodes')
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Network response failed')
                }
                return response.json()
            })
            .then((data) => {
                setDiscountCodes(data)
            })
            .catch((error) => {
                console.error('Error fetching discount codes:', error)
            })
    }, [])

    discountCodes.sort((a, b) => a.id - b.id)

    const formatDate = (dateString) =>
        new Date(dateString).toLocaleDateString('en-GB');

    const handleDelete = (id) => {
        return async () => {
            if (!window.confirm('Delete discount code #' + id + '?')) return

            const payload = { id }

            try {
                const response = await fetch('/api/discountcodes/delete', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })

                if (!response.ok) {
                    throw new Error('Failed to delete discount code')
                }

                // remove from local state
                setDiscountCodes((prev) => prev.filter((c) => c.id !== id))
                window.alert(`Discount code with ID ${id} deleted successfully`)
            } catch (error) {
                console.error('Error deleting discount code:', error)
                window.alert('Failed to delete discount code')
            }
        }
    }

    const handleCopyClick = async () => {
        try {
            await window.navigator.clipboard.writeText(text);
            alert("Copied to clipboard!");
        } catch (err) {
            console.error(
                "Unable to copy to clipboard.",
                err
            );
            alert("Copy to clipboard failed.");
        }
    };
    
    return (
        <table className="discountCodeTable">
                        <thead>
                            <tr>
                                <th>Code ID</th>
                                <th>Expire Date</th>
                                <th>Type of Discount</th>
                                <th>Discount Code</th>
                                <th>Value</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {discountCodes.map((element) => (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{formatDate(element.expiration_date)}</td>
                                    <td>{element.discount_type}</td>
                                    <td>{element.code}</td>
                                    <td>{element.value}</td>
                                    <td>
                                        <div className="discountCodeActions">
                                            <button className="discountCodeActionButton" id="deleteButton" onClick={handleDelete(element.id)}>Delete</button>
                                            <button className="discountCodeActionButton" id="editButton">Edit</button>
                                            <button className="discountCodeActionButton" id="copyCodeButton" onClick={handleCopyClick}>Copy</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}