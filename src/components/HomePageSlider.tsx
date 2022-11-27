import { ICategory } from "../features/apiSlice";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { Box, Button, Card, CardContent, CardMedia, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import { Link } from "react-router-dom";


interface IPropsHomePageSlider {
    categories: ICategory[];
}

const StyledHomePageSlider = styled('div')`

    .my-swiper {
        height: 500px;


    }

    .slider-card {
        height: 100%;
    }

    .card-box {
        display: flex;
        height: 100%;

        ${props => props.theme.breakpoints.down("sm")} {
            flex-direction: column;

            .card-media {
                max-width: 100%;
                height: 250px;
            }
        }
    }

    .card-content {
        padding: 10px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        width: 100%;

        .category-name {
            text-align: center;
        }
    }

    .card-media {
        max-width: 60%;
        max-height: 500px;

        ${props => props.theme.breakpoints.up("sm")} {
            max-width: 50%;
        }

        ${props => props.theme.breakpoints.up("md")} {
            max-width: 60%;
        }
    }

    .swiper-button-next, .swiper-button-prev {
        color: ${props => props.theme.palette.primary.main};
    }
`;

const HomePageSlider = ({ categories }: IPropsHomePageSlider) => {
    return (
        <StyledHomePageSlider>
            <Swiper className="my-swiper" navigation
                modules={[Navigation]}
                speed={800}
                slidesPerView={1}
                loop
            >
                {categories.map((category) => <SwiperSlide key={category.id} className="swiper-slide">

                    <Card className="slider-card">
                        <Box className="card-box">
                            <CardMedia className="card-media"
                                component="img"
                                image={category.image}
                                alt={category.name}
                            />
                            <CardContent className="card-content">
                                <Typography>
                                    Category:
                                </Typography>
                                <Typography className="category-name" variant="h4">
                                    {category.name}
                                </Typography>
                                <Link to={`categories/${category.id}`}>
                                    <Button style={{ marginTop: '50px' }} variant="contained" color="primary">See More!</Button>
                                </Link>
                            </CardContent>
                        </Box>
                    </Card>
                </SwiperSlide>)}
            </Swiper>
        </StyledHomePageSlider>
    )
}

export default HomePageSlider;