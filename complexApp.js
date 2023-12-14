/**
 * File: complexApp.js
 * Description: A complex JavaScript application that implements a shopping cart functionality for an e-commerce website.
 */

// Import necessary JavaScript libraries and modules
import { formatPrice, calculateDiscount, generateInvoice } from './utils.js';
import { getProductById, getProductsByCategory, getAllProducts } from './api.js';

// Declare global variables
let cart = [];
let totalPrice = 0;

// Function to add a product to the cart
function addToCart(productId, quantity) {
  const product = getProductById(productId);
  if (!product) {
    console.error(`Product with ID ${productId} does not exist.`);
    return;
  }
  const totalPriceBeforeDiscount = product.price * quantity;
  const totalPriceAfterDiscount = calculateDiscount(totalPriceBeforeDiscount, product.discountPercentage);
  
  totalPrice += totalPriceAfterDiscount;
  cart.push({ productId, quantity });

  console.log(`${product.name} added to the cart. Total price: ${formatPrice(totalPriceAfterDiscount)}`);
}

// Function to remove a product from the cart
function removeFromCart(productId) {
  const index = cart.findIndex(item => item.productId === productId);
  if (index === -1) {
    console.error(`Product with ID ${productId} not found in the cart.`);
    return;
  }

  const product = getProductById(productId);
  const item = cart[index];
  const totalPriceBeforeDiscount = product.price * item.quantity;
  const totalPriceAfterDiscount = calculateDiscount(totalPriceBeforeDiscount, product.discountPercentage);

  totalPrice -= totalPriceAfterDiscount;
  cart.splice(index, 1);

  console.log(`${product.name} removed from the cart. Total price: ${formatPrice(totalPrice)}`);
}

// Function to update the quantity of a product in the cart
function updateQuantity(productId, quantity) {
  const index = cart.findIndex(item => item.productId === productId);
  if (index === -1) {
    console.error(`Product with ID ${productId} not found in the cart.`);
    return;
  }

  const product = getProductById(productId);
  const item = cart[index];
  const totalPriceBeforeDiscount = product.price * item.quantity;
  const totalPriceAfterDiscount = calculateDiscount(totalPriceBeforeDiscount, product.discountPercentage);

  totalPrice -= totalPriceAfterDiscount;
  item.quantity = quantity;
  const updatedTotalPriceBeforeDiscount = product.price * item.quantity;
  const updatedTotalPriceAfterDiscount = calculateDiscount(updatedTotalPriceBeforeDiscount, product.discountPercentage);
  totalPrice += updatedTotalPriceAfterDiscount;

  console.log(`${product.name} quantity updated. Total price: ${formatPrice(totalPrice)}`);
}

// Function to display the cart contents and total price
function displayCart() {
  console.log('******************* CART *******************');
  for (const item of cart) {
    const product = getProductById(item.productId);
    console.log(`${product.name} (${product.category}): ${item.quantity} units`);
  }
  console.log(`Total Price: ${formatPrice(totalPrice)}`);
  console.log('********************************************');
}

// Function to clear the cart
function clearCart() {
  cart = [];
  totalPrice = 0;
  console.log('Cart cleared.');
}

// Main program
console.log('-------- Welcome to our e-commerce website --------');
addToCart(101, 2);
addToCart(201, 1);
addToCart(301, 3);
displayCart();
updateQuantity(101, 5);
removeFromCart(301);
displayCart();
clearCart();
displayCart();
console.log('-------- Thank you for your purchase! --------');

// Export necessary functions for other modules to use if needed
export { addToCart, removeFromCart, updateQuantity, displayCart, clearCart };