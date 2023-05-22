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

        console.log(dateValue);
        console.log(cvvValue);
        console.log(cardNumberValue)
    // Perform any necessary operations with the form data
    // ...

    var parsedData1 = JSON.stringify(formData);

    res.send(`EOEO ${parsedData1}`); // Send a response back to the client
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
