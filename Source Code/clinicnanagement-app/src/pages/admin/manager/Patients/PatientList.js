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
import { GetAllPatientsServices } from '../../../../api/patientServices';
import { Input } from '@mui/material';
export default function PatientList() {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchQuery, setSearchQuery] = useState('');
    const [rows, setRows] = useState([]);
    const [sortBy, setSortBy] = useState({
        column: '',
        direction: 'asc',
    });
    useEffect(() => {
        getPatients();
        const pollingInterval = setInterval(() => {
            getPatients();
        }, 5000);
        return () => {
            clearInterval(pollingInterval);
        };
    }, []);

    const getPatients = async () => {
        const data = await GetAllPatientsServices();
        const reversedData = data.slice().reverse();
        setRows(reversedData);
    };

    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
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

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%', border: '1px solid #cccc' }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ paddingLeft: "20px", paddingTop: '10px' }}
                >
                    Patient List
                </Typography>
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
                            placeholder="Search patient"
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
                </Stack>
                <Box height={10} />
                <Divider />
                <TableContainer sx={{ maxHeight: 330 }}>
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
                                    style={{ minWidth: '200px' }}
                                    onClick={() => handleSort('account.mail')}
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
                                    onClick={() => handleSort('address')}
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
                                    onClick={() => handleSort('address')}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'lightgray',
                                            cursor: 'pointer',
                                        },
                                    }}
                                >
                                    Year of birth
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
                                    Gender
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
                                    Email
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {sortedRows
                                .filter(row =>
                                    row.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                                    row.phone.toLowerCase().includes(searchQuery.toLowerCase()),
                                )
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.patientID}>
                                            <TableCell align="left">
                                                {row.name}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.address}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.phone}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.dob}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.account.gender}
                                            </TableCell>
                                            <TableCell align="left">
                                                {row.account.mail}
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