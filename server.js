const express = require('express');
const app = express();
const port = 8000; // You can choose any available port number
const cors = require('cors');
const morgan = require('morgan');

app.use(express.json());
app.use(cors()); // Enable CORS for all routes
app.use(morgan('dev'));

app.post('/paymentSubmit', (req, res) => {
    const formData = req.body; // Access the form data from the request body

    console.log(formData);

    var parsedData = JSON.stringify(formData)

        var resultData = JSON.parse(parsedData);

        var dateValue = resultData.date
        var cvvValue = resultData.cvv;
        var cardNumberValue = resultData.cardNumber

        console.log("Date: ", dateValue);
        console.log("CVV: ", cvvValue);
        console.log("Card number: ", cardNumberValue)

    function validateExpiryDate(dateValue) {
        const currentDate = new Date();
        const expiryDate = new Date(dateValue);

        if (expiryDate <= currentDate) {
            console.log("Invalid expiry date. The expiry date must be after the current date.");
            return false;
        }

        // Expiry date is valid
        console.log("Valid date")
        return true;
    }



    function validateCVV(cvvValue, cardNumberValue) {
        const isAmerican = cardNumberValue.startsWith("34") || cardNumberValue.startsWith("37");
        const cvvLength = isAmerican ? 4 : 3;

        if (cvvValue.length !== cvvLength) {
            if (isAmerican) {
                console.log("Invalid CVV length. CVV for American Express cards must be 4 digits long.");
            } else {
                console.log("Invalid CVV length. CVV for non-American Express cards must be 3 digits long.");
            }
            return false;
        }


        // CVV length is valid
        console.log("Valid CVV")
        return true;
    }

    function validateCardNumberLength(cardNumberValue) {
        const cardNumberLength = cardNumberValue.length;

        if (cardNumberLength < 16 || cardNumberLength > 19) {
            console.log("Invalid card number length. The card number must be between 16 and 19 digits long.");
            return false;
        }

        // Card number length is valid
        console.log("Valid card number")

        return true;
    }


    function validateForm(dateValue, cvvValue, cardNumberValue) {
        const isExpiryDateValid = validateExpiryDate(dateValue);
        const isCVVValid = validateCVV(cvvValue, cardNumberValue);
        const isCardNumberLengthValid = validateCardNumberLength(cardNumberValue);

        return isExpiryDateValid && isCVVValid && isCardNumberLengthValid;
    }


    const isFormValid = validateForm(dateValue, cvvValue, cardNumberValue);

    const paymentSuc = 'Successful'
    const paymentFal = 'Invalid'

    if (isFormValid) {
        res.status(200).send(`${paymentSuc}`);
    } else {
        res.status(200).send(`${paymentFal}`);
    }

});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
