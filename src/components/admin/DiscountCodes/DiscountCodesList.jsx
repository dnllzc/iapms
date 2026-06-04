import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { CopyToClipboard } from 'react-copy-to-clipboard'

export default function DiscountCodesList({ filters }) {
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

    const filteredCodes = [...discountCodes]
        .sort((a, b) => a.id - b.id)
        .filter((code) => {
            const codeMatch = code.code.toLowerCase().includes(filters.code.toLowerCase())
            const dateMatch = filters.expireDate ? new Date(code.expiration_date).toLocaleDateString('en-GB') === new Date(filters.expireDate).toLocaleDateString('en-GB') : true
            const typeMatch = filters.type ? code.discount_type === filters.type : true
            return codeMatch && dateMatch && typeMatch
        })

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
                            {filteredCodes.map((element) => (
                                <tr key={element.id}>
                                    <td>{element.id}</td>
                                    <td>{formatDate(element.expiration_date)}</td>
                                    <td>{element.discount_type}</td>
                                    <td>{element.code}</td>
                                    <td>{element.value}</td>
                                    <td>
                                        <div className="discountCodeActions">
                                            <button className="discountCodeActionButton" id="deleteButton" onClick={handleDelete(element.id)}>Delete</button>
                                            <Link to={`/admin/discount-codes/edit/${element.id}`}><button className="discountCodeActionButton" id="editButton">Edit</button></Link>
                                            <CopyToClipboard text={element.code} onCopy={() => alert("Code copied to clipboard!")}>
                                                <button className="discountCodeActionButton" id="copyCodeButton">Copy</button>
                                            </CopyToClipboard>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}