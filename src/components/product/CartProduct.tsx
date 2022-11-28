import { Box, IconButton, Paper, Typography, useMediaQuery, useTheme } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
import { IProduct } from "../../features/apiSlice";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';


interface IPropsCartProduct {
  product: IProduct;
  handleDeleteProduct: (product: IProduct) => void;
  quantity: number;
  onIncrease: (product: IProduct) => void;
  onDecrease: (product: IProduct) => void;
}

const StyledCartProduct = styled(Paper)`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;

  .cart-content {
    flex-grow: 1;

    ${props => props.theme.breakpoints.up("md")} {
      display: flex;
    }
  }


  .cartitem-img {
    width: 70px;
    height:70px;
    margin: 10px;
    ${props => props.theme.breakpoints.up("sm")} {
      width: 100%;
      height: 100%;
      max-width: 200px;
      max-height: 200px;
    }
  }
  
  .cartitem-info {
    display: flex;
    flex-direction: column;
    justify-content: space-evenly;
    flex-grow: 1;
    padding: 10px;
   
    
  }

  .product-quantity {
    display: flex;
    align-items: center;

    .delete-btn {
      margin-left: auto;
    }
  }
`;

const CartProduct = ({ product, handleDeleteProduct, quantity, onIncrease, onDecrease }: IPropsCartProduct) => {

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <StyledCartProduct variant="outlined">
      <img className="cartitem-img" src={product.images[0]} alt="product image" />
      <Box className="cart-content">
        <Box className="cartitem-info">
          <Link to={`products/${product.id}`}>
            <Typography variant="body1">{product.title}</Typography>
          </Link>
          {!isMobile && <Typography className="cartitem-desc" variant="caption">{product.description}</Typography>}
          <Typography variant="body2">${product.price}</Typography>
        </Box>
        <Box className="product-quantity">
          <IconButton onClick={() => onDecrease(product)}>
            <RemoveIcon />
          </IconButton>
          <Typography variant="subtitle2">{quantity}</Typography>
          <IconButton onClick={() => onIncrease(product)}>
            <AddIcon />
          </IconButton>
          <IconButton className="delete-btn" onClick={() => handleDeleteProduct(product)}>
            <DeleteForeverOutlinedIcon />
          </IconButton>
        </Box>
      </Box>


    </StyledCartProduct>
  )
}

export default CartProduct;