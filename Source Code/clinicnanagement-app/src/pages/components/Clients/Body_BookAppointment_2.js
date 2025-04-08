import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_appointment.jpg';
import { Button, Container, Divider, Typography } from '@mui/material';
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
import { GetPatientByEmail } from '../../../helper/Util';
import { CreateAppointmentServices } from '../../../api/appointmentsServices';
import { useNavigate } from 'react-router-dom';
import { AppoimentConfirmedServices } from '../../../api/emailServices';


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
    const [doctorID, setDoctorID] = useState('');
    const [doctorName, setDoctorName] = useState('');
    const [appointmentDate, setAppointmentDate] = useState('');
    const [appointmentTime, setAppointmentTime] = useState('');
    const [examinationService, setExaminationService] = useState('');
    useEffect(() => {
        handleBookAppointment();
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const handleBookAppointment = () => {
        const doctorID = sessionStorage.getItem('BADoctorID');
        const doctorName = sessionStorage.getItem('BADoctorName');
        const appointmentDate = sessionStorage.getItem('BAAppointmentDate');
        const appointmentTime = sessionStorage.getItem('BAAppointmentTime');
        const examinationService = sessionStorage.getItem('BASpecialistName');
        setDoctorID(doctorID);
        setAppointmentDate(appointmentDate);
        setAppointmentTime(appointmentTime);
        setExaminationService(examinationService);
        setDoctorName(doctorName)
    }
    const navigate = useNavigate();

    const bookingSubmit = async () => {
        const email = sessionStorage.getItem('Email');
        const patient = await GetPatientByEmail(email);
        const appoimentModel = {
            AppointmentDate: appointmentDate,
            AppointmentTime: appointmentTime,
            ExaminationService: examinationService,
            PatientID: patient.patientID,
            DoctorID: parseInt(doctorID),
        }
        const data = await CreateAppointmentServices(appoimentModel);
        const sendings = {
            Email: data.patient.account.mail,
            Date: data.appointmentDate,
            Time: data.appointmentTime,
            Doctor: data.doctor.employee.name,
            Hospital: 'FPT Uninversity Can Tho',
            Address: '600 Nguyễn Văn Cừ nối dài, An Bình, Ninh Kiều, Cần Thơ',
        }
        await AppoimentConfirmedServices(sendings);
        if (data)
            navigate("/appointment");
    }

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
                            <Stepper alternativeLabel activeStep={2} connector={<QontoConnector />}>
                                {steps.map((label) => (
                                    <Step key={label}>
                                        <StepLabel StepIconComponent={QontoStepIcon}>
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
                            Review booking
                        </p>
                    )}
                    <br />
                    <Container
                        sx={{
                            marginBottom: 15,
                            display: 'flex',
                            justifyContent: 'center', // Center the Stack horizontally
                        }}>
                        <Box
                            sx={{
                                maxWidth: 414,
                                padding: 2,
                                border: '1px solid black',
                                borderRadius: 5,
                                boxShadow: 'rgba(0, 0, 0, 0.35) 0px 5px 15px'
                            }}>
                            <Box
                                sx={{
                                    width: 414,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                {loading ? (
                                    <Skeleton variant="text" animation="wave" width={120} height={32} />
                                ) : (
                                    <Typography variant='h4' sx={{ fontWeight: 700 }}>Service</Typography>
                                )}
                            </Box>
                            {loading ? (
                                <Skeleton variant="text" animation="wave" width="100%" height={24} />
                            ) : (
                                <Typography variant="h5"
                                    sx={{
                                        wordWrap: 'break-word',
                                        maxWidth: '100%',

                                    }}
                                >
                                    {examinationService}
                                </Typography>
                            )}
                            <br />
                            <Divider />
                            <br />
                            <Box
                                sx={{
                                    width: 414,
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'space-between'
                                }}>
                                {loading ? (
                                    <Skeleton variant="text" animation="wave" width={200} height={32} />
                                ) : (
                                    <Typography variant="h4" sx={{ fontWeight: 700 }}>Date and time</Typography>
                                )}
                            </Box>
                            {/* Day, date month year */}
                            {loading ? (
                                <>
                                    <Skeleton variant="text" animation="wave" width="100%" height={24} />
                                    <Skeleton variant="text" animation="wave" width="100%" height={24} />
                                </>
                            ) : (
                                <>
                                    <Typography variant="h5"
                                        sx={{
                                            wordWrap: 'break-word',
                                            maxWidth: '100%',
                                        }}
                                    >
                                        {appointmentDate}
                                    </Typography>
                                    {/* Time */}
                                    <Typography variant="h5"
                                        sx={{
                                            wordWrap: 'break-word',
                                            maxWidth: '100%',
                                        }}
                                    >
                                        {appointmentTime}
                                    </Typography>
                                </>
                            )}
                            <br />
                            <Divider />
                            <br />
                            {loading ? (
                                <Skeleton variant="text" animation="wave" width={100} height={32} />
                            ) : (
                                <Typography variant='h4' sx={{ fontWeight: 700 }}>Doctor: {doctorName}</Typography>
                            )}
                        </Box>
                    </Container>
                    {/* button next and back */}
                    <Box
                        sx={{
                            alignItems: 'center',
                            margin: '0 auto', // Center the Box component
                            width: 'fit-content', // Adjust the width as needed
                        }}>
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
                                <Button onClick={bookingSubmit} sx={{
                                    backgroundColor: '#D9D9D9',
                                    color: '#FFFFFF',
                                    borderRadius: 30,
                                    width: 300,
                                    marginBottom: 3.125,
                                    ":hover": { backgroundColor: 'black' }
                                }}
                                >
                                    Submit</Button>
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
                                <Button href='/BookAppointment1' sx={{
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
