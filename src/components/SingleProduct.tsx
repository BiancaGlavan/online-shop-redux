import { Box, Button, Grid, Paper, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { IProduct } from "../features/apiSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";

interface IPropsSingleProduct {
    product: IProduct;
    onAddToCart: (product: IProduct) => void;
}

const StyledSingleProduct = styled('div')`
   
    .product-images {
        width: 100%;
       

        ${props => props.theme.breakpoints.up("md")} {
            max-width: 500px;
        }
    }

    .product-slide {
        display: flex;
        justify-content: center;
        .product-image {
           max-width: 100%;
            max-height: 100%;
        }
    }

    .info {
        display: flex;
        flex-direction: column;
        justify-content: space-around;
        align-items: flex-start;  
        padding: 20px;
        height: 100%;

        ${props => props.theme.breakpoints.down("md")} {
            min-height: 350px;
        }
    }
`;

const SingleProduct = ({ product, onAddToCart }: IPropsSingleProduct) => {
    return (
        <StyledSingleProduct>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Swiper className="product-images"
                        navigation
                        modules={[Navigation]}
                        speed={800}
                        slidesPerView={1}
                        loop
                    >
                        {product?.images.map((img, idx) => <SwiperSlide key={idx} className="product-slide" >
                            <img className="product-image"
                                src={img} />
                        </SwiperSlide>)}

                    </Swiper>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Paper variant="outlined" className="info">
                        <Typography variant="h4">
                            {product?.title}
                        </Typography>
                        <Typography variant="h5">
                            {product?.category.name}
                        </Typography>
                        <Typography variant="body2">
                            {product?.description}
                        </Typography>
                        <Typography variant="h4">
                            Price: ${product?.price}
                        </Typography>
                        <Button onClick={() => {
                            onAddToCart(product);
                        }} variant="contained" color="primary">Add to Cart</Button>
                    </Paper>
                </Grid>
            </Grid>
        </StyledSingleProduct>
    )
}

export default SingleProduct;