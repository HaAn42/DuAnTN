import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
  cartItems: [], // Danh sách sản phẩm trong giỏ hàng
};

const cartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    // Thiết lập giỏ hàng từ server (ví dụ: khi người dùng đăng nhập)
    setCartItems: (state, action) => {
      state.cartItems = action.payload;
    },

    // Thêm sản phẩm vào giỏ hàng hoặc tăng số lượng nếu sản phẩm đã có
    addProductToCart: (state, action) => {
      const newProduct = action.payload;
      const existingProduct = state.cartItems.find(item => item._id === newProduct._id);

      if (existingProduct) {
        // Nếu sản phẩm đã có, tăng số lượng thêm 1
        existingProduct.quantity += 1;
      } else {
        // Nếu sản phẩm chưa có, thêm vào giỏ hàng với số lượng 1
        state.cartItems.push({ ...newProduct, quantity: 1 });
      }
    },

    // Xóa sản phẩm khỏi giỏ hàng theo id
    removeProductFromCart: (state, action) => {
      const productId = action.payload;
      state.cartItems = state.cartItems.filter(item => item._id !== productId);
    },

    // Tăng số lượng sản phẩm thêm 1
    increaseProductQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cartItems.find(item => item._id === productId);
      if (product) {
        product.quantity += 1; // Tăng số lượng thêm 1
      }
    },

    // Giảm số lượng sản phẩm đi 1
    decreaseProductQuantity: (state, action) => {
      const productId = action.payload;
      const product = state.cartItems.find(item => item._id === productId);
      if (product && product.quantity > 1) {
        product.quantity -= 1; // Giảm số lượng, nhưng không giảm xuống dưới 1
      }
    },

    // Cập nhật số lượng sản phẩm với giá trị cụ thể
    updateProductQuantity: (state, action) => {
      const { productId, quantity } = action.payload;
      const product = state.cartItems.find(item => item._id === productId);
      if (product && quantity > 0) {
        product.quantity = quantity; // Cập nhật số lượng sản phẩm
      }
    },

    // Xóa toàn bộ sản phẩm trong giỏ hàng
    clearCart: (state) => {
      state.cartItems = [];
    },
  },
});

// Thêm các hành động bất đồng bộ để đồng bộ giỏ hàng với server
export const syncCartWithServer = (userId, cartItems) => async dispatch => {
  try {
    await axios.post(`http://192.168.1.142:3000/cart/update/${userId}`, { cartItems });
  } catch (error) {
    console.error('Lỗi khi đồng bộ giỏ hàng với server:', error);
  }
};

// Đồng bộ giỏ hàng từ server khi người dùng đăng nhập hoặc mở ứng dụng
export const fetchCartFromServer = (userId) => async dispatch => {
  try {
    const response = await axios.get(`http://192.168.1.142:3000/cart/${userId}`);
    dispatch(setCartItems(response.data.cartItems));
  } catch (error) {
    console.error('Lỗi khi lấy giỏ hàng từ server:', error);
  }
};

// Xuất các hành động để sử dụng trong các component
export const { 
  addProductToCart, 
  removeProductFromCart, 
  increaseProductQuantity, 
  decreaseProductQuantity, 
  updateProductQuantity, 
  clearCart, 
  setCartItems 
} = cartSlice.actions;

export default cartSlice.reducer;
