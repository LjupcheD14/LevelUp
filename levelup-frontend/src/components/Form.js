import React, { useState } from 'react';

const FormExample = () => {
    const [date, setDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardNumber, setCardNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Perform form submission logic here
        console.log('Form submitted:', date, cvv, cardNumber);
    };

    return (
        <div className="container">
            <h1>Payment process example</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Date:</label>
                    <input
                        type="text"
                        className="form-control"
                        id="date"
                        placeholder="Enter the date"
                        value={date}
                        onChange={(e) => setDate(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">CVV(security code)</label>
                    <input
                        type="number"
                        className="form-control"
                        id="cvv"
                        placeholder="Enter the CVV"
                        value={cvv}
                        onChange={(e) => setCVV(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Card number</label>
                    <input
                        type="number"
                        className="form-control"
                        id="cardNumber"
                        placeholder="Enter the card number"
                        value={cardNumber}
                        onChange={(e) => setCardNumber(e.target.value)}
                    />
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </div>
    );
};

export default FormExample;
