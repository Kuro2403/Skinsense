import React, { useState, useEffect } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import { Button, Input, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import imageContent from '../../../assets/images/image_content_patientsexamined.jpg';
import { useNavigate } from 'react-router-dom';
import SearchIcon from '@mui/icons-material/Search';
import { GetAccountByEmail, GetAppointmentByDoctorID, GetDoctorByEmpID, getCurrentDate, getCurrentTime } from '../../../helper/Util';
import { GetAllEmployeeServices } from '../../../api/employeeServices';
import { GetDetailDoctorServices } from '../../../api/detailDoctorServices';
import { GetPatientServices } from '../../../api/patientServices';

const Body_content = () => {

    // skeleton effect
    const [loading, setLoading] = useState(true);

    const [, setAccountData] = useState(null);
    const [, setEmployeeData] = useState(null);
    const [, setDoctorData] = useState(null);
    const [, setDetailDoctorData] = useState(null);

    const navigate = useNavigate();

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
                                    patientID: patientData.patientID, // Assuming the patient data has a 'name' property
                                    patientName: patientData.name, // Assuming the patient data has a 'name' property
                                    treatment: appointment.examinationService,
                                    dateAppointment: appointment.appointmentDate,
                                    timeAppointment: appointment.appointmentTime,
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

    const [searchQuery, setSearchQuery] = useState('');

    const [tableData, setTableData] = useState([]);

    return (
        <Box
            sx={{
                marginTop: 6,
                marginBottom: 35,
                boxShadow: 'none',
                overflowX: 'hidden', // Hide the horizontal scrollbar
            }}>
            {/* image content */}
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
                            }}
                        >
                            <img
                                src={imageContent}
                                alt='img'
                                height={616}
                                width={1718}
                            />
                        </Paper>
                    )}
                </Box>
            </Grid2>
            <br />
            <br />
            {/* list Patients Examined */}
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
                                boxShadow: 'none'
                            }}>
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
                                    maxHeight: 600, // Limit the max height of the table
                                    overflowY: 'auto' // Add scrollbar when needed
                                }}
                            >
                                <Table
                                    sx={{
                                        minWidth: 1560,
                                    }}
                                >
                                    <TableHead
                                        sx={{ background: 'black', position: 'sticky', top: 0 }}
                                    >
                                        <TableRow>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white '
                                                }}
                                            >
                                                Patient name
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white '
                                                }}
                                            >
                                                Date
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white '
                                                }}
                                            >
                                                Time
                                            </TableCell>
                                            <TableCell
                                                align='center'
                                                sx={{
                                                    fontSize: 25,
                                                    fontWeight: 500,
                                                    color: 'white '
                                                }}
                                            >
                                                Information Medical record
                                            </TableCell>
                                        </TableRow>
                                    </TableHead>
                                    <TableBody>
                                        {tableData
                                            .filter(row =>
                                                row.patientName.toLowerCase().includes(searchQuery.toLowerCase())
                                            )
                                            .filter(row => {
                                                // Parse the row's date and time
                                                const rowDateParts = row.dateAppointment.split('/'); // Split date into parts
                                                const rowMonth = parseInt(rowDateParts[0]);
                                                const rowDay = parseInt(rowDateParts[1]);
                                                const rowYear = parseInt(rowDateParts[2]);

                                                const rowTimeParts = row.timeAppointment.toLowerCase().split(':'); // Split time into hours and minutes
                                                const rowHours = rowTimeParts[0];
                                                const rowMinutes = rowTimeParts[1].split(' ')[0];
                                                const rowAmPm = rowTimeParts[1].split(' ')[1].toLowerCase();

                                                // Get the current date and time
                                                const currentDate = getCurrentDate();
                                                const currentTime = getCurrentTime();

                                                const currentDateParts = currentDate.split('/'); // Split current date into parts
                                                const currentMonth = parseInt(currentDateParts[0]);
                                                const currentDay = parseInt(currentDateParts[1]);
                                                const currentYear = parseInt(currentDateParts[2]);

                                                const currentTimeParts = currentTime.split(':')[0];
                                                const currentMinutes = currentTime.split(':')[1].split(' ')[0];
                                                const currentAmPm = currentTime.split(':')[1].split(' ')[1].toLowerCase();

                                                // Compare formatted dates and times
                                                if (rowYear < currentYear || (rowYear === currentYear && rowMonth < currentMonth) || (rowYear === currentYear && rowMonth === currentMonth && rowDay < currentDay)) {
                                                    return true;
                                                } else if (rowYear === currentYear && rowMonth === currentMonth && rowDay === currentDay) {
                                                    if (rowAmPm === currentAmPm) {
                                                        if (rowHours < currentTimeParts || (rowHours === currentTimeParts && (currentMinutes - rowMinutes >= 10))) {
                                                            return true;
                                                        }
                                                    }
                                                    else if (rowAmPm === 'am' && currentAmPm === 'pm') {
                                                        return true;
                                                    }
                                                }

                                                return false;
                                            })
                                            .map(row => (
                                                <TableRow key={row.id}>
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
                                                                        fontWeight: 400,
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
                                                                        fontWeight: 400
                                                                    }}
                                                                >
                                                                    {row.timeAppointment}
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
                                                                <Button
                                                                    onClick={() => navigate(`/Doctor/Medical Record/${row.patientID}`)}
                                                                    sx={{
                                                                        width: 250,
                                                                        height: 60,
                                                                        border: '1px solid',
                                                                        borderRadius: 30,
                                                                        color: '#000',
                                                                        ":hover": { bgcolor: 'gray' }
                                                                    }}
                                                                >
                                                                    Medical record
                                                                </Button>
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