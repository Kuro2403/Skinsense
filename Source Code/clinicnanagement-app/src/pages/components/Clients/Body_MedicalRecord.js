import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_medical_record.jpg';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import { GetMedicalReportByPatientID, GetPatientByEmail, GetPrescriptionByPatientID, GetReportFromAIByPatientID } from '../../../helper/Util';
import { useNavigate } from 'react-router-dom';

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
        getReportAIByPatientID();
        getMedicalReportByPatientID();
        getPrescriptionByPatientID();
        // Simulating loading time
        const timer = setTimeout(() => {
            getReportAIByPatientID();
            getPrescriptionByPatientID();
            getMedicalReportByPatientID();
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);
    const [reportAIList, setReportAIList] = useState([]);
    const [medicalReport, setMedicalReport] = useState([]);
    const [prescription, setPrescription] = useState([]);

    const getReportAIByPatientID = async () => {
        const email = sessionStorage.getItem('Email');
        const patient = await GetPatientByEmail(email);
        const reportAIList = await GetReportFromAIByPatientID(patient.patientID);
        setReportAIList(reportAIList);
    }
    const getMedicalReportByPatientID = async () => {
        const email = sessionStorage.getItem('Email');
        const patient = await GetPatientByEmail(email);
        const res = await GetMedicalReportByPatientID(patient.patientID);
        setMedicalReport(res);

    }
    const getPrescriptionByPatientID = async () => {
        const email = sessionStorage.getItem('Email');
        const patient = await GetPatientByEmail(email);
        const res = await GetPrescriptionByPatientID(patient.patientID);
        setPrescription(res);

    }
    const navigate = useNavigate();

    const confirmDetail = (id) => {
        sessionStorage.setItem('reportFromAIID', id);
        navigate("/TestResult");
    }
    const confirmDetailReportDoctor = (id) => {
        sessionStorage.setItem('medicalReportID', id);
        navigate("/MedicalRecordDetails");
    }
    const confirmDetailPrescription = (id) => {
        sessionStorage.setItem('prescriptionID', id);
        navigate("/PrescriptionDetails");
    }


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
            {/* This content will be display when user no Medical Record yet */}
            {(medicalReport && reportAIList && prescription) ? (
                <Box
                    sx={{
                        marginTop: 30,
                        marginBottom: 30,
                        boxShadow: 'none'
                    }}
                >
                    {loading ? (
                        <Skeleton
                            variant="text"
                            animation="wave"
                            width="100%"
                            height={500}
                            sx={{ margin: '0 auto' }}
                        />
                    ) : (
                        <Box sx={{ marginRight: 20, marginLeft: 20 }}>
                            <TableContainer sx={{ maxHeight: 600, }}>
                                <Table sx={{ minWidth: 1500 }} stickyHeader aria-label="sticky">
                                    <TableHead>
                                        <TableRow>
                                            <TableCell
                                                align="center"
                                                style={{ minWidth: '220px' }}
                                                sx={{
                                                    backgroundColor: 'black',
                                                    cursor: 'pointer',
                                                    color: 'white',
                                                    fontWeight: 700,
                                                    fontSize: '30px'
                                                }}
                                            >
                                                Report
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ minWidth: '220px' }}
                                                sx={{
                                                    backgroundColor: 'black',
                                                    cursor: 'pointer',
                                                    color: 'white',
                                                    fontWeight: 700,
                                                    fontSize: '30px'
                                                }}
                                            >
                                                Date
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ width: '500px' }}
                                                sx={{
                                                    backgroundColor: 'black',
                                                    cursor: 'pointer',
                                                    color: 'white',
                                                    fontWeight: 700,
                                                    fontSize: '30px'
                                                }}
                                            >
                                                Comment
                                            </TableCell>
                                            <TableCell
                                                align="center"
                                                style={{ minWidth: '220px' }}
                                                sx={{
                                                    backgroundColor: 'black',
                                                    cursor: 'pointer',
                                                    color: 'white',
                                                    fontWeight: 700,
                                                    fontSize: '30px'
                                                }}
                                            >
                                                ...
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ overflowY: 'auto' }}>
                                        {reportAIList
                                            .map((row) => {
                                                return (
                                                    <TableRow tabIndex={-1} key={row.reportAiID}>
                                                        <TableCell align='center'>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                }}
                                                            >
                                                                <Paper sx={{ boxShadow: 'none' }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 25,
                                                                            fontWeight: 400
                                                                        }}
                                                                    >
                                                                        Report From AI
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    textAlign: 'left'
                                                                }}
                                                            >
                                                                <Paper sx={{ boxShadow: 'none' }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 25,
                                                                            fontWeight: 400
                                                                        }}
                                                                    >
                                                                        {row.dateCreate}
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    textAlign: 'left'
                                                                }}
                                                            >
                                                                <Paper sx={{ boxShadow: 'none' }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 25,
                                                                            fontWeight: 400
                                                                        }}
                                                                    >
                                                                        {row.evaluate}
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                            <IconButton
                                                                sx={{ color: '#001AFF' }}
                                                                onClick={() => {
                                                                    confirmDetail(row.reportAiID);
                                                                }}>
                                                                Detail
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {medicalReport
                                            .map((row) => {
                                                return (
                                                    <TableRow tabIndex={-1} key={row.medicalReportID}>
                                                        <TableCell align='center'>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                }}
                                                            >
                                                                <Paper sx={{ boxShadow: 'none' }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 25,
                                                                            fontWeight: 400
                                                                        }}
                                                                    >
                                                                        Report From Doctor
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    textAlign: 'left'
                                                                }}
                                                            >
                                                                <Paper sx={{ boxShadow: 'none' }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 25,
                                                                            fontWeight: 400
                                                                        }}
                                                                    >
                                                                        {row.reportDate}
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    textAlign: 'left'
                                                                }}
                                                            >
                                                                <Paper sx={{ boxShadow: 'none' }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 25,
                                                                            fontWeight: 400
                                                                        }}
                                                                    >
                                                                        {row.recommendations}
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                            <IconButton
                                                                onClick={() => {
                                                                    confirmDetailReportDoctor(row.medicalReportID);
                                                                }}
                                                                sx={{ color: '#001AFF' }}>
                                                                Detail
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                        {prescription
                                            .map((row) => {
                                                return (
                                                    <TableRow tabIndex={-1} key={row.prescriptionID}>
                                                        <TableCell align='center'>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                }}
                                                            >
                                                                <Paper sx={{ boxShadow: 'none' }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 25,
                                                                            fontWeight: 400
                                                                        }}
                                                                    >
                                                                        Prescription
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    textAlign: 'left'
                                                                }}
                                                            >
                                                                <Paper sx={{ boxShadow: 'none' }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 25,
                                                                            fontWeight: 400
                                                                        }}
                                                                    >
                                                                        {row.prescriptionDate}
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                            <Box
                                                                sx={{
                                                                    display: 'flex',
                                                                    justifyContent: 'center',
                                                                    textAlign: 'left'
                                                                }}
                                                            >
                                                                <Paper sx={{ boxShadow: 'none' }}>
                                                                    <Typography
                                                                        sx={{
                                                                            fontSize: 25,
                                                                            fontWeight: 400
                                                                        }}
                                                                    >
                                                                        Prescription information
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                        <TableCell align='center'>
                                                            <IconButton
                                                                onClick={() => {
                                                                    confirmDetailPrescription(row.prescriptionID);
                                                                }}
                                                                sx={{ color: '#001AFF' }}>
                                                                Detail
                                                            </IconButton>
                                                        </TableCell>
                                                    </TableRow>
                                                );
                                            })}
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Box>

                    )}
                </Box>
            ) : <Box
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
                                Sorry, You have no medical records, you can contact the staff for advice
                            </Typography>
                        )}
                    </Box>
                </Grid2>
            </Box>}

        </Box >
    )
}

export default Body_content;

