import { Button, Card, CardActions, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IProduct } from "../../features/apiSlice";

interface IPropsProductCard {
    product: IProduct;
}

const StyledCard = styled(Card)`
    height: 100%;
    display: flex;
    flex-direction: column;
    cursor: pointer;

    .card-content {
        flex-grow: 1;
        display: flex;
        flex-direction: column;
        
        .price {
            margin-top: auto;
        }
    }
`;

const ProductCard = ({ product }: IPropsProductCard) => {
    return (
        <StyledCard className="ProductCard">
            <CardMedia
                component="img"
                height="140"
                image={product.images[0]}
                alt={product.title}
            />

            <CardContent className="card-content">
                <Typography gutterBottom variant="h5" component="div">
                    {product.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                    {product.description}
                </Typography>
                <Typography className="price" gutterBottom variant="h5" component="div">
                    Price: ${product.price}
                </Typography>
            </CardContent>
        </StyledCard>
    )
}

export default ProductCard;