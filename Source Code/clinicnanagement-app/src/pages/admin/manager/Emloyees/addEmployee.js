import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { CircularProgress } from '@mui/material';
import { GetRoles } from '../../../../api/roleServices';
import { CreateAccountServices } from '../../../../api/accountServices';
import { CreateEmployeeServices } from '../../../../api/employeeServices';
import generateRandomPassword from '../../../../helper/randomUtils';
import { validateEmail, validateName, validatePhoneNumber, validateAddress, validateGender, validateSpecialty, validateYOE, validateHospital } from '../../../../helper/checkedRegex';
import Swal from 'sweetalert2';
import { GetRoleServices } from '../../../../api/roleServices';
import { CheckDuplicate } from '../../../../helper/checkedUtils';
import { CreateDoctorServices } from '../../../../api/doctorServices';
import { CreateDetailDoctorServices } from '../../../../api/detailDoctorServices';
import { AdminCreateEmployeeServices } from '../../../../api/emailServices';
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
    const [roles, setRoles] = useState([]);
    const [isDuplicate, setIsDuplicate] = useState(false);
    //if add new doctor then show 2 text fields
    const [isDoctor, setIsDoctor] = useState(false);
    const [processing, setProcessing] = useState(false);
    const [emailError, setEmailError] = useState('');
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [specialtyError, setSpecialtyError] = useState('');
    const [hospitalError, setHospitalError] = useState('');
    const [yearsOfExperienceError, setYearsOfExperienceError] = useState('');
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const [employee, setEmployee] = useState({
        Name: '',
        Mail: '',
        RoleID: '',
        Phone: '',
        Address: '',
        Gender: '',
        avatar: 'https://avatả',
        joiningDate: getCurrentDate()
    });
    const [doctor, setDoctor] = useState({
        Specialty: '',
        availability: 'OK',
        Hospital: '',
        YearsOfExperience: ''
    });
    const randomPassword = generateRandomPassword(8);
    const accountModel = {
        Password: randomPassword,
        Mail: employee.Mail,
        RoleID: employee.RoleID,
        Avatar: employee.avatar,
        Gender: employee.Gender,
    };
    useEffect(() => {
        getRoles();
    }, []);

    useEffect(() => {
        setIsSaveDisabled(
            !!nameError ||
            !!emailError ||
            !!phoneError ||
            !!addressError ||
            !!genderError ||
            !!specialtyError ||
            !!hospitalError ||
            !!yearsOfExperienceError ||
            !isDataEntered);
    }, [nameError, emailError, phoneError, addressError, genderError, specialtyError, hospitalError, yearsOfExperienceError, isDataEntered]);

    const getRoles = async () => {
        const data = await GetRoles();
        const filteredData = data.filter(role => role.roleName.toLowerCase() !== 'admin' && role.roleName.toLowerCase() !== 'customer');
        setRoles(filteredData);
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setEmployee({
            ...employee,
            [name]: value,
        });
        const hasData = value.trim() !== '';
        setIsDataEntered(hasData);
        if (name === 'Mail') {
            setEmailError(validateEmail(value));
        }
        else if (name === 'Name') {
            setNameError(validateName(value));
        }
        else if (name === 'Phone') {
            setPhoneError(validatePhoneNumber(value));
        }
        else if (name === 'Address') {
            setAddressError(validateAddress(value));
        }
        else if (name === 'Gender') {
            setGenderError(validateGender(value));
        }
        else if (name === 'Specialty') {
            setSpecialtyError(validateSpecialty(value));
        }
        else if (name === 'Hospital') {
            setHospitalError(validateHospital(value));
        }
        else if (name === 'YearsOfExperience') {
            setYearsOfExperienceError(validateYOE(value));
        }
        setDoctor({
            ...doctor,
            [name]: value,
        });
    };
    //create new employee will generate a new account with password random
    const createEmployee = async () => {
        setIsDuplicate(false);
        const checkEmail = await CheckDuplicate(employee.Mail)
        if (checkEmail === true) {
            return setIsDuplicate(true);
        }
        setProcessing(true);
        const accountNew = await CreateAccountServices(accountModel);
        const employeeModel = {
            Name: employee.Name,
            Address: employee.Address,
            Phone: employee.Phone,
            Gender: employee.Gender,
            JoiningDate: employee.joiningDate,
            AccountID: accountNew.accountID
        }
        const employeeNew = await CreateEmployeeServices(employeeModel);
        const emailSuccess = accountModel.Mail;
        const passwordGenerator = accountModel.Password;
        await AdminCreateEmployeeServices(emailSuccess, passwordGenerator);
        if (isDoctor) {
            try {
                const doctorModel = {
                    Availability: doctor.availability,
                    EmployeeID: employeeNew.employeeID
                }
                const doctorNew = await CreateDoctorServices(doctorModel);
                const detailDoctorModel = {
                    Specialty: doctor.specialty,
                    Hospital: doctor.hospital,
                    YearsOfExperience: doctor.yearsOfExperience,
                    DoctorID: doctorNew.doctorID
                }
                await CreateDetailDoctorServices(detailDoctorModel);
            } catch (err) {
                console.error(err)
            } finally {
                setProcessing(false);
            }

        }
        closeEvent();
        Swal.fire("Submitted!", "Your file has been submitted.", "success");

    };
    const handleRoleChange = async (event) => {
        setIsDoctor(false);
        const role = event.target.value;
        const roleCheck = await GetRoleServices(role);
        if (roleCheck.roleName === 'Doctor') {
            setIsDoctor(true);
        }
        setEmployee({
            ...employee,
            RoleID: role,
        });
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Add Employee</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={employee.Name}
                        onChange={handleInputChange}
                        name='Name'
                        id="outlined-basic"
                        label="Full name"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!nameError}
                        helperText={nameError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={employee.Mail}
                        onChange={handleInputChange}
                        name='Mail'
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!emailError}
                        helperText={emailError}
                    />
                </Grid>
                <Grid item xs={12}>
                    {isDuplicate && (
                        <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                            Email is already taken. Please choose another one.
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="role-account-label">Role Account</InputLabel>
                        <Select
                            labelId="role-account-label"
                            name='RoleID'
                            id="role-account-select"
                            value={employee.RoleID}
                            onChange={handleRoleChange}
                            label="Role Account"
                            variant="outlined"
                            sx={{ minWidth: '100%' }}
                        >
                            {roles.map((role) => (
                                <MenuItem key={role.roleID} value={role.roleID}>
                                    {role.roleName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={employee.Address}
                        onChange={handleInputChange}
                        name='Address'
                        id="outlined-basic"
                        label="Address"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!addressError}
                        helperText={addressError}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={employee.Phone}
                        onChange={handleInputChange}
                        name='Phone'
                        id="outlined-basic"
                        label="Phone Number"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!phoneError}
                        helperText={phoneError}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={employee.Gender}
                        onChange={handleInputChange}
                        name='Gender'
                        id="outlined-basic"
                        label="Gender"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!genderError}
                        helperText={genderError}
                    />
                </Grid>
                {
                    isDoctor && (
                        <>
                            <Grid item xs={12}>
                                <TextField
                                    value={doctor.Specialty}
                                    onChange={handleInputChange}
                                    name='Specialty'
                                    id="outlined-basic"
                                    label="Specialty"
                                    variant="outlined"
                                    size='small'
                                    sx={{ minWidth: '100%' }}
                                    error={!!specialtyError}
                                    helperText={specialtyError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={doctor.Hospital}
                                    onChange={handleInputChange}
                                    name='Hospital'
                                    id="outlined-basic"
                                    label="Hospital"
                                    variant="outlined"
                                    size='small'
                                    sx={{ minWidth: '100%' }}
                                    error={!!hospitalError}
                                    helperText={hospitalError}
                                />
                            </Grid>
                            <Grid item xs={12}>
                                <TextField
                                    value={doctor.YearsOfExperience}
                                    onChange={handleInputChange}
                                    name='YearsOfExperience'
                                    id="outlined-basic"
                                    label="Years Of Experience"
                                    variant="outlined"
                                    size='small'
                                    sx={{ minWidth: '100%' }}
                                    error={!!yearsOfExperienceError}
                                    helperText={yearsOfExperienceError}
                                />
                            </Grid>
                        </>
                    )
                }
                <Grid item xs={12} >
                    <Typography variant='h5' align='center'>
                        <Button variant='contained' onClick={createEmployee}
                            disabled={isSaveDisabled}
                        >
                            {processing ? <CircularProgress size={24} /> : 'Submit'}
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 2 }} />
        </>
    )
}
