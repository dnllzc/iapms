import { useEffect, useState } from 'react'
import './NewItem.css'
import '../../main.css'
import NavBar from '../NavBar'
import { Link } from 'react-router-dom'

export default function NewItem() {
    document.title = "New Item - iapms"
    const pathname = window.location.pathname
    const editMode = pathname.includes('/edit')
    const id = editMode ? pathname.split('/').pop() : null

    const [name, setName] = useState('')
    const [desc, setDesc] = useState('')
    const [price, setPrice] = useState('')

    useEffect(() => {
        if (!editMode || !id) {
            return
        }

        const loadItem = async () => {
            try {
                const response = await fetch(`/api/items/${id}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch item details')
                }

                const data = await response.json()

                setName(data.name ?? '')
                setDesc(data.description ?? '')
                setPrice(data.price.toFixed(2) ?? '')
            } catch (error) {
                console.error('Error fetching item details:', error)
            }
        }

        loadItem()
    }, [editMode, id])

    const handleNewItem = async (e) => {
        e.preventDefault()

        const payload = {
            name: name,
            description: desc,
            price: parseFloat(price)
        }

        if (!editMode) {
            try {
                const response = await fetch('/api/items/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })

                if (!response.ok) {
                    throw new Error('Failed to create item')
                }

            } catch (error) {
                console.error('Error creating item:', error)
            }
        } else {
            try {
                const response = await fetch(`/api/items/edit/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })

                if (!response.ok) {
                    throw new Error('Failed to update item')
                }

            } catch (error) {
                console.error('Error updating item:', error)
            }
        }

        alert(`Item has been saved successfully!\n\nItem Name: ${payload.name}\nDescription: ${payload.description}\nPrice: ${payload.price.toFixed(2)}€`)
        window.location.href = '/admin/items'
    }

    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="newItemPage">
                <section className="newItemHeader">
                    <h1 className="newItemTitle">{editMode ? 'Edit Item' : 'New Item'}</h1>
                </section>

                <section className="newItemInfo">
                    <form className="newItemForm" onSubmit={handleNewItem}>
                        <input type="text" name="name" placeholder="Item Name" className="newItemInput" value={name} onChange={(event) => setName(event.target.value)} />
                        <input type="text" name="desc" placeholder="Item Description" className="newItemInput" value={desc} onChange={(event) => setDesc(event.target.value)} />
                        <input type="number" name="price" placeholder="Price" className="newItemInput" value={price} onChange={(event) => setPrice(event.target.value)} />
                        <div className="newItemButtons">
                            <Link to="/admin/items"><button className="newItemActionButton" id="newItemCancelButton" type="button">Cancel</button></Link>
                            <button className="newItemActionButton" id="newItemSaveButton" type="submit">Save</button>
                        </div>
                    </form>
                </section>
            </section>
        </>
    )
}