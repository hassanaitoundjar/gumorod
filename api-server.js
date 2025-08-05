/**
 * Gumorod API Server
 * 
 * This server handles the integration with Gumroad's API for creating purchases
 * and generating license keys after payment.
 */

const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Gumroad API credentials
const GUMROAD_API_BASE_URL = 'https://api.gumroad.com/v2';
const APPLICATION_ID = process.env.GUMROAD_APPLICATION_ID || 'Df9AIJSqnqoxw1JTXyoWDq42-yJTPy5lYtbgzdYotnA';
const APPLICATION_SECRET = process.env.GUMROAD_APPLICATION_SECRET || 'zdqwqe4dgtWF9SVmzaTatio9J1-YdyhOoVQ7pg2cgJc';
const ACCESS_TOKEN = process.env.GUMROAD_ACCESS_TOKEN || 'pzHaoH5aa196X9skfkkYJDugCCt2P_KhiwoU_tH3rAo';

// Middleware
app.use(cors());
app.use(bodyParser.json());
app.use(express.static('.')); // Serve static files from current directory

// API Routes

// Get product details
app.get('/api/products/:id', async (req, res) => {
  try {
    const productId = req.params.id;
    const response = await axios.get(`${GUMROAD_API_BASE_URL}/products/${productId}`, {
      params: {
        access_token: ACCESS_TOKEN
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching product:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch product details'
    });
  }
});

// Get all products
app.get('/api/products', async (req, res) => {
  try {
    const response = await axios.get(`${GUMROAD_API_BASE_URL}/products`, {
      params: {
        access_token: ACCESS_TOKEN
      }
    });
    res.json(response.data);
  } catch (error) {
    console.error('Error fetching products:', error.response?.data || error.message);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products'
    });
  }
});

// Create a license key
// Note: Gumroad API doesn't directly support creating license keys via API
// This is a placeholder for what would be a custom integration
app.post('/api/create-license', async (req, res) => {
  try {
    const { email, productId } = req.body;
    
    if (!email || !productId) {
      return res.status(400).json({
        success: false,
        error: 'Email and productId are required'
      });
    }
    
    // In a real implementation, you would:
    // 1. Process payment using a payment processor like Stripe
    // 2. Call Gumroad API to generate a license key or mark a sale
    // 3. Return success with access details
    
    // For this demo, we'll simulate a successful license creation
    res.json({
      success: true,
      message: 'License created successfully',
      license: {
        id: `LIC-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        email: email,
        productId: productId,
        createdAt: new Date().toISOString(),
        expiresAt: new Date(Date.now() + 365 * 24 * 60 * 60 * 1000).toISOString() // 1 year from now
      }
    });
    
  } catch (error) {
    console.error('Error creating license:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to create license'
    });
  }
});

// Log customer information before redirecting to Gumroad checkout
app.post('/api/log-customer', async (req, res) => {
  try {
    const { 
      email, 
      name, 
      productId,
      country,
      isGift
    } = req.body;
    
    // Validate required fields
    if (!email || !name || !productId) {
      return res.status(400).json({
        success: false,
        error: 'Missing required customer information'
      });
    }
    
    // Log the customer information (in a real implementation, you might store this in a database)
    console.log('Customer information logged:', {
      email,
      name,
      productId,
      country,
      isGift,
      timestamp: new Date().toISOString()
    });
    
    // You could also use Gumroad's API to create a customer or update customer information
    // This would require additional API calls with your access token
    
    res.json({
      success: true,
      message: 'Customer information logged successfully'
    });
    
  } catch (error) {
    console.error('Error logging customer information:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to log customer information'
    });
  }
});

// Process payment and create purchase (kept for reference but not used in the current flow)
app.post('/api/process-payment', async (req, res) => {
  try {
    const { 
      email, 
      name, 
      productId,
      cardNumber,
      cardExpiry,
      cardCvc,
      country,
      isGift
    } = req.body;
    
    // Validate required fields
    if (!email || !name || !productId || !cardNumber || !cardExpiry || !cardCvc) {
      return res.status(400).json({
        success: false,
        error: 'Missing required payment information'
      });
    }
    
    // In a real implementation, you would:
    // 1. Use a secure payment processor like Stripe to handle the payment
    // 2. Call Gumroad API to record the sale or create access
    // 3. Return success with purchase details
    
    // For this demo, we'll simulate a successful purchase
    // Note: Gumroad's current API doesn't support creating purchases directly
    // This would require custom integration with their systems
    
    // Simulate processing delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    res.json({
      success: true,
      message: 'Payment processed successfully',
      purchase: {
        id: `PUR-${Math.random().toString(36).substring(2, 10).toUpperCase()}`,
        email: email,
        name: name,
        productId: productId,
        amount: 59.95,
        currency: 'USD',
        createdAt: new Date().toISOString(),
        downloadUrl: `https://gumroad.com/d/${productId}?some_token=${Math.random().toString(36).substring(2)}`
      }
    });
    
  } catch (error) {
    console.error('Error processing payment:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to process payment'
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
