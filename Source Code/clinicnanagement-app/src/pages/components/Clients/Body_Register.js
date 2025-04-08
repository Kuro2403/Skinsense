import React, { useState, useEffect } from 'react';
import { Box, Button, Paper, Stack, Typography, Skeleton, Divider, IconButton, InputAdornment, FormControl, InputLabel, Select, MenuItem, RadioGroup, FormControlLabel, Radio } from "@mui/material";
import TextField from '@mui/material/TextField';
import imageregister from '../../../assets/images/image_register.jpg';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { GetRoles } from '../../../api/roleServices';
import { CheckDuplicate } from '../../../helper/checkedUtils';
import { useNavigate } from 'react-router-dom';

const image_login = {
    paper1: {
        backgroundImage: `url(${imageregister})`,
        height: 589,
        width: 755,
        backgroundRepeat: 'no-repeat'
    },
}

const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const getYear = (date) => {
    return date.getFullYear();
};

const Body_content = () => {
    // skeleton effect
    const [loading, setLoading] = useState(true);
    const [email, setEmail] = useState('');
    const [emailExist, setEmailExist] = useState(false);
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [re_password, setRe_PassWord] = useState('');
    const [error, setError] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [dobError, setDobError] = useState('');
    const [sexError, setSexError] = useState('');
    // Add a state to track password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const navigate = useNavigate();
    // const navigate = useNavigate();

    const validateEmail = (value) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!value) {
            return 'Please enter your email!';
        }
        if (!value.match(emailRegex)) {
            return 'Please enter your email in the format abc@def.xyz!';
        }
        return '';
    };

    const validateUsername = (value) => {
        if (!value || value.trim() === '') {
            return 'Please enter your name!';
        }
        return '';
    };

    const validatePassword = (value) => {
        if (!value) {
            return 'Please enter your password!';
        }
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /[0-9]/;

        if (value.length < 8 || !uppercaseRegex.test(value) || !lowercaseRegex.test(value) || !digitRegex.test(value)) {
            return 'Password must be at least 8 characters, including at least one upper case letter, one lower case letter, and one number!';
        }
        return '';
    };

    const validateRePassword = (value) => {
        if (!value) {
            return 'Please re-enter your password!';
        }
        if (value !== passWord) {
            return 'Passwords do not match!';
        }
        return '';
    };

    const validatePhoneNumber = (value) => {
        // Regular expression for a valid 10-digit phone number
        const phoneRegex = /^\d{10}$/;
        if (!value) {
            return 'Please enter your phone number !';
        }
        if (!phoneRegex.test(value)) {
            return 'Please enter a valid 10-digit phone number !';
        }
        return '';
    };

    const validateAddress = (value) => {
        // Regular expression to ensure address contains only letters, hyphens, and numbers
        const addressRegex = /^[A-Za-z0-9 \-,'/'\s]*$/;
        if (!value) {
            return 'Please enter your address !';
        }
        if (!addressRegex.test(value)) {
            return 'Please enter a valid address containing only letters, numbers, hyphen, slash, underscores and comma !';
        }
        return '';
    };

    const validateDateOfBirth = (year, month, day) => {
        if (!year || !month || !day) {
            return 'Please select a valid date of birth!';
        }
        // Additional validation if needed
        return '';
    };

    const validateSex = (value) => {
        if (!value) {
            return 'please select your sex!';
        }

        return '';
    }

    const handleInputChange = async (event) => {
        const { name, value } = event.target;

        if (name === 'email') {
            const checked = await CheckDuplicate(value);
            if (checked) {
                setEmailExist(true);
                return;
            }
            setEmailExist(false);
            setEmail(value);
            setEmailError(validateEmail(value)); // Set emailError state
        }
        else if (name === 'username') {
            setUserName(value);
            setUsernameError(validateUsername(value)); // Set usernameError state
        }
        else if (name === 'password') {
            setPassWord(value);
            setPasswordError(validatePassword(value)); // Set passwordError state
            if (re_password) {
                setRe_PassWord(re_password);
                setRePasswordError(validateRePassword(re_password)); // Set rePasswordError state
            }
        }
        else if (name === 're-password') {
            setRe_PassWord(value);
            setRePasswordError(validateRePassword(value)); // Set rePasswordError state
        }
        else if (name === 'phoneNumber') {
            setPhoneNumber(value);
            setPhoneNumberError(validatePhoneNumber(value)); // Set rePasswordError state
        }
        else if (name === 'address') {
            setAddress(value);
            setAddressError(validateAddress(value)); // Set rePasswordError state
        }
    };

    const years = range(1900, getYear(new Date()));; // Array of year values

    const months = [
        { value: 1, label: 'January' },
        { value: 2, label: 'February' },
        { value: 3, label: 'March' },
        { value: 4, label: 'April' },
        { value: 5, label: 'May' },
        { value: 6, label: 'June' },
        { value: 7, label: 'July' },
        { value: 8, label: 'August' },
        { value: 9, label: 'September' },
        { value: 10, label: 'October' },
        { value: 11, label: 'November' },
        { value: 12, label: 'December' },
    ];

    const days = range(1, 31);

    const [year, setYear] = React.useState('');

    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
        setDobError(validateDateOfBirth(value, month, day));
    };

    const [day, setDay] = React.useState('');

    const handleDayChange = (event) => {
        const value = event.target.value;
        setDay(value);
        setDobError(validateDateOfBirth(year, month, value));
    };

    const [month, setMonth] = React.useState('');

    const handleMonthChange = (event) => {
        const value = event.target.value;
        setMonth(value);
        setDobError(validateDateOfBirth(year, value, day));
    };

    const [sex, setSex] = React.useState('');

    const handleSexChange = (event) => {
        const value = event.target.value;
        setSex(value);
        setSexError(validateSex(value));
    }

    const handleFormSubmit = async (event) => {
        event.preventDefault();
        // Validate email
        const emailValidation = validateEmail(email);
        setEmailError(emailValidation);

        // Validate username
        const usernameValidation = validateUsername(userName);
        setUsernameError(usernameValidation);

        // Validate password
        const passwordValidation = validatePassword(passWord);
        setPasswordError(passwordValidation);

        // Validate re-password
        const rePasswordValidation = validateRePassword(re_password);
        setRePasswordError(rePasswordValidation);

        // Validate address
        const addressValidation = validateAddress(address);
        setAddressError(addressValidation);

        // Validate phone number
        const phoneNumberValidation = validatePhoneNumber(phoneNumber);
        setPhoneNumberError(phoneNumberValidation);

        // validate date of birth
        const dateOfBirthValidation = validateDateOfBirth(year, month, day);
        setDobError(dateOfBirthValidation);

        // validate sex
        const sexValidation = validateSex(sex);
        setSexError(sexValidation);

        // If any validation errors are present, return
        if (emailValidation || emailExist || usernameValidation || passwordValidation || rePasswordValidation || addressValidation || phoneNumberValidation || dateOfBirthValidation || sexValidation) {
            return;
        }

        try {
            const getRolePatient = await GetRoles();
            const roleIDCustomer = getRolePatient.find(h => h.roleName.toLowerCase() === 'customer');
            const accountModel = {
                Password: passWord,
                Mail: email,
                Avatar: 'https://res.cloudinary.com/dabdclkhv/image/upload/v1692697231/avatar_ogxkza.jpg',
                Gender: sex,
                RoleID: roleIDCustomer.roleID
            }
            const accountModelJSON = JSON.stringify(accountModel);
            localStorage.setItem('accountModel', accountModelJSON);

            const patientModel = {
                Name: userName,
                Address: address,
                Phone: phoneNumber,
                Dob: day + '/' + month + '/' + year,
                AccountID: 0
            };
            const patientModelJSON = JSON.stringify(patientModel);
            localStorage.setItem('patientModel', patientModelJSON);
            navigate("/register1");
        } catch (error) {
            setError('Account already exist');
        }
    };

    useEffect(() => {
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    return (
        <Box>
            <Stack direction="row" spacing={20}
                sx={{
                    marginLeft: 32,
                    marginRight: 32,
                    marginTop: 2.75,
                    marginBottom: 6.5
                }}>
                <Paper sx={{ boxShadow: 'none', margin: 6 }}>
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
                            'Register'
                        )}
                    </Typography>
                    <Stack>
                        {/* Email TextField */}
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={350} height={56} sx={{ marginTop: 3.125 }} />
                        ) : (
                            <>
                                <TextField
                                    className="inputRounded"
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
                                    emailExist && (
                                        <Typography variant="body2" color="error">
                                            Email is not exist!
                                        </Typography>
                                    )
                                }
                            </>
                        )}
                        {/* Nmae TextField */}
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={350} height={56} sx={{ marginTop: 3.125 }} />
                        ) : (
                            <>
                                <TextField
                                    className="inputRounded"
                                    id="outlined-basic"
                                    label="Enter your name"
                                    variant="outlined"
                                    sx={{ marginTop: 3.125, width: 350 }}
                                    name='username'
                                    onChange={handleInputChange} />
                                <Typography variant="body2" color="error">
                                    {usernameError}
                                </Typography>
                            </>
                        )}
                        {/* Password TextField */}
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={350} height={56} sx={{ marginTop: 3.125 }} />
                        ) : (
                            <>
                                <TextField
                                    className="inputRounded"
                                    id="outlined-basic"
                                    label="Enter your password"
                                    variant="outlined"
                                    sx={{ marginTop: 3.125, width: 350 }}
                                    name='password'
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
                                    {passwordError}
                                </Typography>
                            </>
                        )}
                        {/* Re-Password TextField */}
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={350} height={56} sx={{ marginTop: 3.125 }} />
                        ) : (
                            <>
                                <TextField
                                    className="inputRounded"
                                    id="outlined-basic"
                                    label="Enter your re-password"
                                    variant="outlined"
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
                        {/* Address TextField */}
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={350} height={56} sx={{ marginTop: 3.125 }} />
                        ) : (
                            <>
                                <TextField
                                    className="inputRounded"
                                    id="outlined-basic"
                                    label="Enter your address"
                                    variant="outlined"
                                    sx={{ marginTop: 3.125, width: 350 }}
                                    name='address'
                                    onChange={handleInputChange} />
                                <Typography variant="body2" color="error">
                                    {addressError}
                                </Typography>
                            </>
                        )}
                        {/* PhoneNumber TextField */}
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={350} height={56} sx={{ marginTop: 3.125 }} />
                        ) : (
                            <>
                                <TextField
                                    className="inputRounded"
                                    id="outlined-basic"
                                    label="Enter your phone number"
                                    variant="outlined"
                                    sx={{ marginTop: 3.125, width: 350 }}
                                    name='phoneNumber'
                                    onChange={handleInputChange} />
                                <Typography variant="body2" color="error">
                                    {phoneNumberError}
                                </Typography>
                            </>
                        )}
                        {/* Date of birth choose area */}
                        <br />
                        {loading ? (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={550}
                                height={45}
                                sx={{ marginBottom: 1 }}
                            />
                        ) : (
                            <>
                                <label
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 700
                                    }}
                                >
                                    Date of birth
                                </label>
                                <br />
                                <Stack direction="row" spacing={2}>
                                    <Box sx={{ flexGrow: 0.1 }}>
                                        <FormControl sx={{ minWidth: 150 }} size="medium">
                                            <InputLabel id="year-select-label">Year</InputLabel>
                                            <Select
                                                labelId="year-select-label"
                                                id="year-select"
                                                value={year}
                                                label="Year"
                                                onChange={handleYearChange}
                                                sx={{
                                                    borderRadius: '20px',
                                                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
                                                }}
                                                MenuProps={{
                                                    anchorOrigin: {
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    },
                                                    transformOrigin: {
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    },
                                                    PaperProps: {
                                                        style: {
                                                            maxHeight: '200px', // Set the desired max height for the menu items
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {years.map((year) => (
                                                    <MenuItem key={year} value={year}>
                                                        {year}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ flexGrow: 0.1 }}>
                                        <FormControl sx={{ minWidth: 150 }} size="medium">
                                            <InputLabel id="month-select-label">Month</InputLabel>
                                            <Select
                                                labelId="month-select-label"
                                                id="month-select"
                                                value={month}
                                                label="Month"
                                                onChange={handleMonthChange}
                                                sx={{
                                                    borderRadius: '20px',
                                                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
                                                }}
                                                MenuProps={{
                                                    anchorOrigin: {
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    },
                                                    transformOrigin: {
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    },
                                                    PaperProps: {
                                                        style: {
                                                            maxHeight: '200px', // Set the desired max height for the menu items
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {months.map((month) => (
                                                    <MenuItem key={month.value} value={month.value}>
                                                        {month.label}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                    <Box sx={{ flexGrow: 0.1 }}>
                                        <FormControl sx={{ minWidth: 150, borderRadius: '10px' }} size="medium">
                                            <InputLabel id="day-select-label">Day</InputLabel>
                                            <Select
                                                labelId="day-select-label"
                                                id="day-select"
                                                value={day}
                                                label="Day"
                                                onChange={handleDayChange}
                                                sx={{
                                                    borderRadius: '20px',
                                                    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 50px 100px -20px, rgba(0, 0, 0, 0.3) 0px 30px 60px -30px, rgba(10, 37, 64, 0.35) 0px -2px 6px 0px inset'
                                                }}
                                                MenuProps={{
                                                    anchorOrigin: {
                                                        vertical: 'bottom',
                                                        horizontal: 'left',
                                                    },
                                                    transformOrigin: {
                                                        vertical: 'top',
                                                        horizontal: 'left',
                                                    },
                                                    PaperProps: {
                                                        style: {
                                                            maxHeight: '200px', // Set the desired max height for the menu items
                                                        },
                                                    },
                                                }}
                                            >
                                                <MenuItem value="">
                                                    <em>None</em>
                                                </MenuItem>
                                                {days.map((day) => (
                                                    <MenuItem key={day} value={day}>
                                                        {day}
                                                    </MenuItem>
                                                ))}
                                            </Select>
                                        </FormControl>
                                    </Box>
                                </Stack>
                                <Typography variant="body2" color="error">
                                    {dobError}
                                </Typography>
                            </>
                        )}
                        {/* Your Sex choose area */}
                        <br />
                        {loading ? (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={400}
                                height={45}
                                sx={{ marginBottom: 1 }}
                            />
                        ) : (
                            <>
                                <label
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 700
                                    }}
                                >
                                    Your sex
                                </label>
                                <FormControl>
                                    <RadioGroup
                                        row
                                        aria-labelledby="demo-row-radio-buttons-group-label"
                                        name="row-radio-buttons-group"
                                        onChange={handleSexChange}
                                    >
                                        <FormControlLabel value="Female" control={<Radio />} label="Female" />
                                        <FormControlLabel value="Male" control={<Radio />} label="Male" />
                                        <FormControlLabel value="Prefer not to answer" control={<Radio />} label="Prefer not to answer" />
                                    </RadioGroup>
                                </FormControl>
                                <Typography variant="body2" color="error">
                                    {sexError}
                                </Typography>
                            </>
                        )}
                        <br />
                        <Divider />
                        <br />
                        {error && (
                            <Typography variant="body1" color="error">
                                {error}
                            </Typography>
                        )}
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={120} height={50} />
                        ) : (
                            <Button href='/Register1' variant="contained" onClick={handleFormSubmit}
                                sx={{
                                    backgroundColor: 'black',
                                    width: 120,
                                    height: 50,
                                    borderRadius: 30,
                                    ":hover": { background: 'gray' }
                                }}
                            >
                                Join now
                            </Button>
                        )}
                    </Stack>
                </Paper>
                <hr />
                <Stack>
                    {loading ? (
                        <Skeleton variant="text" animation="wave" width={755} height={589} />
                    ) : (
                        <Paper style={image_login.paper1} sx={{ boxShadow: 'none' }} />
                    )}
                    <br />
                    {loading ? (
                        <Skeleton variant="text" animation="wave" width={125} height={50} />
                    ) : (
                        <Button variant="contained"
                            sx={{
                                backgroundColor: 'black',
                                width: 125,
                                height: 50,
                                borderRadius: 30,
                                ":hover": { background: 'gray' }
                            }}
                        >
                            Learn more</Button>
                    )}
                </Stack>
            </Stack>
        </Box>
    )
}

export default Body_content;