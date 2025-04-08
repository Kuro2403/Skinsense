import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_appointment.jpg';
import { Autocomplete, Button, Card, CardActionArea, CardContent, CardMedia, IconButton, TextField, Typography } from '@mui/material';
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
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { GetAllSpecialistsServices } from '../../../api/specicalistServices';
import { GetAllDetailSpecialistsServices } from '../../../api/detailSpecialistServices';
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
    const [examinationServices, setExaminationServices] = useState([]);
    const [doctorFacialSkinData, setDoctorFacialSkinData] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        const email = sessionStorage.getItem('Email');
        if (email === null) {
            navigate("/login");
        }
        getSpecialists();
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [navigate]);

    const getSpecialists = async () => {
        const data = await GetAllSpecialistsServices();
        setExaminationServices(data)
    }

    const [selectedService, setSelectedService] = useState(null);
    const [doctorShow, setDoctorShow] = useState(false);

    const handleServiceSelect = async (event, value) => {
        setSelectedService(value);
        setDoctorShow(false);
        if (value) {
            const selectedSpecialist = examinationServices.find(service => service.specialistName === value);
            if (selectedSpecialist) {
                const selectedId = selectedSpecialist.specialistID;
                // Now you can use the selectedId as needed
                const specialist = await GetAllDetailSpecialistsServices();
                const doctor = specialist.filter(h => h.specialistID === selectedId)
                setDoctorFacialSkinData(doctor);
                setDoctorShow(true);
                sessionStorage.setItem('BASpecialistName', selectedSpecialist.specialistName);
            }
        }

        if (validationError && value) {
            setDoctorShow(false);
            setValidationError('');
        }
    };

    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 3;

    const totalPages = Math.ceil(doctorFacialSkinData.length / itemsPerPage);

    const handleNextPage = () => {
        setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
    };

    const handlePreviousPage = () => {
        setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
    };

    const startIndex = (currentPage - 1) * itemsPerPage;
    const visibleItems = doctorFacialSkinData.slice(startIndex, startIndex + itemsPerPage);

    const [selectedCardIndex, setSelectedCardIndex] = useState(null);
    const [selectedDoctorIndex, setSelectedDoctorIndex] = useState(null);
    const [validationError, setValidationError] = useState('');

    useEffect(() => {
        setSelectedCardIndex(null); // Reset the selected card index
    }, [selectedService]); // This hook will be triggered whenever selectedService changes

    const handleCardClick = (index) => {
        // Determine the correct index based on the current page
        const adjustedIndex = (currentPage - 1) * itemsPerPage + index;
        setSelectedCardIndex(adjustedIndex);

        setSelectedDoctorIndex(adjustedIndex); // Update the selected doctor index
        if (validationError && adjustedIndex !== null) {
            setValidationError('');
        }
        // Get the selected doctor's data
        const selectedDoctor = doctorFacialSkinData[adjustedIndex];
        // Log the doctor's name and index
        sessionStorage.setItem('BADoctorID', selectedDoctor.doctor.doctorID);
        sessionStorage.setItem('BADoctorName', selectedDoctor.doctor.employee.name);
    };

    const validateForm = () => {
        if (!selectedService) {
            return 'Please select examination service!';
        }
        if (selectedDoctorIndex === null) {
            return 'Please select a doctor!';
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
        window.location.href = '/BookAppointment1';
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
                                <Stepper alternativeLabel activeStep={0} connector={<QontoConnector />}>
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
                                width="40%"
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
                                Select Examination Service
                            </p>
                        )}
                        <br />
                        <Box
                            sx={{
                                marginBottom: 5,
                                marginTop: 5,
                                display: 'flex',
                                justifyContent: 'center', // Center the Stack horizontally
                            }}>
                            {loading ? (
                                <Skeleton
                                    variant="rectangular"
                                    animation="wave"
                                    width="30%"
                                    height={80}
                                    sx={{ margin: '0 auto' }}
                                />
                            ) : (
                                <Autocomplete
                                    disablePortal
                                    id="combo-box-demo"
                                    options={examinationServices.map(service => service.specialistName)}
                                    onChange={handleServiceSelect}
                                    sx={{ width: 500 }}
                                    renderInput={(params) =>
                                        <TextField {...params} label="Choose an examination service"
                                            sx={{
                                                "& .MuiAutocomplete-inputRoot": {
                                                    paddingLeft: "20px !important",
                                                    borderRadius: "15px"
                                                },
                                            }}
                                        />}
                                />
                            )}
                        </Box>
                        {/* display Choose doctors 'Facial skin' */}
                        {
                            doctorShow && (
                                <>
                                    <p
                                        style={{
                                            textAlign: 'center',
                                            fontSize: 55,
                                            fontStyle: 'normal',
                                            fontWeight: 700,
                                            lineHeight: 'normal',
                                        }}
                                    >
                                        Choose A doctor
                                    </p>
                                    <br />
                                    <Box className="history" sx={{ padding: 2, display: 'flex', justifyContent: 'center' }}>
                                        {totalPages > 1 && (
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
                                                    {visibleItems.map((image, index) => (
                                                        <Card
                                                            key={image.detailSpecialistID}
                                                            sx={{
                                                                maxWidth: 500,
                                                                boxShadow: 'none',
                                                                border: selectedCardIndex === (currentPage - 1) * itemsPerPage + index ? '2px solid black' : 'none', // Add a border to selected card
                                                            }}
                                                            onClick={() => handleCardClick(index)}
                                                        >
                                                            {loading ? (
                                                                <Skeleton variant="rectangular" animation="wave" width={485} height={405} />
                                                            ) : (
                                                                <CardActionArea>
                                                                    <CardMedia
                                                                        component="img"
                                                                        height="600"
                                                                        image={image.doctor.employee.account.avatar}
                                                                        alt="img"
                                                                        sx={{
                                                                            width: '320px',
                                                                            borderRadius: 15
                                                                        }}
                                                                    />
                                                                    <CardContent>
                                                                        <Typography variant="h4" color="initial">
                                                                            {image.doctor.employee.name}
                                                                        </Typography>
                                                                    </CardContent>
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
                                </>
                            )
                        }

                        <Box
                            sx={{
                                alignItems: 'center',
                                margin: '0 auto', // Center the Box component
                                width: 'fit-content', // Adjust the width as needed
                            }}
                        >
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
                                        Next
                                    </Button>
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
                                    <Button href='/' sx={{
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
