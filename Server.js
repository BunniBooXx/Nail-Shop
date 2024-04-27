const express = require('express');
const cors = require('cors');

const app = express();
const port = 5000;

app.use(cors({
  origin: 'http://localhost:3000'
}));

// Your routes
app.get('/product/read_all', (req, res) => {
  // Your code to fetch products
});

app.get('/user', (req, res) => {
  // Your code to fetch user data
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});

