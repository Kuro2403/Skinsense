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
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import InfoEmployee from './infoInvoice'
import InfoIcon from '@mui/icons-material/Info';
import CheckIcon from '@mui/icons-material/Check';
import CancelIcon from '@mui/icons-material/Cancel';
import { EditInvoiceServices, GetAllInvoicesServices, GetInvoiceServices } from '../../../../api/invoiceServices';
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
    width: '800px',
    p: 4,
};

export default function EmployeeList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [infoOpen, setInfoOpen] = useState(false);
    const [employeeID, setEmployeeID] = useState(0);
    const handleInfoClose = () => setInfoOpen(false);
    const handleInfoOpen = () => setInfoOpen(true);
    const [rows, setRows] = useState([]);
    const [sortBy, setSortBy] = useState({
        column: '',
        direction: 'asc',
    });
    useEffect(() => {
        getInvoices(); // Initial fetch

        const pollingInterval = setInterval(() => {
            getInvoices(); // Fetch updated data
        }, 3000); // Fetch every 5 seconds

        return () => {
            clearInterval(pollingInterval); // Clear interval when component unmounts
        };
    }, []);


    const getInvoices = async () => {
        const data = await GetAllInvoicesServices();
        const reversedData = data.slice().reverse();
        setRows(reversedData);
    };


    const revertPay = async (id) => {
        const invoice = await GetInvoiceServices(id);
        const accept = {
            InvoiceDate: invoice.invoiceDate,
            PatientID: invoice.patientID,
            Status: false
        }
        await EditInvoiceServices(id, accept);
        Swal.fire("Success!", "Updating invoices that have been unpaid", "success");
        getInvoices();
    }
    const acceptPay = async (id) => {
        const invoice = await GetInvoiceServices(id);
        const accept = {
            InvoiceDate: invoice.invoiceDate,
            PatientID: invoice.patientID,
            Status: true
        }
        await EditInvoiceServices(id, accept);
        Swal.fire("Success!", "Updating invoices that have been paid.", "success");
        getInvoices();
    }

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };
    const confirmRevert = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Change invoice status!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept it!",
        }).then((result) => {
            if (result.value) {
                revertPay(id);
            }
        });
    };
    const confirmPay = (id) => {
        Swal.fire({
            title: "Are you sure?",
            text: "Change invoice status!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, accept it!",
        }).then((result) => {
            if (result.value) {
                acceptPay(id);
            }
        });
    };
    const filterData = (v) => {
        if (v) {
            setRows([v]);
        } else {
            getInvoices();
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

    const infoEmp = (employeeID) => {
        setEmployeeID(employeeID);
        handleInfoOpen();
    }


    return (
        <>
            <div>
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
                    Invoice List
                </Typography>
                <Box height={10} />
                <Stack direction="row" spacing={2} className="my-2 mb-2">
                    <Autocomplete
                        disablePortal
                        id="combo-box-demo"
                        options={rows}
                        sx={{ width: 300 }}
                        onChange={(e, v) => filterData(v)}
                        getOptionLabel={(rows) => rows.patient.phone || ""}
                        renderInput={(params) => (
                            <TextField {...params} size="small" label="Search patient" />
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
                                    style={{ minWidth: '220px' }}
                                    onClick={() => handleSort('name')}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    Invoice date
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
                                    Patient name
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
                                    Phone
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
                                    Status
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
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.invoiceID}>
                                            <TableCell align="left">{row.invoiceDate}</TableCell>
                                            <TableCell align="left">{row.patient.name}</TableCell>
                                            <TableCell align="left">{row.patient.phone}</TableCell>
                                            <TableCell align="left">{row.status ? 'Paid' : 'Unpaid'}</TableCell>
                                            <TableCell align="left">
                                                <Stack spacing={2} direction="row">
                                                    {
                                                        (row.status === true) ? (
                                                            <CancelIcon
                                                                style={{
                                                                    fontSize: "20px",
                                                                    color: "red",
                                                                    cursor: "pointer",
                                                                }}
                                                                onClick={() => {
                                                                    confirmRevert(row.invoiceID);
                                                                }}
                                                            />

                                                        ) : <CheckIcon
                                                            style={{
                                                                fontSize: "20px",
                                                                color: "green",
                                                                cursor: "pointer",
                                                            }}
                                                            className="cursor-pointer"
                                                            onClick={() => {
                                                                confirmPay(row.invoiceID)
                                                            }}
                                                        />
                                                    }
                                                    <InfoIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "blue",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            infoEmp(row.invoiceID);
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