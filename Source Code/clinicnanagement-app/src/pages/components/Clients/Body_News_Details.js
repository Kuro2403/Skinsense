import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Card, CardActionArea, CardActions, CardContent, CardMedia, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import { useParams } from 'react-router-dom';
import { GetNewServices } from '../../../api/newServices';
import { GetAllNewsServices } from '../../../api/newServices';
import { useNavigate } from 'react-router-dom';

const Body_content = () => {
    const { newsID } = useParams();
    const [newsData, setNewsData] = useState(null);
    const [rows, setRows] = useState([]); // State to store news data
    // Define the userSignedIn state variable
    const [userSignedIn] = useState(
        sessionStorage.getItem('Email') !== null && sessionStorage.getItem('Email') !== undefined
    );
    const navigate = useNavigate();

    // skeleton effect
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // Conditionally fetch news data based on user sign-in status
        getNewsSignedIn();

        async function fetchNewsData() {
            const data = await GetNewServices(newsID);
            setNewsData(data);
            setLoading(false); // Set loading to false once data is fetched
        }

        // Simulating loading time
        const timer = setTimeout(() => {
            fetchNewsData();
        }, 500);

        return () => clearTimeout(timer);
    }, [newsID, userSignedIn]);

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
            {/* detail of new */}
            <Grid2
                sx={{
                    display: 'flex',
                    justifyContent: 'center',
                }}
            >
                {/* Label */}
                <Box
                    sx={{
                        maxWidth: 1390,
                        justifyContent: 'center',
                    }}
                >
                    {newsData ? (
                        <Paper
                            sx={{
                                boxShadow: 'none',
                            }}>
                            <Typography gutterBottom
                                sx={{
                                    fontSize: 80,
                                    fontWeight: 700
                                }}
                            >
                                {newsData.title}
                            </Typography>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                <img src={newsData.newImage} width={640} height={640} alt='img'
                                    style={{ borderRadius: 50 }}
                                />
                            </Box>
                            <br />
                            <Typography gutterBottom paragraph
                                sx={{
                                    fontSize: 25,
                                    fontWeight: 500
                                }}
                            >
                                {newsData.newsContext}
                            </Typography>
                        </Paper>
                    ) : (
                        // Show skeleton loading effect when newsData is null (loading)
                        <Skeleton
                            variant="rectangular"
                            animation="wave"
                            width={640}
                            height={800} // Adjust the height as needed
                            sx={{
                                margin: 'auto',
                            }}
                        />
                    )}
                </Box>
            </Grid2>
            {/* Read more */}
            <Paper
                sx={{
                    marginTop: 17,
                    marginBottom: 15.75,
                    boxShadow: 'none'
                }}>
                <Grid2>
                    <Box
                        sx={{
                            marginTop: 15,
                            marginRight: 180,
                            display: 'flex',
                            justifyContent: 'center',
                        }}>
                        <Typography
                            sx={{
                                width: 'fit-content',
                                color: '#000',
                                borderRadius: 30,
                                fontSize: 40,
                                fontWeight: 600,
                            }}
                        >
                            {loading ? <Skeleton variant="text" animation="wave" width={200} height={50} />
                                : 'Read more:'}
                        </Typography>
                    </Box>
                    <br />
                    {/* news list */}
                    <Box
                        className="card-container" // Add the class name to apply the grid layout
                        sx={{
                            marginBottom: 12,
                        }}
                    >
                        {rows.slice(0, 3).map((row) => (
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