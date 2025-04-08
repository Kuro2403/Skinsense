import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import { GetDetailDoctorByDoctorID } from '../../../../helper/Util';
import { EditDetailDoctorServices } from '../../../../api/detailDoctorServices';
import { EditDoctorServices } from '../../../../api/doctorServices';
export default function EditDoctor({ doctorID, closeEvent }) {
    const [errors, setErrors] = useState({
        Specialty: '',
        Hospital: '',
        YearsOfExperience: '',
        Availability: '',
    });
    const [formData, setFormData] = useState({
        Specialty: '',
        Hospital: '',
        YearsOfExperience: '',
        Availability: '',
        EmployeeID: '',
        DetailDoctorID: ''
    });

    useEffect(() => {
        const getDetailDoctor = async () => {
            const data = await GetDetailDoctorByDoctorID(doctorID);
            setFormData({
                Specialty: data.specialty,
                Hospital: data.hospital,
                YearsOfExperience: data.yearsOfExperience,
                Availability: data.doctor.availability,
                EmployeeID: data.doctor.employeeID,
                DetailDoctorID: data.detailDoctorId
            });
        };
        getDetailDoctor();
    }, [doctorID]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (value.trim() === '') {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: 'This field is required.',
            }));
        } else {
            setErrors((prevErrors) => ({
                ...prevErrors,
                [name]: '',
            }));
        }
        
    };
    const isAnyFieldEmpty = () => {
        for (const key in formData) {
            if (formData.hasOwnProperty(key) && formData[key] === '') {
                return true; // Found an empty field
            }
        }
        return false; // No empty fields found
    };
    const editFunction = async () => {
        const detailDoctorModel = {
            Specialty: formData.Specialty,
            Hospital: formData.Hospital,
            YearsOfExperience: formData.YearsOfExperience,
            DoctorID: doctorID
        };
        const doctorModel = {
            Availability: formData.Availability,
            EmployeeID: formData.EmployeeID,
        }
        await EditDetailDoctorServices(formData.DetailDoctorID, detailDoctorModel);
        await EditDoctorServices(doctorID, doctorModel)
        closeEvent();
        window.location.reload();
        Swal.fire("Submitted!", "Your file has been submitted.", "success");

    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Edit Doctor</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={formData.Specialty}
                        onChange={handleInputChange}
                        name='Specialty'
                        id="outlined-basic"
                        label="Specialty"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!errors.Specialty}
                        helpertext={errors.Specialty}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={formData.Hospital}
                        onChange={handleInputChange}
                        name='Hospital'
                        id="outlined-basic"
                        label="Hospital"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!errors.Hospital}
                        helpertext={errors.Hospital}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={formData.YearsOfExperience}
                        onChange={handleInputChange}
                        name='YearsOfExperience'
                        id="outlined-basic"
                        label="Years Of Experience"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!errors.YearsOfExperience}
                        helpertext={errors.YearsOfExperience}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={formData.Availability}
                        onChange={handleInputChange}
                        name='Availability'
                        id="outlined-basic"
                        label="Availability"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!errors.Availability}
                        helpertext={errors.Availability}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5' align='center'>
                        <Button variant='contained' onClick={editFunction} disabled={isAnyFieldEmpty()}>
                            Submit
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 2 }} />
        </>
    )
}
