import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from './apiSlice';


export interface ICartItem {
  product: IProduct;
  quantity: number;
}

export interface CartState {
  items: ICartItem[];
  totalPrice: number;
}

const initialState: CartState = {
  items: [],
  totalPrice: 0,
};


const calculateTotal = (items: ICartItem[]) => {
  console.log("calculateTotal: ");
  let res = 0;

  items.forEach(item => {
    res = res + item.product.price * item.quantity;
  });

  return res;
}

export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {

    // Use the PayloadAction type to declare the contents of `action.payload`
    addProduct: (state, action: PayloadAction<IProduct>) => {
      // state.products.push(action.payload);
      const newProduct = action.payload;
      const item = state.items.find((el, idx) => el.product.id === newProduct.id);
      if (!item) {
        state.items.push({ product: newProduct, quantity: 1 });
      } else {
        const items = state.items.filter((el, idx) => el.product.id !== newProduct.id);
        const newItem = { product: newProduct, quantity: item.quantity + 1 };
        state.items = [...items, newItem];
      }
      state.totalPrice = calculateTotal(state.items);
    },
    removeProduct: (state, action: PayloadAction<IProduct>) => {
      state.items = state.items.filter((item) => item.product.id !== action.payload.id);
      state.totalPrice = calculateTotal(state.items);
    },
    increment: (state, action: PayloadAction<IProduct>) => {
      const newProduct = action.payload;
      //Find the product in existing cart state
      const item = state.items.find((el, idx) => el.product.id === newProduct.id);

      //Get all the products except the current one
      const items = state.items.filter((el, idx) => el.product.id !== newProduct.id);

      if (item) {
        //Increment the quantity of the current product
        const newItem = { product: newProduct, quantity: item.quantity + 1 };

        //Update the items array
        state.items = [...items, newItem];
      }
      state.totalPrice = calculateTotal(state.items);
    },
    decrement: (state, action: PayloadAction<IProduct>) => {
      const newProduct = action.payload;
      //Find the product in existing cart state
      const item = state.items.find((el, idx) => el.product.id === newProduct.id);

      //Get all the products except the current one
      const items = state.items.filter((el, idx) => el.product.id !== newProduct.id);

      if (item && item.quantity > 1) {
        //Increment the quantity of the current product
        const newItem = { product: newProduct, quantity: item.quantity - 1 };

        //Update the items array
        state.items = [...items, newItem];
      }

      state.totalPrice = calculateTotal(state.items);
    }

  },


});

export const { addProduct, removeProduct, increment, decrement } = cartSlice.actions;

export default cartSlice.reducer;
