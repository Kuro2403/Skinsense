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
import Swal from 'sweetalert2';
import Modal from '@mui/material/Modal';
import AddNewEmployee from './addNew';
import EditNews from './editNew';
import InfoNews from './infoNew'
import InfoIcon from '@mui/icons-material/Info';
import { DeleteNewServices, GetAllNewsServices } from '../../../../api/newServices';
import { Input } from '@mui/material';


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
    const [searchQuery, setSearchQuery] = useState('');
    const [sortBy, setSortBy] = useState({
        column: '',
        direction: 'asc',
    });
    useEffect(() => {
        getNews(); // Initial fetch

        const pollingInterval = setInterval(() => {
            getNews(); // Fetch updated data
        }, 5000); // Fetch every 5 seconds

        return () => {
            clearInterval(pollingInterval); // Clear interval when component unmounts
        };
    }, []);


    const getNews = async () => {
        const storedEmail = sessionStorage.getItem('Email');
        const data = await GetAllNewsServices();
        const filteredData = data.filter(data => data.employee.account.mail.toLowerCase() === storedEmail.toLowerCase());
        const reversedData = filteredData.slice().reverse();
        setRows(reversedData);
    };


    const deletNews = async (id) => {
        await DeleteNewServices(id);
        Swal.fire("Deleted!", "Your file has been deleted.", "success");
        getNews();
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
                deletNews(id);
            }
        });
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
                        <EditNews closeEvent={handleEditClose} id={employeeID} />
                    </Box>
                </Modal>
                <Modal
                    open={infoOpen}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        <InfoNews closeEvent={handleInfoClose} id={employeeID} />
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
                    News List
                </Typography>
                <Box height={10} />
                <Stack direction="row" spacing={2} className="my-2 mb-2">
                    <Box
                        sx={{
                            display: 'flex',
                            justifyContent: 'flex-end',
                            alignItems: 'center',
                            paddingRight: '20px',
                            paddingBottom: '10px'
                        }}
                    >
                        <Input
                            id="searchNews"
                            placeholder="Search news"
                            variant="outlined"
                            size="small"
                            style={{
                                fontSize: 16,
                                marginLeft: 10
                            }}
                            value={searchQuery}
                            onChange={(event) => setSearchQuery(event.target.value)}
                        />
                    </Box>
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
                <TableContainer sx={{ maxHeight: 560 }}>
                    <Table stickyHeader aria-label="sticky table">
                        <TableHead>
                            <TableRow>
                                <TableCell
                                    align="left"
                                    style={{ width: '40px' }}
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
                                    style={{ minWidth: '100px' }}
                                    onClick={() => handleSort('name')}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    Title
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '500px' }}
                                    onClick={() => handleSort('account.mail')}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    News Context
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
                                .filter(row =>
                                    row.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    row.newsContext.toLowerCase().includes(searchQuery.toLowerCase()),
                                )
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.newsID}>
                                            <TableCell align="left">
                                                <img
                                                    src={row.newImage}
                                                    alt="Hình ảnh"
                                                    style={{ maxWidth: "160px", maxHeight: "100px" }}
                                                /></TableCell>
                                            <TableCell align="left">{row.title}</TableCell>
                                            <TableCell align="left">{row.newsContext}</TableCell>
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
                                                            editEmployee(row.newsID)
                                                        }}
                                                    />
                                                    <DeleteIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "#f93e3e",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            confirmDelete(row.newsID);
                                                        }}
                                                    />
                                                    <InfoIcon
                                                        style={{
                                                            fontSize: "20px",
                                                            color: "#61affe",
                                                            cursor: "pointer",
                                                        }}
                                                        onClick={() => {
                                                            infoEmp(row.newsID);
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