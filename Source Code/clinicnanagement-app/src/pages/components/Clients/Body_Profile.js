import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_profile.jpg';
import { Alert, Avatar, Button, Container, Fade, FormControl, FormControlLabel, IconButton, InputAdornment, InputLabel, MenuItem, MenuList, Radio, RadioGroup, Select, Slide, Snackbar, TextField, Typography, buttonClasses } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { styled } from '@mui/system';
import 'slick-carousel/slick/slick-theme.css';
import Stack from '@mui/material/Stack';
import imageHelthCheck from '../../../assets/images/health-check.jpg';
import imageAppointment from '../../../assets/images/appointment.jpg';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Link } from 'react-router-dom';
import { GetInfomationPatientByEmail } from '../../../helper/Util';
import axios from 'axios';
import { EditAccountServices } from '../../../api/accountServices';
import { changeEmailServices } from '../../../api/emailServices';
import { EditPatientServices } from '../../../api/patientServices';
import { useNavigate } from 'react-router-dom';

const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent1})`,
        height: 577,
        backgroundSize: 'cover',

    },
};

const range = (start, end) => {
    return Array.from({ length: end - start + 1 }, (_, index) => start + index);
};

const getYear = (date) => {
    return date.getFullYear();
};

const Body_content = () => {
    // Add a state to track password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [email, setEmail] = useState('');
    const [emailInit, setEmailInit] = useState('');
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [re_password, setRe_PassWord] = useState('');
    const [emailError, setEmailError] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [verifyCode, setVerifyCode] = useState('');
    const [verifyCodeError, setVerifyCodeError] = useState('');
    const [verifyCodeErrorCf, setVerifyCodeErrorCf] = useState(false);
    const [dobError, setDobError] = useState('');
    const [sexError, setSexError] = useState('');
    // skeleton effect
    const [loading, setLoading] = useState(true);
    const isFunctionCalledRef = useRef(false);
    const [profilePatient, setProfilePatient] = useState([]);
    const [changeEmail, setChangeEmail] = useState(false);
    const [changeEmail2, setChangeEmail2] = useState(false);
    const [changePassword, setChangePassword] = useState(false);
    const [enable, setEnable] = useState(false);
    const [accountID, setAccountID] = useState('');
    const [roleID, setRoleID] = useState('');
    const [patientID, setPatientID] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getInfomationPatient = async () => {
            const role = sessionStorage.getItem('Role');
            const email = sessionStorage.getItem('Email');
            if (role.toLowerCase() === 'customer') {
                const getAccountByEmail = await GetInfomationPatientByEmail(email);
                setProfilePatient(getAccountByEmail)
                setUserName(getAccountByEmail.name);
                setEmail(getAccountByEmail.account.mail);
                setEmailInit(getAccountByEmail.account.mail);
                setPhoneNumber(getAccountByEmail.phone);
                setAddress(getAccountByEmail.address);
                setAccountID(getAccountByEmail.accountID);
                setRoleID(getAccountByEmail.account.roleID);
                setImage(getAccountByEmail.account.avatar);
                setPatientID(getAccountByEmail.patientID)
                var dateString = getAccountByEmail.dob;
                var dateParts = dateString.split("/");
                var day = dateParts[0];
                setDay(day);
                var month = dateParts[1];
                setMonth(month);
                var year = dateParts[2];
                setYear(year);
                setSex(getAccountByEmail.account.gender);
            }
        }
        if (!isFunctionCalledRef.current) {
            getInfomationPatient();
            isFunctionCalledRef.current = true;
        }
        // Simulating loading time
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, []);

    const [image, setImage] = useState('');
    const [logOut, setLogOut] = useState(false);
    const [imageFile, setImageFile] = useState('');
    const [isImageUploaded, setIsImageUploaded] = useState(false);

    const handleImageUpload = async (file) => {
        if (file) {
            setImageFile(file)
            const reader = new FileReader();
            reader.onload = (e) => {
                setImage(e.target.result);
                setIsImageUploaded(true);
            };

            reader.readAsDataURL(file);
        }
    };

    const handleDrop = (event) => {
        event.preventDefault();
        event.stopPropagation();

        const file = event.dataTransfer.files[0]; // Access the dropped file correctly
        handleImageUpload(file);
    };

    const handleDragOver = (event) => {
        event.preventDefault();
        event.stopPropagation();
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

    const [year, setYear] = React.useState('2000');

    const handleYearChange = (event) => {
        const value = event.target.value;
        setYear(value);
        setDobError(validateDateOfBirth(value, month, day));
    };

    const [day, setDay] = React.useState('5');

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

    const validateEmail = (value) => {
        const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
        if (!value) {
            return 'Please enter your email !';
        }
        if (!value.match(emailRegex)) {
            return "Please enter your email in the format abc@def.xyz !";
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
            return 'Please enter your password !';
        }
        const uppercaseRegex = /[A-Z]/;
        const lowercaseRegex = /[a-z]/;
        const digitRegex = /[0-9]/;

        if (value.length < 8 || !uppercaseRegex.test(value) || !lowercaseRegex.test(value) || !digitRegex.test(value)) {
            return "Password must be at least 8 characters, including at least one upper case letter, one lower case letter, and one number !";
        }
        return '';
    };

    const validateRePassword = (value) => {
        if (!value) {
            return 'Please re-enter your password !';
        }
        if (value !== passWord) {
            return 'Passwords do not match !';
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

    const validateVerifyCode = (value) => {
        const codeRegex = /^\d{4}$/;
        if (!value) {
            return 'Please enter your verify code!';
        }
        if (!value.match(codeRegex)) {
            return "Please enter a valid 4-digit code!";
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


    const handleInputChange = (event) => {
        const { name, value } = event.target;

        if (name === 'email') {
            if (value !== emailInit) {
                setChangeEmail2(true);
                setChangeEmail(true);
                setLogOut(true);
            } else {
                setLogOut(false);
                setChangeEmail2(false);
                setChangeEmail(false);
            }
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
        else if (name === 'verifyCode') {
            setVerifyCode(value);
            setVerifyCodeError(validateVerifyCode(value)); // Set verifyCodeError state
        }
    };

    const [state, setState] = React.useState({
        open: false,
        Transition: Fade,
    });

    const handleSave = (Transition) => async () => {
        // Validate email
        const emailValidation = validateEmail(email);
        setEmailError(emailValidation);

        // Validate username
        const usernameValidation = validateUsername(userName);
        setUsernameError(usernameValidation);

        let passwordValidation = '';
        let rePasswordValidation = '';
        if (changePassword) {
            passwordValidation = validatePassword(passWord);
            rePasswordValidation = validateRePassword(re_password);
            setPasswordError(passwordValidation);
            setRePasswordError(rePasswordValidation);
        }
        let verifyCodeValidation = ''
        if (changeEmail2 && changeEmail) {
            verifyCodeValidation = validateVerifyCode(verifyCode);
            setVerifyCodeError(verifyCodeValidation);
        }
        // Validate phone number (if applicable)
        const phoneNumberValidation = validatePhoneNumber(phoneNumber);
        setPhoneNumberError(phoneNumberValidation);

        // Validate address (if applicable)
        const addressValidation = validateAddress(address);
        setAddressError(addressValidation);

        // validate date of birth
        const dateOfBirthValidation = validateDateOfBirth(year, month, day);
        setDobError(dateOfBirthValidation);

        // validate sex
        const sexValidation = validateSex(sex);
        setSexError(sexValidation);

        // Check if any validation errors are present
        if (
            emailValidation ||
            usernameValidation ||
            passwordValidation ||
            rePasswordValidation ||
            phoneNumberValidation ||
            addressValidation ||
            verifyCodeValidation ||
            dateOfBirthValidation ||
            sexValidation
            // Add other validation checks here
        ) {
            // Show the "Update Failure" alert
            setState((prevState) => ({
                ...prevState,
                open: true, // Set open to true to show the Snackbar
                openSuccessAlert: false, // Set openSuccessAlert to false
                Transition: Transition,
            }));
            return;
        }

        try {
            if (changeEmail && changeEmail2) {
                if (codeChangeEmail.toString() !== verifyCode) {
                    setVerifyCodeErrorCf(true);
                    return;
                }
                setLogOut(true);
                setVerifyCodeErrorCf(false)
            }
            setVerifyCodeErrorCf(false)
            if (imageFile) {
                const formData = new FormData();
                formData.append('file', imageFile);
                formData.append('upload_preset', 'mctthwsx');
                try {
                    const response = await axios.post(
                        'https://api.cloudinary.com/v1_1/dabdclkhv/image/upload',
                        formData
                    );
                    const imageUrl = response.data.secure_url;
                    setIsImageUploaded(true);
                    const updateAccountModel = {
                        Password: passWord,
                        Mail: email,
                        Avatar: imageUrl,
                        Gender: sex,
                        RoleID: roleID
                    }
                    await EditAccountServices(accountID, updateAccountModel)

                } catch (error) {
                    console.error('Error uploading image to Cloudinary:', error);
                }
            }
            const updatePatientModel = {
                Name: userName,
                Address: address,
                Phone: phoneNumber,
                Dob: day + '/' + month + '/' + year,
                AccountID: accountID
            }
            await EditPatientServices(patientID, updatePatientModel);
            if (changePassword) {
                const updateAccountModel = {
                    Password: passWord,
                    Mail: email,
                    Gender: sex,
                    Avatar: image,
                    RoleID: roleID
                }
                await EditAccountServices(accountID, updateAccountModel);

            } else {
                const updateAccountModel = {
                    Mail: email,
                    Gender: sex,
                    Avatar: image,
                    RoleID: roleID
                }
                await EditAccountServices(accountID, updateAccountModel);
            }
            if (logOut === true) {
                document.cookie = "";
                sessionStorage.clear();
                navigate("/login")
            }
            setChangePassword(false);
            setChangeEmail(false);
            setChangeEmail2(false);
            setLogOut(false);
            setState((prevState) => ({
                ...prevState,
                open: true, // Set open to true to show the Snackbar
                openSuccessAlert: true, // Set openSuccessAlert to true
                Transition: Transition,
            }));
        } catch (error) {
            console.error('Error updating:', error);
            // Show the "Update Failure" alert
            setState((prevState) => ({
                ...prevState,
                open: true, // Set open to true to show the Snackbar
                openSuccessAlert: false, // Set openSuccessAlert to false
                Transition: Transition,
            }));
        }
    };


    const handleClose = () => {
        setState({
            ...state,
            open: false,
        });
    };

    function SlideTransition(props) {
        return <Slide {...props} direction="up" />;
    }
    const [codeChangeEmail, setCodeChangeEmail] = React.useState('12');

    const sendMailChangeEmail = async () => {
        const code = await changeEmailServices(email)
        setCodeChangeEmail(code)
    }
    const changePasswordEnabled = () => {
        if (enable) {
            setChangePassword(true);
            setEnable(false);
        } else {
            setChangePassword(false);
            setEnable(true);
        }
    }

    return (
        <Box sx={{
            marginTop: 6,
            marginBottom: 5,
            height: 'auto',
            overflowX: 'hidden', // Hide the horizontal scrollbar
        }}>
            {loading ? (
                <Skeleton variant="rectangular" animation="wave" width="100%" height={495} />
            ) : (
                <Paper style={image_contentData.paperContainer1}
                    sx={{ boxShadow: 'none' }} />
            )}
            <Container
                sx={{
                    marginTop: 15.75,
                    marginBottom: 15.75,
                    boxShadow: 'none'
                }}>
                <Grid2>
                    <Stack direction={'row'} spacing={10}>
                        <MenuItem>
                            <Box
                                sx={{
                                    display: 'flex',
                                    justifyContent: 'center',
                                    flexDirection: 'column',
                                    alignItems: 'center',
                                }}
                                onDrop={handleDrop}
                                onDragOver={handleDragOver}
                            >
                                {loading ? (
                                    <Skeleton
                                        variant="circular"
                                        animation="wave"
                                        width={187}
                                        height={187}
                                    />
                                ) : (
                                    <label htmlFor="upload-button">
                                        <input
                                            type="file"
                                            id="upload-button"
                                            style={{ display: 'none' }}
                                            accept="image/*"
                                            onChange={(e) => handleImageUpload(e.target.files[0])}
                                        />
                                        <Avatar
                                            alt="K"
                                            src={image}
                                            sx={{
                                                width: '187px',
                                                height: '187px',
                                            }}
                                        />
                                        {isImageUploaded ? null : (
                                            <Typography
                                                color={'gray'}
                                                sx={{
                                                    marginTop: 2.125,
                                                    fontSize: 25,
                                                    fontWeight: 200,
                                                    textAlign: 'center'
                                                }}
                                            >
                                                Upload Image
                                            </Typography>
                                        )}
                                    </label>
                                )}
                            </Box>
                        </MenuItem>
                        <Box>
                            {loading ? (
                                <Skeleton
                                    variant="text"
                                    animation="wave"
                                    width={300}
                                    height={40}
                                    sx={{ marginBottom: 1 }}
                                />
                            ) : (
                                <Typography variant='h2' color={'gray'} >
                                    Welcome!
                                </Typography>
                            )}
                            <br />
                            {loading ? (
                                <Skeleton
                                    variant="text"
                                    animation="wave"
                                    width={200}
                                    height={30}
                                    sx={{ marginBottom: 1 }}
                                />
                            ) : (
                                <Typography variant='h4'>{profilePatient.name}</Typography>
                            )}
                            <br />
                            <Button onClick={changePasswordEnabled} color='inherit'>
                                {loading ? (
                                    <Skeleton
                                        variant="text"
                                        animation="wave"
                                        width={100}
                                        height={40}
                                    />
                                ) : (
                                    'Change password'
                                )}
                            </Button>
                        </Box>
                        <hr />
                        <MenuList>
                            <Link to='/Medical Record' style={{ color: '#000', textDecoration: 'none' }}>
                                <MenuItem>
                                    {loading ? (
                                        <Skeleton
                                            variant="rectangular"
                                            animation="wave"
                                            width={40}
                                            height={40}
                                            sx={{ marginRight: 2 }}
                                        />
                                    ) : (
                                        <img alt="h" src={imageHelthCheck} />
                                    )}
                                    {loading ? (
                                        <Skeleton
                                            variant="text"
                                            animation="wave"
                                            width={150}
                                            height={30}
                                        />
                                    ) : (
                                        <Typography sx={{ marginLeft: 2 }}>My Medical Record</Typography>
                                    )}
                                </MenuItem>
                            </Link>
                            <br />
                            <Link to='/Appointment' style={{ color: '#000', textDecoration: 'none' }}>
                                <MenuItem>
                                    {loading ? (
                                        <Skeleton
                                            variant="rectangular"
                                            animation="wave"
                                            width={40}
                                            height={40}
                                            sx={{ marginRight: 2 }}
                                        />
                                    ) : (
                                        <img alt="h" src={imageAppointment} />
                                    )}
                                    {loading ? (
                                        <Skeleton
                                            variant="text"
                                            animation="wave"
                                            width={130}
                                            height={30}
                                        />
                                    ) : (
                                        <Typography sx={{ marginLeft: 2 }}>My Appointment</Typography>
                                    )}
                                </MenuItem>
                            </Link>
                        </MenuList>
                    </Stack>
                    <br />
                    <Box
                        sx={{
                            marginBottom: 10,
                            marginTop: 5,
                        }}>
                        {loading ? (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={300}
                                height={60}
                                sx={{ marginBottom: 2 }}
                            />
                        ) : (
                            <Typography
                                sx={{
                                    fontSize: 40,
                                    fontWeight: 300
                                }}
                            >
                                Personal information
                            </Typography>
                        )}
                        <br />
                        <Stack direction="row" spacing={30}>
                            <FormControl defaultValue="" required style={{ maxWidth: 400 }}>
                                {loading ? (
                                    <Skeleton
                                        variant="text"
                                        animation="wave"
                                        width={450}
                                        height={40}
                                        sx={{ marginBottom: 1 }}
                                    />
                                ) : (
                                    <>
                                        <label
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 700,
                                            }}
                                        >
                                            * Full name
                                        </label>
                                        <br />
                                        <TextField
                                            value={userName}
                                            className='inputRounded'
                                            name='username'
                                            onChange={handleInputChange}
                                        />
                                        <Typography variant="body2" color="error">
                                            {usernameError}
                                        </Typography>
                                    </>
                                )}
                                <br />
                                {loading ? (
                                    <Skeleton
                                        variant="text"
                                        animation="wave"
                                        width={450}
                                        height={40}
                                        sx={{ marginBottom: 1 }}
                                    />
                                ) : (
                                    <>
                                        <label
                                            style={{
                                                fontSize: 20,
                                                fontWeight: 700,
                                            }}
                                        >
                                            * Email address
                                        </label>
                                        <br />
                                        <TextField
                                            value={email}
                                            className='inputRounded'
                                            name='email'
                                            onChange={handleInputChange}
                                        />
                                        <Typography variant="body2" color="error">
                                            {emailError}
                                        </Typography>
                                    </>
                                )}
                                <br />
                                {loading ? (
                                    <Skeleton
                                        variant="text"
                                        animation="wave"
                                        width={450}
                                        height={40}
                                        sx={{ marginBottom: 1 }}
                                    />
                                ) : (

                                    <>
                                        {changeEmail2 && (
                                            <>
                                                <label
                                                    style={{
                                                        fontSize: 20,
                                                        fontWeight: 700,
                                                    }}
                                                >
                                                    * Verify code
                                                </label>
                                                <br />
                                                <TextField
                                                    className='inputRounded'
                                                    name='verifyCode'
                                                    onChange={handleInputChange}
                                                />
                                                <Typography variant="body2" color="error">
                                                    {verifyCodeError}
                                                </Typography>
                                                {
                                                    verifyCodeErrorCf && (
                                                        <Typography variant="body2" color="error">
                                                            The code you entered does not match the one in the email. Please enter a valid code!
                                                        </Typography>
                                                    )
                                                }
                                            </>
                                        )}

                                    </>
                                )}
                                <br />
                                {
                                    changePassword && (
                                        <>
                                            {loading ? (
                                                <Skeleton
                                                    variant="text"
                                                    animation="wave"
                                                    width={450}
                                                    height={40}
                                                    sx={{ marginBottom: 1 }}
                                                />
                                            ) : (
                                                <>
                                                    <label
                                                        style={{
                                                            fontSize: 20,
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        * Enter new password
                                                    </label>
                                                    <br />
                                                    <TextField
                                                        className='inputRounded'
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
                                                        name='password'
                                                        onChange={handleInputChange}
                                                    />
                                                    <Typography variant="body2" color="error">
                                                        {passwordError}
                                                    </Typography>
                                                    <br />
                                                    <label
                                                        style={{
                                                            fontSize: 20,
                                                            fontWeight: 700,
                                                        }}
                                                    >
                                                        * Confirm new password
                                                    </label>
                                                    <br />
                                                    <TextField
                                                        className='inputRounded'
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
                                                        name='re-password'
                                                        onChange={handleInputChange}
                                                    />
                                                    <Typography variant="body2" color="error">
                                                        {rePasswordError}
                                                    </Typography>
                                                </>
                                            )}
                                        </>
                                    )
                                }

                            </FormControl>
                            {/* *********************** */}
                            {/* *********************** */}
                            <FormControl defaultValue="" required>
                                {loading ? (
                                    <>
                                        <Skeleton
                                            variant="text"
                                            animation="wave"
                                            width={200}
                                            height={40}
                                            sx={{ marginTop: 13.1 }}
                                        />
                                        <Skeleton
                                            variant="text"
                                            animation="wave"
                                            width={450}
                                            height={40}
                                            style={{ marginTop: 68 }}
                                        />
                                    </>
                                ) : (
                                    <>
                                        {
                                            changeEmail && (
                                                <CustomButton onClick={sendMailChangeEmail} sx={{ marginTop: 23.1 }}>Send code verify email</CustomButton>
                                            )
                                        }
                                    </>
                                )}
                            </FormControl>
                        </Stack>
                        {loading ? (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={1150}
                                height={25}
                                sx={{ marginBottom: 1 }}
                            />
                        ) : (
                            <Typography
                                sx={{
                                    marginTop: 4.375,
                                    marginBottom: 5,
                                    fontSize: 25,
                                    fontWeight: 100,
                                    color: 'gray'
                                }}>
                                "Your password must be a minimum of 8 characters, including at least one upper case letter, one lower case letter, and one number."
                            </Typography>
                        )}
                        {loading ? (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={450}
                                height={40}
                                sx={{ marginBottom: 1 }}
                            />
                        ) : (
                            <>
                                <label
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 700,
                                    }}
                                >
                                    * Enter Phone Number
                                </label>
                                <br />
                                <br />
                                <TextField
                                    value={phoneNumber}
                                    className='inputRounded'
                                    name='phoneNumber'
                                    onChange={handleInputChange}
                                />
                                <Typography variant="body2" color="error">
                                    {phoneNumberError}
                                </Typography>
                            </>
                        )}
                        <br />
                        <br />
                        {loading ? (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={450}
                                height={40}
                                sx={{ marginBottom: 1 }}
                            />
                        ) : (
                            <>
                                <label
                                    style={{
                                        fontSize: 20,
                                        fontWeight: 700,
                                    }}
                                >
                                    * Enter Address
                                </label>
                                <br />
                                <br />
                                <TextField
                                    value={address}
                                    className='inputRounded'
                                    name='address'
                                    onChange={handleInputChange}
                                />
                                <Typography variant="body2" color="error">
                                    {addressError}
                                </Typography>
                            </>
                        )}
                        <br />
                        <br />
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
                                <br />
                                <Stack direction="row" spacing={0}>
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
                                <br />
                                <br />
                                <FormControl>
                                    <RadioGroup
                                        row
                                        value={sex}
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
                    </Box>
                    {/* button save */}
                    <Box
                        sx={{
                            alignItems: 'center',
                            margin: '0 auto', // Center the Box component
                            width: 'fit-content', // Adjust the width as needed
                        }}>
                        {loading ? (
                            <Skeleton
                                variant="text"
                                animation="wave"
                                width={300}
                                height={80}
                                sx={{ margin: '0 auto' }}
                            />
                        ) : (
                            <Button
                                onClick={handleSave(SlideTransition)}
                                sx={{
                                    backgroundColor: '#000000',
                                    color: '#FFFF',
                                    borderRadius: 30,
                                    width: 175,
                                    marginBottom: 3.125,
                                    ":hover": { backgroundColor: 'gray' }
                                }}
                            >
                                Save
                                <Snackbar
                                    open={state.open}
                                    onClose={handleClose}
                                    autoHideDuration={1200}
                                    TransitionComponent={state.Transition}
                                    key={state.Transition.name}
                                >
                                    <Alert
                                        variant="filled"
                                        severity={state.openSuccessAlert ? "success" : "error"} // Show success or error severity based on the state
                                        sx={{ width: '100%', height: 50, alignItems: 'center' }}
                                    >
                                        {state.openSuccessAlert ? "Update Successfully!!!" : "Update Failed!!!"}
                                    </Alert>
                                </Snackbar>
                            </Button>
                        )}
                    </Box>
                </Grid2>
            </Container>
        </Box >
    )
}

const blue = {
    500: '#007FFF',
    600: '#0072E5',
    700: '#0059B2',
};

const CustomButton = styled(Button)`
    margin-top: 79px;
    width: 250px;
    font-family: 'IBM Plex Sans', sans-serif;
    font-size: 0.875rem;
    line-height: 1.5rem;
    background-color: ${blue[500]};
    color: white;
    border-radius: 30px;
    font-weight: 600;
    padding: 8px 16px;
    cursor: pointer;
    transition: all 150ms ease;
    border: none;

    &:hover:not(:disabled) {
      background-color: ${blue[600]};
    }

    &:active:not(:disabled) {
      background-color: ${blue[700]};
    }

    &.${buttonClasses.focusVisible} {
      box-shadow: 0 4px 20px 0 rgb(61 71 82 / 0.1), 0 0 0 5px rgb(0 127 255 / 0.5);
      outline: none;
    }

    &.${buttonClasses.disabled} {
      opacity: 0.5;
      cursor: not-allowed;
    }
  `;

export default Body_content;

