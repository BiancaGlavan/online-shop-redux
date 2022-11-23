import { Box, Divider, Drawer, Typography } from "@mui/material"
import { Link } from "react-router-dom";
import { ICategory } from "../../features/apiSlice";
import { styled } from "@mui/material/styles";

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
  }
`;

const MobileSidebar = ({ isOpen, handleToggle, categories }: IPropsMobileSidebar) => {
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
        {categories.map((category, idx) => <Link className="category" key={category.id} to={'/categories/' + category.id}>{category.name}</Link>)}
      </Box>

    </StyledMobileSideBar>
  )
}

export default MobileSidebar