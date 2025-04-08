import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_treatment.jpg';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import imageServiceTreat1 from '../../../assets/images/appointment_selectservice_1.jpg';
import imageServiceTreat2 from '../../../assets/images/appointment_selectservice_2.jpg';
import imageServiceTreat3 from '../../../assets/images/appointment_selectservice_3.jpg';
import '../../../assets/css/clients/card_service_treatment.scss'; // Import the CSS file

const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent1})`,
        height: 500,
        backgroundSize: 'cover',
    },
};

const serviceTreatData = [
    {
        img: imageServiceTreat1,
        title: "Foundation Fundamentals",
        content: "Meet your perfect match, coverage & finish with the help of Clinique’s Shade Match Science",

    },
    {
        img: imageServiceTreat2,
        title: "Foundation Fundamentals",
        content: "Meet your perfect match, coverage & finish with the help of Clinique’s Shade Match Science",

    },
    {
        img: imageServiceTreat3,
        title: "Foundation Fundamentals",
        content: "Meet your perfect match, coverage & finish with the help of Clinique’s Shade Match Science",

    },
    {
        img: imageServiceTreat3,
        title: "Foundation Fundamentals",
        content: "Meet your perfect match, coverage & finish with the help of Clinique’s Shade Match Science",

    },
    {
        img: imageServiceTreat2,
        title: "Foundation Fundamentals",
        content: "Meet your perfect match, coverage & finish with the help of Clinique’s Shade Match Science",

    },
    {
        img: imageServiceTreat1,
        title: "Foundation Fundamentals",
        content: "Meet your perfect match, coverage & finish with the help of Clinique’s Shade Match Science",

    },
    {
        img: imageServiceTreat2,
        title: "Foundation Fundamentals",
        content: "Meet your perfect match, coverage & finish with the help of Clinique’s Shade Match Science",

    },
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

    return (
        <Box
            sx={{
                marginTop: 6,
                marginBottom: 5,
                boxShadow: 'none',
                height: 'auto',
                overflowX: 'hidden', // Hide the horizontal scrollbar
            }}
        >
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
            ) : (
                <Paper style={image_contentData.paperContainer1} sx={{ boxShadow: 'none' }} />
            )}
            <Paper
                sx={{
                    marginTop: 13,
                    marginBottom: 15.75,
                    boxShadow: 'none',
                }}
            >
                <Grid2>
                    {/* Treatment */}
                    <Box
                        className="card-container" // Add the class name to apply the grid layout
                        sx={{
                            marginBottom: 12,
                        }}
                    >
                        {serviceTreatData.map((image) => (
                            <Card
                                key={image.img}
                                sx={{
                                    width: 502, // Set a fixed width for each card
                                    boxShadow: 'none',
                                }}
                            >
                                {loading ? (
                                    <Skeleton variant="rectangular" animation="wave" height={600} />
                                ) : (
                                    <CardActionArea href="/News1">
                                        <CardMedia component="img" height="600" width="502" image={image.img} alt="img" />
                                        <CardContent>
                                            <Typography gutterBottom variant="h5" component="div" sx={{ fontWeight: 700 }}>
                                                {image.title}
                                            </Typography>
                                            <Typography gutterBottom variant="h6" color="text.secondary">
                                                {image.content}
                                            </Typography>
                                        </CardContent>
                                    </CardActionArea>
                                )}
                                <CardActions>
                                    {loading ? (
                                        <Skeleton variant="rectangular" animation="wave" width={176} height={60} />
                                    ) : (
                                        <Button
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
        </Box>
    )
}

export default Body_content;