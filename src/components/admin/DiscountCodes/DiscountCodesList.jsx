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
                                            <button className="discountCodeActionButton" id="deleteButton">Delete</button>
                                            <button className="discountCodeActionButton" id="editButton">Edit</button>
                                            <button className="discountCodeActionButton" id="copyCodeButton">Copy</button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
    )
}