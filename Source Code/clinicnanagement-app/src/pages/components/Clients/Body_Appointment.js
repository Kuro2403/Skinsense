import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_list_appointment.jpg';
import { Button, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import { GetAppointmentByPatientID, GetPatientByEmail } from '../../../helper/Util';
import { DeleteAppointmentServices } from '../../../api/appointmentsServices';

const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent1})`,
        height: 630,
        backgroundSize: 'cover',

    },
};

const Body_content = () => {

    // skeleton effect
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getAppointmentListByPatientID();
        // Simulating loading time
        const timer = setTimeout(() => {
            getAppointmentListByPatientID();
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);
    const [appointmentList, setAppointmentList] = useState([]);

    const getAppointmentListByPatientID = async () => {
        const email = sessionStorage.getItem('Email');
        const patient = await GetPatientByEmail(email);
        const appointmentList = await GetAppointmentByPatientID(patient.patientID);
        if (appointmentList.length === 0) {
            setIsTableVisible(false);
            setIsInitialContentVisible(true);
        }
        setAppointmentList(appointmentList)
    }

    const [isTableVisible, setIsTableVisible] = useState(true); // State variable to control table visibility
    const [isInitialContentVisible, setIsInitialContentVisible] = useState(false); // State variable to control initial content visibility
    const handleCancelClick = async (id) => {
        await DeleteAppointmentServices(id);
        getAppointmentListByPatientID();

    };

    return (
        <Box sx={{
            marginTop: 6,
            marginBottom: 5,
            height: 'auto',
            overflowX: 'hidden', // Hide the horizontal scrollbar
        }}>
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
            ) : (
                <Paper style={image_contentData.paperContainer1}
                    sx={{ boxShadow: 'none' }} />
            )}
            {/* This content will be display when user no schedule appointment yet */}
            {isInitialContentVisible && (
                <Box
                    sx={{
                        marginTop: 30,
                        marginBottom: 30,
                        boxShadow: 'none'
                    }}>
                    <Grid2>
                        <Box
                            sx={{
                                alignItems: 'center',
                                margin: '0 auto', // Center the Box component
                                width: 'fit-content', // Adjust the width as needed
                                marginBottom: 9.125,
                            }}
                        >
                            {loading ? (
                                <Skeleton
                                    variant="text"
                                    animation="wave"
                                    width={600}
                                    height={40}
                                    sx={{ margin: '0 auto' }}
                                />
                            ) : (
                                <Typography
                                    sx={{
                                        fontSize: 30,
                                        fontWeight: 400
                                    }}
                                >
                                    Sorry, You have no appointments. Please make an appointment.
                                </Typography>
                            )}
                        </Box>
                        <Box
                            sx={{
                                alignItems: 'center',
                                margin: '0 auto', // Center the Box component
                                width: 'fit-content', // Adjust the width as needed
                            }}>
                            {loading ? (
                                <Skeleton
                                    variant="text"
                                    animation="wave"
                                    width={300}
                                    height={80}
                                    sx={{ margin: '0 auto' }}
                                />
                            ) : (
                                <Button href='/BookAppointment'
                                    sx={{
                                        backgroundColor: '#000000',
                                        color: '#FFFF',
                                        borderRadius: 30,
                                        width: 220,
                                        marginBottom: 3.125,
                                        ":hover": { background: 'gray' }
                                    }}
                                >
                                    Make an appointment
                                </Button>
                            )}
                        </Box>
                    </Grid2>
                </Box>
            )}
            {/* This content will be display when user had schedule appointment */}
            <Box
                sx={{
                    marginTop: 8,
                    marginBottom: 30,
                    boxShadow: 'none'
                }}>
                {loading ? (
                    <Skeleton
                        variant="text"
                        animation="wave"
                        width="100%"
                        height={500}
                        sx={{ margin: '0 auto' }}
                    />
                ) : (
                    isTableVisible && (
                        <Box sx={{ marginRight: 20, marginLeft: 20 }}>
                            <TableContainer sx={{ maxHeight: 'calc(100vh - 500px)' }}>
                                <Table sx={{ minWidth: 1500 }}>
                                    <TableHead sx={{ bgcolor: 'black', position: 'sticky', top: 0 }}>
                                        <TableRow>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 30,
                                                    fontWeight: 700,
                                                    color: 'white'
                                                }}
                                            >
                                                Doctor
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 30,
                                                    fontWeight: 700.,
                                                    color: 'white'
                                                }}
                                            >
                                                Date
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 30,
                                                    fontWeight: 700,
                                                    color: 'white'
                                                }}
                                            >
                                                Time
                                            </TableCell>
                                            <TableCell
                                                maxWidth={100}
                                                align='center'
                                                sx={{
                                                    fontSize: 30,
                                                    fontWeight: 700,
                                                    color: 'white',
                                                }}
                                            >
                                                Examination Service
                                            </TableCell>
                                            <TableCell align='center'
                                                sx={{
                                                    fontSize: 30,
                                                    fontWeight: 700,
                                                    color: 'white'
                                                }}
                                            >...</TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ overflowY: 'auto' }}>
                                        {appointmentList
                                            .map((row) => {
                                                return (
                                                    <TableRow tabIndex={-1} key={row.appointmentID}>
                                                        <TableCell align='center'>
                                                            <Box
                                                                minWidth={300}
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                }}
                                                            >
                                                                <Paper sx={{ boxShadow: 'none' }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 30,
                                                                            fontWeight: 700
                                                                        }}
                                                                    >
                                                                        {row.doctor.employee.name}
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                            <Box
                                                                minWidth={250}
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    textAlign: 'left'
                                                                }}
                                                            >
                                                                <Paper sx={{ boxShadow: 'none' }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 30,
                                                                            fontWeight: 400
                                                                        }}
                                                                    >
                                                                        {row.appointmentDate}
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                            <Box
                                                                minWidth={250}
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    textAlign: 'left'
                                                                }}
                                                            >
                                                                <Paper sx={{ boxShadow: 'none' }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 30,
                                                                            fontWeight: 400
                                                                        }}
                                                                    >
                                                                        {row.appointmentTime}
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align='left'>
                                                            <Box
                                                                minWidth={250}
                                                                maxWidth={650}
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'left',
                                                                    textAlign: 'left'
                                                                }}
                                                            >
                                                                <Paper sx={{ boxShadow: 'none' }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 30,
                                                                            fontWeight: 400
                                                                        }}
                                                                    >
                                                                        {row.examinationService}
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align='center'
                                                            minWidth={250}
                                                        >
                                                            <IconButton
                                                                onClick={() => {
                                                                    handleCancelClick(row.appointmentID);
                                                                }}
                                                                color='error'
                                                            >
                                                                Cancel
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}

                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>
                    )
                )}
            </Box>
        </Box >
    )
}


export default Body_content;

