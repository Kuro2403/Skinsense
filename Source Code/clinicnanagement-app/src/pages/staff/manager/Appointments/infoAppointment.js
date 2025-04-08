import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { GetAppointmentServices } from '../../../../api/appointmentsServices';

export default function InfoAppointment({ id, closeEvent }) {
    const [formData, setFormData] = useState({
        AppointmentID: '',
        AppointmentDate: '',
        AppointmentTime: '',
        ExaminationService: '',
        PatientID: '',
        DoctorID: '',
    });

    useEffect(() => {
        const getAppointment = async () => {
            const data = await GetAppointmentServices(id);
            setFormData({
                AppointmentID: data.appointmentID,
                AppointmentDate: data.appointmentDate,
                AppointmentTime: data.appointmentTime,
                ExaminationService: data.examinationService,
                PatientID: data.patient.name,
                DoctorID: data.doctor.employee.name,
            });
        };
        getAppointment();
    }, [id]);
    const editEmployee = async () => {
        closeEvent();
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Infomation appointment</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={formData.AppointmentDate}
                        name='Name'
                        id="outlined-basic"
                        label="Appointment Date"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        inputProps={{
                            style: {
                                pointerEvents: 'none',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={formData.AppointmentTime}
                        name='Mail'
                        id="outlined-basic"
                        label="Appointment Time"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        inputProps={{
                            style: {
                                pointerEvents: 'none',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={formData.ExaminationService}
                        name='Phone'
                        id="outlined-basic"
                        label="Examination Service"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        inputProps={{
                            style: {
                                pointerEvents: 'none',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={formData.PatientID}
                        name='Gender'
                        id="outlined-basic"
                        label="Patient name"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        inputProps={{
                            style: {
                                pointerEvents: 'none',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={formData.DoctorID}
                        name='Address'
                        id="outlined-basic"
                        label="Doctor name"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        inputProps={{
                            style: {
                                pointerEvents: 'none',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5' align='center'>
                        <Button
                            variant='contained'
                            onClick={editEmployee}
                        >
                            Exits
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 2 }} />
        </>
    )
}
