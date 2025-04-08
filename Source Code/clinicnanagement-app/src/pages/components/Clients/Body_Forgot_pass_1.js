import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Stack, Typography, Skeleton } from "@mui/material";
import TextField from '@mui/material/TextField';
import { ForgotPasswordServices } from '../../../api/emailServices';
import { useNavigate } from 'react-router-dom';
import { GetAccountByEmail } from '../../../helper/Util';

const Body_content = () => {
    // skeleton effect
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const [email, setEmail] = useState('');
    const [emailError, setEmailError] = useState('');
    const [emailNotExist, setEmailNotExist] = useState(false);

    const validateEmail = (value) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!value) {
            return 'Please enter your email!';
        }
        if (!value.match(emailRegex)) {
            return 'Please enter a valid email address!';
        }
        return '';
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'email') {
            setEmail(value);
            setEmailError(validateEmail(value)); // Set emailError state
        }
    };
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const emailValidationMessage = validateEmail(email);

        if (!emailValidationMessage) {
            const checkAccount = await GetAccountByEmail(email);
            if (checkAccount) {
                setEmailNotExist(false);
                localStorage.setItem('emailForgotPassword', email);
                const res = await ForgotPasswordServices(email);
                if (res)
                    localStorage.setItem('codeForgotPassword', res);
                navigate("/ForgotPass2");
            } else {
                setEmailNotExist(true);
            }
        } else {
            setEmailError(emailValidationMessage);
        }

    }

    return (
        <Box>
            <Stack direction="row"
                sx={{
                    marginLeft: 18,
                    marginRight: 32,
                    marginTop: 5.75,
                    marginBottom: 6.5
                }}>
                <Paper sx={{ boxShadow: 'none', marginBottom: 32 }}>
                    <Typography
                        sx={{
                            fontSize: 80,
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                        }}>
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={'100%'} />
                        ) : (
                            "Can't remember your password?"
                        )}
                    </Typography>
                    <br />
                    <Typography
                        sx={{
                            fontSize: 20,
                            fontStyle: 'normal',
                            fontWeight: 400,
                            lineHeight: 'normal',
                        }}>
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={'100%'} />
                        ) : (
                            "If you have forgotten your password, we will need to reset it for you. Don't worry, it's quick.Please click the RESET PASSWORD link below and we will send you an email providing you with a link to a secure page where you can then reset your password."
                        )}
                    </Typography>
                    <Stack>
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={350} height={56} sx={{ marginTop: 3.125 }} />
                        ) : (
                            <>
                                <TextField
                                    className='inputRounded'
                                    id="outlined-basic"
                                    label="Enter your email "
                                    variant="outlined"
                                    sx={{ marginTop: 3.125, width: 350, }}
                                    name='email'
                                    onChange={handleInputChange} />
                                <Typography variant="body2" color="error">
                                    {emailError}
                                </Typography>
                                {
                                    emailNotExist && (
                                        <Typography variant="body2" color="error">
                                            Email does not exist in the system!
                                        </Typography>
                                    )
                                }
                            </>
                        )}
                        <br />
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={140} height={50} />
                        ) : (
                            <Button variant="contained" href='/ForgotPass2' onClick={handleFormSubmit}
                                sx={{
                                    backgroundColor: 'black',
                                    width: 140,
                                    height: 50,
                                    borderRadius: 30,
                                    ":hover": { background: 'gray' }
                                }}>
                                Send to email</Button>
                        )}
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    )
}

export default Body_content;