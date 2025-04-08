import React, { useState, useEffect, useCallback } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_medical_record.jpg';
import { Button, Divider, FormControl, FormHelperText, IconButton, Input, Stack, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextareaAutosize, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import ReplyIcon from '@mui/icons-material/Reply';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { DatePicker } from '@mui/x-date-pickers/DatePicker';
import dayjs from 'dayjs';
import ClearIcon from '@mui/icons-material/Clear';

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
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const [idMedicalRecord, setIdMedicalRecord] = useState('');
    const [idMedicalRecordError, setIdMedicalRecordError] = useState('');

    const handleIdMedicalRecordChange = (event) => {
        const newIdMedicalRecord = event.target.value;
        if (/^[0-9]+$/.test(newIdMedicalRecord) || newIdMedicalRecord === '') {
            setIdMedicalRecord(newIdMedicalRecord);
            setIdMedicalRecordError('');
        } else {
            setIdMedicalRecordError('Please enter a positive integer.');
        }
    };

    const handleDateChange = (date) => {
        // Convert the selected date to a format suitable for the backend
        const formattedDate = dayjs(date).format('DD/MM/YYYY'); // Format the selected date as "DD/MM/YYYY"

        console.log('Selected Date:', formattedDate);

        // // Send the formatted date to the backend
        // fetch('/api/endpoint', {
        //     method: 'POST',
        //     body: JSON.stringify({ date: formattedDate }),
        //     headers: {
        //         'Content-Type': 'application/json',
        //     },
        // })
        //     .then((response) => response.json())
        //     .then((data) => {
        //         // Handle the response from the backend
        //         console.log('Backend response:', data);
        //     })
        //     .catch((error) => {
        //         // Handle any errors that occur during the API call
        //         console.error('Error:', error);
        //     });

        // //solution 2

        // // Send the formatted date to the backend using Axios
        // axios.post('/api/endpoint', { date: formattedDate })
        //     .then((response) => {
        //         // Handle the response from the backend
        //         console.log('Backend response:', response.data);
        //     })
        //     .catch((error) => {
        //         // Handle any errors that occur during the API call
        //         console.error('Error:', error);
        //     });


    };

    const [patientName, setPatientName] = useState('');
    const [patientNameError, setPatientNameError] = useState('');

    const handlePatientNameChange = (event) => {
        const newPatientName = event.target.value;
        if (/^[a-zA-Z\s]+$/.test(newPatientName) || newPatientName === '') {
            setPatientName(newPatientName);
            setPatientNameError('');
        } else {
            setPatientNameError('Please enter characters from a-z or A-Z.');
        }
    };

    const [diagnosis, setDiagnosis] = useState('');
    const [diagnosisError, setDiagnosisError] = useState('');

    const handleDiagnosisChange = (event) => {
        const newDiagnosis = event.target.value;
        if (/^[a-zA-Z\s]+$/.test(newDiagnosis) || newDiagnosis === '') {
            setDiagnosis(newDiagnosis);
            setDiagnosisError('');
        } else {
            setDiagnosisError('Please enter characters from a-z or A-Z.');
        }
    };

    // add row
    const [rows, setRows] = useState([
        // Initialize with an empty row
        { medicine: '', dosage: '', price: '' },
    ]);

    // set errors follow row
    const [rowErrors, setRowErrors] = useState(
        rows.map(() => (
            { medicine: '', dosage: '', price: '' }
        ))
    );

    const handleMedicineChange = (event, index) => {
        const { value } = event.target;
        const updatedRows = [...rows];
        updatedRows[index].medicine = value;
        setRows(updatedRows);

        const newMedicine = event.target.value;
        if (/^[a-zA-Z\s]+$/.test(newMedicine) || newMedicine === '') {
            setRowErrors((prevErrors) => {
                const newErrors = [...prevErrors];
                newErrors[index].medicine = '';
                return newErrors;
            });
        } else {
            setRowErrors((prevErrors) => {
                const newErrors = [...prevErrors];
                newErrors[index].medicine = 'Please enter characters from a-z or A-Z.';
                return newErrors;
            });
        }
    };

    const handleDosageChange = (event, index) => {
        const { value } = event.target;
        const updatedRows = [...rows];
        updatedRows[index].dosage = value;
        setRows(updatedRows);


        const newDosage = event.target.value;
        if (/^\d+$/.test(newDosage) || newDosage === '') {
            setRowErrors((prevErrors) => {
                const newErrors = [...prevErrors];
                newErrors[index].dosage = '';
                return newErrors;
            });
        } else {
            setRowErrors((prevErrors) => {
                const newErrors = [...prevErrors];
                newErrors[index].dosage = 'Please enter a positive integer.';
                return newErrors;
            });
        }

        calculateTotal();
    };

    const handlePriceChange = (event, index) => {
        const { value } = event.target;
        const updatedRows = [...rows];
        updatedRows[index].price = value;
        setRows(updatedRows);

        const newPrice = event.target.value;
        if (/^\d+$/.test(newPrice) || newPrice === '') {
            setRowErrors((prevErrors) => {
                const newErrors = [...prevErrors];
                newErrors[index].price = '';
                return newErrors;
            });
        } else {
            setRowErrors((prevErrors) => {
                const newErrors = [...prevErrors];
                newErrors[index].price = 'Please enter a positive integer.';
                return newErrors;
            });
        }

        calculateTotal();
    };

    const handleEnterKey = (event, index) => {
        if (event.key === 'Enter' && index === rows.length - 1) {
            addRow();
        }
    };

    const addRow = () => {
        setRows([...rows, { medicine: '', dosage: '', price: '' }]);
        setRowErrors([...rowErrors, { medicine: '', dosage: '', price: '' }]);

        calculateTotal();

    };

    const deleteRow = (index) => {
        if (rows.length === 1) {
            // If only one row remains, do not delete it
            return;
        }

        const updatedRows = [...rows];
        updatedRows.splice(index, 1);
        setRows(updatedRows);

        const updatedRowErrors = [...rowErrors];
        updatedRowErrors.splice(index, 1);
        setRowErrors(updatedRowErrors);

        calculateTotal();
    };

    const [total, setTotal] = useState(0);

    const calculateTotal = useCallback(() => {
        const calculatedTotal = rows.reduce((total, row) => {
            const { dosage, price } = row;
            if (dosage && price && /^\d+$/.test(dosage) && /^\d+$/.test(price)) {
                return total + (parseInt(dosage) * parseInt(price));
            }
            return total;
        }, 0);
        setTotal(calculatedTotal + '$');
    }, [rows]);

    useEffect(() => {
        calculateTotal();
    }, [calculateTotal]);


    const [observations, setObservations] = useState('');
    const [observationsError, setObservationsError] = useState('');

    const handleObservations = (event) => {
        const newObservations = event.target.value;
        if (/^[a-zA-Z0-9\s]+$/.test(newObservations) || newObservations === '') {
            setObservations(newObservations);
            setObservationsError('');
        } else {
            setObservationsError('Please enter characters from 0-9, a-z or A-Z.');
        }
    }

    const [recommend, setRecommend] = useState('');
    const [recommendError, setRecommendError] = useState('');

    const handleRecommend = (event) => {
        const newRecommend = event.target.value;
        if (/^[a-zA-Z0-9\s]+$/.test(newRecommend) || newRecommend === '') {
            setRecommend(newRecommend);
            setRecommendError('');
        } else {
            setRecommendError('Please enter characters from 0-9, a-z or A-Z.');
        }
    }

    const handleSubmit = () => {
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


        validateField(idMedicalRecord, /^[0-9]+$/, setIdMedicalRecordError);
        validateField(patientName, /^[a-zA-Z\s]+$/, setPatientNameError);
        validateField(diagnosis, /^[a-zA-Z\s]+$/, setDiagnosisError);

        validateField(observations, /^[a-zA-Z0-9\s]+$/, setObservationsError);
        validateField(recommend, /^[a-zA-Z0-9\s]+$/, setRecommendError);

        const newRowErrors = [...rowErrors];

        rows.forEach((row, index) => {
            const errors = {};

            if (!/^[a-zA-Z\s]+$/.test(row.medicine) || !(row.medicine).trim()) {
                errors.medicine = 'This field is required and please enter valid.';
                isFormValid = false;
            }

            if (!/^\d+$/.test(row.dosage)) {
                errors.dosage = 'This field is required and please enter valid.';
                isFormValid = false;
            }

            if (!/^\d+$/.test(row.price)) {
                errors.price = 'This field is required and please enter valid.';
                isFormValid = false;
            }

            newRowErrors[index] = errors;
        });

        setRowErrors(newRowErrors);

        if (isFormValid) {
            // Perform your submission logic here
            console.log('Form submitted successfully');
        }
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
                        <Grid2
                            sx={{
                                display: 'flex',
                                justifyContent: 'center',
                            }}
                        >
                            {/* Label */}
                            <Box
                                sx={{
                                    width: 313,
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
                                    <Typography
                                        sx={{
                                            fontSize: 30,
                                            fontWeight: 700
                                        }}
                                    >
                                        Medical Record
                                    </Typography>
                                </Paper>
                            </Box>
                            {/* content */}
                            <Box sx={{
                                width: 377,
                                height: 79,
                                display: 'flex',
                                justifyContent: 'center',
                                border: '1px solid',
                                borderRight: 'none'
                            }}
                            >
                                <Paper sx={{ boxShadow: 'none', padding: 2 }}>
                                    <FormControl error={!!idMedicalRecordError} sx={{ '& input': { fontSize: 30, fontWeight: 400, textAlign: 'center' } }}>
                                        <Input
                                            onChange={handleIdMedicalRecordChange}
                                        />
                                        <br />
                                        {idMedicalRecordError && <FormHelperText>{idMedicalRecordError}</FormHelperText>}
                                    </FormControl>
                                </Paper>
                            </Box>
                            {/* Label */}
                            <Box sx={{
                                width: 466,
                                height: 79,
                                backgroundColor: '#d9d9d9',
                                display: 'flex',
                                justifyContent: 'center',
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
                                    <Typography
                                        sx={{
                                            fontSize: 30,
                                            fontWeight: 700
                                        }}
                                    >
                                        Medical Record Date
                                    </Typography>
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
                                <LocalizationProvider dateAdapter={AdapterDayjs}>
                                    <DemoContainer components={['DatePicker']}>
                                        <DatePicker
                                            onChange={handleDateChange}
                                            format="DD/MM/YYYY"
                                            defaultValue={dayjs()}
                                            minDate={dayjs()}
                                        />
                                    </DemoContainer>
                                </LocalizationProvider>
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
                                                        width: 999,
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
                                                    <FormControl error={!!patientNameError} sx={{ '& input': { fontSize: 30, fontWeight: 400, textAlign: 'center' } }}>
                                                        <Input
                                                            onChange={handlePatientNameChange}
                                                        />
                                                        {patientNameError && <FormHelperText>{patientNameError}</FormHelperText>}
                                                    </FormControl>
                                                </TableCell>
                                                <TableCell align='center'
                                                    sx={{
                                                        borderLeft: '1px solid',
                                                    }}
                                                >
                                                    <FormControl error={!!diagnosisError} sx={{ '& input': { fontSize: 30, fontWeight: 400, textAlign: 'center' } }}>
                                                        <Input
                                                            onChange={handleDiagnosisChange}
                                                        />
                                                        {diagnosisError && <FormHelperText>{diagnosisError}</FormHelperText>}
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
                                                        width: 700,
                                                        borderBottom: '1px solid',
                                                        borderRight: '1px solid',
                                                    }}
                                                >
                                                    Medicine
                                                </TableCell>
                                                <TableCell
                                                    align='center'
                                                    sx={{
                                                        fontSize: 30,
                                                        fontWeight: 700,
                                                        width: 469,
                                                        borderBottom: '1px solid',
                                                        borderRight: '1px solid',
                                                    }}
                                                >
                                                    Dosage
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
                                            {rows.map((row, index) => (
                                                <TableRow key={index}>
                                                    <TableCell align='center'
                                                        sx={{
                                                            borderRight: '1px solid',
                                                            borderBottom: '1px solid'
                                                        }}
                                                    >
                                                        <FormControl
                                                            error={!!rowErrors[index].medicine}
                                                            sx={{
                                                                '& input': {
                                                                    fontSize: 30,
                                                                    fontWeight: 400,
                                                                    textAlign: 'center',
                                                                },
                                                            }}
                                                        >
                                                            <Input
                                                                value={row.medicine}
                                                                onChange={(event) =>
                                                                    handleMedicineChange(event, index)
                                                                }
                                                                onKeyDown={(event) => handleEnterKey(event, index)}
                                                            />
                                                            {rowErrors[index].medicine && (
                                                                <FormHelperText>{rowErrors[index].medicine}</FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell align='center'
                                                        sx={{
                                                            borderRight: '1px solid',
                                                            borderBottom: '1px solid'
                                                        }}
                                                    >
                                                        <FormControl
                                                            error={!!rowErrors[index].dosage}
                                                            sx={{ '& input': { fontSize: 30, fontWeight: 400, textAlign: 'center' } }}>
                                                            <Input
                                                                onChange={(event) =>
                                                                    handleDosageChange(event, index)
                                                                }
                                                                onKeyDown={(event) => handleEnterKey(event, index)}
                                                            />
                                                            {rowErrors[index].dosage && (
                                                                <FormHelperText>{rowErrors[index].dosage}</FormHelperText>
                                                            )}
                                                        </FormControl>
                                                    </TableCell>
                                                    <TableCell align='center'
                                                        sx={{
                                                            borderBottom: '1px solid'
                                                        }}
                                                    >
                                                        <FormControl
                                                            error={!!rowErrors[index].price}
                                                            sx={{ '& input': { fontSize: 30, fontWeight: 400, textAlign: 'center' } }}>
                                                            <Input
                                                                onChange={(event) =>
                                                                    handlePriceChange(event, index)
                                                                }
                                                                onKeyDown={(event) => handleEnterKey(event, index)}
                                                            />
                                                            {rowErrors[index].price && (
                                                                <FormHelperText>{rowErrors[index].price}</FormHelperText>
                                                            )}
                                                        </FormControl>
                                                        <p style={{ display: 'flex', float: 'right', fontSize: 30, fontWeight: 400 }}>$</p>
                                                        {rows.length > 1 && (
                                                            <IconButton
                                                                aria-label='delete'
                                                                size='small'
                                                                color='error'
                                                                onClick={() => deleteRow(index)}
                                                            >
                                                                <ClearIcon />
                                                            </IconButton>
                                                        )}
                                                    </TableCell>
                                                </TableRow>
                                            ))}
                                            <TableRow>
                                                <TableCell align='center'
                                                    sx={{
                                                        backgroundColor: '#d9d9d9',
                                                        borderRight: '1px solid',
                                                    }}
                                                >
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
                                                                    fontWeight: 700
                                                                }}
                                                            >
                                                                Total:
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
                                                            <Typography className='total'
                                                                sx={{
                                                                    fontSize: 30,
                                                                    fontWeight: 400
                                                                }}
                                                            >
                                                                {total}
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
                        <Typography
                            sx={{
                                textAlign: 'center',
                                fontSize: 40,
                                fontWeight: 700
                            }}
                        >
                            Observations
                        </Typography>
                        <br />
                        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', }}>
                            <div >
                                <FormControl error={!!observationsError}>
                                    <TextareaAutosize
                                        value={observations}
                                        onChange={handleObservations}
                                        style={{
                                            width: 1655,
                                            minHeight: 200,
                                            fontSize: '30px',
                                            fontWeight: 400,
                                            padding: '20px', // Add padding for better visual appearance
                                            borderRadius: 30,
                                            resize: 'none'
                                        }}
                                    />
                                    {observationsError && <FormHelperText>{observationsError}</FormHelperText>}
                                </FormControl>
                            </div>
                        </div>
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
                                <Typography sx={{ fontSize: 30, fontWeight: 700, textDecoration: 'underline', marginRight: 'auto', marginLeft: 5 }}>Recommendations</Typography>
                                <FormControl error={!!recommendError}>
                                    <TextareaAutosize
                                        value={recommend}
                                        onChange={handleRecommend}
                                        style={{
                                            width: 1579,
                                            minHeight: 136,
                                            fontSize: '30px',
                                            fontWeight: 400,
                                            border: 'none',
                                            resize: 'none'
                                        }}
                                    />
                                    {recommendError && <FormHelperText>{recommendError}</FormHelperText>}
                                </FormControl>
                            </Grid2>
                        </div>
                        <br />
                        <br />
                        <br />
                    </div>
                )}
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

