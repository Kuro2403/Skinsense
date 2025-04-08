import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { GetRoles } from '../../../../api/roleServices';
import { GetEmployeeServices } from "../../../../api/employeeServices";

export default function InfoEmployee({ id, closeEvent }) {
    const [roles, setRoles] = useState([]);

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

    const getRoles = async () => {
        const data = await GetRoles();
        setRoles(data);
    };

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
        };
        getEmployee();
        getRoles();
    }, [id]);
    const editEmployee = async () => {
        closeEvent();
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Infomation Employee</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={formData.Name}
                        name='Name'
                        id="outlined-basic"
                        label="Full name"
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
                    <TextField
                        value={formData.Mail}
                        name='Mail'
                        id="outlined-basic"
                        label="Email"
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
                <Grid item xs={6}>
                    <TextField
                        value={formData.Phone}
                        name='Phone'
                        id="outlined-basic"
                        label="Phone Number"
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
                <Grid item xs={6}>
                    <TextField
                        value={formData.Gender}
                        name='Gender'
                        id="outlined-basic"
                        label="Gender"
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
                        value={formData.Address}
                        name='Address'
                        id="outlined-basic"
                        label="Address"
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
