import { Box, Button, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import CartProduct from "../components/product/CartProduct";
import { IProduct } from "../features/apiSlice";
import { removeProduct } from "../features/cartSlice";

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

  const calcTotal = () => {
    let res = 0;

    cartState.products.forEach(product => {
      res = res + product.price;
    });

    return res;
  }

  return (
    <StyledCartPage>
      <Box className="cart-product">
        {cartState.products.map((product, idx) =>
          <CartProduct key={product.id} product={product} handleDeleteProduct={handleRemoveProduct} />)}
      </Box>
      <Paper className="finish-order-container">
        <Typography variant="h6">Order</Typography>
        <Box className="order-details">
          <Typography variant="h6">Total:</Typography>
          <Typography variant="h6">${calcTotal()}</Typography>
        </Box>
        <Button variant="contained">Place Order</Button>
      </Paper>
    </StyledCartPage>
  )
}

export default CartPage;