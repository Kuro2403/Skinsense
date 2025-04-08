import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Stack, Typography, Skeleton, InputAdornment, IconButton } from "@mui/material";
import TextField from '@mui/material/TextField';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GetAccountByEmail } from '../../../helper/Util';
import { EditAccountServices } from '../../../api/accountServices';
import { useNavigate } from "react-router-dom";

const Body_content = () => {

    // skeleton effect
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');

    useEffect(() => {
        const email = localStorage.getItem('emailForgotPassword');
        setEmail(email);
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const [newPassWord, setNewPassWord] = useState('');
    const [re_password, setRe_PassWord] = useState('');
    const [newPasswordError, setNewPasswordError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');
    // Add a state to track password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);

    const validateNewPassword = (value) => {
        if (!value) {
            return 'Please enter your password!';
        }
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /[0-9]/;

        if (value.length < 8 || !uppercaseRegex.test(value) || !lowercaseRegex.test(value) || !digitRegex.test(value)) {
            return "Password must be at least 8 characters, including at least one upper case letter, one lower case letter, and one number!";
        }
        return '';
    };

    const validateRePassword = (value) => {
        if (!value) {
            return 'Please re-enter your password!';
        }
        if (value !== newPassWord) {
            return 'Passwords do not match!';
        }
        return '';
    };

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'newPassword') {
            setNewPassWord(value);
            setNewPasswordError(validateNewPassword(value)); // Set passwordError state
            if (re_password) {
                setRe_PassWord(re_password);
                setRePasswordError(validateRePassword(re_password)); // Set rePasswordError state
            }
        }
        else if (name === 're-password') {
            setRe_PassWord(value);
            setRePasswordError(validateRePassword(value)); // Set rePasswordError state
        }
    };
    const navigate = useNavigate();

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        const newPasswordValidationMessage = validateNewPassword(newPassWord);
        const rePasswordValidationMessage = validateRePassword(re_password);

        setNewPasswordError(newPasswordValidationMessage);
        setRePasswordError(rePasswordValidationMessage);

        if (!newPasswordValidationMessage && !rePasswordValidationMessage) {
            const accountByEmail = await GetAccountByEmail(email);

            const modelAccountUpdate = {
                Password: newPassWord,
                Mail: email,
                Avatar: accountByEmail.avatar,
                Gender: accountByEmail.gender,
                RoleID: accountByEmail.roleID,
            }
            const updated = await EditAccountServices(accountByEmail.accountID, modelAccountUpdate);
            if (updated) {
                navigate("/login");

            }
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
                <Paper sx={{ boxShadow: 'none', marginBottom: 14.68 }}>
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
                            "Create a new password"
                        )}
                    </Typography>
                    <br />
                    <br />
                    <Typography
                        sx={{
                            fontSize: 30,
                            fontStyle: 'normal',
                            fontWeight: 700,
                            lineHeight: 'normal',
                        }}>
                        Email: {email}
                    </Typography>
                    <Stack>
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={350} height={56} sx={{ marginTop: 3.125 }} />
                        ) : (
                            <>
                                <TextField className='inputRounded' id="outlined-basic" label="Enter your new password" variant="outlined"
                                    sx={{ marginTop: 3.125, width: 350 }}
                                    name='newPassword'
                                    onChange={handleInputChange}
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
                                    }}
                                />
                                <Typography variant="body2" color="error">
                                    {newPasswordError}
                                </Typography>
                            </>
                        )}
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={350} height={56} sx={{ marginTop: 3.125 }} />
                        ) : (
                            <>
                                <TextField className='inputRounded' id="outlined-basic" label="Enter your new re-password" variant="outlined"
                                    sx={{ marginTop: 3.125, width: 350 }}
                                    name='re-password'
                                    onChange={handleInputChange}
                                    type={showRePassword ? 'text' : 'password'}
                                    InputProps={{
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="toggle password visibility"
                                                    onClick={() => setShowRePassword(!showRePassword)}
                                                    edge="end"
                                                >
                                                    {showRePassword ? <Visibility /> : <VisibilityOff />}
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                                <Typography variant="body2" color="error">
                                    {rePasswordError}
                                </Typography>
                            </>
                        )}
                        <br />
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={100} height={50} />
                        ) : (
                            <Button variant="contained" href='' onClick={handleFormSubmit}
                                sx={{
                                    backgroundColor: 'black',
                                    width: 100,
                                    height: 50,
                                    borderRadius: 30,
                                    ":hover": { background: 'gray' }
                                }}
                            >
                                Enter
                            </Button>
                        )}
                    </Stack>
                </Paper>
            </Stack>
        </Box>
    )
}

export default Body_content;