import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import Stack from '@mui/material/Stack';
import styled from '@emotion/styled';
import { useParams } from 'react-router-dom';
import { GetReportFromAiervices } from '../../../api/peportFromAiServices';

const CustomTextarea = styled(TextareaAutosize)({
    width: 1655,
    minHeight: 200,
    fontSize: '30px',
    fontWeight: 400,
    padding: '20px', // Add padding for better visual appearance
    borderRadius: 30,
    resize: 'none'
});

export const BodyContent = () => {

    const { reportAiID } = useParams();
    const [reportAIData, setReportAIData] = useState(null);

    // skeleton effect
    const [loading, setLoading] = useState(true);

    useEffect(() => {

        async function fetchData() {
            const data = await GetReportFromAiervices(reportAiID);
            setReportAIData(data);
        }

        // Simulating loading time
        const timer = setTimeout(() => {
            fetchData()
            setLoading(false);
        }, 3000);

        return () => clearTimeout(timer);
    }, [reportAiID]);

    return (
        <Box
            sx={{
                marginTop: 6,
                marginBottom: 35,
                boxShadow: 'none',
                overflowX: 'hidden', // Hide the horizontal scrollbar
            }} >
            {reportAIData ? (
                <>
                    {/* image result */}
                    < Grid2 >
                        <Box
                            sx={{
                                marginLeft: 40,
                                marginRight: 35
                            }}
                        >
                            <Stack direction={'row'} spacing={20}>
                                <Paper
                                    sx={{
                                        boxShadow: 'none',
                                        marginRight: 3
                                    }}>
                                    {loading ? (
                                        <>
                                            <Skeleton variant="text" animation="wave" width={340} height={250} />
                                            <Skeleton variant="text" animation="wave" width={350} height={250} />
                                        </>
                                    ) : (
                                        <Typography sx={{ fontSize: 150, fontWeight: 400, marginTop: 10 }}>
                                            TEST<br />RESULT
                                        </Typography>
                                    )}
                                </Paper>
                                {loading ? (
                                    <Skeleton variant="rectangular" animation="wave" width={640} height={640} />
                                ) : (
                                    <img src={reportAIData.imageDetected} width={640} height={640} alt='img'
                                        style={{ borderRadius: 50 }}
                                    />
                                )}
                            </Stack>
                        </Box>
                    </Grid2 >
                    <br />
                    <br />
                    {/* overview  */}
                    <Paper
                        sx={{
                            boxShadow: 'none'
                        }}
                    >
                        {loading ? (
                            <>
                                <Skeleton variant="rectangular" animation="wave" width={1640} height={390} sx={{ marginLeft: 21.4, }} />
                            </>
                        ) : (
                            <>
                                <Paper
                                    sx={{
                                        marginLeft: 21.4,
                                        width: 1564,
                                        boxShadow: 'none'
                                    }}>
                                    <TableContainer sx={{ borderRadius: 5, border: '1px solid' }}>
                                        <Table sx={{ minWidth: 1560 }}>
                                            <TableHead sx={{ background: 'black', }}>
                                                <TableRow>
                                                    <TableCell
                                                        align='center'
                                                        sx={{
                                                            fontSize: 25,
                                                            fontWeight: 500,
                                                            color: 'white'
                                                        }}
                                                    >
                                                        Date Create
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{
                                                            fontSize: 25,
                                                            fontWeight: 500,
                                                            color: 'white'
                                                        }}
                                                    >
                                                        Acne scars
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{
                                                            fontSize: 25,
                                                            fontWeight: 500,
                                                            color: 'white'
                                                        }}
                                                    >
                                                        Papular
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{
                                                            fontSize: 25,
                                                            fontWeight: 500,
                                                            color: 'white'
                                                        }}
                                                    >
                                                        Blackheads
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{
                                                            fontSize: 25,
                                                            fontWeight: 500,
                                                            color: 'white'
                                                        }}
                                                    >
                                                        Purulent
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{
                                                            fontSize: 25,
                                                            fontWeight: 500,
                                                            color: 'white'
                                                        }}
                                                    >
                                                        Sebo cystan conglo
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{
                                                            fontSize: 25,
                                                            fontWeight: 500,
                                                            color: 'white'
                                                        }}
                                                    >
                                                        Total of acne detected
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                <TableRow>
                                                    <TableCell
                                                        align='center'
                                                        sx={{ borderRight: '1px solid' }}
                                                    >
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
                                                                    {reportAIData.dateCreate}
                                                                </Typography>
                                                            </Paper>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{ borderRight: '1px solid' }}
                                                    >
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
                                                                    {reportAIData.acne_scars}
                                                                </Typography>
                                                            </Paper>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{ borderRight: '1px solid' }}
                                                    >
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
                                                                    {reportAIData.papular}
                                                                </Typography>
                                                            </Paper>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{ borderRight: '1px solid' }}
                                                    >
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
                                                                    {reportAIData.blackhead}
                                                                </Typography>
                                                            </Paper>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{ borderRight: '1px solid' }}
                                                    >
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
                                                                        fontWeight: 400,
                                                                        color: '#000'
                                                                    }}
                                                                >
                                                                    {reportAIData.purulent}
                                                                </Typography>
                                                            </Paper>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{ borderRight: '1px solid' }}
                                                    >
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
                                                                        fontWeight: 400,
                                                                        color: '#000'
                                                                    }}
                                                                >
                                                                    {reportAIData.sebo_crystan_conglo}
                                                                </Typography>
                                                            </Paper>
                                                        </Box>
                                                    </TableCell>
                                                    <TableCell align='center' >
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
                                                                        fontWeight: 400,
                                                                        color: '#000'
                                                                    }}
                                                                >
                                                                    {reportAIData.total_of_acne_detected}
                                                                </Typography>
                                                            </Paper>
                                                        </Box>
                                                    </TableCell>
                                                </TableRow>
                                            </TableBody>
                                        </Table>
                                    </TableContainer>
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
                                    >
                                        {loading ? (
                                            <Skeleton variant="text" animation="wave" width={1500} height={500} />
                                        ) : (
                                            <CustomTextarea
                                                value={reportAIData.evaluate}
                                            />
                                        )}
                                    </Grid2>
                                </Paper>
                            </>
                        )}
                    </Paper>
                </>
            ) : (
                <div></div>
            )}
        </Box >
    );
};


