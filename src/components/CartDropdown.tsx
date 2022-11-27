import { ShoppingCartOutlined } from "@mui/icons-material";
import { Badge, Box, Button, IconButton, Menu, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";
import { Link } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { IProduct } from "../features/apiSlice";
import { removeProduct } from "../features/cartSlice";
import CartItem from "./product/CartItem";

const StyledCartDropdown = styled(Box)`

`;

const StyledMenu = styled(Menu)`

    .MuiList-root{
        padding: 20px;
    }

    .subtotal {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        margin-bottom: 20px;
    }

    .cartitem-title {
        margin-bottom: 20px;
    }

`;



const CartDropdown = () => {
    const dispatch = useAppDispatch();
    const cartState = useAppSelector(state => state.cart);
    const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

    const open = Boolean(anchorEl);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        if(cartState.products.length > 0) {
            setAnchorEl(event.currentTarget);
        }
        
    };
    const handleClose = () => {
        setAnchorEl(null);
    };

    const calcTotal = () => {
        let res = 0;

        cartState.products.forEach(product => {
            res = res + product.price;
        });

        return res;
    }

  const handleRemoveProduct = (prod: IProduct) => {
    dispatch(removeProduct(prod));
    if(cartState.products.length === 1) {
        handleClose();
    }
  }


    return (
        <>
            <StyledCartDropdown>
                <IconButton style={{ marginRight: '20px' }}
                    onClick={handleClick}
                    size="large"
                    aria-label=""
                    color="inherit"
                >
                    <Badge badgeContent={cartState.products.length} color="error">
                        <ShoppingCartOutlined />
                    </Badge>
                </IconButton>
            </StyledCartDropdown>
            <StyledMenu
                anchorEl={anchorEl}
                id="account-menu"
                open={open}
                onClose={handleClose}
                PaperProps={{
                    elevation: 0,
                    sx: {
                        mr: '5px',
                        overflow: 'visible',
                        filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                        mt: 1.5,
                        '& .MuiAvatar-root': {
                            width: 32,
                            height: 32,
                            ml: -0.5,
                            mr: 1,
                        },
                        '&:before': {
                            content: '""',
                            display: 'block',
                            position: 'absolute',
                            top: 0,
                            right: 14,
                            width: 10,
                            height: 10,
                            bgcolor: 'background.paper',
                            transform: 'translateY(-50%) rotate(45deg)',
                            zIndex: 0,
                        },
                    },
                }}
                transformOrigin={{ horizontal: 'right', vertical: 'top' }}
                anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
            >
                <Typography className="cartitem-title" variant="h6">Products in your cart</Typography>
                {cartState.products.map((product, idx) => <CartItem key={product.id} product={product} handleDeleteProduct={handleRemoveProduct}/>)}
                <Box className="subtotal">
                    <Typography variant="subtitle2">SUBTOTAL</Typography>
                    <Typography variant="subtitle2">${calcTotal()}</Typography>
                </Box>
                <Link onClick={handleClose} to={'/shopping-cart'}>
                    <Button variant="contained" color="primary">
                        Checkout
                    </Button>
                </Link>
            </StyledMenu>
        </>
    )
}

export default CartDropdown;