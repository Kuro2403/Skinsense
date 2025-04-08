import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_news.jpg';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import Stack from '@mui/material/Stack';
import imageService1 from '../../../assets/images/image_service_mini1.jpg';
import imageService2 from '../../../assets/images/image_service_mini2.jpg';
import imageService3 from '../../../assets/images/image_service_mini3.jpg';
import imageServiceLearnMore from '../../../assets/images/image_service_learnmore.jpg';
import { GetAllNewsServices } from '../../../api/newServices';
import { useNavigate } from 'react-router-dom';


const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent1})`,
        height: 577,
        backgroundSize: 'cover',
    },
};

const serviceData = [
    {
        img: imageService1,
        content: "Detection your skin just 1 minute",
        Button: 'Scan now'
    },
    {
        img: imageService2,
        content: "Acne is a disease that affects the oil glands of the skin.",
        Button: 'Find out'
    },
    {
        img: imageService3,
        Button: 'Find out',
        content: "Measures to prevent acne from appearing on your face",
    },
];

const Body_content = () => {

    // skeleton effect
    const [loading, setLoading] = useState(true);
    const [rows, setRows] = useState([]); // State to store news data
    // Define the userSignedIn state variable
    const [userSignedIn] = useState(
        sessionStorage.getItem('Email') !== null && sessionStorage.getItem('Email') !== undefined
    );
    const navigate = useNavigate();

    useEffect(() => {

        getNewsSignedIn();

        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [userSignedIn]);

    const getNewsSignedIn = async () => {
        const data = await GetAllNewsServices();
        const reversedData = data.slice().reverse();
        setRows(reversedData);
    };



    return (
        <Box
            sx={{
                marginTop: 6,
                marginBottom: 5,
                boxShadow: 'none',
                height: 'auto',
                overflowX: 'hidden', // Hide the horizontal scrollbar
            }}>
            <Grid2
                sx={{
                    marginBottom: 9.25,
                    marginLeft: 18,
                }}
            >
                <Box
                    sx={{ display: 'flex' }}
                >
                    <Stack direction="row" spacing={10}>
                        {serviceData.map((image) => (
                            <Card key={image}
                                sx={{
                                    maxWidth: 240,
                                    boxShadow: 'none',
                                }}>
                                {loading ? (
                                    <Skeleton variant="rectangular" animation="wave" height={240} />
                                ) : (
                                    <CardActionArea>
                                        <CardMedia
                                            component="img"
                                            height="240"
                                            image={image.img}
                                            alt='img'
                                        />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" color="text.secondary">
                                                {image.content}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                )}
                                <CardActions>
                                    {loading ? (
                                        <Skeleton variant="rectangular" animation="wave" width={300} height={60} />
                                    ) : (
                                        <Button
                                            sx={{
                                                height: 30,
                                                borderRadius: 30,
                                                color: '#000',
                                                fontSize: 17,
                                                fontWeight: 700,
                                            }}>
                                            {image.Button}
                                        </Button>
                                    )}
                                </CardActions>
                            </Card>
                        ))}
                    </Stack>
                    <Box
                        sx={{
                            marginLeft: 26.75
                        }}
                    >
                        <Card
                            sx={{
                                maxWidth: 550,
                                boxShadow: 'none',
                            }}>
                            {loading ? (
                                <Skeleton variant="rectangular" animation="wave" height={245} />
                            ) : (
                                <CardActionArea>
                                    <CardMedia
                                        component="img"
                                        height="245"
                                        image={imageServiceLearnMore}
                                        alt='img'
                                    />
                                </CardActionArea>
                            )}
                            <CardActions>
                                {loading ? (
                                    <Skeleton variant="rectangular" animation="wave" width={300} height={60} />
                                ) : (
                                    <Button
                                        sx={{
                                            width: 148,
                                            height: 30,
                                            fontSize: 20,
                                            color: '#000',
                                            fontWeight: 400,
                                            textDecoration: 'underline',
                                        }}>
                                        Learn more
                                    </Button>
                                )}
                            </CardActions>
                        </Card>
                    </Box>
                </Box>
            </Grid2>
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
            ) : (
                <Paper style={image_contentData.paperContainer1}
                    sx={{ boxShadow: 'none' }} />
            )}
            <Paper
                sx={{
                    marginTop: 13,
                    marginBottom: 15.75,
                    boxShadow: 'none',
                }}
            >
                <Grid2>
                    {/* news list */}
                    <Box
                        className="card-container" // Add the class name to apply the grid layout
                        sx={{
                            marginBottom: 12,
                        }}
                    >
                        {rows.map((row) => (
                            <Card
                                key={row.newsID}
                                sx={{
                                    width: 502, // Set a fixed width for each card
                                    boxShadow: 'none',
                                }}
                            >
                                {loading ? (
                                    <Skeleton variant="rectangular" animation="wave" height={600} />
                                ) : (
                                    <CardActionArea
                                        // Navigate to NewsDetails page
                                        onClick={() => navigate(`/NewsDetails/${row.newsID}`)}
                                    >
                                        <CardMedia component="img" height="600" width="502" image={row.newImage} alt="img" />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 700 }}>
                                                {row.title}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                )}
                                <CardActions>
                                    {loading ? (
                                        <Skeleton variant="rectangular" animation="wave" width={176} height={60} />
                                    ) : (
                                        <Button
                                            // Navigate to NewsDetails page
                                            onClick={() => navigate(`/NewsDetails/${row.newsID}`)}
                                            sx={{
                                                width: 176,
                                                height: 60,
                                                borderRadius: 30,
                                                color: '#ffff',
                                                background: '#000',
                                                fontSize: 18,
                                                fontWeight: 400,
                                                ":hover": { background: 'gray' }
                                            }}
                                        >
                                            Learn more
                                        </Button>
                                    )}
                                </CardActions>
                            </Card>
                        ))}
                    </Box>
                </Grid2>
            </Paper>
        </Box >
    )
}

export default Body_content;