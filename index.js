/**
 * Gumorod - Gumroad API Client
 * 
 * This application demonstrates how to interact with the Gumroad API
 * using JavaScript and Node.js.
 */

// Load environment variables
require('dotenv').config();

const axios = require('axios');

// Gumroad API configuration
const GUMROAD_API_BASE_URL = 'https://api.gumroad.com/v2';
const ACCESS_TOKEN = process.env.GUMROAD_ACCESS_TOKEN;

// Gumroad API client class
class GumroadClient {
  constructor(accessToken) {
    this.accessToken = accessToken;
    
    if (!this.accessToken) {
      throw new Error('Gumroad access token is required');
    }
    
    // Configure axios instance with default settings
    this.api = axios.create({
      baseURL: GUMROAD_API_BASE_URL,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  /**
   * Get all products from Gumroad
   * @returns {Promise} Promise that resolves to products data
   */
  async getProducts() {
    try {
      const response = await this.api.get('/products', {
        params: {
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error('Error fetching products:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Get a specific product by ID
   * @param {string} productId - The ID of the product to fetch
   * @returns {Promise} Promise that resolves to product data
   */
  async getProduct(productId) {
    try {
      const response = await this.api.get(`/products/${productId}`, {
        params: {
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error fetching product ${productId}:`, error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Create a new product on Gumroad
   * @param {Object} productData - The product data
   * @returns {Promise} Promise that resolves to the created product
   */
  async createProduct(productData) {
    try {
      const response = await this.api.post('/products', {
        ...productData,
        access_token: this.accessToken
      });
      return response.data;
    } catch (error) {
      console.error('Error creating product:', error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Update an existing product
   * @param {string} productId - The ID of the product to update
   * @param {Object} productData - The updated product data
   * @returns {Promise} Promise that resolves to the updated product
   */
  async updateProduct(productId, productData) {
    try {
      const response = await this.api.put(`/products/${productId}`, {
        ...productData,
        access_token: this.accessToken
      });
      return response.data;
    } catch (error) {
      console.error(`Error updating product ${productId}:`, error.response?.data || error.message);
      throw error;
    }
  }

  /**
   * Delete a product
   * @param {string} productId - The ID of the product to delete
   * @returns {Promise} Promise that resolves to the deletion response
   */
  async deleteProduct(productId) {
    try {
      const response = await this.api.delete(`/products/${productId}`, {
        params: {
          access_token: this.accessToken
        }
      });
      return response.data;
    } catch (error) {
      console.error(`Error deleting product ${productId}:`, error.response?.data || error.message);
      throw error;
    }
  }
}

// Example usage
async function main() {
  try {
    const gumroad = new GumroadClient(ACCESS_TOKEN);
    
    // Get all products
    console.log('Fetching all products...');
    const products = await gumroad.getProducts();
    console.log('Products:', JSON.stringify(products, null, 2));
    
    // You can uncomment these examples as needed
    
    // // Get a specific product (replace with an actual product ID)
    // const productId = 'your_product_id';
    // const product = await gumroad.getProduct(productId);
    // console.log(`Product ${productId}:`, JSON.stringify(product, null, 2));
    
    // // Create a new product
    // const newProduct = await gumroad.createProduct({
    //   name: 'Test Product',
    //   price: 1000, // in cents
    //   description: 'This is a test product created via the API'
    // });
    // console.log('Created product:', JSON.stringify(newProduct, null, 2));
    
  } catch (error) {
    console.error('An error occurred:', error);
  }
}

// Run the example if this file is executed directly
if (require.main === module) {
  main();
}

// Export the client for use in other files
module.exports = GumroadClient;
