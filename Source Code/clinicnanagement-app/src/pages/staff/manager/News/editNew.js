import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, FormControl, FormHelperText } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import { validateContext, validateTitle } from '../../../../helper/checkedRegex';
import { EditNewServices, GetNewServices } from '../../../../api/newServices';
import Dropzone from 'react-dropzone';
import axios from 'axios';

export default function EditNews({ id, closeEvent }) {
    const [contextErr, setContextErr] = useState('');
    const [titleErr, setTitleErr] = useState('');
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [news, setNews] = useState({
        EmployeeID: '',
        NewsContext: '',
        NewImage: '',
        Title: ''
    });

    useEffect(() => {
        setIsSaveDisabled(!!titleErr)
    }, [titleErr]);

    useEffect(() => {
        const getNews = async () => {
            const data = await GetNewServices(id);
            setNews({
                EmployeeID: data.employeeID,
                NewsContext: data.newsContext,
                NewImage: data.newImage,
                Title: data.title,
            });
        };
        getNews();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setNews({
            ...news,
            [name]: value,
        });
        if (name === 'NewsContext') {
            setContextErr(validateContext(value));
        }
        else if (name === 'Title') {
            setTitleErr(validateTitle(value));
        }

    };
    const confirmEdit = async () => {
        if (uploadedImage === null) {
            await EditNewServices(id, news);
            closeEvent();
            Swal.fire("Submitted!", "Your file has been submitted.", "success");
            return;
        }
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
                EmployeeID: news.EmployeeID,
                NewsContext: news.NewsContext,
                NewImage: imageUploaded,
                Title: news.Title,
            }
            await EditNewServices(id, newsModel);
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
        setNews(
            {
                EmployeeID: news.EmployeeID,
                NewsContext: news.NewsContext,
                NewImage: URL.createObjectURL(uploadedFile),
                Title: news.Title,
            }
        )
        setUploadedImage(uploadedFile);
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Edit news</Typography>
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
                                <img
                                    src={news.NewImage}
                                    alt="Uploaded"
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                />
                                <span>Click me upload image</span>
                                )
                            </div>
                        )}
                    </Dropzone>
                    <Typography variant="body2" color="error">
                        { }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5' align='center'>
                        <Button
                            variant='contained'
                            onClick={confirmEdit}
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
