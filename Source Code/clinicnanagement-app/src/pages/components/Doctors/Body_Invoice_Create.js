import React, { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_invoice.jpg';
import { Autocomplete, Button, Divider, FormControl, FormHelperText, IconButton, Input, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import ReplyIcon from '@mui/icons-material/Reply';
import ClearIcon from '@mui/icons-material/Clear';
import { GetPatientByPhone, getCurrentDate } from '../../../helper/Util';
import { GetAllTreatmentsServices } from '../../../api/treatmentServices';
import AddIcon from '@mui/icons-material/Add';
import { CreateInvoiceServices } from '../../../api/invoiceServices';
import { CreateDetailInvoicesServices } from '../../../api/detailInvoicesServices';
import { useNavigate } from 'react-router-dom';
const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent1})`,
        height: 630,
        backgroundSize: 'cover',

    },
};

const Body_content = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        getTreatments();
        // Simulating loading time
        const timer = setTimeout(() => {
            getTreatments();
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const [phoneNumber, setPhoneNumber] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [patient, setPatient] = useState('');
    const [address, setAddress] = useState('');
    const [name, setName] = useState('');
    const [treatment, setTreatment] = useState([]);

    const handlePhoneNumberChange = async (event) => {
        const newPhoneNumber = event.target.value;
        if (/^\d{10}$/.test(newPhoneNumber) || newPhoneNumber === '') {
            const patient = await GetPatientByPhone(newPhoneNumber);
            setName('');
            setAddress('');
            if (patient) {
                setName(patient.name);
                setAddress(patient.address);
                setPatient(patient);
                setPhoneNumber(newPhoneNumber);
            }
            setPhoneNumberError('');
        } else {
            setPhoneNumberError('Please enter a valid 10-digit phone number.');
        }
    };
    const getTreatments = async () => {
        const data = await GetAllTreatmentsServices();
        setTreatment(data)
    }

    // add row treatment
    const [row1s, setRow1s] = useState([
        // Initialize with an empty row
        { treatmentId: '', treatment: '', price1: '' },
    ]);

    const handleEnterKey1 = (event, index) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            addRow1();
        }
    };

    const addRow1 = () => {
        setRow1s([...row1s, { treatment: '', price1: '' }]);
        calculateTotal1();

    };

    const deleteRow1 = (index) => {
        if (row1s.length === 1) {
            // If only one row remains, do not delete it
            return;
        }

        const updatedRow1s = [...row1s];
        updatedRow1s.splice(index, 1);
        setRow1s(updatedRow1s);
        calculateTotal1();
    };

    const [total1, setTotal1] = useState(0);

    const calculateTotal1 = useCallback(() => {
        const calculatedTotal1 = row1s.reduce((total1, row1) => {
            const { price1 } = row1;
            if (price1 && /^\d+$/.test(price1)) {
                return total1 + (parseInt(price1));
            }
            return total1;
        }, 0);
        setTotal1(calculatedTotal1 + '$');
    }, [row1s]);

    useEffect(() => {
        calculateTotal1();
    }, [calculateTotal1]);
    const navigate = useNavigate();

    const handleSubmit = async () => {
        let isFormValid = true;
        const validateField = (value, regex, setError) => {
            if (!value.trim()) {
                setError('This field is required and please enter valid.');
                isFormValid = false;
            } else if (!regex.test(value)) {
                setError('Invalid input.');
                isFormValid = false;
            } else {
                setError('');
            }
        };
        if (selectedTreatment === "") {
            return;
        }
        validateField(phoneNumber, /^\d{10}$/, setPhoneNumberError);

        row1s.forEach((row, index) => {
            const errors1 = {};

            if (!/^[a-zA-Z\s]+$/.test(row.treatment) || !(row.treatment).trim()) {
                errors1.treatment = 'This field is required and pleased enter valid.';
                isFormValid = false;
            }

            if (!/^\d+$/.test(row.price1)) {
                errors1.price1 = 'Please choose a treatment!';
                isFormValid = false;
            }
        });

        if (isFormValid) {
            const invoice = {
                InvoiceDate: getCurrentDate(),
                PatientID: patient.patientID,
                Status: false,
            }
            await CreateInvoiceServices(invoice)
                .then(async response => {
                    for (const row of row1s) {
                        const detailInvoice = {
                            TreatmentID: row.treatmentId,
                            InvoiceID: response.patientID,
                        };
                        await CreateDetailInvoicesServices(detailInvoice);
                    }
                    navigate("/doctor");
                })
                .catch(error => {
                    console.error('Error fetching data:', error);
                });
        }
    }
    const [validationError, setValidationError] = useState('');
    const [selectedTreatment, setSelectedTreatment] = useState('');
    const [validate, setValidate] = useState(false);
    const handleServiceSelect = async (event, value, index) => {
        const updatedRow1s = [...row1s];
        updatedRow1s[index].price1 = '';
        updatedRow1s[index].treatment = '';
        setRow1s(updatedRow1s);
        setValidate(true);
        setSelectedTreatment('');
        if (value) {
            const selectedSpecialist = treatment.find(service => service.treatmentName === value);
            if (selectedSpecialist) {
                setValidate(false);
                const selectedId = selectedSpecialist.treatmentID;
                // Now you can use the selectedId as needed
                setSelectedTreatment(value);
                // Update the cost for the corresponding row
                const updatedRow1s = [...row1s];
                updatedRow1s[index].price1 = selectedSpecialist.cost;
                updatedRow1s[index].treatment = selectedSpecialist.treatmentName;
                updatedRow1s[index].treatmentId = selectedId;
                setRow1s(updatedRow1s);
                setSelectedTreatment(value);
            }
        }
        if (validationError && value) {
            setValidationError('');
        }
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
            <Box
                sx={{
                    marginTop: 8,
                    marginBottom: 30,
                    boxShadow: 'none'
                }}
            >
                {loading ? (
                    <>
                        <Skeleton variant="rectangular" animation="wave" width="100%" height={81} />
                        <Skeleton variant="rectangular" animation="wave" width="100%" height={167} />
                        <Skeleton variant="rectangular" animation="wave" width="100%" height={245} />
                        <Skeleton variant="rectangular" animation="wave" width="100%" height={245} />
                    </>
                ) : (
                    <div>
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
                                                        width: 415,
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
                                                        width: 285,
                                                        borderLeft: '1px solid',
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
                                                        width: 468,
                                                        borderLeft: '1px solid',
                                                        borderBottom: '1px solid',
                                                    }}
                                                >
                                                    Address
                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            <TableRow>
                                                <TableCell align='center'
                                                >
                                                    <FormControl sx={{ '& input': { fontSize: 30, fontWeight: 400, textAlign: 'center' } }}>
                                                        <Input
                                                            onChange={handlePhoneNumberChange}
                                                        />
                                                        {phoneNumberError && <FormHelperText sx={{ color: '#d32f2f' }}>{phoneNumberError}</FormHelperText>}
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell align='center'
                                                    sx={{
                                                        borderLeft: '1px solid',
                                                    }}
                                                >
                                                    <FormControl sx={{ '& input': { fontSize: 30, fontWeight: 400, textAlign: 'center' } }}>
                                                        <Input disabled={true}
                                                            value={name}
                                                        />
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell align='center'
                                                    sx={{
                                                        borderLeft: '1px solid',
                                                    }}
                                                >
                                                    <FormControl sx={{ '& input': { fontSize: 30, fontWeight: 400, textAlign: 'center' } }}>
                                                        <Input disabled={true}
                                                            value={address}
                                                        />
                                                    </FormControl>
                                                </TableCell>
                                            </TableRow>
                                        </TableBody>
                                    </Table>
                                </TableContainer>
                            </Box>
                        </Grid2>
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
                                                        width: 1100,
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
                                                        width: 450,
                                                        borderBottom: '1px solid'
                                                    }}
                                                >
                                                    Price
                                                </TableCell>
                                                <TableCell
                                                    align='center'
                                                    sx={{
                                                        fontSize: 30,
                                                        fontWeight: 700,
                                                        borderBottom: '1px solid'
                                                    }}
                                                >

                                                </TableCell>
                                            </TableRow>
                                        </TableHead>
                                        <TableBody>
                                            {row1s.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align='center'
                                                        sx={{
                                                            borderLeft: '0px solid',
                                                        }}
                                                    >
                                                        <Autocomplete
                                                            sx={{ '& input': { fontSize: 30, fontWeight: 400, width: 500, textAlign: 'center' } }}
                                                            disablePortal
                                                            id="combo-box-demo"
                                                            options={treatment.map(service => service.treatmentName)}
                                                            onChange={(event, value) => handleServiceSelect(event, value, index)}
                                                            value={row.treatmentName}
                                                            renderInput={(params) =>
                                                                <TextField {...params} label=""
                                                                    sx={{
                                                                        "& .MuiAutocomplete-inputRoot": {
                                                                            paddingLeft: "20px !important",
                                                                            borderRadius: "15px"
                                                                        },
                                                                    }}
                                                                />}
                                                        />
                                                    </TableCell>
                                                    <TableCell align='center' sx={{ borderLeft: '1px solid' }}>
                                                        <FormControl
                                                            error={!!validate}
                                                            sx={{ '& input': { fontSize: 30, fontWeight: 400, textAlign: 'center' } }}>
                                                            <Input
                                                                disabled={true}
                                                                value={row.price1}
                                                                onKeyDown={(event) => handleEnterKey1(event, index)}
                                                            />
                                                            {validate && (
                                                                <FormHelperText >Please choose the treatment</FormHelperText>
                                                            )}
                                                        </FormControl>
                                                        <p style={{ display: 'flex', float: 'right', fontSize: 30, fontWeight: 400 }}>$</p>
                                                        {row1s.length > 1 && (
                                                            <IconButton
                                                                aria-label='delete'
                                                                size='small'
                                                                color='error'
                                                                onClick={() => deleteRow1(index)}
                                                            >
                                                                <ClearIcon />
                                                            </IconButton>
                                                        )}
                                                    </TableCell>
                                                    <TableCell align='center' colSpan={3} sx={{ borderLeft: '0px solid' }}>
                                                        <IconButton
                                                            aria-label='add'
                                                            size='small'
                                                            color='primary'
                                                            onClick={addRow1}
                                                        >
                                                            <AddIcon />
                                                        </IconButton>
                                                    </TableCell>
                                                </TableRow>
                                            ))}
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
                                                                {total1}
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
                                Total: {total1}
                            </Typography>
                        </div>
                    </div>
                )}
                <br />
                <br />
                <br />
                {/* button Add and back */}
                <Box
                    sx={{
                        marginLeft: 111,
                        marginRight: 105
                    }}>
                    {loading ? (
                        <Skeleton
                            variant="text"
                            animation="wave"
                            width='100%'
                            height={80}
                        />
                    ) : (
                        <Button
                            onClick={handleSubmit}
                            sx={{
                                borderRadius: 30,
                                marginTop: 3.125,
                                width: 175,
                                fontSize: 30,
                                fontWeight: 500,
                                color: '#fff',
                                bgcolor: '#000',
                                ":hover": { bgcolor: 'gray' }
                            }}
                        >
                            Add
                        </Button>
                    )}
                    <br />
                    <br />
                    <Divider />
                    <br />
                    <Stack>
                        {loading ? (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width='100%'
                                height={80}
                            />
                        ) : (
                            <Button href='/Doctor/Medical Record' sx={{
                                width: 'fit-content',
                                color: '#000',
                                borderRadius: 30,
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
            </Box >
        </Box >
    )
}

export default Body_content;

