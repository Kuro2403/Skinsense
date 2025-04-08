import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_invoice.jpg';
import Skeleton from '@mui/material/Skeleton';
import 'slick-carousel/slick/slick-theme.css';
import PropTypes from 'prop-types';
import SwipeableViews from 'react-swipeable-views';
import { useTheme } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Tabs from '@mui/material/Tabs';
import Typography from '@mui/material/Typography';
import { Button, Divider, Tab, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { GetDetailInvoiceByInvoiceID, GetInvoiceByEmail, GetPatientByEmail } from '../../../helper/Util';

const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent1})`,
        height: 586,
        backgroundSize: 'cover',

    },
};

function TabPanel(props) {
    const { children, value, index, ...other } = props;

    return (
        <Typography
            component="div"
            role="tabpanel"
            hidden={value !== index}
            id={`action-tabpanel-${index}`}
            aria-labelledby={`action-tab-${index}`}
            {...other}
        >
            {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
        </Typography>
    );
}

TabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

function a11yProps(index) {
    return {
        id: `action-tab-${index}`,
        'aria-controls': `action-tabpanel-${index}`,
    };
}

const Body_content = () => {

    // skeleton effect
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        // Simulating loading time
        getInvoice();
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);
    const [invoice, setInvoice] = useState([]);
    const [invoiceValid, setInvoiceValid] = useState(true);

    const getInvoice = async () => {
        const email = sessionStorage.getItem('Email');
        const patient = await GetInvoiceByEmail(email);
        if (patient.length === 0) {
            setInvoiceValid(true);
        } else {
            setInvoiceValid(false);
            setInvoice(patient)
        }
    }

    const theme = useTheme();
    const [value, setValue] = useState(0);
    const [detailInvoice, setDetailInvoice] = useState([]);
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [email, setEmail] = useState('');

    const handleChange = (event, newValue) => {
        setValue(newValue);
    };

    const handleChangeIndex = (index) => {
        setValue(index);
    };

    const handleClick = async (id) => {
        const detailInvoice = await GetDetailInvoiceByInvoiceID(id);
        const email = sessionStorage.getItem('Email');
        const patient = await GetPatientByEmail(email);
        setName(patient.name);
        setAddress(patient.address);
        setPhone(patient.phone);
        setEmail(email);
        setDetailInvoice(detailInvoice);
        if (value === 0) {
            setValue(1);
        }

    };
    let count = 0;
    let totalCost = 0;
    return (
        <Box
            sx={{
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
            {/* This content will be display when user no login yet */}
            {
                invoiceValid ? (
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
                                        Sorry, you don't have any invoice yet
                                    </Typography>
                                )}
                            </Box>
                        </Grid2>
                    </Box>
                ) : <Box>
                    <Box
                        sx={{
                            marginTop: 12,
                            marginLeft: 3,
                            width: 500,
                            position: 'relative',
                        }}
                    >
                        <AppBar position="static" color="default"
                            sx={{ boxShadow: 'none', background: 'none' }}
                        >
                            {loading ? (
                                <style style={{ display: 'flex' }}>
                                    <Skeleton variant="text" animation="wave" width={200} height={50}
                                        sx={{ margin: '0 auto', marginLeft: 2 }}
                                    />
                                    <Skeleton variant="text" animation="wave" width={200} height={50}
                                        sx={{ margin: '0 auto' }}
                                    />
                                </style>
                            ) : (
                                <>
                                    <Tabs
                                        value={value}
                                        onChange={handleChange}
                                        TabIndicatorProps={{
                                            style: {
                                                height: 5
                                            },
                                        }}
                                        variant="fullWidth"
                                        aria-label="action tabs example"
                                    >
                                        <Tab label="List Invoices" {...a11yProps(0)} sx={{ fontSize: 20, fontWeight: 600 }} />
                                        <Tab  {...a11yProps(1)} sx={{ fontSize: 20, fontWeight: 600 }} disabled={true} />
                                    </Tabs>
                                </>
                            )}
                        </AppBar>
                    </Box>
                    <Divider />
                    {loading ? (
                        <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
                    ) : (
                        <Box
                            sx={{
                                marginBottom: 30,
                            }}>
                            <SwipeableViews
                                axis={theme.direction === 'rtl' ? 'x-reverse' : 'x'}
                                index={value}
                                onChangeIndex={handleChangeIndex}
                            >
                                <TabPanel value={value} index={0} dir={theme.direction}>
                                    <TableContainer>
                                        <Table sx={{ minWidth: 1710 }}>
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
                                                        INVOICE ID
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{
                                                            fontSize: 25,
                                                            fontWeight: 500,
                                                            color: 'white'
                                                        }}
                                                    >
                                                        INVOICE DATE
                                                    </TableCell>
                                                    <TableCell
                                                        align='center'
                                                        sx={{
                                                            fontSize: 25,
                                                            fontWeight: 500,
                                                            color: 'white'
                                                        }}
                                                    >
                                                        STATUS
                                                    </TableCell>
                                                    <TableCell align='center'>
                                                    </TableCell>
                                                </TableRow>
                                            </TableHead>
                                            <TableBody>
                                                {invoice
                                                    .map((row) => {
                                                        count++;
                                                        return (
                                                            <TableRow tabIndex={-1} key={row.invoiceID}>
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
                                                                                {count}
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
                                                                                {row.invoiceDate}
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
                                                                            {row.status ? (
                                                                                <Typography
                                                                                    sx={{
                                                                                        fontSize: 30,
                                                                                        fontWeight: 400,
                                                                                        color: '#50850D'
                                                                                    }}
                                                                                >
                                                                                    Paid
                                                                                </Typography>
                                                                            ) : (<Typography
                                                                                sx={{
                                                                                    fontSize: 30,
                                                                                    fontWeight: 400,
                                                                                    color: 'red'
                                                                                }}
                                                                            >
                                                                                Unpaid
                                                                            </Typography>)}
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
                                                                            <Box>
                                                                                {loading ? (
                                                                                    <Skeleton
                                                                                        variant="text"
                                                                                        animation="wave"
                                                                                        width={135}
                                                                                        height={80}
                                                                                        sx={{ margin: '0 auto' }}
                                                                                    />
                                                                                ) : (
                                                                                    <Button
                                                                                        onClick={() => {
                                                                                            handleClick(row.invoiceID);
                                                                                        }}
                                                                                        sx={{
                                                                                            backgroundColor: '#fff',
                                                                                            color: '#000',
                                                                                            border: '1px solid #000',
                                                                                            borderRadius: 30,
                                                                                            width: 135,
                                                                                            height: 80,
                                                                                            fontWeight: 700,
                                                                                            ":hover": { background: 'gray' }
                                                                                        }}
                                                                                    >
                                                                                        Details
                                                                                    </Button>
                                                                                )}
                                                                            </Box>
                                                                        </Paper>
                                                                    </Box>
                                                                </TableCell>
                                                            </TableRow>
                                                        );
                                                    })}

                                            </TableBody>
                                        </Table>
                                    </TableContainer>
                                </TabPanel>
                                <TabPanel value={value} index={1} dir={theme.direction}>
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
                                            <Box>
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
                                                                        width: 415,
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
                                                                        width: 285,
                                                                        borderLeft: '1px solid',
                                                                        borderBottom: '1px solid',
                                                                    }}
                                                                >
                                                                    Phone Number
                                                                </TableCell>
                                                                <TableCell
                                                                    align='center'
                                                                    sx={{
                                                                        fontSize: 30,
                                                                        fontWeight: 700,
                                                                        width: 468,
                                                                        borderLeft: '1px solid',
                                                                        borderBottom: '1px solid',
                                                                    }}
                                                                >
                                                                    Address
                                                                </TableCell>
                                                                <TableCell
                                                                    align='center'
                                                                    sx={{
                                                                        fontSize: 30,
                                                                        fontWeight: 700,
                                                                        width: 497,
                                                                        borderLeft: '1px solid',
                                                                        borderBottom: '1px solid',
                                                                    }}
                                                                >
                                                                    Email
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
                                                                                {name}
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
                                                                                {phone}
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
                                                                                {address}
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
                                                                                {email}
                                                                            </Typography>
                                                                        </Paper>
                                                                    </Box>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
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
                                                <TableContainer
                                                    sx={{
                                                        border: '1px solid',
                                                        borderRadius: 10
                                                    }}>
                                                    <Table sx={{ minWidth: 1665, }}>
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
                                                                        width: 1170,
                                                                        borderBottom: '1px solid',
                                                                        borderRight: '1px solid',
                                                                    }}
                                                                >
                                                                    Treatment
                                                                </TableCell>
                                                                <TableCell
                                                                    align='center'
                                                                    sx={{
                                                                        fontSize: 30,
                                                                        fontWeight: 700,
                                                                        width: 496,
                                                                        borderBottom: '1px solid'
                                                                    }}
                                                                >
                                                                    Price
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableHead>
                                                        <TableBody>
                                                            {detailInvoice
                                                                .map((row) => {
                                                                    totalCost += parseFloat(row.treatment.cost);
                                                                    return (
                                                                        <TableRow tabIndex={-1} key={row.detailInvoiceID}>
                                                                            <TableCell align='center'
                                                                                sx={{
                                                                                    borderRight: '1px solid',
                                                                                    borderBottom: '1px solid'
                                                                                }}
                                                                            >
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
                                                                                            {row.treatment.treatmentName}
                                                                                        </Typography>
                                                                                    </Paper>
                                                                                </Box>
                                                                            </TableCell>
                                                                            <TableCell align='center'
                                                                                sx={{
                                                                                    borderBottom: '1px solid'
                                                                                }}
                                                                            >
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
                                                                                            {row.treatment.cost}$
                                                                                        </Typography>
                                                                                    </Paper>
                                                                                </Box>
                                                                            </TableCell>
                                                                        </TableRow>
                                                                    );
                                                                })}
                                                            <TableRow>
                                                                <TableCell align='center'
                                                                    sx={{
                                                                        backgroundColor: '#d9d9d9',
                                                                        borderRight: '1px solid',
                                                                        fontSize: 30,
                                                                        fontWeight: 700
                                                                    }}
                                                                >
                                                                    Total:
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
                                                                                {totalCost}$
                                                                            </Typography>
                                                                        </Paper>
                                                                    </Box>
                                                                </TableCell>
                                                            </TableRow>
                                                        </TableBody>
                                                    </Table>
                                                </TableContainer>
                                            </Box>
                                        </Grid2>
                                        <br />
                                        <div style={{ minWidth: 527, float: 'right', marginRight: 61 }}>
                                            <hr />
                                            <br />
                                            <Typography variant="h3" align='center'>
                                                Total: {totalCost}$
                                            </Typography>
                                        </div>
                                    </Box >
                                </TabPanel>
                            </SwipeableViews>
                        </Box >
                    )}
                </Box >
            }
        </Box >
    )
}

export default Body_content;

