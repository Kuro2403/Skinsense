import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Grid, TextField, FormControl, InputLabel, Select, MenuItem, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { validateSpecialistName } from '../../../../helper/checkedRegex';
import Swal from 'sweetalert2';
import { EditSpecialistsServices, GetSpecialistsServices } from '../../../../api/specicalistServices';
import { EditDetailSpecialistServices, GetDetailSpecialistServices } from '../../../../api/detailSpecialistServices';
import { getDoctorNoSpecialist } from '../../../../helper/Util';
import { GetDoctorServices } from '../../../../api/doctorServices';
export const EditSpecialist = ({ id, closeEvent }) => {
    const [specialistNameErr, setSpecialistNameErr] = useState('');
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [isDataEntered, setIsDataEntered] = useState(false);

    const [specialist, setSpecialist] = useState({
        SpecialistName: '',
    });

    useEffect(() => {
        const getDetailSpecialist = async () => {
            const data = await GetSpecialistsServices(id);
            setSpecialist({
                SpecialistName: data.specialistName
            })
        };
        getDetailSpecialist();
    }, [id]);
    useEffect(() => {
        setIsSaveDisabled(
            !!specialistNameErr ||
            !isDataEntered);
    }, [specialistNameErr, isDataEntered]);

    const handleInputChange = (event) => {
        const { name, value } = event.target;
        setSpecialist({
            ...specialist,
            [name]: value,
        });
        if (name === 'SpecialistName') {
            setSpecialistNameErr(validateSpecialistName(value));
            const hasData = value.trim() !== '';
            setIsDataEntered(hasData);
        }
    };
    const editFunction = async () => {
        await EditSpecialistsServices(id, specialist)
        closeEvent();
        Swal.fire("Submitted!", "Your file has been submitted.", "success");
    };


    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Edit specialist</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        value={specialist.SpecialistName}
                        onChange={handleInputChange}
                        name='SpecialistName'
                        id="outlined-basic"
                        label="Specicalist Name"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        error={!!specialistNameErr}
                        helperText={specialistNameErr}
                    />
                </Grid>

                <Grid item xs={12} >
                    <Typography variant='h5' align='center'>
                        <Button variant='contained' onClick={editFunction}
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
export const EditDoctorBySpecialist = ({ id, closeEvent }) => {
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [modalOpen, setModalOpen] = useState(false);
    const [specialist, setSpecialist] = useState({
        DoctorID: '',
    });
    const [detailSpecialist, setDetailSpecialist] = useState({
        DoctorID: '',
        SpecialistID: '',
        RoleSpecialistID: ''
    });
    const [specialistList, setSpecialistList] = useState([]);
    useEffect(() => {
        const loadData = async () => {
            const detailData = await GetDetailSpecialistServices(id);
            setDetailSpecialist({
                DoctorID: detailData.doctorID,
                SpecialistID: detailData.specialistID,
                RoleSpecialistID: detailData.roleSpecialistID
            })
            const doctorInitData = await GetDoctorServices(detailData.doctorID);
            setSpecialist({
                DoctorID: doctorInitData.doctorID,
                SpecialistID: doctorInitData.specialistID,
                RoleSpecialistID: doctorInitData.roleSpecialistID
            })
            const doctorNoSpecialistData = await getDoctorNoSpecialist();
            const combinedDataList = [
                ...doctorNoSpecialistData,
                doctorInitData
            ];
            setSpecialistList(combinedDataList);
            console.clear();
        };
        loadData();
    }, [id]);

    const [phoneNumber, SetPhoneNumber] = useState('');
    const handleDoctor = async (event) => {
        console.clear();
        setIsSaveDisabled(false);
        const doctor = event.target.value;
        setSpecialist({
            ...specialist,
            DoctorID: doctor,
        });
        const data = await GetDoctorServices(doctor);
        SetPhoneNumber(data.employee.phone)
    };
    const editFunction = async () => {
        setModalOpen(true)
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const handleConfirmDelete = async () => {
        try {
            const editSpecialistModel = {
                DoctorID: specialist.DoctorID,
                SpecialistID: detailSpecialist.SpecialistID,
                RoleSpecialistID: detailSpecialist.RoleSpecialistID
            }
            await EditDetailSpecialistServices(id, editSpecialistModel);
            closeEvent();
            handleCloseModal();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            <div>
                <Dialog open={modalOpen} onClose={handleCloseModal}>
                    <DialogTitle>Confirm change</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to change Doctor?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmDelete} color="secondary">
                            Yes
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Change doctor</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="role-account-label">Doctor name</InputLabel>
                        <Select
                            labelId="role-account-label"
                            name='DoctorID'
                            id="role-account-select"
                            value={specialist.DoctorID}
                            onChange={handleDoctor}
                            label="Doctor name"
                            variant="outlined"
                            sx={{ minWidth: '100%' }}
                        >
                            {specialistList.map((h) => (
                                <MenuItem key={h.doctorID} value={h.doctorID}>
                                    {h.employee.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {
                    phoneNumber && (
                        <Grid item xs={12}>
                            <Typography variant='outlined' color='blue' sx={{ mt: 1, ml: 1 }}>
                                Phone number is doctor: {phoneNumber}
                            </Typography>
                        </Grid>
                    )
                }
                <Grid item xs={12} >
                    <Typography variant='h5' align='center'>
                        <Button variant='contained' onClick={editFunction}
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
