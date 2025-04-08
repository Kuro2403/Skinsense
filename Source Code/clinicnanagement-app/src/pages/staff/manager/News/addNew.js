import { useState } from 'react';
import { Box, Button, IconButton, Typography, FormControl, FormHelperText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { validateTitle, validateContext } from '../../../../helper/checkedRegex';
import Swal from 'sweetalert2';
import Dropzone from 'react-dropzone';
import axios from 'axios';
import { CreateNewServices } from '../../../../api/newServices';
import { GetAllEmployeeServices } from '../../../../api/employeeServices';

export default function AddNew({ closeEvent }) {
    const [contextErr, setContextErr] = useState('');
    const [titleErr, setTitleErr] = useState('');
    const [context, setContext] = useState(true);
    const [title, setTitle] = useState(true);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const [imageErr, setImageErr] = useState(true);
    const [news, setNews] = useState({
        NewsContext: '',
        NewImage: '',
        Title: '',
        EmployeeID: '',
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNews({
            ...news,
            [name]: value,
        });
        const hasData = value.trim() !== '';
        setIsDataEntered(hasData);
        if (name === 'Title') {
            const hasData = value.trim() === '';
            setIsDataEntered(hasData);
            setTitle(hasData);
            setTitleErr(validateTitle(value));
        } else if (name === 'NewsContext') {
            const hasData = value.trim() === '';
            setIsDataEntered(hasData);
            setContext(hasData);
            setContextErr(validateContext(value));
        }
    };
    const createConfirmed = async () => {
        const storedEmail = sessionStorage.getItem('Email');
        const employeeList = await GetAllEmployeeServices();
        const getEmployeeIDByEmail = employeeList.find(h => h.account.mail.toLowerCase() === storedEmail.toLowerCase());
        const formData = new FormData();
        formData.append('file', uploadedImage);
        formData.append('upload_preset', 'mctthwsx');
        try {
            const response = await axios.post(
                'https://api.cloudinary.com/v1_1/dabdclkhv/image/upload',
                formData
            );
            const imageUploaded = response.data.secure_url;
            const newsModel = {
                EmployeeID: getEmployeeIDByEmail.employeeID,
                NewsContext: news.NewsContext,
                NewImage: imageUploaded,
                Title: news.Title,
            }
            await CreateNewServices(newsModel);
            closeEvent();
            Swal.fire("Submitted!", "Your file has been submitted.", "success");
        } catch (error) {
            console.error('Error uploading: ', error);
        }
        closeEvent();
        Swal.fire("Submitted!", "Your file has been submitted.", "success");
    };
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleImageUpload = (acceptedFiles) => {
        const uploadedFile = acceptedFiles[0];
        if (uploadedFile) {
            setImageErr(false)
        }
        setUploadedImage(uploadedFile);
    };
    const checkedSubmitted = () => {
        if (isDataEntered === false && context === false && title === false && imageErr === false) {
            return false;
        }
        return true;
    }
    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Add new</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={news.Title}
                        onChange={handleInputChange}
                        name='Title'
                        id="outlined-basic"
                        label="Title"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!titleErr}
                        helperText={titleErr}
                    />
                </Grid>
                <Grid item xs={12}>
                    <span>News Context</span>
                    <FormControl
                        error={!!contextErr}
                        style={{
                            minWidth: '100%',
                            padding: '8px',
                            border: '1px solid rgba(0, 0, 0, 0.23)',
                            borderRadius: '4px',
                            resize: 'vertical',
                            outline: 'none',
                        }}
                    >
                        <textarea
                            value={news.NewsContext}
                            onChange={handleInputChange}
                            name="NewsContext"
                            id="outlined-basic"
                            label="Alo"
                            className={`MuiOutlinedInput-input MuiInputBase-input MuiInput-input MuiInputBase-inputMultiline`}
                            style={{
                                height: '200px',
                                width: '100%',
                                padding: '6px 6px 6px 6px',
                                border: 'none',
                                resize: 'none',
                                outline: 'none',
                                fontSize: '17px'
                            }}
                            rows={4}
                        />
                    </FormControl>
                    {contextErr && <FormHelperText sx={{ color: '#d32f2f' }}>{contextErr}</FormHelperText>}
                </Grid>
                <Grid item xs={12}>
                    <Dropzone onDrop={handleImageUpload}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} style={{ cursor: 'pointer', border: '1px solid #ccc', top: '50%', left: '50%', maxWidth: '200px', maxHeight: '200px' }}>
                                <input {...getInputProps()} />
                                {uploadedImage ? (
                                    <img
                                        src={URL.createObjectURL(uploadedImage)}
                                        alt="Uploaded"
                                        style={{ maxWidth: '200px', maxHeight: '200px' }}
                                    />
                                ) : (
                                    <span>Click me upload image</span>
                                )}
                            </div>
                        )}
                    </Dropzone>
                </Grid>
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
