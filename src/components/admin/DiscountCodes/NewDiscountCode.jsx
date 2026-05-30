import { useEffect, useState } from 'react'
import './NewDiscountCode.css'
import '../../main.css'
import NavBar from '../NavBar'
import { Link } from 'react-router-dom'

export default function NewDiscountCode() {
    const pathname = window.location.pathname
    const editMode = pathname.includes('/edit')
    const id = editMode ? pathname.split('/').pop() : null

    const [code, setCode] = useState('')
    const [expirationDate, setExpirationDate] = useState('')
    const [value, setValue] = useState('')
    const [discountType, setDiscountType] = useState('percentage')

    useEffect(() => {
        if (!editMode || !id) {
            return
        }

        const loadDiscountCode = async () => {
            try {
                const response = await fetch(`/api/discountcodes/${id}`)

                if (!response.ok) {
                    throw new Error('Failed to fetch discount code details')
                }

                const data = await response.json()

                setCode(data.code ?? '')
                setExpirationDate(data.expiration_date ? data.expiration_date.split('T')[0] : '')
                setValue(data.value ?? '')
                setDiscountType(data.discount_type ?? 'percentage')
            } catch (error) {
                console.error('Error fetching discount code details:', error)
            }
        }

        loadDiscountCode()
    }, [editMode, id])

    const handleNewCode = async (e) => {
        e.preventDefault()

        const payload = {
            code: code.trim(),
            expiration_date: expirationDate || null,
            value: Number(value),
            discount_type: discountType
        }

        if (!editMode) {
            if (payload.code === '') {
                payload.code = Math.random().toString(36).substring(2, 12).toUpperCase()
            }

            try {
                const response = await fetch('/api/discountcodes/new', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })

                if (!response.ok) {
                    throw new Error('Failed to create discount code')
                }

            } catch (error) {
                console.error('Error creating discount code:', error)
            }
        } else {
            try {
                const response = await fetch(`/api/discountcodes/edit/${id}`, {
                    method: 'PUT',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(payload)
                })

                if (!response.ok) {
                    throw new Error('Failed to update discount code')
                }

            } catch (error) {
                console.error('Error updating discount code:', error)
            }
        }

        alert(`Discount code has been saved successfully!\n\nCode: ${payload.code}\nExpiration Date: ${payload.expiration_date || 'None'}\nValue: ${payload.value}\nType: (${payload.discount_type})`)
        window.location.href = '/admin/discount-codes'
    }

    return (
        <>
            <section className="navBar">
                <NavBar />
            </section>
            <section className="newDiscountCodePage">
                <section className="newDiscountCodeHeader">
                    <h1 className="newDiscountCodeTitle">{editMode ? 'Edit Discount Code' : 'New Discount Code'}</h1>
                </section>

                <section className="newDiscountCodeInfo">
                    <form className="newDiscountCodeForm" onSubmit={handleNewCode}>
                        <input type="text" name="code" placeholder="Code (leave blank for random)" className="newDiscountCodeInput" value={code} onChange={(event) => setCode(event.target.value)} />
                        <input type="date" name="expiration_date" placeholder="Expiration Date" className="newDiscountCodeInput" value={expirationDate} onChange={(event) => setExpirationDate(event.target.value)} />
                        <input type="number" name="value" placeholder="Value" className="newDiscountCodeInput" value={value} onChange={(event) => setValue(event.target.value)} />
                        <div className="newDiscountCodeTypeGroup" role="radiogroup" aria-label="Discount type">
                            <label className="newDiscountCodeRadioOption">
                                <input type="radio" name="discount_type" value="percentage" checked={discountType === 'percentage'} onChange={() => setDiscountType('percentage')} />
                                <span>Percentage</span>
                            </label>
                            <label className="newDiscountCodeRadioOption">
                                <input type="radio" name="discount_type" value="fixed" checked={discountType === 'fixed'} onChange={() => setDiscountType('fixed')} />
                                <span>Fixed Value</span>
                            </label>
                        </div>
                        <div className="newDiscountCodeButtons">
                            <Link to="/admin/discount-codes"><button className="newDiscountCodeActionButton" id="newDiscountCodeCancelButton" type="button">Cancel</button></Link>
                            <button className="newDiscountCodeActionButton" id="newDiscountCodeSaveButton" type="submit">Save</button>
                        </div>
                    </form>
                </section>
            </section>
        </>
    )
}