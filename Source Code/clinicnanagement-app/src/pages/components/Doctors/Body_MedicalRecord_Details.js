import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_medical_record.jpg';
import { Button, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import ReplyIcon from '@mui/icons-material/Reply';
import styled from '@emotion/styled';
import { useNavigate, useParams } from 'react-router-dom';
import { GetMedicalReportServices } from '../../../api/medicalReportServices';

const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent1})`,
        height: 630,
        backgroundSize: 'cover',

    },
};

const Body_content = () => {

    const { medicalReportID } = useParams();
    const [data, setData] = useState('');

    const navigate = useNavigate();


    const [loading, setLoading] = useState(true);

    useEffect(() => {

        fetchData();

        // Fetch detail report from Doctor based on medicalReportID
        async function fetchData() {
            try {
                const dataRpFromDoctor = await GetMedicalReportServices(medicalReportID);
                setData(dataRpFromDoctor);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [medicalReportID]);

    const CustomTextarea = styled(TextareaAutosize)({
        width: 1655,
        minHeight: 200,
        fontSize: '30px',
        fontWeight: 400,
        padding: '20px', // Add padding for better visual appearance
        borderRadius: 30,
        resize: 'none'
    });

    const CustomTextarea1 = styled(TextareaAutosize)({
        width: 1579,
        minHeight: 136,
        fontSize: '30px',
        fontWeight: 400,
        border: 'none',
        resize: 'none'
    });

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
            <Box
                sx={{
                    marginTop: 8,
                    marginBottom: 30,
                    boxShadow: 'none'
                }}
            >
                <Grid2
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {/* Label */}
                    <Box
                        sx={{
                            width: 498,
                            height: 79,
                            backgroundColor: '#d9d9d9',
                            display: 'flex',
                            justifyContent: 'center',
                            borderStartStartRadius: 30,
                            borderEndStartRadius: 30,
                            border: '1px solid',
                            borderRight: 'none'
                        }}
                    >
                        <Paper
                            sx={{
                                boxShadow: 'none',
                                backgroundColor: '#d9d9d9',
                                paddingTop: 2,
                            }}>
                            {loading ? (
                                <Skeleton variant="text" animation="wave" width={200} height={45} />
                            ) : (
                                <Typography
                                    sx={{
                                        fontSize: 30,
                                        fontWeight: 700
                                    }}
                                >
                                    Medical Record Date
                                </Typography>
                            )}
                        </Paper>
                    </Box>
                    {/* content */}
                    <Box
                        sx={{
                            width: 498,
                            height: 79,
                            display: 'flex',
                            justifyContent: 'center',
                            border: '1px solid',
                            borderStartEndRadius: 30,
                            borderEndEndRadius: 30,
                        }}
                    >
                        <Paper sx={{ boxShadow: 'none', padding: 2 }}>
                            {loading ? (
                                <Skeleton variant="text" animation="wave" width={200} height={45} />
                            ) : (
                                <Typography
                                    sx={{
                                        fontSize: 30,
                                        fontWeight: 400
                                    }}
                                >
                                    {data.reportDate}
                                </Typography>
                            )}
                        </Paper>
                    </Box>
                </Grid2>
                <br />
                <br />
                <br />
                <Grid2
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    <Box>
                        {loading ? (
                            <Skeleton variant="rectangular" animation="wave" width={1800} height={157} />
                        ) : (
                            <TableContainer
                                sx={{
                                    border: '1px solid',
                                    borderRadius: 10
                                }}>
                                <Table>
                                    <TableHead
                                        sx={{
                                            backgroundColor: '#d9d9d9',
                                            height: 79,
                                        }}
                                    >
                                        <TableRow>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 30,
                                                    fontWeight: 700,
                                                    width: 733,
                                                    borderBottom: '1px solid',
                                                }}
                                            >
                                                Patient Name
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 30,
                                                    fontWeight: 700,
                                                    width: 733,
                                                    borderLeft: '1px solid',
                                                    borderBottom: '1px solid',
                                                }}
                                            >
                                                Diagnosis
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow>
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
                                                            {data.patient.name}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                            <TableCell align='center'
                                                sx={{
                                                    borderLeft: '1px solid',
                                                }}
                                            >
                                                <Box
                                                    sx={{
                                                        display: 'flex',
                                                        justifyContent: 'center',
                                                        textAlign: 'left',
                                                    }}
                                                >
                                                    <Paper sx={{ boxShadow: 'none' }}>
                                                        <Typography
                                                            sx={{
                                                                fontSize: 30,
                                                                fontWeight: 400
                                                            }}
                                                        >
                                                            {data.diagnosis}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        )}
                    </Box>
                </Grid2>
                <br />
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    {loading ? (
                        <Skeleton variant="text" animation="wave" width={200} height={100} />
                    ) : (
                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontSize: 40,
                                fontWeight: 700
                            }}
                        >
                            Observations
                        </Typography>
                    )}
                </div>
                <br />
                <Grid2
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >{loading ? (
                    <Skeleton variant="text" animation="wave" width={1500} height={500} />
                ) : (
                    <CustomTextarea
                        value={data.testResults}
                    />
                )}
                </Grid2>
                <br />
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                    <Grid2
                        container
                        justifyContent="center"
                        alignItems="center"
                        alignContent="center"
                        border="1px solid"
                        borderRadius={10}
                        sx={{
                            width: 1700,
                            minHeight: 215,
                        }}
                    >
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={1500} height={100} />
                        ) : (
                            <>
                                <Typography sx={{ fontSize: 30, fontWeight: 700, textDecoration: 'underline', marginRight: 'auto', marginLeft: 5 }}>Recommendations</Typography>
                                <CustomTextarea1
                                    value={data.recommendations}
                                />
                            </>
                        )}
                    </Grid2>
                </div>
                <br />
                <br />
                <br />
                <Grid2
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                    }}
                >
                    <Box sx={{
                        width: 688,
                        height: 82,
                        backgroundColor: '#d9d9d9',
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: 30,
                    }}
                    >
                        <Paper
                            sx={{
                                boxShadow: 'none',
                                backgroundColor: '#d9d9d9',
                                paddingTop: 2,
                            }}>
                            {loading ? (
                                <Skeleton variant="text" animation="wave" width={200} height={45} />
                            ) : (
                                <Typography
                                    sx={{
                                        fontSize: 30,
                                        fontWeight: 700
                                    }}
                                >
                                    Doctor Assign
                                </Typography>
                            )}
                        </Paper>
                    </Box>
                    <Box sx={{
                        width: 688,
                        height: 82,
                        display: 'flex',
                        justifyContent: 'center',
                        borderRadius: 30,
                        border: '0.5px solid #D9D9D9',
                        marginLeft: 13
                    }}
                    >
                        <Paper
                            sx={{
                                boxShadow: 'none',
                                paddingTop: 2,
                            }}>
                            {loading ? (
                                <Skeleton variant="text" animation="wave" width={200} height={45} />
                            ) : (
                                <Typography
                                    sx={{
                                        fontSize: 30,
                                        fontWeight: 400
                                    }}
                                >
                                    Dr. Alex
                                </Typography>
                            )}
                        </Paper>
                    </Box>
                </Grid2>
                <br />
                <br />
                <br />
                {/* button next and back */}
                <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                    <Box
                        sx={{
                            alignItems: 'center',
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

                                <Button
                                    onClick={() => navigate(`/Doctor/Medical Record/${data.patientID}`)}
                                    sx={{
                                        width: 'fit-content',
                                        color: '#000',
                                        borderRadius: 30,
                                        margin: '0 auto',
                                    }}
                                >
                                    <ReplyIcon
                                        sx={{
                                            marginRight: 1.375,
                                            width: 40,
                                            height: 40
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            fontSize: 30,
                                            fontWeight: 700
                                        }}
                                    >
                                        Back
                                    </Typography>
                                </Button>
                            )}
                        </Stack>
                    </Box>
                </div>
            </Box >
        </Box >
    )
}

export default Body_content;

