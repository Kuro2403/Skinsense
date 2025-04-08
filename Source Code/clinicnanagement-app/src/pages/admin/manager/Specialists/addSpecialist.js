import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Grid, TextField, FormControl, MenuItem, InputLabel, Select } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { validateSpecialistName } from '../../../../helper/checkedRegex';
import Swal from 'sweetalert2';
import { GetAllDoctorServices, GetDoctorServices } from '../../../../api/doctorServices';
import { CreateDetailSpecialistServices, GetAllDetailSpecialistsServices } from '../../../../api/detailSpecialistServices';
import { CreateSpecialistsServices } from '../../../../api/specicalistServices';
import { CheckDuplicateNameSpecialist } from '../../../../helper/checkedUtils';
import { GetAllRoleSpecialistServices } from '../../../../api/roleSpecialistServices';
export const AddSpecialist = ({ closeEvent }) => {
    const [isDuplicate, setIsDuplicate] = useState(false);
    const [specialistErr, setSpecialistErr] = useState('');
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const [selected1, setSelected1] = useState(true);
    const [selected2, setSelected2] = useState(true);
    const [specialist, setSpecialist] = useState({
        SpecialistName: '',
        SpecialistID: '',
        DoctorIDHeadofdepartment: '',
        RoleSpecialistID: '',
        Name: '',
        DoctorIDAssociateDepartmentHead: ''
    });
    const [doctorList, setDoctorList] = useState([]);

    useEffect(() => {
        getDoctorNoSpecialist();
    }, []);
    const getDoctorNoSpecialist = async () => {
        try {
            const doctorList = await GetAllDoctorServices();
            const detailSpecialist = await GetAllDetailSpecialistsServices();
            const doctorsNotInSpecialist = doctorList.filter(doctor => {
                return !detailSpecialist.some(specialist => specialist.doctorID === doctor.doctorID);
            });
            setDoctorList(doctorsNotInSpecialist);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    useEffect(() => {
        setIsSaveDisabled(
            !!specialistErr ||
            !isDataEntered);
    }, [specialistErr, isDataEntered]);
    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setSpecialist({
            ...specialist,
            [name]: value,
        });
        const hasData = value.trim() !== '';
        setIsDataEntered(hasData);
        setIsDuplicate(false);
        if (name === 'SpecialistName') {
            const checkSpecialistListname = await CheckDuplicateNameSpecialist(value);
            if (checkSpecialistListname === true) {
                return setIsDuplicate(true);
            }
            setSpecialistErr(validateSpecialistName(value));
        }
    };
    const [phoneNumberH, SetPhoneNumberH] = useState('');
    const handleHeadofdepartment = async (event) => {
        setSelected1(false);
        const doctor = event.target.value;
        setSpecialist({
            ...specialist,
            DoctorIDHeadofdepartment: doctor,
        });
        const data = await GetDoctorServices(doctor);
        SetPhoneNumberH(data.employee.phone)
    };
    const [phoneNumberA, SetPhoneNumberA] = useState('');
    const handleAssociateDepartmentHead = async (event) => {
        setSelected2(false);
        const doctor = event.target.value;
        setSpecialist({
            ...specialist,
            DoctorIDAssociateDepartmentHead: doctor,
        });
        const data = await GetDoctorServices(doctor);
        SetPhoneNumberA(data.employee.phone)
    };
    const createConfirmed = async () => {
        try {
            const roleSpecialit = await GetAllRoleSpecialistServices();
            const Headofdepartment = roleSpecialit.find(a => a.roleSpecialistName.toLowerCase() === 'head of department');
            const AssociateDepartmentHead = roleSpecialit.find(a => a.roleSpecialistName.toLowerCase() === 'associate department head');
            const specialistModel = {
                SpecialistName: specialist.SpecialistName
            }

            const specialistNew = await CreateSpecialistsServices(specialistModel);
            const detailSpecialistHeadofdepartmentModel = {
                SpecialistID: specialistNew.specialistID,
                DoctorID: specialist.DoctorIDHeadofdepartment,
                RoleSpecialistID: Headofdepartment.roleSpecialistID,
            }
            const detailSpecialistAssociateDepartmentHeadModel = {
                SpecialistID: specialistNew.specialistID,
                DoctorID: specialist.DoctorIDAssociateDepartmentHead,
                RoleSpecialistID: AssociateDepartmentHead.roleSpecialistID,
            }
            await CreateDetailSpecialistServices(detailSpecialistHeadofdepartmentModel);
            await CreateDetailSpecialistServices(detailSpecialistAssociateDepartmentHeadModel);
            closeEvent();
            Swal.fire("Submitted!", "Your file has been submitted.", "success");
        } catch (error) {
            console.error('Can not add specialist: ', error);
        }

    };
    const checkedSubmitted = () => {
        if (isSaveDisabled === false && selected1 === false && selected2 === false) {
            return false;
        }
        return true;
    }

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Add specialist</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={specialist.SpecialistName}
                        onChange={handleInputChange}
                        name='SpecialistName'
                        id="outlined-basic"
                        label="Specicalist Name"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!specialistErr}
                        helperText={specialistErr}
                    />
                </Grid>
                <Grid item xs={12}>
                    {isDuplicate && (
                        <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                            Specialist Name is already taken. Please choose another one.
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="role-account-label">Head of department</InputLabel>
                        <Select
                            labelId="role-account-label"
                            name='DoctorID'
                            id="role-account-select"
                            value={specialist.DoctorIDHeadofdepartment}
                            onChange={handleHeadofdepartment}
                            label="Head of department"
                            variant="outlined"
                            sx={{ minWidth: '100%' }}
                        >
                            {doctorList.map((doctor) => (
                                <MenuItem key={doctor.doctorID} value={doctor.doctorID}>
                                    {doctor.employee.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {
                    phoneNumberH && (
                        <Grid item xs={12}>
                            <Typography variant='outlined' color='blue' sx={{ mt: 1, ml: 1 }}>
                                Phone number is doctor: {phoneNumberH}
                            </Typography>
                        </Grid>
                    )
                }

                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="role-account-label">Associate department head</InputLabel>
                        <Select
                            labelId="role-account-label"
                            name='DoctorID'
                            id="role-account-select"
                            value={specialist.DoctorIDAssociateDepartmentHead}
                            onChange={handleAssociateDepartmentHead}
                            label="Associate department head"
                            variant="outlined"
                            sx={{ minWidth: '100%' }}
                        >
                            {doctorList.map((doctor) => (
                                <MenuItem key={doctor.doctorID} value={doctor.doctorID}>
                                    {doctor.employee.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {
                    phoneNumberA && (
                        <Grid item xs={12}>
                            <Typography variant='outlined' color='blue' sx={{ mt: 1, ml: 1 }}>
                                Phone number is doctor: {phoneNumberA}
                            </Typography>
                        </Grid>
                    )
                }
                <Grid item xs={12} >
                    <Typography variant='h5' align='center'>
                        <Button variant='contained' onClick={createConfirmed}
                            disabled={checkedSubmitted()}
                        >
                            Submit
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 2 }} />
        </>
    )
}
export const AddDoctorToSpecialist = ({ id, closeEvent }) => {
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [roleSpecialist, setRoleSpecialist] = useState([]);
    const [specialist, setSpecialist] = useState({
        DoctorID: '',
        RoleSpecialistID: '',
    });
    const [doctorList, setDoctorList] = useState([]);

    useEffect(() => {
        getDoctorNoSpecialist();
    }, []);
    const getDoctorNoSpecialist = async () => {
        try {
            const doctorRole = await GetAllRoleSpecialistServices();
            const filteredRoleDoctor = doctorRole.filter(role => role.roleSpecialistName.toLowerCase() !== 'head of department'
                && role.roleSpecialistName.toLowerCase() !== 'associate department head');
            setRoleSpecialist(filteredRoleDoctor);
            const doctorList = await GetAllDoctorServices();
            const detailSpecialist = await GetAllDetailSpecialistsServices();
            const doctorsNotInSpecialist = doctorList.filter(doctor => {
                return !detailSpecialist.some(specialist => specialist.doctorID === doctor.doctorID);
            });
            setDoctorList(doctorsNotInSpecialist);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const [phoneNumber, SetPhoneNumber] = useState('');
    const handleDoctor = async (event) => {
        setIsSaveDisabled(false);
        const doctor = event.target.value;
        setSpecialist({
            ...specialist,
            DoctorID: doctor,
        });
        const data = await GetDoctorServices(doctor);
        SetPhoneNumber(data.employee.phone)
    };
    const handleRoleDoctor = async (event) => {
        const doctor = event.target.value;
        setSpecialist({
            ...specialist,
            RoleSpecialistID: doctor,
        });
    };
    const createConfirmed = async () => {
        try {
            const detailSpecialistModel = {
                SpecialistID: id,
                DoctorID: specialist.DoctorID,
                RoleSpecialistID: specialist.RoleSpecialistID
            }
            await CreateDetailSpecialistServices(detailSpecialistModel)
            closeEvent();
        } catch (error) {
            console.error('Can not add specialist: ', error);
        }

    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Add doctor</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="role-account-label">Doctor name</InputLabel>
                        <Select
                            labelId="role-account-label"
                            name='DoctorID'
                            id="role-account-select"
                            value={specialist.DoctorID}
                            onChange={handleDoctor}
                            label="Doctor name"
                            variant="outlined"
                            sx={{ minWidth: '100%' }}
                        >
                            {doctorList.map((doctor) => (
                                <MenuItem key={doctor.doctorID} value={doctor.doctorID}>
                                    {doctor.employee.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {
                    phoneNumber && (
                        <Grid item xs={12}>
                            <Typography variant='outlined' color='blue' sx={{ mt: 1, ml: 1 }}>
                                Phone number is doctor: {phoneNumber}
                            </Typography>
                        </Grid>
                    )
                }
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="role-account-label">Role doctor</InputLabel>
                        <Select
                            labelId="role-account-label"
                            name='DoctorID'
                            id="role-account-select"
                            value={specialist.RoleSpecialistID}
                            onChange={handleRoleDoctor}
                            label="Doctor name"
                            variant="outlined"
                            sx={{ minWidth: '100%' }}
                        >
                            {roleSpecialist.map((role) => (
                                <MenuItem key={role.roleSpecialistID} value={role.roleSpecialistID}>
                                    {role.roleSpecialistName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
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
            </Grid>
            <Box sx={{ m: 2 }} />
        </>
    )
}
