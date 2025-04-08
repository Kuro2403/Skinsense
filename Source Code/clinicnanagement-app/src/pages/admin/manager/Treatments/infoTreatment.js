import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Grid, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { GetTreatmentServices } from '../../../../api/treatmentServices';
export default function InfoTreatment({ id, closeEvent }) {
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
    const editFunction = async () => {
        closeEvent();
    };
    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Info treatment</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        multiline
                        variant="outlined"
                        fullWidth
                        name='Treatmen tName'
                        id="outlined-basic"
                        label="TreatmentName"
                        value={treatment.TreatmentName}
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
                        multiline
                        variant="outlined"
                        fullWidth
                        value={treatment.Description}
                        name='Description'
                        id="outlined-basic"
                        label="Description"
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
                        multiline
                        variant="outlined"
                        fullWidth
                        name='Cost'
                        id="outlined-basic"
                        label="Cost"
                        value={treatment.Cost}
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
                <Grid align={'center'} item xs={12}>
                    <img
                        src={treatment.ImageTreatment}
                        alt="Uploaded"
                        style={{ maxWidth: '200px', maxHeight: '200px' }}
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
