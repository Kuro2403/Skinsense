import { useState, useEffect } from 'react';
import { Box, Button, IconButton, Typography, Select, MenuItem, FormControl, InputLabel } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import TextField from '@mui/material/TextField';
import Grid from '@mui/material/Grid';
import Swal from 'sweetalert2';
import { CheckDuplicateNameRoom } from '../../../../helper/checkedUtils';
import { GetDetaiSpecialistByDoctorID, GetDoctorByAvailability, GetDoctorBySpecialistID, getDoctorHasLeftRoom } from '../../../../helper/Util';
import { GetAllSpecialistsServices } from '../../../../api/specicalistServices';
import { validateRoomName } from '../../../../helper/checkedRegex';
import { CreateRoomServices } from '../../../../api/roomServices';
import { CreateHistoryRoomClinicServices, GetsHistoryRoomClinicServices } from '../../../../api/historyRoomClinicServices';
export const AddRoom = ({ closeEvent }) => {
    const [, setDoctor] = useState([]);
    const [specialist, setSpecialist] = useState([]);
    const [roomNameErr, setRoomNameErr] = useState('');
    const [roomName, setRoomName] = useState(true);
    const [selected, setSelected] = useState(true);

    const [isDuplicate, setIsDuplicate] = useState(false);
    const [room, setRoom] = useState({
        RoomName: '',
        SpecialistID: '',
    });

    useEffect(() => {
        getDoctors();
        getSpecialists();
    }, []);

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
            if (hasData) {
                setRoomName(true);
            }
            setRoomName(false);
        }
        if (name === 'SpecialistID') {
            setSelected(false)
        }
    };
    const createConfirmed = async () => {
        await CreateRoomServices(room);
        closeEvent();
        Swal.fire("Submitted!", "Your file has been submitted.", "success");
    };
    const checkedSubmitted = () => {
        if (roomName === false && selected === false) {
            return false;
        }
        return true;
    }

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Add Room</Typography>
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
                        value={room.RoomClinicName}
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
function getCurrentDate() {
    var currentDate = new Date();
    var day = currentDate.getDate();
    var month = currentDate.getMonth() + 1;
    var year = currentDate.getFullYear();
    var formattedDay = day < 10 ? "0" + day : day;
    var formattedMonth = month < 10 ? "0" + month : month;
    var formattedDate = formattedDay + "/" + formattedMonth + "/" + year;
    return formattedDate;
}
export const AddDoctorToRoom = ({ roomClinicID, specialistID, closeEvent }) => {
    const [roleDoctor, setRoleDoctor] = useState('');
    const [isDataEntered, setIsDataEntered] = useState(false);
    const [isSaveDisabled, setIsSaveDisabled] = useState(true);
    const [doctorList, setDoctorList] = useState([]);
    const [doctorToRoom, setDoctorToRoom] = useState({
        DoctorID: '',
        DateIn: getCurrentDate(),
        DateOut: 'present',
        RoomClinicID: roomClinicID,
        HasLeft: false
    });

    useEffect(() => {
        getDoctorInSpecialist(specialistID);
    }, [specialistID]);
    useEffect(() => {
        setIsSaveDisabled(
            !!
            !isDataEntered);
    }, [isDataEntered]);

    const getDoctorInSpecialist = async (id) => {
        const data = await GetDoctorBySpecialistID(id);
        const getDoctorInHistory = await GetsHistoryRoomClinicServices();
        const doctorHasleftRoom = await getDoctorHasLeftRoom();
        const doctorMapping = data.filter(doctor => {
            return doctorHasleftRoom.some(h => h.doctorID === doctor.doctorID);
        });
        const doctorNoRoom = doctorMapping.filter(doctor => {
            return !getDoctorInHistory.some(h => h.doctorID === doctor.doctorID && doctor.hasLeft === true && doctor.dateOut.toLowerCase() !== 'present');
        });
        setDoctorList(doctorNoRoom);
    }

    const handleInputChange = async (event) => {
        const { name, value } = event.target;
        setDoctorToRoom({
            ...doctorToRoom,
            [name]: value,
        });
        if (name === 'DoctorID') {
            const data = await GetDetaiSpecialistByDoctorID(value);
            setRoleDoctor(data.roleSpecialist.roleSpecialistName);
            setIsDataEntered(value);
        }
    };
    const createConfirmed = async () => {
        await CreateHistoryRoomClinicServices(doctorToRoom);
        closeEvent();
    };

    return (
        <>
            <Box sx={{ m: 2 }} />
            <Typography variant='h5' align='center'>Add doctor to room</Typography>
            <IconButton style={{ position: 'absolute', top: '0', right: '0' }}
                onClick={closeEvent}>
                <CloseIcon />
            </IconButton>
            <Box height={30} />
            <Grid container spacing={2}>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <InputLabel id="role-account-label">Doctor</InputLabel>
                        <Select
                            labelId="role-account-label"
                            name='DoctorID'
                            id="role-account-select"
                            value={doctorToRoom.DoctorID}
                            onChange={handleInputChange}
                            label="Specialist"
                            variant="outlined"
                            sx={{ minWidth: '100%' }}
                        >
                            {doctorList.map((doctor) => (
                                <MenuItem key={doctor.doctorID} value={doctor.doctorID}>
                                    {doctor.doctor.employee.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                </Grid>
                {doctorToRoom.DoctorID && <Grid item xs={12}>
                    <TextField
                        value={roleDoctor}
                        onChange={handleInputChange}
                        name='Price'
                        id="outlined-basic"
                        label="Price"
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
                </Grid>}

                <Grid item xs={12} >
                    <Typography variant='h5' align='center'>
                        <Button variant='contained' onClick={createConfirmed}
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