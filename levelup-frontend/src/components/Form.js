import React, { useState} from 'react';
import axios from "axios";

const FormExample = () => {
    const [date, setDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [statusce, setStatusce] = useState('');
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
                setStatusce(response.data);
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                // Handle the error
            });

    };

    const getStyle = () => {
        if (statusce === 'Successful') {
            return { color: 'green' };
        } else {
            return { color: 'red' };
        }
    };



    return (
        <div style={{width: '50%'}} className="container">
            <h1 style={{textAlign: 'center'}}>LevelUp payment</h1>
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
                <div>
                    <p>For a successful transaction, your payment details must meet the following conditions</p>
                    <ol>
                        <li>The expiry date of the credit card (year and month) must be AFTER present time</li>
                        <li>
                            The CVV (security code) of the credit card must be exactly 3 digits long
                            <ul>
                                <li>Unless it’s an American Express card, in which case the CVV must be exactly 4 digits long</li>
                                <li>American Express are cards whose PAN (card numbers) starts with either “34” or “37”</li>
                            </ul>
                        </li>
                        <li>The PAN (card number) must be between 16 and 19 digits long</li>
                    </ol>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
            {statusce && <p style={getStyle()}>{statusce} payment</p>}
        </div>
    );
};

export default FormExample;
