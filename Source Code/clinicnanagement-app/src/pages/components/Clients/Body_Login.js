import React, { useState, useEffect } from 'react';
import { Box, Breadcrumbs, Button, Paper, Stack, Typography, Skeleton, InputAdornment, IconButton } from "@mui/material";
import TextField from '@mui/material/TextField';
import imagelogin from '../../../assets/images/image_login.jpg';
import { Link } from "react-router-dom";
import { Login } from '../../../api/authServices';
import { useNavigate } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GetAllAppointment } from '../../../api/appointmentsServices';
import { parse } from 'date-fns';
import { EditAccountServices, GetAllAccountServices } from '../../../api/accountServices';
import { getCurrentDate } from '../../../helper/Util';
import { AppoimentConfirmedServices } from '../../../api/emailServices';

const image_login = {
    paper1: {
        backgroundImage: `url(${imagelogin})`,
        height: 600,
        width: 600,
        backgroundRepeat: 'no-repeat'
    },
}

const Body_content = () => {
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

    const [showPassword, setShowPassword] = useState(false);
    const currentDateTime = new Date();

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        if (name === 'email') {
            setEmail(value);
        } else if (name === 'password') {
            setPassword(value);
        }
    };
    const autoRemindAppointment = async () => {
        const dataAppointment = await GetAllAppointment();
        dataAppointment.forEach(async element => {
            const dateString = element.appointmentDate;
            const currentDate = getCurrentDate();
            if (dateString === currentDate) {
                const sendings = {
                    Email: element.patient.account.mail,
                    Date: element.appointmentDate,
                    Time: element.appointmentTime,
                    Doctor: element.doctor.employee.name,
                    Hospital: 'FPT Uninversity Can Tho',
                    Address: '600 Nguyễn Văn Cừ nối dài, An Bình, Ninh Kiều, Cần Thơ',
                }
                await AppoimentConfirmedServices(sendings);
            }
        });
    };
    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const newUserObject = {
            Email: email,
            Password: password
        };
        try {
            const response = await Login(newUserObject);
            const data = response.data;
            if (response.success === true) {
                sessionStorage.setItem('authorKey', data);
                sessionStorage.setItem('Role', response.role.toLowerCase());
                sessionStorage.setItem('Email', newUserObject.Email.toLowerCase());
                if (response.role.toLowerCase() === 'admin') {
                    const timeStringStart = "04:00 pm"; // Replace with your time string
                    const timeStringEnd = "06:00 pm";
                    const parsedTimeStart = parse(timeStringStart, "hh:mm a", new Date());
                    const parsedTimeEnd = parse(timeStringEnd, "hh:mm a", new Date());
                    const dataAccount = await GetAllAccountServices();
                    const dataAccountFilter = dataAccount.find(account => account.mail.toLowerCase() === email.toLowerCase());
                    if (parsedTimeStart < currentDateTime && currentDateTime < parsedTimeEnd && dataAccountFilter.gender.toLowerCase() === 'false') {
                        //goi ham autoRemindAppointment(); set true
                        await autoRemindAppointment();
                        const adminModel = {
                            Mail: 'admin@gmail.com',
                            Avatar: 'https://res.cloudinary.com/dsm5kjkz4/image/upload/v1692710578/ImageDb/download_tcx9hl.png',
                            Gender: 'true',
                            RoleID: 1,
                        }
                        await EditAccountServices(1, adminModel);
                    } else if (currentDateTime > parsedTimeEnd) {
                        const adminModel = {
                            Mail: 'admin@gmail.com',
                            Avatar: 'https://res.cloudinary.com/dsm5kjkz4/image/upload/v1692710578/ImageDb/download_tcx9hl.png',
                            Gender: 'false',
                            RoleID: 1,
                        }
                        await EditAccountServices(1, adminModel);
                    }
                    navigate("/admin");
                }
                else if (response.role.toLowerCase() === 'staff') {
                    navigate("/staff");
                }
                else if (response.role.toLowerCase() === 'doctor') {
                    navigate("/doctor");
                }
                else {
                    navigate("/");
                    window.location.reload();
                }
            }
            return setError('Invalid Email or Password');
        } catch (error) {
            setError('Invalid Email or password');
        }
    };
    const breadcrumbs = [
        <Button key="signin" variant="contained"
            sx={{
                backgroundColor: 'black',
                borderRadius: 30,
                ":hover": { background: 'gray' }
            }}
            onClick={handleFormSubmit}>
            Sign in
        </Button>,
        <Link key="forgotpass" to='/ForgotPass1' underline="hover" style={{ textDecoration: 'none', color: 'black', fontWeight: 100 }}>
            Forgot password?
        </Link>
    ];

    useEffect(() => {
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box>
            <Stack direction="row" spacing={50}
                sx={{
                    marginLeft: 33.75,
                    marginRight: 33.75,
                    marginTop: 2.75,
                    marginBottom: 6.5
                }}>
                <Paper sx={{ boxShadow: 'none', marginTop: 12 }}>
                    <Typography
                        sx={{
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                        }}>
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={300} />
                        ) : (
                            'Login'
                        )}
                    </Typography>
                    <Stack>
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={350} height={56} sx={{ marginTop: 3.125 }} />
                        ) : (
                            <TextField className="inputRounded" id="outlined-basic" label="Enter your email" variant="outlined"
                                sx={{ marginTop: 3.125, width: 350, borderRadius: 30 }}
                                onChange={handleInputChange}
                                name="email" />
                        )}
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={350} height={56} sx={{ marginTop: 3.125 }} />
                        ) : (
                            <TextField className="inputRounded" id="outlined-basic" label="Enter your password" variant="outlined"
                                sx={{ marginTop: 3.125, width: 350 }}
                                onChange={handleInputChange}
                                name="password"
                                type={showPassword ? 'text' : 'password'}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <IconButton
                                                aria-label="toggle password visibility"
                                                onClick={() => setShowPassword(!showPassword)}
                                                edge="end"
                                            >
                                                {showPassword ? <Visibility /> : <VisibilityOff />}
                                            </IconButton>
                                        </InputAdornment>
                                    ),
                                }} />
                        )}
                    </Stack>
                    <br />
                    {error && <Typography color="error" sx={{ marginLeft: 2, fontWeight: 700, fontSize: '18' }}>{error}</Typography>}
                    <br />
                    <Stack>
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={350} height={40} />
                        ) : (
                            <Breadcrumbs separator="|" aria-label="breadcrumb"
                                style={{ color: 'gray' }}>
                                {breadcrumbs}
                            </Breadcrumbs>
                        )}
                    </Stack>
                    <br />
                    <hr />
                    {loading ? (
                        <Skeleton variant="text" animation="wave" width={220} />
                    ) : (
                        <Breadcrumbs separator="" aria-label="breadcrumb"
                            style={{ color: 'gray' }}>
                            <Typography sx={{
                                fontStyle: 'normal',
                                fontWeight: 400,
                                lineHeight: 'normal',
                            }}>
                                Don’t have an account yet?
                            </Typography>
                            <Link underline="hover" to='/Register'
                                style={{
                                    textDecoration: 'none',
                                    color: 'black',
                                    fontWeight: 400
                                }}>
                                Register now
                            </Link>
                        </Breadcrumbs>
                    )}
                </Paper>
                {loading ? (
                    <Skeleton variant="text" animation="wave" width={'100%'} height={'600px'} />
                ) : (
                    <Paper style={image_login.paper1} sx={{ boxShadow: 'none' }} />
                )}
            </Stack>
        </Box>
    )
}

export default Body_content;