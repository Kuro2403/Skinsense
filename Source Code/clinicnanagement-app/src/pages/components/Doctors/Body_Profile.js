import React, { useState, useEffect, useRef } from 'react'
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import imageContent1 from '../../../assets/images/image_content_profile.jpg';
import { Alert, Avatar, Button, Container, Fade, FormControl, FormControlLabel, IconButton, InputAdornment, MenuItem, Radio, RadioGroup, Slide, Snackbar, TextField, Typography } from '@mui/material';
import Skeleton from '@mui/material/Skeleton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import 'slick-carousel/slick/slick-theme.css';
import Stack from '@mui/material/Stack';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { GetInfomationDoctorByEmail } from '../../../helper/Util';
import axios from 'axios';
import { EditAccountServices } from '../../../api/accountServices';
import { EditEmployeeServices } from '../../../api/employeeServices';


const image_contentData = {
    paperContainer1: {
        backgroundImage: `url(${imageContent1})`,
        height: 577,
        backgroundSize: 'cover',

    },
};


const Body_content = () => {
    // Add a state to track password visibility
    const [showPassword, setShowPassword] = useState(false);
    const [showRePassword, setShowRePassword] = useState(false);
    const [email, setEmail] = useState('');
    const [userName, setUserName] = useState('');
    const [passWord, setPassWord] = useState('');
    const [re_password, setRe_PassWord] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [rePasswordError, setRePasswordError] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [address, setAddress] = useState('');
    const [phoneNumberError, setPhoneNumberError] = useState('');
    const [addressError, setAddressError] = useState('');
    const [sexError, setSexError] = useState('');
    // skeleton effect
    const [loading, setLoading] = useState(true);
    const isFunctionCalledRef = useRef(false);
    const [changePassword, setChangePassword] = useState(false);
    const [enable, setEnable] = useState(false);
    const [accountID, setAccountID] = useState('');
    const [roleID, setRoleID] = useState('');
    const [joinDate, setJoinDate] = useState('');
    const [, setDoctorID] = useState('');
    const [employeeID, setEmployeeID] = useState('');
    const navigate = useNavigate();

    useEffect(() => {
        const getInfomationPatient = async () => {

            const role = sessionStorage.getItem('Role');
            const email = sessionStorage.getItem('Email');
            if (role === 'Doctor') {
                const getAccountByEmail = await GetInfomationDoctorByEmail(email);
                setUserName(getAccountByEmail.employee.name);
                setEmail(getAccountByEmail.employee.account.mail.toLowerCase());
                // setEmailInit(getAccountByEmail.account.mail);
                setPhoneNumber(getAccountByEmail.employee.phone);
                setAddress(getAccountByEmail.employee.address);
                setAccountID(getAccountByEmail.employee.accountID);
                setRoleID(getAccountByEmail.employee.account.roleID);
                setImage(getAccountByEmail.employee.account.avatar);
                setJoinDate(getAccountByEmail.employee.joiningDate);
                setDoctorID(getAccountByEmail.doctorID);
                setEmployeeID(getAccountByEmail.employee.employeeID);
                setSex(getAccountByEmail.employee.account.gender);
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

    const [sex, setSex] = React.useState('');

    const handleSexChange = (event) => {
        const value = event.target.value;
        setSex(value);
        setSexError(validateSex(value));
    }

    // const validateEmail = (value) => {
    //     const emailRegex = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i;
    //     if (!value) {
    //         return 'Please enter your email !';
    //     }
    //     if (!value.match(emailRegex)) {
    //         return "Please enter your email in the format abc@def.xyz !";
    //     }
    //     return '';
    // };

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

    const validateSex = (value) => {
        if (!value) {
            return 'please select your sex!';
        }

        return '';
    }

    const handleInputChange = (event) => {
        const { name, value } = event.target;

        // if (name === 'email') {
        //     if (value !== emailInit) {
        //         setChangeEmail2(true);
        //         setChangeEmail(true);
        //         setLogOut(true);
        //     } else {
        //         setLogOut(false);
        //         setChangeEmail2(false);
        //         setChangeEmail(false);
        //     }
        //     setEmail(value);
        //     setEmailError(validateEmail(value)); // Set emailError state
        // }
        if (name === 'username') {
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

    const [state, setState] = React.useState({
        open: false,
        Transition: Fade,
    });

    const handleSave = (Transition) => async () => {

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

        // Validate phone number (if applicable)
        const phoneNumberValidation = validatePhoneNumber(phoneNumber);
        setPhoneNumberError(phoneNumberValidation);

        // Validate address (if applicable)
        const addressValidation = validateAddress(address);
        setAddressError(addressValidation);

        // validate sex
        const sexValidation = validateSex(sex);
        setSexError(sexValidation);

        // Check if any validation errors are present
        if (
            usernameValidation ||
            passwordValidation ||
            rePasswordValidation ||
            phoneNumberValidation ||
            addressValidation ||
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

            const updateEmployeeModel = {
                Name: userName,
                Address: address,
                Phone: phoneNumber,
                AccountID: accountID,
                JoiningDate: joinDate,
            }
            await EditEmployeeServices(employeeID, updateEmployeeModel);

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

    // const [codeChangeEmail, setCodeChangeEmail] = React.useState('12');

    // const sendMailChangeEmail = async () => {
    //     const code = await changeEmailServices(email)
    //     setCodeChangeEmail(code)
    // }

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
                        <br />
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
                                <Typography variant='h4'>{userName}</Typography>
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

export default Body_content;

