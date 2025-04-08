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
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GetDoctorServices } from "../../../../api/doctorServices";
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import { DeleteAccountServices } from '../../../../api/accountServices';
import { GetDetailDoctorsServices } from '../../../../api/detailDoctorServices';
import EditDoctor from './editDoctor';
import { useNavigate } from 'react-router-dom';

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

export default function DoctorList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [editOpen, setEditOpen] = useState(false);
    const [doctorID, setDoctorID] = useState(0);
    const [rows, setRows] = useState([]);
    const handleEditClose = () => setEditOpen(false);
    const handleEditOpen = () => setEditOpen(true);
    const navigate = useNavigate();

    useEffect(() => {
        const role = sessionStorage.getItem('Role');
        if (role.toLowerCase() !== 'admin') {
            navigate('/');
            return;
        }
        getDoctors();
    }, [navigate]);

    const getDoctors = async () => {
        const data = await GetDetailDoctorsServices();
        setRows(data);
    };
    const deleteDoctor = async (id) => {
        const doctorInfo = await GetDoctorServices(id);
        const accountID = doctorInfo.employee.accountID;
        await DeleteAccountServices(accountID);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getDoctors();
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
                deleteDoctor(id);
            }
        });
    };
    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            getDoctors();
        }
    };

    const editDoctor = (doctorID) => {
        setDoctorID(doctorID);
        handleEditOpen();
    }
    return (
        <>
            <div>
                <Modal
                    open={editOpen}
                    // onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditDoctor closeEvent={handleEditClose} doctorID={doctorID} />
                    </Box>
                </Modal>
            </div>
            <Paper sx={{ width: '100%', overflow: 'hidden' }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ padding: "20px" }}
                >
                    Doctor manager
                </Typography>
                <Box height={10} />
                <Stack direction="row" spacing={2} className="my-2 mb-2">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={rows}
                        sx={{ width: 300 }}
                        onChange={(e, v) => filterData(v)}
                        getOptionLabel={(rows) => rows.doctor.employee.phone || ""}
                        renderInput={(params) => (
                            <TextField {...params} size="small" label="Search doctor" />
                        )}
                    />
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 1 }}
                    ></Typography>
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
                                    Name
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                >
                                    Specialty
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                >
                                    Availability
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                >
                                    Hospital
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                >
                                    Phone
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                >
                                    Experience
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                >
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow key={row.doctorID} hover role="checkbox" tabIndex={-1} >
                                            <TableCell align='left'>
                                                {row.doctor.employee.name}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.specialty}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.doctor.availability}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.hospital}
                                            </TableCell>
                                            <TableCell align='left'>
                                                {row.doctor.employee.phone}
                                            </TableCell>
                                            <TableCell align='center'>
                                                {row.yearsOfExperience}
                                            </TableCell>
                                            <TableCell align='left'>
                                                <Stack spacing={2} direction="row">
                                                    <EditIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            cursor: "pointer",
                                                            color: "#fca130",
                                                        }}
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            editDoctor(row.doctorID)
                                                        }}
                                                    />
                                                    <DeleteIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "f93e3e",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            confirmDelete(row.doctorID)
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
