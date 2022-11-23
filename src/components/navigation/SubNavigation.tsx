import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";
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
  }
`;

const SubNavigation = ({ categories }: IPropsSubNavigation) => {
  return (
    <StyledSubNavigation>
      {categories.map((category, idx) => <Link className="category" key={category.id} to={'/categories/' + category.id}>{category.name}</Link>)}
    </StyledSubNavigation>
  )
}

export default SubNavigation;