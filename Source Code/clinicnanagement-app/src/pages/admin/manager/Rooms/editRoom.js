import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import { CheckDuplicateNameRoom } from '../../../../helper/checkedUtils';
import { GetDoctorByAvailability } from '../../../../helper/Util';
import { GetAllSpecialistsServices } from '../../../../api/specicalistServices';
import { validateRoomName } from '../../../../helper/checkedRegex';
import { EditRoomServices, GetRoomServices } from '../../../../api/roomServices';
export default function EditRoom({ id, closeEvent }) {
    const [, setDoctor] = useState([]);
    const [specialist, setSpecialist] = useState([]);
    const [roomNameErr, setRoomNameErr] = useState('');
    const [isDataEntered, setIsDataEntered] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);

    const [isDuplicate, setIsDuplicate] = useState(false);
    const [room, setRoom] = useState({
        RoomName: '',
        SpecialistID: '',
        SpecialistName: '',
    });
    useEffect(() => {
        const getRoomClinic = async () => {
            const data = await GetRoomServices(id);
            setRoom({
                RoomName: data.roomName,
                SpecialistID: data.specialistID,
                SpecialistName: data.specialist.specialistName,
            });
        };
        getRoomClinic();
    }, [id]);
    useEffect(() => {
        getDoctors();
        getSpecialists();
    }, []);
    useEffect(() => {
        setIsSaveDisabled(
            !!roomNameErr ||
            !isDataEntered);
    }, [roomNameErr, isDataEntered]);

    const getDoctors = async () => {
        const data = await GetDoctorByAvailability();
        setDoctor(data);
    };
    const getSpecialists = async () => {
        const data = await GetAllSpecialistsServices();
        setSpecialist(data);
    }

    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setRoom({
            ...room,
            [name]: value,
        });
        setIsDuplicate(false);
        if (name === 'RoomName') {
            const checkNameRoom = await CheckDuplicateNameRoom(value)
            if (checkNameRoom === true) {
                return setIsDuplicate(true);
            }
            setRoomNameErr(validateRoomName(value));
            const hasData = value.trim() !== '';
            setIsDataEntered(hasData);
        }
        if (name === 'SpecialistID') {
            setIsDataEntered(value);
        }

    };
    const submitConfirmed = async () => {
        await EditRoomServices(id, room);
        closeEvent();
        Swal.fire("Submitted!", "Your file has been submitted.", "success");
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Edit Room</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <TextField
                        onChange={handleInputChange}
                        name='RoomName'
                        id="outlined-basic"
                        label="Room name"
                        variant="outlined"
                        size='small'
                        sx={{ minWidth: '100%' }}
                        value={room.RoomName}
                        error={!!roomNameErr}
                        helperText={roomNameErr}
                    />
                </Grid>
                <Grid item xs={12}>
                    {isDuplicate && (
                        <Typography variant='body2' color='error' sx={{ mt: 1 }}>
                            Room Clinic Name is already taken. Please choose another one.
                        </Typography>
                    )}
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="role-account-label">Specialist</InputLabel>
                        <Select
                            labelId="role-account-label"
                            name='SpecialistID'
                            id="role-account-select"
                            value={room.SpecialistID}
                            onChange={handleInputChange}
                            label="Specialist"
                            variant="outlined"
                            sx={{ minWidth: '100%' }}
                        >
                            {specialist.map((specialist) => (
                                <MenuItem key={specialist.specialistID} value={specialist.specialistID}>
                                    {specialist.specialistName}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                <Grid item xs={12} >
                    <Typography variant='h5' align='center'>
                        <Button variant='contained' onClick={submitConfirmed}
                            disabled={isSaveDisabled}
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
