const express = require('express');
const app = express();
const port = 8000; // You can choose any available port number
const cors = require('cors');
const morgan = require('morgan');

app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use(morgan('dev'));


function validateExpiryDate(dateValue, res) {
    if (dateValue === '') {
        console.log("Invalid date. The expiry date must be provided.");
        res.status(200).send("Invalid date. The expiry date must be provided.");
        return false;
    }

    const currentDate = new Date();
    const expiryDate = new Date(dateValue);

    if (expiryDate <= currentDate) {
        console.log("Invalid expiry date. The expiry date must be after the current date.");
        res.status(200).send("Invalid date. The expiry date must be after the current date.");
        return false;
    }

    // Expiry date is valid
    console.log("Valid date");
    res.status(200).send("Valid date");
    return true;
}

app.post('/dateSubmit', (req, res) => {
    const formData = req.body;
    console.log(formData);

    const dateValue = formData.date;

    validateExpiryDate(dateValue, res);
});
function validateCVV(cvvValue, cardNumberValue, res) {
    const isAmerican = cardNumberValue.startsWith("34") || cardNumberValue.startsWith("37");
    const cvvLength = isAmerican ? 4 : 3;

    if (cvvValue.length !== cvvLength) {
        if (isAmerican) {
            console.log("Invalid CVV length. CVV for American Express cards must be 4 digits long.");
            res.status(200).send("Invalid CVV length. CVV for American Express cards must be 4 digits long.");
        } else {
            console.log("Invalid CVV length. CVV for non-American Express cards must be 3 digits long.");
            res.status(200).send("Invalid CVV length. CVV for non-American Express cards must be 3 digits long.");
        }
        return false;
    }

    // CVV length is valid
    console.log("Valid CVV");
    res.status(200).send("Valid CVV");
    return true;
}

app.post('/cvvSubmit', (req, res) => {
    const formData = req.body;
    console.log(formData);

    const cvvValue = formData.cvv;
    const cardNumberValue = formData.cardNumber;

    validateCVV(cvvValue, cardNumberValue, res);
});

function validateCardNumberLength(cardNumberValue, res) {
    const cardNumberLength = cardNumberValue.length;

    if (cardNumberLength < 16 || cardNumberLength > 19) {
        console.log("Invalid card number length. The card number must be between 16 and 19 digits long.");
        res.status(200).send("Invalid card number length. The card number must be between 16 and 19 digits long.");
        return false;
    }

    // Card number length is valid
    console.log("Valid card number");
    res.status(200).send("Valid card number");
    return true;
}

app.post('/cardNumberSubmit', (req, res) => {
    const formData = req.body;
    console.log(formData);
    const cardNumberValue = formData.cardNumber;

    validateCardNumberLength(cardNumberValue, res);
});

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
