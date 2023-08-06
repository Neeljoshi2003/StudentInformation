const express = require('express');
const bodyParser = require('body-parser');
const fs = require('fs');
const path = require('path');

const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Handle POST requests to the /submit_form endpoint
app.post('/submit_form', (req, res) => {
  const { name, email, message } = req.body;

  const formData = {
    name: name,
    email: email,
    message: message,
  };


 // Handle GET requests for the "/submit_form" endpoint
app.get('/submit_form', (req, res) => {
  // You can send an HTML page or any other response for the GET request here
  res.send('This is the GET request for the submit_form endpoint.');
});

  // Save the form data to a file named "form_data.json"
  const dataFilePath = path.join(__dirname, 'form_data.json');
  fs.readFile(dataFilePath, 'utf8', (err, data) => {
    if (err) {
      fs.writeFile(dataFilePath, JSON.stringify([formData]), (writeErr) => {
        if (writeErr) {
          console.error('Error writing form data:', writeErr);
        }
      });
    } else {
      const formDataArray = JSON.parse(data);
      formDataArray.push(formData);
      fs.writeFile(dataFilePath, JSON.stringify(formDataArray), (writeErr) => {
        if (writeErr) {
          console.error('Error writing form data:', writeErr);
        }
      });
    }
  });

  // Respond to the client with a success message
  res.json({ message: 'Form data submitted successfully!' });
});

// Start the server
app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
  });