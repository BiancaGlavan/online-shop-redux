import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { IProduct } from './apiSlice';



export interface CartState {
 products: IProduct[];
}

const initialState: CartState = {
    products: [],
};



export const cartSlice = createSlice({
  name: 'cart',
  initialState,
  // The `reducers` field lets us define reducers and generate associated actions
  reducers: {
    
    // Use the PayloadAction type to declare the contents of `action.payload`
    addProduct: (state, action: PayloadAction<IProduct>) => {
      state.products.push(action.payload);
    },
    removeProduct: (state, action: PayloadAction<IProduct>) => {
        state.products = state.products.filter((product) => product.id !== action.payload.id);
    }
    
  },


});

export const { addProduct, removeProduct } = cartSlice.actions;

export default cartSlice.reducer;
