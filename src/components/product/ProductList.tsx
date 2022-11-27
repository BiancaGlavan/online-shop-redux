import { Grid } from "@mui/material";
import { Link } from "react-router-dom";
import { IProduct } from "../../features/apiSlice";
import ProductCard from "./ProductCard";

interface IPropsProductList {
    products: IProduct[];
}

const ProductList = ({ products }: IPropsProductList) => {
    return (
        <Grid sx={{marginTop: '30px'}} container spacing={2}>
            {products.map((product) => <Grid key={product.id} item xs={12} sm={6} md={4} lg={3}>
                <Link to={`/products/${product.id}`}><ProductCard product={product}/></Link>
            </Grid>)}
        </Grid>
    )
}

export default ProductList;