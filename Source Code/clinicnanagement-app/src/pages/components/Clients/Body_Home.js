import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content1.jpg';
import imageContent2 from '../../../assets/images/image_content2.jpg';
import imageContent3 from '../../../assets/images/image_content3.jpg';
import imageContent4 from '../../../assets/images/image_content4.jpg';
import imageContentTitle1 from '../../../assets/images/image_content_title_appointment.jpg';
import imageContentTitle2 from '../../../assets/images/image_content_title_tipforskin.jpg';
import { Alert, Button, Card, CardActionArea, CardMedia, Fade, Slide } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import Snackbar from '@mui/material/Snackbar';
import { Link } from 'react-router-dom';

const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent1})`,
        height: 495,
        backgroundSize: 'cover',
    },
    paperContainer2: {
        backgroundImage: `url(${imageContent2})`,
        height: 495,
        backgroundSize: 'cover',
    },
    paperContainer3: {
        backgroundImage: `url(${imageContent3})`,
        height: 495,
        backgroundSize: 'cover'
    },
    paperContainer4: {
        backgroundImage: `url(${imageContent4})`,
        height: 545,
        backgroundSize: 'cover'
    },
    paperContainer5: {
        backgroundImage: `url(${imageContentTitle1})`,
        height: 362,
        backgroundSize: 'cover'
    },
    paperContainer6: {
        backgroundImage: `url(${imageContentTitle2})`,
        height: 362,
        backgroundSize: 'cover'
    },
};

const settings_dot_slide = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000, //  milliseconds between slide transitions
};

const sliderImages = [
    {
        img: imageContent3,
        page: '/news'
    },
    {
        img: imageContent3,
        page: '/news'
    }
];

const Body_content = () => {
    // skeleton effect
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const sliderRef = useRef(null);

    const handleAfterChange = (index) => {
        if (sliderRef.current) {
            const slick = sliderRef.current;
            const totalSlides = slick.innerSlider.state.slideCount;
            const currentSlideIndex = slick.innerSlider.state.currentSlide;

            if (currentSlideIndex === totalSlides - 1 || currentSlideIndex === 0) {
                slick.slickNext();
            }
        }
    };

    const [state, setState] = React.useState({
        open: false,
        Transition: Fade,
    });

    const handleClick = (Transition) => () => {
        setState({
            open: true,
            Transition,
        });
    };

    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }

    return (
        <Box sx={{
            marginTop: 6,
            marginBottom: 15.75,
            boxShadow: 'none',
            height: 'auto',
            overflowX: 'hidden', // Hide the horizontal scrollbar
        }}>
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
            ) : (
                <Paper style={image_contentData.paperContainer1}>
                    <Link to='/Detect Acne'>
                        <Button
                            sx={{
                                backgroundColor: 'red',
                                color: 'white',
                                height: 72,
                                width: 290,
                                marginTop: 35.25,
                                marginLeft: 16.75,
                                borderRadius: 50,
                                fontWeight: 900,
                                fontSize: 21
                            }}>
                            CHECK YOUR SKIN
                        </Button>
                    </Link>
                </Paper>
            )}
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
            ) : (
                <Paper style={image_contentData.paperContainer5} />
            )}
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
            ) : (
                <Paper style={image_contentData.paperContainer2}>
                    <Link to='/BookAppointment'>
                        <Button sx={{
                            backgroundColor: '#00378f',
                            color: 'white',
                            height: 76,
                            width: 300,
                            marginTop: 37.125,
                            marginLeft: 97.875,
                            borderRadius: 50,
                            fontWeight: 900,
                            fontSize: 24,
                            textTransform: 'none'
                        }}>
                            Booking now
                        </Button>
                    </Link>
                </Paper>
            )}
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
            ) : (
                <Paper style={image_contentData.paperContainer6} />
            )}
            <Paper
                sx={{
                    marginBottom: 10,
                    boxShadow: 'none'
                }}>
                <Grid2>
                    <Grid2 id="slider_image" >
                        {loading ? (
                            <Skeleton
                                variant="rectangular"
                                animation="wave"
                                height={495}
                            />
                        ) : (
                            <Slider {...settings_dot_slide} afterChange={handleAfterChange} ref={sliderRef}>
                                {sliderImages.map((image, index) => (
                                    <Card key={index} sx={{ boxShadow: 'none' }}>
                                        <CardActionArea onClick={() => window.location.href = image.page}>
                                            <CardMedia component="img" alt="TipsForSkin" image={image.img} />
                                        </CardActionArea>
                                    </Card>
                                ))}
                            </Slider>
                        )}
                    </Grid2>
                </Grid2>
            </Paper>
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={550} />
            ) : (
                <Paper
                    onClick={handleClick(SlideTransition)}
                    style={image_contentData.paperContainer4}
                    sx={{
                        cursor: 'pointer',
                        boxShadow: 'none'
                    }}
                >
                    <Snackbar
                        open={state.open}
                        onClose={handleClose}
                        autoHideDuration={1200}
                        TransitionComponent={state.Transition}
                        key={state.Transition.name}
                    >
                        <Alert variant="filled" severity="info" sx={{ width: '100%', height: 50, alignItems: 'center' }}>
                            Coming Soon!!!
                        </Alert>
                    </Snackbar>
                </Paper>
            )}
        </Box >
    );
}

export default Body_content;