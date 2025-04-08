import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_medical_record.jpg';
import { IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import 'slick-carousel/slick/slick-theme.css';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate, useParams } from 'react-router-dom';
import { GetMedicalReportByPatientID, GetReportFromAIByPatientID } from '../../../helper/Util';

const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent1})`,
        height: 630,
        backgroundSize: 'cover',

    },
};

const Body_content = () => {

    const { patientID } = useParams();
    const parseIntPatientID = parseInt(patientID);
    const [rowsRpFormAI, setRowsRpFormAI] = useState([]); // loop data AI report
    const [rowsRpFormDoctor, setRowsRpFormDoctor] = useState([]); // loop data Doctor report

    const navigate = useNavigate();

    // skeleton effect
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        // Fetch report from AI and report from Doctor based on patientID
        async function fetchData() {
            try {
                const dataRpFromAI = await GetReportFromAIByPatientID(parseIntPatientID);
                setRowsRpFormAI(dataRpFromAI);
                const dataRpFromDoctor = await GetMedicalReportByPatientID(parseIntPatientID);
                setRowsRpFormDoctor(dataRpFromDoctor);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Simulating loading time
        const timer = setTimeout(() => {
            fetchData();

            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [parseIntPatientID]);

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
            {/* This content will be display when user had Medical Record */}
            <Box
                sx={{
                    marginTop: 10,
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
                    <TableContainer>
                        <Table sx={{ minWidth: 1710 }}>
                            <TableHead sx={{ bgcolor: 'black' }}>
                                <TableRow>
                                    <TableCell
                                        align='center'
                                        sx={{
                                            fontSize: 30,
                                            fontWeight: 700,
                                            color: 'white'
                                        }}
                                    >
                                        Report
                                    </TableCell>
                                    <TableCell
                                        align='center'
                                        sx={{
                                            fontSize: 30,
                                            fontWeight: 700,
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
                                        align='center'
                                        sx={{
                                            fontSize: 30,
                                            fontWeight: 700,
                                            color: 'white'
                                        }}
                                    >
                                        Disease
                                    </TableCell>
                                    <TableCell align='center'></TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {/* report from AI */}

                                {rowsRpFormAI &&
                                    rowsRpFormAI.map((row) => (
                                        <TableRow
                                            key={row.patientID}
                                            sx={{ height: 345 }}
                                        >
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
                                                                fontSize: 30,
                                                                fontWeight: 400
                                                            }}
                                                        >
                                                            Report from AI
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
                                                                fontSize: 30,
                                                                fontWeight: 400
                                                            }}
                                                        >
                                                            {row.dateCreate}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                            <TableCell align='center' width={500}>
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
                                                                fontSize: 30,
                                                                fontWeight: 400
                                                            }}
                                                        >
                                                            {row.evaluate}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                            <TableCell align='center'>
                                                <IconButton onClick={() => navigate(`/Doctor/TestResult/${row.reportAiID}`)}
                                                    sx={{ color: '#001AFF' }}>
                                                    Detail
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                {/* report from Doctor */}

                                {rowsRpFormDoctor &&
                                    rowsRpFormDoctor.map((row) => (
                                        <TableRow
                                            key={row.patientID}
                                            sx={{ height: 345 }}
                                        >
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
                                                                fontSize: 30,
                                                                fontWeight: 400
                                                            }}
                                                        >
                                                            Report from Doctor
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
                                                                fontSize: 30,
                                                                fontWeight: 400
                                                            }}
                                                        >
                                                            {row.reportDate}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                            <TableCell align='center' width={500}>
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
                                                                fontSize: 30,
                                                                fontWeight: 400
                                                            }}
                                                        >
                                                            {row.diagnosis}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                            <TableCell align='center'>
                                                <IconButton onClick={() => navigate(`/Doctor/MedicalRecordDetails/${row.medicalReportID}`)}
                                                    sx={{ color: '#001AFF' }}>
                                                    Detail
                                                </IconButton>
                                            </TableCell>
                                        </TableRow>
                                    ))}
                                {/* button add */}
                                <TableRow>
                                    <TableCell align='center' sx={{ display: 'flex' }}>
                                        <IconButton variant="contained" href='/Doctor/MedicalRecordCreate'>
                                            <AddIcon sx={{ fontSize: 100, color: '#000' }} />
                                        </IconButton>
                                        <Typography color="text.secondary" sx={{ fontSize: 20, marginTop: 5.5 }}>
                                            Add a medical record
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            </TableBody>
                        </Table>
                    </TableContainer>
                )}
            </Box>
        </Box >
    )
}

export default Body_content;

