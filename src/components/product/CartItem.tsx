import { Box, IconButton, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IProduct } from "../../features/apiSlice";
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import { Link } from "react-router-dom";
import RemoveIcon from '@mui/icons-material/Remove';
import AddIcon from '@mui/icons-material/Add';

interface IPropsCartItem {
    product: IProduct;
    handleDeleteProduct: (product: IProduct) => void;
    quantity: number;
}

const StyledCartItem = styled(Box)`
    display: flex;
    flex-direction: row;
    align-items: center;
    margin-bottom: 20px;
    

    .cartitem-img {
        width: 50px;
        height: 65px;
        object-fit: cover;
        margin-right: 10px;
    }

    .cartitem-info {
        margin-right: 10px;
        max-width: 300px;
    }

    .title-and-price {
        display: flex;
        justify-content: space-between;
        align-items: center;
    }

    .delete-btn {
        cursor: pointer;
    }
   
`;

const CartItem = ({ product, handleDeleteProduct, quantity }: IPropsCartItem) => {

    return (
        <StyledCartItem>
            <img className="cartitem-img" src={product.images[0]} alt="product image" />
            <Box className="cartitem-info">
                <Box className="title-and-price">
                    <Link to={`products/${product.id}`}>
                        <Typography variant="body1">{product.title}</Typography>
                    </Link>
                    <Typography variant="body2">X{quantity}</Typography>
                </Box>
                <Typography className="cartitem-desc" variant="caption">{product.description}</Typography>
                <Typography variant="body2">${product.price}</Typography>
            </Box>
            <IconButton className="delete-btn" onClick={() => handleDeleteProduct(product)}>
                <DeleteForeverOutlinedIcon />
            </IconButton>
        </StyledCartItem>
    )
}

export default CartItem;