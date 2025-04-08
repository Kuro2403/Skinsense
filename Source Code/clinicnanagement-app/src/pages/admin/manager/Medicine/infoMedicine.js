import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import { GetMedicationsServices } from '../../../../api/medicineServices';
export default function InforMedicine({ id, closeEvent }) {
    const [formData, setFormData] = useState({
        MedicationName: '',
        Dosage: '',
        Price: ''
    });

    useEffect(() => {
        const getMedicine = async () => {
            const data = await GetMedicationsServices(id);
            setFormData({
                MedicationName: data.medicationName,
                Dosage: data.dosage,
                Price: data.price,
            });
        };
        getMedicine();
    }, [id]);

    const editFunction = async () => {
        closeEvent();
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Information medicine</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={formData.MedicationName}
                        name='Specialty'
                        id="outlined-basic"
                        label="Specialty"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        inputProps={{
                            style: {
                                pointerEvents: 'none',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={formData.Dosage}
                        name='Hospital'
                        id="outlined-basic"
                        label="Hospital"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        inputProps={{
                            style: {
                                pointerEvents: 'none',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <TextField
                        value={formData.Price}
                        name='YearsOfExperience'
                        id="outlined-basic"
                        label="Years Of Experience"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        InputProps={{
                            readOnly: true,
                        }}
                        inputProps={{
                            style: {
                                pointerEvents: 'none',
                            },
                        }}
                    />
                </Grid>
                <Grid item xs={12}>
                    <Typography variant='h5' align='center'>
                        <Button variant='contained' onClick={editFunction}>
                            Exit
                        </Button>
                    </Typography>
                </Grid>
            </Grid>
            <Box sx={{ m: 2 }} />
        </>
    )
}
