import { useState } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { validateDosage, validateMedication, validatePrice } from '../../../../helper/checkedRegex';
import Swal from 'sweetalert2';
import { CreateMedicationsServices } from '../../../../api/medicineServices';

export default function AddMedicine({ closeEvent }) {
    const [medicationNameError, setMedicationNameError] = useState('');
    const [priceError, setPriceError] = useState('');
    const [dosageErrror, setDosageErrror] = useState('');
    const [medicationName, setMedicationName] = useState(true);
    const [price, setPrice] = useState(true);
    const [dosage, setDosage] = useState(true);
    const [isDataEntered, setIsDataEntered] = useState(false);
    const [medication, setMedication] = useState({
        MedicationName: '',
        Dosage: '',
        Price: ''
    });

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setMedication({
            ...medication,
            [name]: value,
        });

        if (name === 'MedicationName') {
            const hasData = value.trim() === '';
            setIsDataEntered(hasData);
            setMedicationName(hasData);
            setMedicationNameError(validateMedication(value));
        }
        else if (name === 'Price') {
            const hasData = value.trim() === '';
            setIsDataEntered(hasData);
            setPrice(hasData);
            setPriceError(validatePrice(value));
        }
        else if (name === 'Dosage') {
            const hasData = value.trim() === '';
            setIsDataEntered(hasData);
            setDosage(hasData);
            setDosageErrror(validateDosage(value));
        }
    };
    const createConfirmed = async () => {
        await CreateMedicationsServices(medication)
        closeEvent();
        Swal.fire("Submitted!", "Your file has been submitted.", "success");
    };
    const checkedSubmitted = () => {
        if (isDataEntered === false && medicationName === false && price === false && dosage === false) {
            return false;
        }
        return true;
    }
    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Add medicine</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={medication.MedicationName}
                        onChange={handleInputChange}
                        name='MedicationName'
                        id="outlined-basic"
                        label="Medication Name"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!medicationNameError}
                        helperText={medicationNameError}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={medication.Dosage}
                        onChange={handleInputChange}
                        name='Dosage'
                        id="outlined-basic"
                        label="Dosage"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!dosageErrror}
                        helperText={dosageErrror}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={medication.Price}
                        onChange={handleInputChange}
                        name='Price'
                        id="outlined-basic"
                        label="Price"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!priceError}
                        helperText={priceError}
                    />
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
