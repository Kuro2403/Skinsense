import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import { GetAllSpecialistsServices, GetSpecialistsServices } from '../../../../api/specicalistServices';
import { GetDoctorBySpecialistID, GetPatientByPhone } from '../../../../helper/Util';
import { LocalizationProvider, StaticDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs from 'dayjs';
import { validatePatientPhone } from '../../../../helper/checkedRegex';
import { CreateAppointmentServices } from '../../../../api/appointmentsServices';
import { AppoimentConfirmedServices } from '../../../../api/emailServices';
function getCurrentDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var formattedDay = day < 10 ? "0" + day : day;
    var formattedMonth = month < 10 ? "0" + month : month;
    var formattedDate = formattedDay + "/" + formattedMonth + "/" + year;
    return formattedDate;
}
export default function AddEmployee({ closeEvent }) {
    const [specialists, setSpecialists] = useState([]);
    const [doctors, setDoctors] = useState([]);
    const [examinationServiceIsTrue, setExaminationServiceIsTrue] = useState(false);
    const [patientErr, setPatientErr] = useState('');
    const [examinationService, setExaminationService] = useState('');
    const [patientID, setPatientID] = useState(0);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const [appointments, setAppointments] = useState({
        AppointmentID: '',
        AppointmentDate: '',
        AppointmentTime: '',
        ExaminationService: '',
        PatientID: '',
        DoctorID: '',
    });
    useEffect(() => {
        getSpecialists();
    }, []);

    useEffect(() => {
        setIsSaveDisabled(
            !!patientErr ||
            !isDataEntered);
    }, [patientErr, isDataEntered]);

    const getSpecialists = async () => {
        const data = await GetAllSpecialistsServices();
        setSpecialists(data);
    };
    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setAppointments({
            ...appointments,
            [name]: value,
        });
        const hasData = value.trim() !== '';
        setIsDataEntered(hasData);

        if (name === 'PatientID') {
            setPatientErr(validatePatientPhone(value));
            const data = await GetPatientByPhone(value);
            if (!data) {
                setPatientErr('Patient does not exist in the system.')
            } else
                setPatientID(data.patientID)
        }
    };

    const createConfirmed = async () => {
        if (appointments.AppointmentDate.trim() === '') {
            setAppointments({
                ...appointments,
                ExaminationService: getCurrentDate(),
            });
        }
        const model = {
            AppointmentDate: appointments.AppointmentDate,
            AppointmentTime: appointments.AppointmentTime,
            ExaminationService: examinationService,
            PatientID: patientID,
            DoctorID: appointments.DoctorID,
        }
        const data = await CreateAppointmentServices(model);
        const sendings = {
            Email: data.patient.account.mail,
            Date: data.appointmentDate,
            Time: data.appointmentTime,
            Doctor: data.doctor.employee.name,
            Hospital: 'FPT Uninversity Can Tho',
            Address: '600 Nguyễn Văn Cừ nối dài, An Bình, Ninh Kiều, Cần Thơ',
        }
        await AppoimentConfirmedServices(sendings);

        closeEvent();
        Swal.fire("Submitted!", "Your file has been submitted.", "success");

    };
    const handleExaminationServiceChanges = async (event) => {
        const service = event.target.value;
        setAppointments({
            ...appointments,
            ExaminationService: service,
        });
        setExaminationServiceIsTrue(true);
        const specialist = await GetSpecialistsServices(service);
        setExaminationService(specialist.specialistName)
        const doctors = await GetDoctorBySpecialistID(event.target.value);
        setDoctors(doctors);
    };

    const handleDoctorChanges = async (event) => {
        const service = event.target.value;
        setAppointments({
            ...appointments,
            DoctorID: service,
        });
    };
    const handleTimeChanges = async (event) => {
        const time = event.target.value;
        setAppointments({
            ...appointments,
            AppointmentTime: time,
        });
    };
    const handleDateChange = (date) => {
        const formattedDate = dayjs(date).format('DD/MM/YYYY');
        setAppointments({
            ...appointments,
            AppointmentDate: formattedDate,
        });
    };
    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Booking appointment</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="role-account-label">Examination Service</InputLabel>
                        <Select
                            labelId="role-account-label"
                            name='ExaminationService'
                            id="role-account-select"
                            value={appointments.ExaminationService}
                            onChange={handleExaminationServiceChanges}
                            label="Examination Service"
                            variant="outlined"
                            sx={{ minWidth: '100%' }}
                        >
                            {specialists.map((specialist) => (
                                <MenuItem key={specialist.specialistID} value={specialist.specialistID}>
                                    {specialist.specialistName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {
                    examinationServiceIsTrue && (
                        <Grid item xs={12}>
                            <FormControl fullWidth>
                                <InputLabel id="role-account-label">Doctor</InputLabel>
                                <Select
                                    labelId="role-account-label"
                                    name='Doctor'
                                    id="role-account-select"
                                    value={appointments.DoctorID}
                                    onChange={handleDoctorChanges}
                                    label="Doctor"
                                    variant="outlined"
                                    sx={{ minWidth: '100%' }}
                                >
                                    {doctors.map((data) => (
                                        <MenuItem key={data.doctorID} value={data.doctorID}>
                                            {data.doctor.employee.name}
                                        </MenuItem>
                                    ))}
                                </Select>
                            </FormControl>
                        </Grid>
                    )
                }
                <Grid item xs={12}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <StaticDatePicker
                            defaultValue={dayjs()}
                            minDate={dayjs()}
                            orientation="landscape"
                            format="DD/MM/YYYY"
                            onChange={handleDateChange}
                        />
                    </LocalizationProvider>
                </Grid>
                <Grid item xs={6}>
                    <FormControl fullWidth>
                        <InputLabel id="role-account-label">Time</InputLabel>
                        <Select
                            labelId="role-account-label"
                            name='AppointmentTime'
                            id="role-account-select"
                            value={appointments.AppointmentTime}
                            onChange={handleTimeChanges}
                            label="Time"
                            variant="outlined"
                            sx={{ minWidth: '100%' }}
                        >
                            <MenuItem key='1' value='7:00 AM'>
                                7:00 AM
                            </MenuItem>
                            <MenuItem key='2' value='7:20 AM'>
                                7:20 AM
                            </MenuItem>
                            <MenuItem key='3' value='7:40 AM'>
                                7:40 AM
                            </MenuItem>
                            <MenuItem key='4' value='8:00 AM'>
                                8:00 AM
                            </MenuItem>
                            <MenuItem key='5' value='8:20 AM'>
                                8:20 AM
                            </MenuItem>
                            <MenuItem key='6' value='8:40 AM'>
                                8:40 AM
                            </MenuItem>
                            <MenuItem key='7' value='9:00 AM'>
                                9:00 AM
                            </MenuItem>
                            <MenuItem key='8' value='9:20 AM'>
                                9:20 AM
                            </MenuItem>
                            <MenuItem key='9' value=' 9:40 AM'>
                                9:40 AM
                            </MenuItem>
                            <MenuItem key='10' value='10:00 AM'>
                                10:00 AM
                            </MenuItem>
                            <MenuItem key='11' value='10:20 AM'>
                                10:20 AM
                            </MenuItem>
                            <MenuItem key='12' value='10:40 AM'>
                                10:40 AM
                            </MenuItem>
                            <MenuItem key='13' value='1:00 AM'>
                                1:00 PM
                            </MenuItem>
                            <MenuItem key='14' value='1:20 PM'>
                                1:20 PM
                            </MenuItem>
                            <MenuItem key='15' value='1:40 PM'>
                                1:40 PM
                            </MenuItem>
                            <MenuItem key='16' value='2:00 PM'>
                                2:00 PM
                            </MenuItem>
                            <MenuItem key='17' value='2:20 PM'>
                                2:20 PM
                            </MenuItem>
                            <MenuItem key='18' value='2:40 PM'>
                                2:40 PM
                            </MenuItem>
                            <MenuItem key='19' value='3:00 PM'>
                                3:00 PM
                            </MenuItem>
                            <MenuItem key='20' value='3:20 PM'>
                                3:20 PM
                            </MenuItem>
                            <MenuItem key='21' value='3:40 PM'>
                                3:40 PM
                            </MenuItem>
                            <MenuItem key='22' value='4:00 PM'>
                                4:00 PM
                            </MenuItem>
                            <MenuItem key='23' value='4:20 PM'>
                                4:20 PM
                            </MenuItem>
                            <MenuItem key='24' value='4:40 PM'>
                                4:40 PM
                            </MenuItem>
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={appointments.PatientID}
                        onChange={handleInputChange}
                        name='PatientID'
                        id="outlined-basic"
                        label="Patient phone number"
                        variant="outlined"
                        sx={{ minWidth: '100%' }}
                        error={!!patientErr}
                        helperText={patientErr}
                    />
                </Grid>
                <Grid item xs={12} >
                    <Typography variant='h5' align='center'>
                        <Button variant='contained' onClick={createConfirmed}
                            disabled={isSaveDisabled}
                        >
                            Submit
                        </Button>
                    </Typography>
                </Grid>
            </Grid >
            <Box sx={{ m: 2 }} />
        </>
    )
}