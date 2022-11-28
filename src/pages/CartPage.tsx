import { Box, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CartProduct from "../components/product/CartProduct";
import { IProduct } from "../features/apiSlice";
import { decrement, increment, removeProduct } from "../features/cartSlice";

const StyledCartPage = styled('div')`
  .cart-product {
    display: flex;
    flex-direction: column;
  }

  .finish-order-container {
    padding: 20px;

    .order-details {
      display: flex;
      justify-content: space-between;
      margin-bottom: 20px;
      margin-top: 20px;
      
    }

    ${props => props.theme.breakpoints.up("md")} {
      margin-left: 10px;
      min-width: 300px;
      max-height: 200px;
    }
  }

  ${props => props.theme.breakpoints.up("md")} {
    display: flex;
  }

  
`;

const CartPage = () => {
  const dispatch = useAppDispatch();
  const cartState = useAppSelector(state => state.cart);

  const handleRemoveProduct = (prod: IProduct) => {
    dispatch(removeProduct(prod));
  }

  const handleIncrement = (prod: IProduct) => {
    dispatch(increment(prod));
  }
  const handleDecrement = (prod: IProduct) => {
    dispatch(decrement(prod));
  }


  return (
    <StyledCartPage>
      <Box className="cart-product">
        {cartState.items.map((item, idx) =>
          <CartProduct quantity={item.quantity} 
          key={item.product.id} 
          product={item.product} 
          handleDeleteProduct={handleRemoveProduct}
          onIncrease={handleIncrement}
          onDecrease={handleDecrement}
          />)}
      </Box>
      <Paper className="finish-order-container">
        <Typography variant="h6">Order</Typography>
        <Box className="order-details">
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6">${cartState.totalPrice}</Typography>
        </Box>
        <Button variant="contained">Place Order</Button>
      </Paper>
    </StyledCartPage>
  )
}

export default CartPage;