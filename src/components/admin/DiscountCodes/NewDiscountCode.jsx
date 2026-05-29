import './NewDiscountCode.css'
import '../../main.css'
import NavBar from '../NavBar'

export default function NewDiscountCode() {
    const handleNewCode = async (e) => {
        e.preventDefault()

        const formData = new FormData(e.currentTarget)
        const payload = {
            code: formData.get('code')?.trim() || '',
            expiration_date: formData.get('expiration_date') || null,
            value: Number(formData.get('value')),
            discount_type: formData.get('discount_type')
        }

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
                    <h1 className="newDiscountCodeTitle">New Discount Code</h1>
                </section>

                <section className="newDiscountCodeInfo">
                    <form className="newDiscountCodeForm" onSubmit={handleNewCode}>
                        <input type="text" name="code" placeholder="Code (leave blank for random)" className="newDiscountCodeInput" />
                        <input type="date" name="expiration_date" placeholder="Expiration Date" className="newDiscountCodeInput" />
                        <input type="number" name="value" placeholder="Value" className="newDiscountCodeInput" />
                        <div className="newDiscountCodeTypeGroup" role="radiogroup" aria-label="Discount type">
                            <label className="newDiscountCodeRadioOption">
                                <input type="radio" name="discount_type" value="percentage" defaultChecked />
                                <span>Percentage</span>
                            </label>
                            <label className="newDiscountCodeRadioOption">
                                <input type="radio" name="discount_type" value="fixed" />
                                <span>Fixed Value</span>
                            </label>
                        </div>
                        <div className="newDiscountCodeButtons">
                            <button className="newDiscountCodeActionButton" id="newDiscountCodeCancelButton" type="button" onClick={() => (window.location.href = '/admin/discount-codes')}>Cancel</button>
                            <button className="newDiscountCodeActionButton" id="newDiscountCodeSaveButton" type="submit">Save</button>
                        </div>
                    </form>
                </section>
            </section>
        </>
    )
}