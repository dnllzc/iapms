export default function NewInvoiceItemsTable({ items, onRemoveItem }) {
    const hasItems = items.length > 0

    return (
        <table className="newInvoiceTable newInvoiceItemsTable">
            <thead>
                <tr>
                    <th>Item Name</th>
                    <th>Price</th>
                    <th>Quantity</th>
                    <th>Action</th>
                </tr>
            </thead>
            <tbody>
                {hasItems ? (
                    items.map((element) => (
                        <tr key={element.id}>
                            <td>{element.name}</td>
                            <td>{element.quantity*element.price.toFixed(2)}€</td>
                            <td>{element.quantity}</td>
                            <td>
                                <div className="newInvoiceActions">
                                    <button className="quantityButton" type="button" aria-label={`Remove ${element.name}`} onClick={() => onRemoveItem(element.id)}>x</button>
                                </div>
                            </td>
                        </tr>
                    ))
                ) : (
                    <tr>
                        <td className="emptyInvoiceState" colSpan="4">
                            No items added yet.
                        </td>
                    </tr>
                )}
            </tbody>
        </table>
    )
}