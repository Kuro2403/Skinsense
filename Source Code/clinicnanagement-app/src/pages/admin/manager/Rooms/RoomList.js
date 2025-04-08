import * as React from 'react';
import { useState, useEffect } from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import Typography from "@mui/material/Typography";
import Divider from "@mui/material/Divider";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import InfoIcon from '@mui/icons-material/Info';
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import { AddRoom } from './addRoom';
import EditRoom from './editRoom';
import { GetsRoomServices, DeleteRoomServices } from '../../../../api/roomServices';
import InfoRoom from './infoRoom'

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

const styleInfo = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    outline: 0,
    border: '1px solid #ccc',
    borderRadius: '10px',
    bgcolor: 'background.paper',
    boxShadow: 24,
    width: '800px',
    p: 4,
};

export default function RoomList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [roomID, setRoomID] = useState(0);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditClose = () => setEditOpen(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleInfoClose = () => setInfoOpen(false);
    const handleInfoOpen = () => setInfoOpen(true);
    const [rows, setRows] = useState([]);
    useEffect(() => {
        GetRooms();
        const pollingInterval = setInterval(() => {
            GetRooms(); // Fetch updated data
        }, 5000); // Fetch every 5 seconds

        return () => {
            clearInterval(pollingInterval);
        };
    }, []);

    const GetRooms = async () => {
        const data = await GetsRoomServices();
        const reversedData = data.slice().reverse();
        setRows(reversedData);
    };

    const deleteConfirm = async (id) => {
        await DeleteRoomServices(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        GetRooms();
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const confirmDelete = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!",
        }).then((result) => {
            if (result.value) {
                deleteConfirm(id);
            }
        });
    };
    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            GetRooms();
        }
    };

    const confirmEdit = (id) => {
        setRoomID(id);
        handleEditOpen();
    }
    const confirmInfo = (id) => {
        setRoomID(id);
        handleInfoOpen();
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
                        <AddRoom closeEvent={handleClose} />
                    </Box>
                </Modal>
                <Modal
                    open={editOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditRoom closeEvent={handleEditClose} id={roomID} />
                    </Box>
                </Modal>
                <Modal
                    open={infoOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={styleInfo}>
                        <InfoRoom closeEvent={handleInfoClose} id={roomID} />
                    </Box>
                </Modal>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ padding: "20px" }}
                >
                    Room List
                </Typography>
                <Box height={10} />
                <Stack direction="row" spacing={2} className="my-2 mb-2">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={rows}
                        sx={{ width: 300 }}
                        onChange={(e, v) => filterData(v)}
                        getOptionLabel={(rows) => rows.roomName || ""}
                        renderInput={(params) => (
                            <TextField {...params} size="small" label="Search room" />
                        )}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    ></Typography>
                    <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
                        Add
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
                                    Room name
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '600px' }}
                                >
                                    Specialist Name
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '50px' }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.roomClinicID}>
                                            <TableCell align="left">
                                                {row.roomName}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.specialist.specialistName}
                                            </TableCell>
                                            <TableCell align="center">
                                                <Stack spacing={2} direction="row" alignContent={'center'}>
                                                    <EditIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            cursor: "pointer",
                                                            color: "#fca130",
                                                        }}
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            confirmEdit(row.roomClinicID)
                                                        }}
                                                    />
                                                    <DeleteIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "#f93e3e",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            confirmDelete(row.roomClinicID);
                                                        }}
                                                    />
                                                    <InfoIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "#61affe",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            confirmInfo(row.roomClinicID);
                                                        }}
                                                    />
                                                </Stack>
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
                    count={rows.length}
                    rowsPerPage={rowsPerPage}
                    page={page}
                    onPageChange={handleChangePage}
                    onRowsPerPageChange={handleChangeRowsPerPage}
                />
            </Paper>
        </>
    );
}