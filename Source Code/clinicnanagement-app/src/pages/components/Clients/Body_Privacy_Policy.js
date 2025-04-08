import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_aboutus.jpg';
import imageContent2 from '../../../assets/images/image_content_aboutus1.jpg';
import imageContent3 from '../../../assets/images/image_content_aboutus2.jpg';
import imageContent4 from '../../../assets/images/image_content_aboutus3.jpg';
import imageContent5 from '../../../assets/images/image_content4.jpg';
import Skeleton from '@mui/material/Skeleton';
import 'slick-carousel/slick/slick-theme.css';
import Snackbar from '@mui/material/Snackbar';
import { Alert, Fade, Slide } from '@mui/material';

const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent1})`,
        height: 577,
        backgroundSize: 'cover',
    },
    paperContainer2: {
        backgroundImage: `url(${imageContent2})`,
        height: 985,
        backgroundSize: 'cover',
    },
    paperContainer3: {
        backgroundImage: `url(${imageContent3})`,
        height: 985,
        backgroundSize: 'cover',
    },
    paperContainer4: {
        backgroundImage: `url(${imageContent4})`,
        height: 985,
        backgroundSize: 'cover',
    },
    paperContainer5: {
        backgroundImage: `url(${imageContent5})`,
        height: 577,
        backgroundSize: 'cover',
    },
};

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
                    sx={{ boxShadow: 'none' }} />
            )}
            <br />
            <br />
            <br />
            <br />
            <br />
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
            ) : (
                <Paper style={image_contentData.paperContainer2}
                    sx={{ boxShadow: 'none' }} />
            )}
            <br />
            <br />
            <br />
            <br />
            <br />
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
            ) : (
                <Paper style={image_contentData.paperContainer3}
                    sx={{ boxShadow: 'none' }} />
            )}
            <br />
            <br />
            <br />
            <br />
            <br />
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
            ) : (
                <Paper style={image_contentData.paperContainer4}
                    sx={{ boxShadow: 'none' }} />
            )}
            <br />
            <br />
            <br />
            <br />
            <br />
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
            ) : (
                <Paper
                    onClick={handleClick(SlideTransition)}
                    style={image_contentData.paperContainer5}
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
                        <Alert variant="filled" severity="info" sx={{ width: '100%', height: 50, alignItems:'center' }}>
                            Coming Soon!!!
                        </Alert>
                    </Snackbar>
                </Paper>
            )}
        </Box >
    )
}

export default Body_content;