// test result client side
export const BodyTestResultclient = () => {

    // skeleton effect
    const [loading, setLoading] = useState(true);
    const [data, setData] = useState('');

    useEffect(() => {
        getReportFromAI();
        // Simulating loading time
        const timer = setTimeout(() => {
            getReportFromAI();
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);
    const getReportFromAI = async () => {
        const id = sessionStorage.getItem('reportFromAIID');
        const req = await GetReportFromAiervices(id);
        setData(req)
    }

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
                        marginLeft: 40,
                        marginRight: 35
                    }}
                >
                    <Stack direction={'row'} spacing={20}>
                        <Paper
                            sx={{
                                boxShadow: 'none',
                                marginRight: 3
                            }}>
                            {loading ? (
                                <>
                                    <Skeleton variant="text" animation="wave" width={340} height={250} />
                                    <Skeleton variant="text" animation="wave" width={350} height={250} />
                                </>
                            ) : (
                                <Typography sx={{ fontSize: 150, fontWeight: 400, marginTop: 10 }}>
                                    TEST<br />RESULT
                                </Typography>
                            )}
                        </Paper>
                        {loading ? (
                            <Skeleton variant="rectangular" animation="wave" width={700} height={469} />
                        ) : (
                            <img src={data.imageDetected} width={640} height={640} alt='img'
                                style={{ borderRadius: 50 }}
                            />
                        )}
                    </Stack>
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
                        <Skeleton variant="rectangular" animation="wave" width={1640} height={390} sx={{ marginLeft: 21.4, }} />
                    </>
                ) : (
                    <>
                        <Paper
                            sx={{
                                marginLeft: 21.4,
                                width: 1564,
                                boxShadow: 'none'
                            }}>
                            <TableContainer sx={{ borderRadius: 5, border: '1px solid' }}>
                                <Table sx={{ minWidth: 1560 }}>
                                    <TableHead sx={{ background: 'black', }}>
                                        <TableRow>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white'
                                                }}
                                            >
                                                Date Create
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white'
                                                }}
                                            >
                                                Acne scars
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white'
                                                }}
                                            >
                                                Papular
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white'
                                                }}
                                            >
                                                Blackheads
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white'
                                                }}
                                            >
                                                Purulent
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white'
                                                }}
                                            >
                                                Sebo cystan conglo
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white'
                                                }}
                                            >
                                                Total of acne detected
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        <TableRow >
                                            <TableCell
                                                align='center'
                                                sx={{ borderRight: '1px solid' }}
                                            >
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
                                                            {data.dateCreate}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{ borderRight: '1px solid' }}
                                            >
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
                                                            {data.acne_scars}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{ borderRight: '1px solid' }}
                                            >
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
                                                            {data.papular}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{ borderRight: '1px solid' }}
                                            >
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
                                                            {data.blackhead}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{ borderRight: '1px solid' }}
                                            >
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
                                                                fontWeight: 400,
                                                                color: '#000'
                                                            }}
                                                        >
                                                            {data.purulent}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{ borderRight: '1px solid' }}
                                            >
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
                                                                fontWeight: 400,
                                                                color: '#000'
                                                            }}
                                                        >
                                                            {data.sebo_crystan_conglo}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                            <TableCell align='center' >
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
                                                                fontWeight: 400,
                                                                color: '#000'
                                                            }}
                                                        >
                                                            {data.total_of_acne_detected}
                                                        </Typography>
                                                    </Paper>
                                                </Box>
                                            </TableCell>
                                        </TableRow>
                                    </TableBody>
                                </Table>
                            </TableContainer>
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
                                    value={data.evaluate}
                                />
                            )}
                            </Grid2>
                        </Paper>
                    </>
                )}
            </Paper>
        </Box >
    )
}