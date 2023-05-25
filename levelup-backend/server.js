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
        console.log("The expiry date must be provided.");
        res.status(200).send("The expiry date must be provided.");
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
    if(cvvValue === ''){
        console.log("The CVV must be provided.")
        res.status(200).send("The CVV must be provided.")
    }
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
    if(cardNumberValue === ''){
        console.log("The card number must be provided.")
        res.status(200).send("The card number must be provided");
    }
    const cardNumberLength = cardNumberValue.length;

    if (cardNumberLength < 16 || cardNumberLength > 19) {
        console.log("Invalid card number length. The card number must be between 16 and 19 digits long.");
        res.status(200).send("Invalid card number length. The card number must be between 16 and 19 digits long.");
        return false;
    }

    // Card number length is valid
    console.log("Valid card number length");
    res.status(200).send("Valid card number length");
    return true;
}

app.post('/cardNumberSubmit', (req, res) => {
    const formData = req.body;
    console.log(formData);
    const cardNumberValue = formData.cardNumber;

    validateCardNumberLength(cardNumberValue, res);
});

function validateCardNumberLuhn(cardNumberValue, res) {
    // Convert the card number string to an array of digits
    const cardNumberDigits = Array.from(cardNumberValue, Number);

    // Reverse the array of digits
    const reversedDigits = cardNumberDigits.reverse();

    // Apply the Luhn's algorithm to validate the card number
    let sum = 0;
    for (let i = 0; i < reversedDigits.length; i++) {
        let digit = reversedDigits[i];

        if (i % 2 === 1) {
            digit *= 2;
            if (digit > 9) {
                digit -= 9;
            }
        }

        sum += digit;
    }

    if (sum === 0) {
        console.log(" ")
        res.status(200).send(" ")
    }

    // Check if the sum is divisible by 10
    if (sum % 10 === 0) {
        console.log("Valid card number according to the Luhn algorithm.");
        res.status(200).send("Valid card number according to the Luhn algorithm.")
        return true;
    } else {
        console.log("Invalid card number according to the Luhn algorithm. The last digit is incorrect.");
        res.status(200).send("Invalid card number according to the Luhn algorithm. The last digit is incorrect.");
        return false;
    }
}

app.post('/luhnSubmit', (req, res) => {
    const formData = req.body;
    console.log(formData);
    const cardNumberValue = formData.cardNumber;

    validateCardNumberLuhn(cardNumberValue, res);
});


app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
