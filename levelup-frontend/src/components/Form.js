import React, { useState } from 'react';
import axios from "axios";

const FormExample = () => {
    const [date, setDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardNumber, setCardNumber] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an object with the form data
        const formData = {
            date: date,
            cvv: cvv,
            cardNumber: cardNumber
        };

        // Send the form data to the backend using Axios
        axios.post('http://localhost:8000/paymentSubmit', formData)
            .then((response) => {
                console.log(response.data);
                // Handle the response from the backend
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                // Handle the error
            });

    };

    return (
        <div className="container">
            <h1>Payment process example</h1>
            <form onSubmit={handleSubmit}>
                <div className="form-group">
                    <label htmlFor="name">Date:</label>
                    <input
                        type="date"
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
