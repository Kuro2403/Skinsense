import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_appointment.jpg';
import { Button, ToggleButton, ToggleButtonGroup, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from '@mui/system';
import 'slick-carousel/slick/slick-theme.css';
import Stack from '@mui/material/Stack';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Check from '@mui/icons-material/Check';
import SettingsIcon from '@mui/icons-material/Settings';
import GroupAddIcon from '@mui/icons-material/GroupAdd';
import VideoLabelIcon from '@mui/icons-material/VideoLabel';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';
import PropTypes from 'prop-types';
import ReplyIcon from '@mui/icons-material/Reply';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { StaticDatePicker } from '@mui/x-date-pickers/StaticDatePicker';
// import axios from 'axios';
import dayjs from 'dayjs';
import { useNavigate } from 'react-router-dom';


const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent1})`,
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

    const handleDateChange = (date) => {
        // Convert the selected date to a format suitable for the backend
        const formattedDate = dayjs(date).format('DD/MM/YYYY');
        sessionStorage.setItem('BAAppointmentDate', formattedDate);
    };

    const [selectedSlot, setSelectedSlot] = useState(null);
    const [validationError, setValidationError] = useState('');

    const handleSlotChange = (event, newSlot) => {
        setSelectedSlot(newSlot);
        sessionStorage.setItem('BAAppointmentTime', newSlot);
        if (validationError && newSlot) {
            setValidationError('');
        }
    };

    const validateForm = () => {
        if (!selectedSlot) {
            return 'Please select a slot time!';
        }
        return '';
    };

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const formValidationError = validateForm();

        if (formValidationError) {
            setValidationError(formValidationError);
            return;
        }

        // Redirect to another page
        window.location.href = '/BookAppointment2';
    };

    return (
        <Box sx={{
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
            <Paper
                sx={{
                    marginTop: 5.41375,
                    marginBottom: 15.75,
                    boxShadow: 'none'
                }}>
                <Grid2>
                    <Grid2>
                        {loading ? (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={'80%'}
                                height={80}
                                sx={{ margin: '0 auto' }}
                            />
                        ) : (
                            <Stack spacing={4}
                                sx={{
                                    width: '100%',
                                }}>
                                <Stepper alternativeLabel activeStep={1} connector={<QontoConnector />}>
                                    {steps.map((label) => (
                                        <Step key={label}>
                                            <StepLabel StepIconComponent={QontoStepIcon} >
                                                <Typography variant="h6" component="div">
                                                    {label}
                                                </Typography>
                                            </StepLabel>
                                        </Step>
                                    ))}
                                </Stepper>
                            </Stack>
                        )}
                        {loading ? (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={350}
                                height={80}
                                sx={{ margin: '0 auto' }}
                            />
                        ) : (
                            <p style={{
                                textAlign: 'center',
                                fontSize: 55,
                                fontStyle: 'normal',
                                fontWeight: 700,
                                lineHeight: 'normal'
                            }}>
                                Select a date and time
                            </p>
                        )}
                        <br />
                        {loading ? (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={350}
                                height={80}
                                sx={{ margin: '0 auto' }}
                            />
                        ) : (
                            <p style={{
                                textAlign: 'center',
                                fontSize: 20,
                                fontStyle: 'normal',
                                fontWeight: 300,
                                lineHeight: 'normal'
                            }}>
                                Choose a date and time below that suits you
                            </p>
                        )}
                        <br />
                        <Box
                            sx={{
                                marginBottom: 10,
                                marginTop: 5,
                                display: 'flex',
                                justifyContent: 'center', // Center the Stack horizontally
                            }}>
                            {loading ? (
                                <>
                                    <Stack spacing={5}>
                                        <Skeleton variant="rectangular" animation="wave" width={500} height={300} />
                                        <Skeleton variant="rectangular" animation="wave" width={500} height={300} />
                                    </Stack>
                                </>
                            ) : (
                                <>
                                    <Stack id="functioncalandtime" spacing={5}>
                                        <LocalizationProvider dateAdapter={AdapterDayjs}>
                                            <StaticDatePicker
                                                defaultValue={dayjs()}
                                                minDate={dayjs()}
                                                orientation="landscape"
                                                format="DD/MM/YYYY"
                                                onChange={handleDateChange}
                                            />

                                        </LocalizationProvider>
                                        <Stack direction={'row'} spacing={5}>
                                            {/* Morning */}
                                            <Box>
                                                <Typography variant="h5">Morning</Typography>
                                                <br />
                                                <ToggleButtonGroup
                                                    value={selectedSlot}
                                                    exclusive
                                                    onChange={handleSlotChange}
                                                    sx={{ maxWidth: 235 }}
                                                >
                                                    <ToggleButton value="07:00 am"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '07:00 am'
                                                        }}
                                                    >
                                                        07:00 am
                                                    </ToggleButton>
                                                    <ToggleButton value="07:20 am"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '07:20 am'
                                                        }}
                                                    >
                                                        07:20 am
                                                    </ToggleButton>
                                                    <ToggleButton value="07:40 am"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '07:40 am'
                                                        }}
                                                    >
                                                        07:40 am
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                                <br />
                                                <br />
                                                <ToggleButtonGroup
                                                    value={selectedSlot}
                                                    exclusive
                                                    onChange={handleSlotChange}
                                                    sx={{ maxWidth: 235 }}
                                                >
                                                    <ToggleButton value="08:00 am"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '08:00 am'
                                                        }}
                                                    >
                                                        08:00 am
                                                    </ToggleButton>
                                                    <ToggleButton value="08:20 am"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '08:20 am'
                                                        }}
                                                    >
                                                        08:20 am
                                                    </ToggleButton>
                                                    <ToggleButton value="08:40 am"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '08:40 am'
                                                        }}
                                                    >
                                                        08:40 am
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                                <br />
                                                <br />
                                                <ToggleButtonGroup
                                                    value={selectedSlot}
                                                    exclusive
                                                    onChange={handleSlotChange}
                                                    sx={{ maxWidth: 235 }}
                                                >
                                                    <ToggleButton value="09:00 am"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '09:00 am'
                                                        }}
                                                    >
                                                        09:00 am
                                                    </ToggleButton>
                                                    <ToggleButton value="09:20 am"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '09:20 am'
                                                        }}
                                                    >
                                                        09:20 am
                                                    </ToggleButton>
                                                    <ToggleButton value="09:40 am"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '09:40 am'
                                                        }}
                                                    >
                                                        09:40 am
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                                <br />
                                                <br />
                                                <ToggleButtonGroup
                                                    value={selectedSlot}
                                                    exclusive
                                                    onChange={handleSlotChange}
                                                    sx={{ maxWidth: 235 }}
                                                >
                                                    <ToggleButton value="10:00 am"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '10:00 am'
                                                        }}
                                                    >
                                                        10:00 am
                                                    </ToggleButton>
                                                    <ToggleButton value="10:20 am"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '10:20 am'
                                                        }}
                                                    >
                                                        10:20 am
                                                    </ToggleButton>
                                                    <ToggleButton value="10:40 am"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '10:40 am'
                                                        }}
                                                    >
                                                        10:40 am
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                            </Box>
                                            {/* Afternoon */}
                                            <Box>
                                                <Typography variant="h5">Afternoon</Typography>
                                                <br />
                                                <ToggleButtonGroup
                                                    value={selectedSlot}
                                                    exclusive
                                                    onChange={handleSlotChange}
                                                    sx={{ maxWidth: 235 }}
                                                >
                                                    <ToggleButton value="01:00 pm"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '01:00 pm'
                                                        }}
                                                    >
                                                        01:00 pm
                                                    </ToggleButton>
                                                    <ToggleButton value="01:20 pm"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '01:20 pm'
                                                        }}
                                                    >
                                                        01:20 pm
                                                    </ToggleButton>
                                                    <ToggleButton value="01:40 pm"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '01:40 pm'
                                                        }}
                                                    >
                                                        01:40 pm
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                                <br />
                                                <br />
                                                <ToggleButtonGroup
                                                    value={selectedSlot}
                                                    exclusive
                                                    onChange={handleSlotChange}
                                                    sx={{ maxWidth: 235 }}
                                                >
                                                    <ToggleButton value="02:00 pm"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '02:00 pm'
                                                        }}
                                                    >
                                                        02:00 pm
                                                    </ToggleButton>
                                                    <ToggleButton value="02:20 pm"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '02:20 pm'
                                                        }}
                                                    >
                                                        02:20 pm
                                                    </ToggleButton>
                                                    <ToggleButton value="02:40 pm"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '02:40 pm'
                                                        }}
                                                    >
                                                        02:40 pm
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                                <br />
                                                <br />
                                                <ToggleButtonGroup
                                                    value={selectedSlot}
                                                    exclusive
                                                    onChange={handleSlotChange}
                                                    sx={{ maxWidth: 235 }}
                                                >
                                                    <ToggleButton value="03:00 pm"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '03:00 pm'
                                                        }}
                                                    >
                                                        03:00 pm
                                                    </ToggleButton>
                                                    <ToggleButton value="03:20 pm"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '03:20 pm'
                                                        }}
                                                    >
                                                        03:20 pm
                                                    </ToggleButton>
                                                    <ToggleButton value="03:40 pm"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '03:40 pm'
                                                        }}
                                                    >
                                                        03:40 pm
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                                <br />
                                                <br />
                                                <ToggleButtonGroup
                                                    value={selectedSlot}
                                                    exclusive
                                                    onChange={handleSlotChange}
                                                    sx={{ maxWidth: 235 }}
                                                >
                                                    <ToggleButton value="04:00 pm"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '04:00 pm'
                                                        }}
                                                    >
                                                        04:00 pm
                                                    </ToggleButton>
                                                    <ToggleButton value="04:20 pm"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '04:20 pm'
                                                        }}
                                                    >
                                                        04:20 pm
                                                    </ToggleButton>
                                                    <ToggleButton value="04:40 pm"
                                                        sx={{
                                                            width: 117.5,
                                                            fontWeight: 'bold',
                                                            ...selectedSlot === '04:40 pm'
                                                        }}
                                                    >
                                                        04:40 pm
                                                    </ToggleButton>
                                                </ToggleButtonGroup>
                                            </Box>
                                            {/* Add other time slots here */}
                                        </Stack>
                                    </Stack>
                                </>
                            )}
                        </Box>
                        {/* button next and back */}
                        <Box
                            sx={{
                                alignItems: 'center',
                                margin: '0 auto', // Center the Box component
                                width: 'fit-content', // Adjust the width as needed
                            }}>
                            {validationError && (
                                <Typography variant="body1" color="error" align='center'>
                                    {validationError}
                                </Typography>
                            )}
                            <Stack>
                                {loading ? (
                                    <Skeleton
                                        variant="text"
                                        animation="wave"
                                        width={300}
                                        height={80}
                                        sx={{ margin: '0 auto' }}
                                    />
                                ) : (
                                    <Button
                                        onClick={handleFormSubmit}
                                        sx={{
                                            backgroundColor: '#D9D9D9',
                                            color: '#FFFFFF',
                                            borderRadius: 30,
                                            width: 300,
                                            marginBottom: 3.125,
                                            ":hover": { backgroundColor: 'black' }
                                        }}
                                    >
                                        Next</Button>
                                )}
                                {loading ? (
                                    <Skeleton
                                        variant="text"
                                        animation="wave"
                                    />
                                ) : (
                                    <hr />
                                )}
                                {loading ? (
                                    <Skeleton
                                        variant="text"
                                        animation="wave"
                                        width={300}
                                        height={80}
                                        sx={{ margin: '0 auto' }}
                                    />
                                ) : (
                                    <Button href='/BookAppointment' sx={{
                                        width: 'fit-content',
                                        color: '#000',
                                        borderRadius: 30,
                                        marginTop: 3.125,
                                        marginLeft: 11
                                    }}
                                    >
                                        <ReplyIcon sx={{
                                            marginRight: 1.375,
                                        }} />
                                        Back
                                    </Button>
                                )}
                            </Stack>
                        </Box>
                    </Grid2>
                </Grid2>
            </Paper>
        </Box >
    )
}

export default Body_content;

// component of stepper
const QontoConnector = styled(StepConnector)(({ theme }) => ({
    [`&.${stepConnectorClasses.alternativeLabel}`]: {
        top: 10,
        left: 'calc(-50% + 16px)',
        right: 'calc(50% + 16px)',
    },
    [`&.${stepConnectorClasses.active}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`&.${stepConnectorClasses.completed}`]: {
        [`& .${stepConnectorClasses.line}`]: {
            borderColor: '#784af4',
        },
    },
    [`& .${stepConnectorClasses.line}`]: {
        borderColor: theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
        borderTopWidth: 3,
        borderRadius: 1,
    },
}));

const QontoStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    color: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#eaeaf0',
    display: 'flex',
    height: 22,
    alignItems: 'center',
    ...(ownerState.active && {
        color: '#784af4',
    }),
    '& .QontoStepIcon-completedIcon': {
        color: '#784af4',
        zIndex: 1,
        fontSize: 18,
    },
    '& .QontoStepIcon-circle': {
        width: 8,
        height: 8,
        borderRadius: '50%',
        backgroundColor: 'currentColor',
    },
}));

function QontoStepIcon(props) {
    const { active, completed, className } = props;

    return (
        <QontoStepIconRoot ownerState={{ active }} className={className}>
            {completed ? (
                <Check className="QontoStepIcon-completedIcon" />
            ) : (
                <div className="QontoStepIcon-circle" />
            )}
        </QontoStepIconRoot>
    );
}

QontoStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
};

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
    backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
    zIndex: 1,
    color: '#fff',
    width: 50,
    height: 50,
    display: 'flex',
    borderRadius: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    ...(ownerState.active && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
        boxShadow: '0 4px 10px 0 rgba(0,0,0,.25)',
    }),
    ...(ownerState.completed && {
        backgroundImage:
            'linear-gradient( 136deg, rgb(242,113,33) 0%, rgb(233,64,87) 50%, rgb(138,35,135) 100%)',
    }),
}));

function ColorlibStepIcon(props) {
    const { active, completed, className } = props;

    const icons = {
        1: <SettingsIcon />,
        2: <GroupAddIcon />,
        3: <VideoLabelIcon />,
    };

    return (
        <ColorlibStepIconRoot ownerState={{ completed, active }} className={className}>
            {icons[String(props.icon)]}
        </ColorlibStepIconRoot>
    );
}

ColorlibStepIcon.propTypes = {
    /**
     * Whether this step is active.
     * @default false
     */
    active: PropTypes.bool,
    className: PropTypes.string,
    /**
     * Mark the step as completed. Is passed to child components.
     * @default false
     */
    completed: PropTypes.bool,
    /**
     * The label displayed in the step icon.
     */
    icon: PropTypes.node,
};

const steps = ['Examination Service', 'Schedule', 'Review'];
