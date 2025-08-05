/**
 * Examples of using the Gumroad API client
 */

const GumroadClient = require('./index');
require('dotenv').config();

// Initialize the client with your access token
const gumroad = new GumroadClient(process.env.GUMROAD_ACCESS_TOKEN);

/**
 * Example 1: Get all products
 */
async function getAllProducts() {
  try {
    const products = await gumroad.getProducts();
    console.log('All Products:');
    console.log(JSON.stringify(products, null, 2));
    return products;
  } catch (error) {
    console.error('Failed to get products:', error);
  }
}

/**
 * Example 2: Get a specific product
 * @param {string} productId - The ID of the product to fetch
 */
async function getSpecificProduct(productId) {
  try {
    const product = await gumroad.getProduct(productId);
    console.log(`Product ${productId}:`);
    console.log(JSON.stringify(product, null, 2));
    return product;
  } catch (error) {
    console.error(`Failed to get product ${productId}:`, error);
  }
}

/**
 * Example 3: Create a new product
 * @param {Object} productData - The product data
 */
async function createNewProduct(productData) {
  try {
    const newProduct = await gumroad.createProduct(productData);
    console.log('Created new product:');
    console.log(JSON.stringify(newProduct, null, 2));
    return newProduct;
  } catch (error) {
    console.error('Failed to create product:', error);
  }
}

/**
 * Example 4: Update an existing product
 * @param {string} productId - The ID of the product to update
 * @param {Object} productData - The updated product data
 */
async function updateExistingProduct(productId, productData) {
  try {
    const updatedProduct = await gumroad.updateProduct(productId, productData);
    console.log(`Updated product ${productId}:`);
    console.log(JSON.stringify(updatedProduct, null, 2));
    return updatedProduct;
  } catch (error) {
    console.error(`Failed to update product ${productId}:`, error);
  }
}

/**
 * Example 5: Delete a product
 * @param {string} productId - The ID of the product to delete
 */
async function deleteExistingProduct(productId) {
  try {
    const result = await gumroad.deleteProduct(productId);
    console.log(`Deleted product ${productId}:`);
    console.log(JSON.stringify(result, null, 2));
    return result;
  } catch (error) {
    console.error(`Failed to delete product ${productId}:`, error);
  }
}

// Run examples
async function runExamples() {
  // Example 1: Get all products
  await getAllProducts();
  
  // Uncomment and modify these examples as needed
  
  // // Example 2: Get a specific product
  // // Replace 'your_product_id' with an actual product ID
  // await getSpecificProduct('your_product_id');
  
  // // Example 3: Create a new product
  // const newProductData = {
  //   name: 'Test Product',
  //   price: 1000, // in cents
  //   description: 'This is a test product created via the API'
  // };
  // await createNewProduct(newProductData);
  
  // // Example 4: Update an existing product
  // // Replace 'your_product_id' with an actual product ID
  // const updateData = {
  //   name: 'Updated Product Name',
  //   description: 'This product was updated via the API'
  // };
  // await updateExistingProduct('your_product_id', updateData);
  
  // // Example 5: Delete a product
  // // Replace 'your_product_id' with an actual product ID
  // await deleteExistingProduct('your_product_id');
}

// Run the examples if this file is executed directly
if (require.main === module) {
  runExamples();
}

// Export the example functions
module.exports = {
  getAllProducts,
  getSpecificProduct,
  createNewProduct,
  updateExistingProduct,
  deleteExistingProduct
};
