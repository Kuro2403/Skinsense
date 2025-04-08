import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Grid, TextField, FormHelperText, FormControl } from '@mui/material';
import Dropzone from 'react-dropzone';
import CloseIcon from '@mui/icons-material/Close';
import { validateDescription, validateTreatmentName, validateCost } from '../../../../helper/checkedRegex';
import Swal from 'sweetalert2';
import axios from 'axios';
import { GetTreatmentServices, EditTreatmentServices } from '../../../../api/treatmentServices';
export default function EditMedicine({ id, closeEvent }) {
    const [treatmentNameError, setTreatmentNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [costError, setCostError] = useState('');
    const [treatment, setTreatment] = useState({
        TreatmentName: '',
        Description: '',
        ImageTreatment: '',
        Cost: ''
    });

    useEffect(() => {
        const getTreatment = async () => {
            const data = await GetTreatmentServices(id);
            setTreatment({
                TreatmentName: data.treatmentName,
                Description: data.description,
                ImageTreatment: data.imageTreatment,
                Cost: data.cost,
            });
        };
        getTreatment();
    }, [id]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTreatment({
            ...treatment,
            [name]: value,
        });
        if (name === 'TreatmentName') {
            setTreatmentNameError(validateTreatmentName(value));
        }
        else if (name === 'Description') {
            setDescriptionError(validateDescription(value));
        }
        else if (name === 'Cost') {
            setCostError(validateCost(value));
        }
    };
    const isAnyFieldEmpty = () => {
        for (const key in treatment) {
            if (treatment.hasOwnProperty(key) && treatment[key] === '') {
                return true; // Found an empty field
            }
        }
        return false; // No empty fields found
    };
    const editFunction = async () => {
        if (uploadedImage == null) {
            await EditTreatmentServices(id, treatment);
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
            const treatmentModel = {
                TreatmentName: treatment.TreatmentName,
                Description: treatment.Description,
                ImageTreatment: imageUploaded,
                Cost: treatment.Cost
            }
            await EditTreatmentServices(id, treatmentModel);
            closeEvent();
            Swal.fire("Submitted!", "Your file has been submitted.", "success");
        } catch (error) {
            console.error('Error uploading: ', error);
        }


    };

    const [uploadedImage, setUploadedImage] = useState(null);

    const handleImageUpload = (acceptedFiles) => {
        const uploadedFile = acceptedFiles[0];
        setTreatment(
            {
                ImageTreatment: URL.createObjectURL(uploadedFile),
                TreatmentName: treatment.TreatmentName,
                Description: treatment.Description,
                Cost: treatment.Cost
            }
        )
        setUploadedImage(uploadedFile);
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Edit treatment</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={treatment.TreatmentName}
                        onChange={handleInputChange}
                        name='TreatmentName'
                        id="outlined-basic"
                        label="TreatmentName"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!treatmentNameError}
                        helperText={treatmentNameError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <FormControl
                        error={!!descriptionError}
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
                            value={treatment.Description}
                            onChange={handleInputChange}
                            name="Description"
                            id="outlined-basic"
                            className={`MuiOutlinedInput-input MuiInputBase-input MuiInput-input MuiInputBase-inputMultiline`}
                            style={{
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
                    {descriptionError && <FormHelperText sx={{ color: 'red' }}>{descriptionError}</FormHelperText>}
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={treatment.Cost}
                        onChange={handleInputChange}
                        name='Cost'
                        id="outlined-basic"
                        label="Cost"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!costError}
                        helperText={costError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Dropzone onDrop={handleImageUpload}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps()} style={{ cursor: 'pointer', border: '1px solid #ccc', top: '50%', left: '50%', maxWidth: '200px', maxHeight: '200px' }}>
                                <input {...getInputProps()} />
                                <img
                                    src={treatment.ImageTreatment}
                                    alt="Uploaded"
                                    style={{ maxWidth: '200px', maxHeight: '200px' }}
                                />
                                <span>Click me upload image</span>
                                
                            </div>
                        )}
                    </Dropzone>
                    <Typography variant="body2" color="error">
                        { }
                    </Typography>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5' align='center'>
                        <Button variant='contained' onClick={editFunction} disabled={isAnyFieldEmpty()}>
                            Save  changes
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 2 }} />
        </>
    )
}
