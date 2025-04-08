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
import InfoIcon from '@mui/icons-material/Info';
import DeleteIcon from "@mui/icons-material/Delete";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import { GetAllTreatmentsServices, DeleteTreatmentServices } from '../../../../api/treatmentServices';
import AddMedicine from './addTreatment';
import EditMedicine from './editTreatment';
import InfoTreatment from './infoTreatment'

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

export default function TreatmentList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [idEdited, setIDEdited] = useState(0);
    const [infoOpen, setInfoOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
    const handleEditClose = () => setEditOpen(false);
    const handleEditOpen = () => setEditOpen(true);
    const handleInfoClose = () => setInfoOpen(false);
    const handleInfoOpen = () => setInfoOpen(true);
    const [rows, setRows] = useState([]);
    const [sortBy, setSortBy] = useState({
        column: '',
        direction: 'asc',
    });
    useEffect(() => {
        getTreatments(); // Initial fetch
        const pollingInterval = setInterval(() => {
            getTreatments(); // Fetch updated data
        }, 5000); // Fetch every 5 seconds

        return () => {
            clearInterval(pollingInterval); // Clear interval when component unmounts
        };
    }, []);

    const getTreatments = async () => {
        const data = await GetAllTreatmentsServices();
        const reversedData = data.slice().reverse();
        setRows(reversedData);
    };


    const deleteMedicine = async (id) => {
        await DeleteTreatmentServices(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getTreatments();
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
                deleteMedicine(id);
            }
        });
    };
    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            getTreatments();
        }
    };
    const handleSort = (column) => {
        setSortBy((prevSortBy) => ({
            column,
            direction: prevSortBy.column === column && prevSortBy.direction === 'asc' ? 'desc' : 'asc',
        }));
    };

    const sortedRows = rows.slice().sort((a, b) => {
        if (sortBy.direction === 'asc') {
            return a[sortBy.column] < b[sortBy.column] ? -1 : 1;
        } else {
            return a[sortBy.column] > b[sortBy.column] ? -1 : 1;
        }
    });

    const confirmEdit = (id) => {
        setIDEdited(id);
        handleEditOpen();
    }
    const infoTreatment = (id) => {
        setIDEdited(id);
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
                        <AddMedicine closeEvent={handleClose} />
                    </Box>
                </Modal>
                <Modal
                    open={editOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditMedicine closeEvent={handleEditClose} id={idEdited} />
                    </Box>
                </Modal>
                <Modal
                    open={infoOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <InfoTreatment closeEvent={handleInfoClose} id={idEdited} />
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
                    Treatment List
                </Typography>
                <Box height={10} />
                <Stack direction="row" spacing={2} className="my-2 mb-2">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={rows}
                        sx={{ width: 300 }}
                        onChange={(e, v) => filterData(v)}
                        getOptionLabel={(rows) => rows.treatmentName || ""}
                        renderInput={(params) => (
                            <TextField {...params} size="small" label="Search treatment" />
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
                                    style={{ minWidth: '220px' }}
                                    onClick={() => handleSort('name')}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    Image
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '200px' }}
                                    onClick={() => handleSort('account.mail')}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    Treatment Name
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                    onClick={() => handleSort('address')}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    Description
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                    onClick={() => handleSort('address')}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    Cost
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}>
                                    Action
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedRows
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.treatmentID}>
                                            <TableCell align="left">
                                                <img
                                                    src={row.imageTreatment}
                                                    alt="Treatment "
                                                    style={{ maxWidth: "160px", maxHeight: "100px" }}
                                                />
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.treatmentName}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.description}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.cost}
                                            </TableCell>
                                            <TableCell align="left">
                                                <Stack spacing={2} direction="row">
                                                    <EditIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "#fca130",
                                                            cursor: "pointer",
                                                        }}
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            confirmEdit(row.treatmentID)
                                                        }}
                                                    />
                                                    <DeleteIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "#f93e3e",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            confirmDelete(row.treatmentID);
                                                        }}
                                                    />
                                                    <InfoIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "#61affe",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            infoTreatment(row.treatmentID);
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