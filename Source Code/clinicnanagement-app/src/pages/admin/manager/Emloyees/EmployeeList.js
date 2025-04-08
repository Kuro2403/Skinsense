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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import { GetAllEmployeeServices, GetEmployeeServices } from "../../../../api/employeeServices";
import { DeleteAccountServices } from '../../../../api/accountServices';
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import AddNewEmployee from './addEmployee';
import EditEmployee from './editEmployee';
import InfoEmployee from './infoEmployee'
import InfoIcon from '@mui/icons-material/Info';


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

export default function EmployeeList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [open, setOpen] = useState(false);
    const [editOpen, setEditOpen] = useState(false);
    const [infoOpen, setInfoOpen] = useState(false);
    const [employeeID, setEmployeeID] = useState(0);
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
        getAllEmployees(); // Initial fetch

        const pollingInterval = setInterval(() => {
            getAllEmployees(); // Fetch updated data
        }, 5000); // Fetch every 5 seconds

        return () => {
            clearInterval(pollingInterval); // Clear interval when component unmounts
        };
    }, []);


    const getAllEmployees = async () => {
        const data = await GetAllEmployeeServices();
        const filteredData = data.filter(employee => employee.account.role.roleName.toLowerCase() !== 'admin'
            && employee.account.role.roleName.toLowerCase() !== 'customer');
        const reversedData = filteredData.slice().reverse();
        setRows(reversedData);
    };


    const deleteEmployee = async (id) => {
        const emloyeeInfo = await GetEmployeeServices(id);
        const accountID = emloyeeInfo.accountID;
        await DeleteAccountServices(accountID);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getAllEmployees();
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
                deleteEmployee(id);
            }
        });
    };
    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            getAllEmployees();
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

    const editEmployee = (employeeID) => {
        setEmployeeID(employeeID);
        handleEditOpen();
    }
    const infoEmp = (employeeID) => {
        setEmployeeID(employeeID);
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
                        <AddNewEmployee closeEvent={handleClose} />
                    </Box>
                </Modal>
                <Modal
                    open={editOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <EditEmployee closeEvent={handleEditClose} id={employeeID} />
                    </Box>
                </Modal>
                <Modal
                    open={infoOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <InfoEmployee closeEvent={handleInfoClose} id={employeeID} />
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
                    Employee List
                </Typography>
                <Box height={10} />
                <Stack direction="row" spacing={2} className="my-2 mb-2">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={rows}
                        sx={{ width: 300 }}
                        onChange={(e, v) => filterData(v)}
                        getOptionLabel={(rows) => rows.phone || ""}
                        renderInput={(params) => (
                            <TextField {...params} size="small" label="Search employee by phone" />
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
                                    Name
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                    onClick={() => handleSort('name')}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    Gender
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                    onClick={() => handleSort('account.mail')}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    Email
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
                                    Address
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                    onClick={() => handleSort('phone')}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    Phone number
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                    onClick={() => handleSort('account.role.roleName')}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    Role
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.employeeID}>
                                            <TableCell align="left">{row.name}</TableCell>
                                            <TableCell align="left">{row.account.gender}</TableCell>
                                            <TableCell align="left">{row.account.mail}</TableCell>
                                            <TableCell align="left">{row.address}</TableCell>
                                            <TableCell align="left">{row.phone}</TableCell>
                                            <TableCell align="left">{row.account.role.roleName}</TableCell>
                                            <TableCell align="left">
                                                <Stack spacing={2} direction="row">
                                                    <EditIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            cursor: "pointer",
                                                            color: "#fca130",
                                                        }}
                                                        className="cursor-pointer"
                                                        onClick={() => {
                                                            editEmployee(row.employeeID)
                                                        }}
                                                    />
                                                    <DeleteIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "#f93e3e",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            confirmDelete(row.employeeID);
                                                        }}
                                                    />
                                                    <InfoIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "#61affe",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            infoEmp(row.employeeID);
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