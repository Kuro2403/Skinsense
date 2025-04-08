import { useState, useEffect } from 'react';
import { Box, Button, Modal, Paper, Stack, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, TablePagination, Typography, Dialog, DialogTitle, DialogContent, DialogActions, DialogContentText } from '@mui/material';
import { GetHistoryRoomByRoomClinicID, getCurrentDate } from '../../../../helper/Util';
import { GetRoomServices } from '../../../../api/roomServices';
import AddCircleIcon from "@mui/icons-material/AddCircle";
import ArrowRightAltIcon from '@mui/icons-material/ArrowRightAlt';
import { GetAllDetailSpecialistsServices } from '../../../../api/detailSpecialistServices';
import { AddDoctorToRoom } from './addRoom'
import { EditHistoryRoomClinicServices, GetHistoryRoomClinicServices } from '../../../../api/historyRoomClinicServices';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 0,
    border: '1px solid #ccc',
    borderRadius: '10px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: '500px',
    p: 4,
};
export default function InfoRoom({ id, closeEvent }) {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [specialistID, setSpecialistID] = useState(0);
    const [modalOpen, setModalOpen] = useState(false);
    const [room, setRoom] = useState([{
        DoctorID: '',
        DoctorName: '',
        DateIn: '',
        DateOut: '',
        RoleDoctor: '',
        HistoryRoomClinicID: ''
    }]);
    const [historyRoomClinicID, setHistoryRoomClinicID] = useState('');
    useEffect(() => {
        GetDetailRooms(id);
        const pollingInterval = setInterval(() => {
            GetDetailRooms(id);
        }, 3000);

        return () => {
            clearInterval(pollingInterval);
        };
    }, [id]);

    const GetDetailRooms = async (id) => {
        try {
            const specialist = await GetRoomServices(id);
            setSpecialistID(specialist.specialistID)
            const data = await GetHistoryRoomByRoomClinicID(id);
            const detailSpecialist = await GetAllDetailSpecialistsServices();
            const mappedData = data.map(room => {
                const mapData = detailSpecialist.find(a => a.doctorID === room.doctorID || room.hasleft === false);
                return {
                    HistoryRoomClinicID: room.historyRoomClinicID,
                    DetailSpecialistID: mapData.detailSpecialistID,
                    DoctorID: mapData.doctorID,
                    DoctorName: mapData.doctor.employee.name,
                    DateIn: room.dateIn,
                    DateOut: room.dateOut,
                    RoleDoctor: mapData.roleSpecialist.roleSpecialistName,
                };
            });
            setRoom(mappedData.slice().reverse());
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const outRoomAccept = async () => {
        const data = await GetHistoryRoomClinicServices(historyRoomClinicID);
        const hasLeftRoom = {
            HistoryRoomClinicID: historyRoomClinicID,
            DoctorID: data.doctorID,
            DateIn: data.dateIn,
            DateOut: getCurrentDate(),
            RoomClinicID: id,
            HasLeft: true
        }
        await EditHistoryRoomClinicServices(historyRoomClinicID, hasLeftRoom);
        handleCloseModal();
    }
    const submitConfirmed = async () => {
        closeEvent();
    };
    const handleCloseModal = () => {
        setModalOpen(false);
    };
    const confirmHasLeft = async (id) => {
        setHistoryRoomClinicID(id);
        setModalOpen(true);
    }
    return (
        <>
            <div>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddDoctorToRoom closeEvent={handleClose} roomClinicID={id} specialistID={specialistID} />
                    </Box>
                </Modal>
                <Dialog open={modalOpen} onClose={handleCloseModal}>
                    <DialogTitle>Confirm doctor out room</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to accept doctor out room?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={outRoomAccept} color="secondary" >
                            Accept
                        </Button>
                    </DialogActions>
                </Dialog>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ padding: "20px" }}
                >
                    Infomation room
                </Typography>
                <Stack direction="row" spacing={2} className="my-2 mb-2">
                    <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen} >
                        Add doctor by room
                    </Button>
                </Stack>
                <Box height={10} />
                <Divider />
                <TableContainer sx={{ maxHeight: 650 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                >
                                    Doctor name
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                >
                                    Date In
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                >
                                    Date Out
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                >
                                    Role doctor
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {room
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.HistoryRoomClinicID}>
                                            <TableCell align="left">
                                                {row.DoctorName}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.DateIn}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.DateOut}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.RoleDoctor}
                                            </TableCell>
                                            <TableCell align="left">
                                                {(row.DateOut).toLowerCase() === 'present' &&
                                                    <Stack spacing={2} direction="row">
                                                        <ArrowRightAltIcon
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "blue",
                                                                cursor: "pointer",
                                                            }}
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                confirmHasLeft(row.HistoryRoomClinicID)
                                                            }}
                                                        />
                                                    </Stack>
                                                }
                                            </TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <TablePagination
                    rowsPerPageOptions={[5, 10, 25, 100]}
                    component="div"
                    count={room.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
            <Box height={10} />
            <Typography variant='h5' align='center'>
                <Button variant='contained' onClick={submitConfirmed}
                >
                    Exits
                </Button>
            </Typography>
        </>
    );
}
