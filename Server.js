const express = require('express');
const cors = require('cors');
const nodemailer = require('nodemailer');
const stripe = require('stripe')(process.env.REACT_APP_STRIPE_SECRET_KEY); // Use environment variable for secret key
const Order = require('./models/Order'); // Assuming you're using a database like MongoDB

const app = express();
const port = 5000;

// Middleware
app.use(cors({
  origin: 'http://localhost:3000', // Replace with your frontend URL
  credentials: true,
}));
app.use(express.json()); // To parse JSON request bodies

// Routes
app.get('/product/read_all', (req, res) => {
  // Your code to fetch products
  res.json({ message: 'Fetch products' }); // Placeholder response
});

app.get('/user', (req, res) => {
  // Your code to fetch user data
  res.json({ message: 'Fetch user data' }); // Placeholder response
});

app.post('/create-payment-intent', async (req, res) => {
  const { orderId, amount } = req.body;

  try {
    const paymentIntent = await stripe.paymentIntents.create({
      amount,
      currency: 'usd',
      metadata: { orderId },
    });

    res.json({ clientSecret: paymentIntent.client_secret });
  } catch (error) {
    console.error('Error creating payment intent:', error);
    res.status(500).json({ error: 'An error occurred while creating the payment intent.' });
  }
});

app.post('/send-emails', async (req, res) => {
  const { orderId } = req.body;

  try {
    const order = await fetchOrderFromDatabase(orderId);

    const transporter = nodemailer.createTransport({
      // Configure your email transporter
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS, // Use environment variable
        pass: process.env.EMAIL_PASSWORD, // Use environment variable
      },
    });

    const customerEmail = {
      from: process.env.EMAIL_ADDRESS,
      to: order.customer.email,
      subject: 'Order Confirmation',
      text: `Thank you for your order! Your order ID is ${orderId}.`,
    };

    await transporter.sendMail(customerEmail);

    const developerEmail = {
      from: process.env.EMAIL_ADDRESS,
      to: process.env.DEVELOPER_EMAIL_ADDRESS, // Use environment variable
      subject: 'New Order Received',
      text: `A new order (ID: ${orderId}) has been placed.`,
    };

    await transporter.sendMail(developerEmail);

    await updateOrderStatusInDatabase(orderId, 'PAID');

    res.json({ success: true });
  } catch (error) {
    console.error('Error sending emails:', error);
    res.status(500).json({ error: 'An error occurred while sending emails.' });
  }
});

const fetchOrderFromDatabase = async (orderId) => {
  try {
    const order = await Order.findById(orderId);
    return order;
  } catch (error) {
    throw new Error(`Error fetching order from database: ${error}`);
  }
};

const updateOrderStatusInDatabase = async (orderId, status) => {
  try {
    const order = await Order.findByIdAndUpdate(orderId, { status }, { new: true });
    return order;
  } catch (error) {
    throw new Error(`Error updating order status in database: ${error}`);
  }
};

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
