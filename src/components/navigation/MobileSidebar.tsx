import { Box, Divider, Drawer, Typography } from "@mui/material"
import { Link, useLocation } from "react-router-dom";
import { ICategory } from "../../features/apiSlice";
import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";

interface IPropsMobileSidebar {
  isOpen: boolean;
  handleToggle: () => void;
  categories: ICategory[];
}

const StyledMobileSideBar = styled(Drawer)`

  .logo {
    text-align: center;
    padding: 20px;
  }

  .categories {
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 40px 0;
  }
  .category {
    margin-bottom: 40px;

    &.active {
      color: ${props => props.theme.palette.primary.main};
    }
  }
`;

const MobileSidebar = ({ isOpen, handleToggle, categories }: IPropsMobileSidebar) => {

  const location = useLocation();
  
  const [activeCategoryId, setActiveCategoryId] = useState(0);
  
  useEffect(() => {
    if(location.pathname.includes('/categories/')) {
      let id = location.pathname.replace('/categories/', '');
      setActiveCategoryId(parseInt(id));
    } else {
      setActiveCategoryId(0);
    }

  }, [location.pathname]);

  return (
    <StyledMobileSideBar
      variant="temporary"
      open={isOpen}
      onClose={handleToggle}
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
      sx={{
        display: { xs: 'block', md: 'none' },
        '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 280 },
      }}
    >
      <Box className="logo">
        <Typography variant="h6">
          BI.ANCA
        </Typography>
      </Box>
      <Divider />
      <Box className="categories">
        {categories.map((category, idx) => <Link className={`category ${category.id === activeCategoryId ? 'active' : ''}`} key={category.id} to={'/categories/' + category.id}>{category.name}</Link>)}
      </Box>

    </StyledMobileSideBar>
  )
}

export default MobileSidebar