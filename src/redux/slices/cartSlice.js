import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  cartItems: [], // List of products in the cart
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Add product to cart or increase quantity if it already exists
    addProductToCart: (state, action) => {
      const newProduct = action.payload;
      const existingProduct = state.cartItems.find(item => item._id === newProduct._id);

      if (existingProduct) {
        // If product exists, increase quantity by 1
        existingProduct.quantity += 1;
      } else {
        // If product doesn't exist, add it to the cart with quantity 1
        state.cartItems.push({ ...newProduct, quantity: 1 });
      }
    },

    // Remove product from cart by its id
    removeProductFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item._id !== productId);
    },

    // Increase product quantity by 1
    increaseProductQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cartItems.find(item => item._id === productId);
      if (product) {
        product.quantity += 1; // Increase quantity by 1
      }
    },

    // Decrease product quantity by 1
    decreaseProductQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cartItems.find(item => item._id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1; // Decrease quantity by 1, but not below 1
      }
    },

    // Update product quantity with a specific value
    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.cartItems.find(item => item._id === productId);
      if (product && quantity > 0) {
        product.quantity = quantity; // Set the quantity to the provided value
      }
    },

    // Clear all products from the cart
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Export actions for use in components
export const { 
  addProductToCart, 
  removeProductFromCart, 
  increaseProductQuantity, 
  decreaseProductQuantity, 
  updateProductQuantity, 
  clearCart 
} = cartSlice.actions;

export default cartSlice.reducer;
