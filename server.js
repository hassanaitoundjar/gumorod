/**
 * Gumorod - Express Server
 * 
 * This server provides an API to interact with the Gumroad API
 * and serves the HTML frontend.
 */

const express = require('express');
const path = require('path');
require('dotenv').config();

// Import the Gumroad client
const GumroadClient = require('./index');

// Initialize Express app
const app = express();
const PORT = process.env.PORT || 3000;

// Initialize Gumroad client with access token from environment variables
const gumroad = new GumroadClient(process.env.GUMROAD_ACCESS_TOKEN);

// Serve static files
app.use(express.static(path.join(__dirname)));

// API endpoint to get all products
app.get('/api/products', async (req, res) => {
  try {
    const products = await gumroad.getProducts();
    res.json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      error: 'Failed to fetch products from Gumroad'
    });
  }
});

// API endpoint to get a specific product
app.get('/api/products/:id', async (req, res) => {
  try {
    const product = await gumroad.getProduct(req.params.id);
    res.json(product);
  } catch (error) {
    console.error(`Error fetching product ${req.params.id}:`, error);
    res.status(500).json({
      success: false,
      error: `Failed to fetch product ${req.params.id} from Gumroad`
    });
  }
});

// Serve the main HTML file for all other routes
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});
