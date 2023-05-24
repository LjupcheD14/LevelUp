import React, {useState} from 'react';
import axios from "axios";

const FormExample = () => {
    const [date, setDate] = useState('');
    const [cvv, setCVV] = useState('');
    const [cardNumber, setCardNumber] = useState('');
    const [statusDate, setStatusDate] = useState('');
    const [statusCvv, setStatusCvv] = useState('');
    const [statusCardNumber, setStatusCardNumber] = useState('');
    const [finalStatus, setFinalStatus] = useState('');
    const handleSubmit = (e) => {
        e.preventDefault();

        // Create an object with the form data
        const formData = {
            date: date,
            cvv: cvv,
            cardNumber: cardNumber
        };

        const formDate = {
            date: date
        }

        const formCVV = {
            cvv: cvv,
            cardNumber: cardNumber
        }

        const formCardNumber = {
            cardNumber: cardNumber
        }


        axios.post('http://localhost:8000/dateSubmit', formDate)
            .then((response) => {
                console.log(response.data);
                // Handle the response from the backend
                setStatusDate(response.data)
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                // Handle the error
            });

        axios.post('http://localhost:8000/cvvSubmit', formCVV)
            .then((response) => {
                console.log(response.data);
                // Handle the response from the backend
                setStatusCvv(response.data)
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                // Handle the error
            });

        axios.post('http://localhost:8000/cardNumberSubmit', formCardNumber)
            .then((response) => {
                console.log(response.data);
                // Handle the response from the backend
                setStatusCardNumber(response.data)
            })
            .catch((error) => {
                console.error('Error submitting form:', error);
                // Handle the error
            });

    };

    const styleStatusDate = () => {
        if (statusDate === 'Valid date') {
            return {color: 'green'}
        } else {
            return {color: 'red'};
        }
    }

    const styleStatusCvv = () => {
        if (statusCvv === 'Valid CVV') {
            return {color: 'green'}
        } else {
            return {color: 'red'};
        }
    }

    const styleStatusCardNumber = () => {
        if (statusCardNumber === 'Valid card number') {
            return {color: 'green'}
        } else {
            return {color: 'red'};
        }
    }

    const checkAllFunctions = () => {
        if (styleStatusDate().color === 'green' && styleStatusCvv().color === 'green' && styleStatusCardNumber().color === 'green') {
            return true;
        } else {
            return false;
        }
    };


    return (
        <div style={{backgroundColor: '#eae9f9', border: '10px solid #3f3bc5', borderRadius: '25px', padding: '50px'}}
             className="container">
            <h1 style={{textAlign: 'center', marginBottom: '10px'}}>LevelUp payment</h1>
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
                        style={{width: '50%'}}
                    />
                    {statusDate && <p style={styleStatusDate()}>{statusDate}</p>}
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
                        style={{width: '50%'}}
                    />{statusCvv && <p style={styleStatusCvv()}>{statusCvv}</p>}

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
                        style={{width: '50%'}}
                    />
                    {statusCardNumber && <p style={styleStatusCardNumber()}>{statusCardNumber}</p>}
                </div>
                <div>
                    <p>For a successful transaction, your payment details must meet the following conditions</p>
                    <ol>
                        <li>The expiry date of the credit card (year and month) must be AFTER present time</li>
                        <li>
                            The CVV (security code) of the credit card must be exactly 3 digits long
                            <ul>
                                <li>Unless it’s an American Express card, in which case the CVV must be exactly 4 digits
                                    long
                                </li>
                                <li>American Express are cards whose PAN (card numbers) starts with either “34” or
                                    “37”
                                </li>
                            </ul>
                        </li>
                        <li>The PAN (card number) must be between 16 and 19 digits long</li>
                    </ol>
                </div>
                <button style={{backgroundColor: '#3f3bc5'}} type="submit" className="btn btn-primary">Submit</button>
            </form>
            {checkAllFunctions() && (
                <p className={"resultText"}>Your payment is successful</p>
            )}

        </div>
    );
};

export default FormExample;
