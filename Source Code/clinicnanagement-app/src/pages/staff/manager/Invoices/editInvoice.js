import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { GetRoles } from '../../../../api/roleServices';
import Swal from 'sweetalert2';
import { GetAllEmployeeServices, GetEmployeeServices, EditEmployeeServices } from "../../../../api/employeeServices";
import { useAppStore } from "../../../components/Admin/appStore";
import { EditAccountServices } from '../../../../api/accountServices';
import { validateName, validatePhoneNumber, validateAddress, validateGender } from '../../../../helper/checkedRegex';

export default function EditEmployee({ id, closeEvent }) {
    const [roles, setRoles] = useState([]);
    // const [isDoctor, setIsDoctor] = useState(false);
    const setRows = useAppStore((state) => state.setRows);
    const [nameError, setNameError] = useState('');
    const [phoneError, setPhoneError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [genderError, setGenderError] = useState('');
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const [formData, setFormData] = useState({
        Mail: '',
        Password: '',
        Avatar: '',
        Gender: '',
        RoleID: '',
        AccountID: '',
        Name: '',
        Address: '',
        Phone: '',
        JoiningDate: '',
        RoleName: '',
        Hospital: '',
        Specialty: '',
        YearsOfExperience: '',
        DetailDoctorID: ''
    });

    const getAllEmployees = async () => {
        const data = await GetAllEmployeeServices();
        setRows(data.slice().reverse());
    };


    const getRoles = async () => {
        const data = await GetRoles();
        setRoles(data);
    };
    useEffect(() => {
        setIsSaveDisabled(!!nameError || !!phoneError || !!addressError || !!genderError);
    }, [nameError, phoneError, addressError, genderError]);

    useEffect(() => {
        const getEmployee = async () => {
            const data = await GetEmployeeServices(id);
            setFormData({
                Mail: data.account.mail,
                Password: data.account.password,
                Avatar: data.account.avatar,
                Gender: data.account.gender,
                RoleID: data.account.roleID,
                AccountID: data.account.accountID,
                Name: data.name,
                Address: data.address,
                Phone: data.phone,
                JoiningDate: data.joiningDate,
                RoleName: data.account.role.roleName,
            });
            // if (data.account.role.roleName.toLowerCase() === 'doctor') {
            //     // const data = await GetEmployeeServices(id);
            //     // const doctorByEmpID = await GetDoctorByEmpID(id);
            //     // const detailDoctor = await GetDetailDoctorByDoctorID(doctorByEmpID.doctorID);
            //     // setFormData({
            //     //     Mail: data.account.mail,
            //     //     Password: data.account.password,
            //     //     Avatar: data.account.avatar,
            //     //     Gender: data.account.gender,
            //     //     RoleID: data.account.roleID,
            //     //     AccountID: data.account.accountID,
            //     //     Name: data.name,
            //     //     Address: data.address,
            //     //     Phone: data.phone,
            //     //     JoiningDate: data.joiningDate,
            //     //     RoleName: data.account.role.roleName,
            //     //     // Hospital: detailDoctor.hospital,
            //     //     // Specialty: detailDoctor.specialty,
            //     //     // YearsOfExperience: detailDoctor.yearsOfExperience,
            //     //     // DetailDoctorID: detailDoctor.detailDoctorId
            //     // });
            //     setIsDoctor(true);
            // }
        };
        getEmployee();
        getRoles();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setFormData({
            ...formData,
            [name]: value,
        });
        if (name === 'Name') {
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
    };
    const editEmployee = async () => {
        const accountModel = {
            Mail: formData.Mail,
            Password: formData.Password,
            Avatar: formData.Avatar,
            Gender: formData.Gender,
            RoleID: formData.RoleID,
        };
        const employeeModel = {
            Name: formData.Name,
            Address: formData.Address,
            Phone: formData.Phone,
            JoiningDate: formData.JoiningDate,
            AccountID: formData.AccountID
        }
        // const detailDoctorModel = {
        //     Specialty: formData.Specialty,
        //     Hospital: formData.Hospital,
        //     YearsOfExperience: formData.YearsOfExperience,
        //     DetailDoctorID: formData.DetailDoctorID
        // }
        await EditAccountServices(formData.AccountID, accountModel);
        await EditEmployeeServices(id, employeeModel);
        // await EditDetailDoctorServices(detailDoctorModel.DetailDoctorID, detailDoctorModel);
        closeEvent();
        getAllEmployees();
        Swal.fire("Submitted!", "Your file has been submitted.", "success");
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Edit Employee</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={formData.Name}
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
                    <FormControl fullWidth disabled={true}>
                        <InputLabel id="role-account-label">Role Account</InputLabel>
                        <Select
                            labelId="role-account-label"
                            id="role-account-select"
                            value={formData.RoleID}
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
                    <TextField disabled={true}
                        value={formData.Mail}
                        onChange={handleInputChange}
                        name='Mail'
                        id="outlined-basic"
                        label="Email"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                    />
                </Grid>
                <Grid item xs={6}>
                    <TextField
                        value={formData.Phone}
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
                        value={formData.Gender}
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
                <Grid item xs={12}>
                    <TextField
                        value={formData.Address}
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
                <Grid item xs={12}>
                    <Typography variant='h5' align='center'>
                        <Button
                            variant='contained'
                            onClick={editEmployee}
                            disabled={isSaveDisabled}
                        >
                            Save changes
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 2 }} />
        </>
    )
}
