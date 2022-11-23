import { MenuOutlined, ShoppingCartOutlined } from "@mui/icons-material";
import { AppBar, Avatar, Badge, Box, Container, Divider, Drawer, IconButton, Menu, MenuItem, Toolbar, Typography, useMediaQuery } from "@mui/material";
import { styled, useTheme } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { useGetCategoriesQuery, useGetMyProfileQuery } from "../../features/apiSlice";
import { logout, setUser } from "../../features/authSlice";
import UserDropdown from "../UserDropdown";
import MobileSidebar from "./MobileSidebar";
import SubNavigation from "./SubNavigation";


const StyledNavigation = styled('div')`

    .MuiAppBar-root {
        background-color: ${props => props.theme.palette.background.paper};
        color: ${props => props.theme.palette.text.primary};
    }
    
    .nav-links {
        display: flex;
    }

    .logo {
        margin-right: auto;
        margin-left: 10px;
    }

    ${props => props.theme.breakpoints.up("sm")} {
       
    }

    ${props => props.theme.breakpoints.up("md")} {
    
    
    }
    ${props => props.theme.breakpoints.up("lg")} {
   
    }
`;


const Navigation = () => {
    // const { data: products, isLoading: productsLoading, isError: productsErr } = useGetProductsByCategoryQuery(2);
    const {data: categories, isLoading, isError} = useGetCategoriesQuery();
    
    const authState = useAppSelector(state => state.auth);

    const {data: userProfile, isSuccess} = useGetMyProfileQuery('', {skip: !authState.isAuth});
    const dispatch = useAppDispatch();
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('md'));

    const [mobileOpen, setMobileOpen] = useState(false);

    const navigate = useNavigate();
    
    const handleDrawerToggle = () => {
        setMobileOpen(!mobileOpen);
    };


    const handleLogout = () => {
        dispatch(logout());
        navigate('/');
    }

    useEffect(() => {
        if(isSuccess) {
            dispatch(setUser(userProfile));
        }
    }, [isSuccess])

    return (
        <StyledNavigation>
            <AppBar position="static">
                <Toolbar disableGutters>
                    {isMobile && <Box>
                        <IconButton onClick={handleDrawerToggle}>
                            <MenuOutlined />
                        </IconButton>
                    </Box>}
                    <Box className="logo">
                        <Typography variant="h6">
                            BI.ANCA
                        </Typography>
                    </Box>
                    {!isMobile && !authState.isAuth && <Box className="nav-links">
                        <Link to={'/register'}>
                            <MenuItem>
                                <Typography>Register</Typography>
                            </MenuItem>
                        </Link>
                        <Link to={'/login'}>
                            <MenuItem>
                                <Typography>Login</Typography>
                            </MenuItem>
                        </Link>
                    </Box>}
                    <Box>
                        <IconButton
                            size="large"
                            aria-label="show 17 new notifications"
                            color="inherit"
                        >
                            <Badge badgeContent={17} color="error">
                                <ShoppingCartOutlined />
                            </Badge>
                        </IconButton>
                    </Box>
                    {authState.isAuth && authState.user && <UserDropdown user={authState.user} handleLogout={handleLogout}/>}
                </Toolbar>
                <Divider />
                {!isMobile && <SubNavigation categories={categories || []}/>}
            </AppBar>
            <MobileSidebar handleToggle={handleDrawerToggle} isOpen={mobileOpen} categories={categories || []} />
        </StyledNavigation>
    )
}

export default Navigation;