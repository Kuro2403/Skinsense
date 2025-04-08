import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/background_Upload_image.jpg';
import imageContent2 from '../../../assets/images/image_content4.jpg';
import { Alert, Button, Card, CardActionArea, CardMedia, Fade, IconButton, Slide, Snackbar, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import Stack from '@mui/material/Stack';
import imageStep1 from '../../../assets/images/step1_detect_acne.jpg';
import imageStep2 from '../../../assets/images/step2_detect_acne.jpg';
import imageStep3 from '../../../assets/images/step3_detect_acne.jpg';
import UploadIcon from '@mui/icons-material/Upload';
import ClearIcon from '@mui/icons-material/Clear';
import CircularProgress from '@mui/material/CircularProgress';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { GetPatientByEmail, getCurrentDate } from '../../../helper/Util';
import { CreateReportFromAiServices } from '../../../api/peportFromAiServices';

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

const stepData = [
    {
        img: imageStep1,

    },
    {
        img: imageStep2,

    },
    {
        img: imageStep3,

    },
];

const Body_content = () => {

    // skeleton effect
    const [loading, setLoading] = useState(true);
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

    const [selectedImage, setSelectedImage] = useState(null);

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = () => {
        // Trigger a click on the hidden file input element
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };
    const [fileImage, setFileImage] = useState('');
    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };
        if (file) {
            setFileImage(file);
            setNoImage(true);
            reader.readAsDataURL(file);
        }
    };

    const handleRemoveImage = () => {
        setSelectedImage(null);
        setNoImage(false);
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

    // const [loading, setLoading] = useState(false);
    const [noImage, setNoImage] = useState(false);
    const scanAI = () => {
        setLoading(true);
        const formData = new FormData();
        formData.append('file', fileImage);
        axios.post('https://api-detection-cc7blhfv5a-nw.a.run.app', formData)
            .then(response => {
                sessionStorage.setItem('scanAIData', JSON.stringify(response.data));
                setLoading(false); // Kết thúc loading
                addScanAIToDB();
                navigate("/Detect Acne1");
            })
            .catch(error => {
                console.error('Error fetching data:', error);
                setLoading(false); // Kết thúc loading
            });
    };
    const addScanAIToDB = async () => {
        const data = sessionStorage.getItem('scanAIData');
        const email = sessionStorage.getItem('Email');
        const patient = await GetPatientByEmail(email);
        sessionStorage.setItem('patientID', patient.patientID);

        const dataParse = JSON.parse(data);
        const reportAIModel = {
            DateCreate: getCurrentDate(),
            PatientID: patient.patientID,
            ImageDetected: dataParse.path_image_result,
            Evaluate: dataParse.Evaluate,
            Acne_scars: dataParse.acne_scars.toString(),
            Papular: dataParse.papular.toString(),
            Blackhead: dataParse.blackhead.toString(),
            Purulent: dataParse.purulent.toString(),
            Sebo_crystan_conglo: dataParse.sebo_crystan_conglo.toString(),
            Total_of_acne_detected: dataParse.totalDetection.toString(),
        }
        await CreateReportFromAiServices(reportAIModel)
    }

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
                    sx={{ boxShadow: 'none', textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
                >
                    <br />
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
                        onDrop={handleDrop}
                        onDragOver={(e) => e.preventDefault()} // Prevent default to enable drop
                    >
                        {selectedImage ? (
                            <div style={{ position: 'relative' }}>
                                <IconButton onClick={handleRemoveImage}
                                    style={{
                                        position: 'absolute',
                                        top: 5,
                                        right: 5,
                                        color: 'red'
                                    }}>
                                    <ClearIcon sx={{ fontSize: 30 }} />
                                </IconButton>
                                <img
                                    src={selectedImage}
                                    alt='img'
                                    height={350}
                                    width={640}
                                    style={{ marginTop: 6 }}
                                />
                            </div>
                        ) : (
                            <IconButton onClick={handleImageUpload}>
                                <UploadIcon sx={{ fontSize: 60 }} />
                                <p>Upload image</p>
                            </IconButton>
                        )}
                        <input
                            type="file"
                            id="fileInput"
                            hidden
                            onChange={handleFileInputChange}
                        />
                    </Box>
                    <br />
                    {loading ? (
                        <Skeleton
                            variant="text"
                            animation="wave"
                            width={410}
                            height={80}
                            sx={{ margin: '0 auto' }}
                        />
                    ) : (
                        <>
                            {
                                noImage && (
                                    <Button
                                        onClick={scanAI}
                                        variant="contained"
                                        component="label"
                                        sx={{
                                            fontSize: 40,
                                            fontWeight: 500,
                                            backgroundColor: '#000000',
                                            color: '#FFFF',
                                            borderRadius: 10,
                                            width: 250,
                                            height: 100,
                                            ":hover": { background: 'grey' }
                                        }}
                                    >
                                        {loading ? <CircularProgress size={24} color="inherit" /> : 'SCAN'}
                                    </Button>
                                )
                            }
                        </>

                    )}
                </Paper>
            )}
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
                            display: 'flex',
                            justifyContent: 'center', // Center the Stack horizontally
                            marginBottom: 5
                        }}>
                        <Typography
                            sx={{
                                width: 'fit-content',
                                color: '#000',
                                borderRadius: 30,
                                fontSize: 70,
                                fontWeight: 700,
                            }}
                        >
                            {loading ? <Skeleton variant="text" animation="wave" width={300} height={100} /> : 'How it work:'}
                        </Typography>
                    </Box>
                    <br />
                    <Box
                        sx={{
                            marginBottom: 12,
                            display: 'flex',
                            justifyContent: 'center', // Center the Stack horizontally
                        }}>
                        <Stack direction="row" spacing={2}>
                            {stepData.map((image) => (
                                <Card key={image.img}
                                    sx={{
                                        maxWidth: 660,
                                        boxShadow: 'none',
                                    }}>
                                    {loading ? (
                                        <Skeleton variant="rectangular" animation="wave" width={660} height={525} />
                                    ) : (
                                        <CardActionArea>
                                            <CardMedia
                                                component="img"
                                                height="525"
                                                image={image.img}
                                                alt='img'
                                            />
                                        </CardActionArea>
                                    )}
                                </Card>
                            ))}
                        </Stack>
                    </Box>
                </Grid2>
            </Paper>
            {loading ? (
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
            )}
        </Box >
    )
}

export default Body_content;