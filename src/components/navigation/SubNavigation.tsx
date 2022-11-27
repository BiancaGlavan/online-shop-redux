import { styled } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { ICategory } from "../../features/apiSlice";

interface IPropsSubNavigation {
  categories: ICategory[];
}

const StyledSubNavigation = styled('div')`
  padding: 10px;
  display: flex;
  align-items: center;
  justify-content: center;
  max-width: 100%;
  overflow: auto;

  .category{
    margin: 0 10px;
    font-weight: 500;

    &.active {
      color: ${props => props.theme.palette.primary.main};
    }
  }
`;

const SubNavigation = ({ categories }: IPropsSubNavigation) => {

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
    <StyledSubNavigation>
      {categories.map((category, idx) => <Link className={`category ${category.id === activeCategoryId ? 'active' : ''}`} key={category.id} to={'/categories/' + category.id}>{category.name}</Link>)}
    </StyledSubNavigation>
  )
}

export default SubNavigation;