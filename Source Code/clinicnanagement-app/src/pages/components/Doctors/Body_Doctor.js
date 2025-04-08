import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { CardMedia, IconButton, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import Stack from '@mui/material/Stack';
import imageContent from '../../../assets/images/image_content_doctor.jpg';
import CameraAltIcon from '@mui/icons-material/CameraAlt';
import SearchIcon from '@mui/icons-material/Search';
import { GetAllEmployeeServices } from '../../../api/employeeServices';
import { GetDetailDoctorServices } from '../../../api/detailDoctorServices';
import { GetAccountByEmail, GetAppointmentByDoctorID, GetDoctorByEmpID } from '../../../helper/Util';
import { GetPatientServices } from '../../../api/patientServices';

const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent})`,
        width: '100%',
        height: 450,
        backgroundSize: 'cover',

    },
};

const Body_content = () => {

    // skeleton effect
    const [loading, setLoading] = useState(true);

    const [, setAccountData] = useState(null);
    const [employeeData, setEmployeeData] = useState(null);
    const [, setDoctorData] = useState(null);
    const [detailDoctorData, setDetailDoctorData] = useState(null);

    useEffect(() => {
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        // Fetch account details based on logged-in user's email
        async function fetchData() {
            try {
                const loggedInUserEmail = sessionStorage.getItem('Email'); // Replace with your actual way of getting the logged-in user's email
                if (loggedInUserEmail) {
                    const accountData = await GetAccountByEmail(loggedInUserEmail);
                    setSelectedImage(accountData.avatar)
                    setAccountData(accountData);
                    // Fetch employee data based on accountId
                    const employeeData = await GetAllEmployeeServices();
                    const employee = employeeData.find(emp => emp.accountID === accountData.accountID);
                    setEmployeeData(employee);
                    if (employee) {
                        // Fetch doctor data based on employeeId
                        const doctorData = await GetDoctorByEmpID(employee.employeeID);
                        setDoctorData(doctorData);
                        if (doctorData) {
                            // Fetch detail doctor data based on doctorId
                            const detailDoctorData = await GetDetailDoctorServices(doctorData.doctorID);
                            setDetailDoctorData(detailDoctorData);
                            // Fetch list appointment data based on doctorId
                            const listAppointment = await GetAppointmentByDoctorID(doctorData.doctorID);
                            // Loop through listAppointment to fetch patient's name
                            const updatedTableData = await Promise.all(listAppointment.map(async appointment => {
                                const patientData = await GetPatientServices(appointment.patientID);
                                return {
                                    id: appointment.appointmentID,
                                    patientName: patientData.name, // Assuming the patient data has a 'name' property
                                    treatment: appointment.examinationService,
                                    dateAppointment: appointment.appointmentDate,
                                    timeAppointment: appointment.appointmentTime
                                };
                            }));

                            setTableData(updatedTableData);
                        }
                    }
                }
            } catch (error) {
                console.error('Error fetching data:', error);
                // Handle error if needed
            }
        }

        fetchData();

        return () => clearTimeout(timer);
    }, []);

    const [selectedImage, setSelectedImage] = useState('');

    const handleDrop = (e) => {
        e.preventDefault();
        const file = e.dataTransfer.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleImageUpload = () => {
        // Trigger a click on the hidden file input element
        const fileInput = document.getElementById('fileInput');
        fileInput.click();
    };

    const handleFileInputChange = (e) => {
        const file = e.target.files[0];
        const reader = new FileReader();

        reader.onloadend = () => {
            setSelectedImage(reader.result);
        };

        if (file) {
            reader.readAsDataURL(file);
        }

    };

    const [searchQuery, setSearchQuery] = useState('');

    const [tableData, setTableData] = useState([]);
    let count = 1;
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
                        margin: 8
                    }}
                >
                    <Stack direction={'row'} spacing={2}>
                        <Paper
                            sx={{
                                boxShadow: 'none',
                                marginRight: 3
                            }}>
                            {loading ? (
                                <Skeleton variant="rectangular" animation="wave" width={340} height={469} />
                            ) : (
                                <Box
                                    sx={{
                                        width: 400,
                                        height: 450,
                                        borderRadius: 5,
                                    }}
                                    onDrop={handleDrop}
                                    onDragOver={(e) => e.preventDefault()} // Prevent default to enable drop
                                >
                                    {selectedImage ? (
                                        <div style={{ position: 'relative' }}>
                                            <IconButton onClick={handleImageUpload}
                                                style={{
                                                    position: 'absolute',
                                                    top: 380,
                                                    right: 5,
                                                    color: 'white',
                                                    background: 'gray'
                                                }}
                                            >
                                                <CameraAltIcon sx={{ fontSize: 45 }} />
                                            </IconButton>
                                            <CardMedia sx={{ borderRadius: 10 }}
                                                component="img"
                                                height={450}
                                                image={selectedImage}
                                                alt="img"
                                            />
                                        </div>
                                    ) : (
                                        <div style={{ position: 'relative' }}>
                                            <IconButton onClick={handleImageUpload}
                                                style={{
                                                    position: 'absolute',
                                                    top: 380,
                                                    right: 5,
                                                    color: 'white',
                                                    background: 'gray'
                                                }}
                                            >
                                                <CameraAltIcon sx={{ fontSize: 45 }} />
                                            </IconButton>
                                        </div>
                                    )}
                                    <input
                                        type="file"
                                        id="fileInput"
                                        hidden
                                        onChange={handleFileInputChange}
                                    />
                                </Box>
                            )}
                            <br />
                            {loading ? (
                                <>
                                    <Skeleton variant="text" animation="wave" width={200} />
                                    <Skeleton variant="text" animation="wave" width={200} />
                                    <Skeleton variant="text" animation="wave" width={200} />
                                </>
                            ) : (
                                <>
                                    <hr />
                                    <Paper sx={{ boxShadow: 'none', width: 520 }}>
                                        <div style={{ display: 'flex' }}>
                                            <Typography variant="h4" fontWeight={450} sx={{ textDecoration: 'underline', marginRight: 2 }}>Name:</Typography>
                                            <Typography variant="h4" fontWeight={450} >{employeeData?.name}</Typography>
                                        </div>
                                        <div style={{ display: 'flex' }}>
                                            <Typography variant="h4" fontWeight={450} sx={{ textDecoration: 'underline', marginRight: 2 }}>Years Of Experience: </Typography>
                                            <Typography variant="h4" fontWeight={450} >{detailDoctorData?.yearsOfExperience}</Typography>
                                        </div>
                                        <div>
                                            <Typography variant="h4" fontWeight={450} sx={{ textDecoration: 'underline' }}>Specialization: </Typography>
                                            <Typography variant="h4" fontWeight={450} >{detailDoctorData?.specialty}</Typography>
                                        </div>
                                    </Paper>
                                </>
                            )}
                        </Paper>
                        {loading ? (
                            <Skeleton variant="rectangular" animation="wave" width={2000} height={469} />
                        ) : (
                            <Paper style={image_contentData.paperContainer1}
                                sx={{
                                    boxShadow: 'none',
                                    maxHeight: 470,
                                    borderRadius: 10
                                }} />
                        )}
                    </Stack>
                </Box>
            </Grid2>
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
                                marginLeft: 21.4,
                                width: 1564,
                                boxShadow: 'none'
                            }}>
                            <Typography
                                sx={{
                                    fontSize: 40,
                                    fontWeight: 700,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                }}
                            >
                                Appointment has been received
                            </Typography>
                            <br />
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'flex-end',
                                    alignItems: 'center',
                                    paddingRight: '20px',
                                    paddingBottom: '10px'
                                }}
                            >
                                <Input
                                    id="searchPatientName"
                                    placeholder="Search Patient Name"
                                    variant="outlined"
                                    size="small"
                                    style={{
                                        fontSize: 18,
                                        fontWeight: 500,
                                    }}
                                    value={searchQuery}
                                    onChange={(event) => setSearchQuery(event.target.value)}
                                />
                                <SearchIcon />
                            </Box>
                            <TableContainer
                                sx={{
                                    borderRadius: 5,
                                    border: '1px solid',
                                    maxHeight: 600,
                                }}
                            >
                                <Table>
                                    <TableHead
                                        sx={{ background: 'black', position: 'sticky', top: 0 }}
                                    >
                                        <TableRow>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white'
                                                }}
                                            >
                                                ID appointment
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white'
                                                }}
                                            >
                                                Patient name
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white'
                                                }}
                                            >
                                                Treatment
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white'
                                                }}
                                            >
                                                Date
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white'
                                                }}
                                            >
                                                Time
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody sx={{ overflowY: 'auto' }}>
                                        {tableData &&
                                            tableData
                                                .filter(row =>
                                                    row.patientName.toLowerCase().includes(searchQuery.toLowerCase())
                                                )
                                                .map(row => (
                                                    <TableRow key={row.id}>
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
                                                                            fontWeight: 400,
                                                                        }}
                                                                    >
                                                                        {count++}
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
                                                                        {row.patientName}
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
                                                                        {row.treatment}
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
                                                                        {row.dateAppointment}
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
                                                                        {row.timeAppointment}
                                                                    </Typography>
                                                                </Paper>
                                                            </Box>
                                                        </TableCell>
                                                    </TableRow>
                                                ))}
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