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
    // Perform any necessary operations with the form data
    // ...

    res.send(`The data recevied is ${JSON.stringify(formData)}`); // Send a response back to the client
});




app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
