import { useState } from 'react';
import { Box, Button, IconButton, Typography, Grid, TextField, FormHelperText, FormControl } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { validateDescription, validateTreatmentName, validateCost } from '../../../../helper/checkedRegex';
import Dropzone from 'react-dropzone';
import Swal from 'sweetalert2';
import axios from 'axios';
import { CreateTreatmentServices } from '../../../../api/treatmentServices';
export default function AddTreatment({ closeEvent }) {
    const [treatmentNameError, setTreatmentNameError] = useState('');
    const [descriptionError, setDescriptionError] = useState('');
    const [costError, setCostError] = useState('');
    const [treatmentName, setTreatmentName] = useState(true);
    const [description, setDescription] = useState(true);
    const [cost, setCost] = useState(true);
    const [image, setImage] = useState(true);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const [treatment, setTreatment] = useState({
        TreatmentName: '',
        Description: '',
        ImageTreatment: '',
        Cost: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setTreatment({
            ...treatment,
            [name]: value,
        });
        const hasData = value.trim() !== '';
        setIsDataEntered(hasData);
        if (name === 'TreatmentName') {
            const hasData = value.trim() === '';
            setIsDataEntered(hasData);
            setTreatmentName(hasData);
            setTreatmentNameError(validateTreatmentName(value));
        }
        else if (name === 'Description') {
            const hasData = value.trim() === '';
            setIsDataEntered(hasData);
            setDescription(hasData);
            setDescriptionError(validateDescription(value));
        }
        else if (name === 'Cost') {
            const hasData = value.trim() === '';
            setIsDataEntered(hasData);
            setCost(hasData);
            setCostError(validateCost(value));
        }
    };
    const createConfirmed = async () => {
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
            await CreateTreatmentServices(treatmentModel);
            closeEvent();
            Swal.fire("Submitted!", "Your file has been submitted.", "success");
        } catch (error) {
            console.error('Error uploading image: ', error);
        }

    };
    const [uploadedImage, setUploadedImage] = useState(null);

    const handleImageUpload = (acceptedFiles) => {
        const uploadedFile = acceptedFiles[0];
        if (uploadedFile) {
            setImage(false);
        }
        setUploadedImage(uploadedFile);
    };
    const checkedSubmitted = () => {
        if (isDataEntered === false
            && treatmentName === false
            && cost === false
            && description === false
            && image === false) {
            return false;
        }
        return true;
    }
    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Add treatment</Typography>
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
                        label="Treatment Name"
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
