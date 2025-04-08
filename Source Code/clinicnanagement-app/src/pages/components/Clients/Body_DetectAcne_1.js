import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/background_Upload_image.jpg';
import imageContent2 from '../../../assets/images/image_content4.jpg';
import { Alert, Button, Card, CardActionArea, CardMedia, Divider, Fade, IconButton, Slide, Snackbar, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import Stack from '@mui/material/Stack';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { Link, useNavigate } from 'react-router-dom';
import { GetReportFromAIByPatientID } from '../../../helper/Util';
import { GetReportFromAiervices } from '../../../api/peportFromAiServices';

const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent1})`,
        height: 739,
        backgroundSize: 'cover',
    },
    paperContainer2: {
        backgroundImage: `url(${imageContent2})`,
        height: 545,
        backgroundSize: 'cover',
    },
};


const Body_content = () => {
    const [historySampleData, setHistorySampleData] = useState([]);

    // skeleton effect
    const [loading, setLoading] = useState(true);
    const [dataScanning, setDataScanning] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        const email = sessionStorage.getItem('Email');
        if (email === null) {
            navigate("/login");
        }
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [navigate]);
    useEffect(() => {
        scanData();
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);
    const scanData = async () => {
        const patientID = sessionStorage.getItem('patientID');
        const reportAI = await GetReportFromAIByPatientID(patientID);
        setHistorySampleData(reportAI);
        const data = sessionStorage.getItem('scanAIData');
        const dataParse = JSON.parse(data);
        setDataScanning(dataParse);
    }

    const historyScan = async (id) => {
        const dataParse = await GetReportFromAiervices(id);
        const data = {
            Evaluate: dataParse.evaluate,
            acne_scars: dataParse.acne_scars,
            blackhead: dataParse.blackhead,
            papular: dataParse.papular,
            purulent: dataParse.purulent,
            path_image_result: dataParse.imageDetected,
            sebo_crystan_conglo: dataParse.sebo_crystan_conglo,
            totalDetection: dataParse.total_of_acne_detected,
        }
        setDataScanning(data);
    }

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const totalPages = Math.ceil(historySampleData.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleItems = historySampleData.slice(startIndex, startIndex + itemsPerPage);

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
        <Box
            sx={{
                marginTop: 6,
                marginBottom: 5,
                boxShadow: 'none',
                height: 'auto',
                overflowX: 'hidden', // Hide the horizontal scrollbar
            }}>
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
            ) : (
                <Paper style={image_contentData.paperContainer1}
                    sx={{ boxShadow: 'none', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <br />
                    <Stack direction={'row'} spacing={25}>
                        <Box
                            sx={{
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            <Box
                                sx={{
                                    width: 680,
                                    height: 380,
                                    background: 'white',
                                    borderRadius: 5,
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginTop: 12
                                }}
                                onDragOver={(e) => e.preventDefault()} // Prevent default to enable drop
                            >
                                <img
                                    src={dataScanning.path_image_result}
                                    alt='img'
                                    height={350}
                                    width={640}
                                    style={{ marginTop: 6 }}
                                />
                            </Box>
                            <br />
                            <Link to='/Detect Acne'>
                                <Button
                                    variant="contained"
                                    component="label"
                                    sx={{
                                        fontSize: 30,
                                        fontWeight: 500,
                                        backgroundColor: '#000000',
                                        color: '#FFFF',
                                        borderRadius: 10,
                                        height: 100,
                                        ":hover": { background: 'grey' },
                                    }}
                                >
                                    Upload another image
                                </Button>
                            </Link>
                        </Box>
                        {/* Result after when scan acne */}
                        <Box>
                            <Box
                                sx={{
                                    width: 500,
                                    display: 'inline-block', // Set display to inline-block
                                    padding: 2, // Add padding to create space around the content
                                    background: 'white',
                                    borderRadius: 5,
                                    marginTop: 12,
                                }}
                            >
                                <Typography variant='h5'>
                                    Detected on the skin of your face there are {dataScanning.totalDetection} types of acne:
                                </Typography>
                                <br />
                                <TableContainer component={Paper}
                                    sx={{
                                        boxShadow: 'rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px',
                                    }}
                                >
                                    <Table>
                                        <TableHead>
                                            <TableRow>
                                                <TableCell align="center">Acne Type</TableCell>
                                                <TableCell align="center">Amounts</TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align="center">Acne scars</TableCell>
                                                <TableCell align="center">{dataScanning.acne_scars}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">Papular</TableCell>
                                                <TableCell align="center">{dataScanning.papular}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">Purulent</TableCell>
                                                <TableCell align="center">{dataScanning.purulent}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">Sebo-Crystan-Conglo</TableCell>
                                                <TableCell align="center">{dataScanning.sebo_crystan_conglo}</TableCell>
                                            </TableRow>
                                            <TableRow>
                                                <TableCell align="center">Blackheads</TableCell>
                                                <TableCell align="center">{dataScanning.blackhead}</TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                                <br />
                                <Typography variant='h5'>
                                    Evaluate: {dataScanning.Evaluate} </Typography>
                            </Box>
                        </Box>
                    </Stack>
                </Paper>
            )
            }
            <Paper
                sx={{
                    marginTop: 5.41375,
                    marginBottom: 12,
                    boxShadow: 'none'
                }}>
                <Grid2>
                    {/* Treatment */}
                    <Box
                        sx={{
                            marginBottom: 5,
                            paddingLeft: 14.25
                        }}>
                        <Typography
                            sx={{
                                color: '#000',
                                fontSize: 70,
                                fontWeight: 700,
                            }}
                        >
                            {loading ? <Skeleton variant="text" animation="wave" width={300} height={100} /> : 'History'}
                        </Typography>
                    </Box>
                    <Divider />
                    <br />
                    <Box className="history" sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
                        {totalPages > 0 && (
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'space-between',
                                    padding: '1rem',
                                    left: 0,
                                    right: 0,
                                    height: '38%', // Set the height to be the same as the History box
                                    alignItems: 'center', // Center the buttons vertically
                                }}
                            >
                                {loading ? (
                                    <Skeleton variant="circular" animation="wave" width="100%" height={495} />
                                ) : (
                                    <IconButton
                                        disabled={currentPage === 1}
                                        onClick={handlePreviousPage}
                                        sx={{
                                            marginRight: 10,
                                            fontWeight: 500,
                                            color: 'black',
                                            borderRadius: 10,
                                            ":hover": { Color: 'rgba(0, 0, 0, 0.8)' },
                                        }}
                                    >
                                        <ArrowBackIosIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                )}
                                {/* image */}
                                <Stack direction={'row'} spacing={5}>
                                    {visibleItems.map((image) => (
                                        <Card
                                            onClick={() => {
                                                historyScan(image.reportAiID);
                                            }}
                                            key={image.reportAiID}
                                            sx={{
                                                maxWidth: 485,
                                                boxShadow: 'none',
                                            }}
                                        >
                                            {loading ? (
                                                <Skeleton variant="rectangular" animation="wave" width={485} height={405} />
                                            ) : (
                                                <CardActionArea >
                                                    <CardMedia component="img" height="405" image={image.imageDetected} alt="img" />
                                                </CardActionArea>
                                            )}
                                        </Card>
                                    ))}
                                </Stack>
                                {/* image */}
                                {loading ? (
                                    <Skeleton variant="circular" animation="wave" width="100%" height={495} />
                                ) : (
                                    <IconButton
                                        disabled={currentPage === totalPages}
                                        onClick={handleNextPage}
                                        sx={{
                                            marginLeft: 10,
                                            fontWeight: 500,
                                            color: 'black',
                                            borderRadius: 10,
                                            ":hover": { Color: 'rgba(0, 0, 0, 0.8)' },
                                        }}
                                    >
                                        <ArrowForwardIosIcon sx={{ fontSize: 50 }} />
                                    </IconButton>
                                )}
                            </Box>
                        )}
                    </Box>
                    <br />
                    <Divider />
                </Grid2>
            </Paper>
            {
                loading ? (
                    <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
                ) : (
                    <Paper style={image_contentData.paperContainer2} onClick={handleClick(SlideTransition)}
                        sx={{
                            boxShadow: 'none',
                            marginBottom: 10
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
                )
            }
        </Box >
    )
}

export default Body_content;