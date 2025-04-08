import { useState, useEffect } from 'react';
import { Box, Typography, Paper, Divider, TableContainer, Table, TableHead, TableRow, TableCell, TableBody, Button, Stack, Modal, Dialog, DialogTitle, DialogContent, DialogContentText, DialogActions } from '@mui/material';
import { DeleteDetailSpecialistServices, GetAllDetailSpecialistsServices } from '../../../../api/detailSpecialistServices';
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { AddDoctorToSpecialist } from './addSpecialist';
import { EditDoctorBySpecialist } from './editSpecialist';

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
    width: '700px',
    p: 4,
};

export default function InfoSpecialist({ id, closeEvent }) {
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const [rows, setRows] = useState([]);
    const [modalOpen, setModalOpen] = useState(false);
    const [detailspecialistID, setDetailspecialistID] = useState('');
    const [editOpen, setEditOpen] = useState(false);
    const handleEditClose = () => setEditOpen(false);
    const handleEditOpen = () => setEditOpen(true);

    useEffect(() => {

        const getDetailSpecialist = async () => {
            const data = await GetAllDetailSpecialistsServices();
            const filteredData = data.filter(data => data.specialistID === id);
            setRows(filteredData);
        };
        getDetailSpecialist();
        const pollingInterval = setInterval(() => {
            getDetailSpecialist();
        }, 3000);

        return () => {
            clearInterval(pollingInterval);
        };
    }, [id]);
    const confirmDelete = (id) => {
        setDetailspecialistID(id);
        setModalOpen(true);
    };
    const confirmClose = async () => {
        closeEvent();
    }
    const confirmEdit = async (id) => {
        setDetailspecialistID(id);
        handleEditOpen();
    }
    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleConfirmDelete = async () => {
        await DeleteDetailSpecialistServices(detailspecialistID);
        handleCloseModal();
    };

    return (
        <>
            <div>
                <Modal
                    open={open}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <AddDoctorToSpecialist closeEvent={handleClose} id={id} />
                    </Box>
                </Modal>
                <Modal
                    open={editOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditDoctorBySpecialist closeEvent={handleEditClose} id={detailspecialistID} />
                    </Box>
                </Modal>
                <Dialog open={modalOpen} onClose={handleCloseModal}>
                    <DialogTitle>Confirm Delete</DialogTitle>
                    <DialogContent>
                        <DialogContentText>
                            Are you sure you want to delete this item?
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleCloseModal} color="primary">
                            Cancel
                        </Button>
                        <Button onClick={handleConfirmDelete} color="secondary" startIcon={<DeleteIcon />}>
                            Delete
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
                    Detail specialist
                </Typography>
                <Stack direction="row" spacing={2} className="my-2 mb-2 ml-2">
                    <Button variant="contained" endIcon={<AddCircleIcon />} onClick={handleOpen}>
                        Add doctor to specialist
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
                                    style={{ minWidth: '200px' }}
                                >
                                    Doctor Name
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '200px' }}
                                >
                                    Phone
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                >
                                    Role Doctor
                                </TableCell>
                                <TableCell>
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.detailSpecialistID}>
                                            <TableCell align="left">
                                                {row.doctor.employee.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.doctor.employee.phone}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.roleSpecialist.roleSpecialistName}
                                            </TableCell>
                                            <TableCell align="left">
                                                {
                                                    (row.roleSpecialist.roleSpecialistName).toLowerCase() === 'associate department head' ||
                                                        (row.roleSpecialist.roleSpecialistName).toLowerCase() === 'head of department'
                                                        ? (
                                                            <Stack>
                                                                <EditIcon
                                                                    style={{
                                                                        fontSize: "20px",
                                                                        color: "#FCA830",
                                                                        cursor: "pointer",
                                                                    }}
                                                                    onClick={() => {
                                                                        confirmEdit(row.detailSpecialistID);
                                                                    }}
                                                                />
                                                            </Stack>
                                                        ) : <Stack>
                                                            <DeleteIcon
                                                                style={{
                                                                    fontSize: "20px",
                                                                    color: "#F93E3E",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => {
                                                                    confirmDelete(row.detailSpecialistID);
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
            </Paper >
            <Box height={20} />
            <Typography variant='h5' align='center'>
                <Button variant='contained' onClick={confirmClose}>
                    Exit
                </Button>
            </Typography>
        </>
    )
}
