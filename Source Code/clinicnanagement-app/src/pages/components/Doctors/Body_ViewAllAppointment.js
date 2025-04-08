import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import {Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import imageContent from '../../../assets/images/image_content_viewallappointment.jpg';



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

    return (
        <Box
            sx={{
                marginTop: 6,
                marginBottom: 35,
                boxShadow: 'none',
                overflowX: 'hidden', // Hide the horizontal scrollbar
            }}>
            {/* details doctor */}
            <Grid2>
                <Box
                    sx={{
                        display: 'flex',
                        justifyContent: 'center',
                    }}
                >
                    {loading ? (
                        <Skeleton variant="rectangular" animation="wave" width={2000} height={469} />
                    ) : (
                        <Paper style={{}}
                            sx={{
                                boxShadow: 'none',
                                backgroundColor: '#EEF1F6',
                                width: 1718,
                                height: 616
                            }}
                        >
                            <img
                                src={imageContent}
                                alt='img'
                                height={616}
                                width={1482}
                                style={{ marginLeft: 118 }}
                            />
                        </Paper>
                    )}
                </Box>
            </Grid2>
            <br />
            <br />
            {/* overview appointment */}
            <Paper
                sx={{
                    boxShadow: 'none'
                }}
            >
                {loading ? (
                    <>
                        <Skeleton variant="text" animation="wave" width={500} height={80} sx={{ marginLeft: 94, alignItems: 'center', display: 'flex', justifyContent: 'center', }} />
                        <Skeleton variant="rectangular" animation="wave" width={1640} height={390} sx={{ marginLeft: 21.4, }} />
                    </>
                ) : (
                    <>
                        <Paper
                            sx={{
                                marginLeft: 11.4,
                                width: 1718,
                                height: 390,
                                boxShadow: 'none'
                            }}>
                            <TableContainer>
                                <Table sx={{ minWidth: 1560 }}>
                                    <TableHead >
                                        <TableRow>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                ID appointment
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Patient name
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Doctor assign
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Treatment
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Date
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                }}
                                            >
                                                Time
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

                                                    }}
                                                >
                                                    <Paper sx={{ boxShadow: 'none' }}>
                                                        <Typography
                                                            sx={{
                                                                fontSize: 30,
                                                                fontWeight: 400
                                                            }}
                                                        >
                                                            #12697
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
                                                            Nguyen Van B
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
                                                            Drs. Van
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
                                                            Foundation Fundamentals
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
                                                            22/05/2023
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
                                                                fontWeight: 400,
                                                                color: '#000'
                                                            }}
                                                        >
                                                            10:30 am
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
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
                                                            #12698
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
                                                            Nguyen Van C
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
                                                            Dr. Alex
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
                                                            Foundation Fundamentals
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
                                                            22/05/2023
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
                                                                fontWeight: 400,
                                                                color: '#000'
                                                            }}
                                                        >
                                                            10:30 am
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                        <TableRow>
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
                                                            #12699
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
                                                            Nguyen Van D
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
                                                            Dr. Kien
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
                                                            Foundation Fundamentals
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
                                                            22/05/2023
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
                                                                fontWeight: 400,
                                                                color: '#000'
                                                            }}
                                                        >
                                                            10:30 am
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
                        </Paper>
                    </>
                )}
            </Paper>
        </Box >
    )
}

export default Body_content;