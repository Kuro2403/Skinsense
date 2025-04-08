import { useState, useEffect } from 'react';
import { Box, Button, TableCell, Typography } from '@mui/material';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Divider from "@mui/material/Divider";
import Stack from "@mui/material/Stack";
import { GetAllDetailInvoicessServices } from '../../../../api/detailInvoicesServices';
export default function InfoEmployee({ id, closeEvent }) {
    const [rows, setRows] = useState([]);


    useEffect(() => {
        const getEmployee = async () => {
            const data = await GetAllDetailInvoicessServices();
            const filteredData = data.filter(data => data.invoiceID === id);
            const reversedData = filteredData.slice().reverse();
            setRows(reversedData);
        };
        getEmployee();
    }, [id]);
    const handleClose = async () => {
        closeEvent();
    };

    return (
        <>
            <Paper sx={{ width: '100%', overflow: 'hidden', height: '100%' }}>
                <Typography
                    gutterBottom
                    variant="h5"
                    component="div"
                    sx={{ padding: "20px" }}
                >
                    Infomation invoice
                </Typography>
                <Box height={20} />
                <Stack direction="row" spacing={2} className="my-2 mb-2">
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
                                    Treatment name
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '300px' }}
                                >
                                    Description
                                </TableCell>
                                <TableCell
                                    align="left"
                                    style={{ minWidth: '100px' }}
                                >
                                    Cost
                                </TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {rows
                                .map((row) => {
                                    return (
                                        <TableRow hover role="checkbox" tabIndex={-1} key={row.detailInvoiceID}>
                                            <TableCell align="left">{row.treatment.treatmentName}</TableCell>
                                            <TableCell align="left">
                                                <textarea
                                                    disabled={true}
                                                    value={row.treatment.description}
                                                    name="TreatmentName"
                                                    id="outlined-basic"
                                                    className={`MuiOutlinedInput-input MuiInputBase-input MuiInput-input MuiInputBase-inputMultiline`}
                                                    style={{
                                                        width: '100%',
                                                        padding: '6px 6px 6px 6px',
                                                        border: 'none',
                                                        resize: 'none',
                                                        outline: 'none',
                                                        height: '200px'
                                                    }}
                                                    rows={4}
                                                />
                                            </TableCell>
                                            <TableCell align="left">{row.treatment.cost}</TableCell>
                                        </TableRow>
                                    );
                                })}
                        </TableBody>
                    </Table>
                </TableContainer>
                <Typography variant='h5' align='center'style={{ padding: '6px 6px 6px 6px' }}>
                    <Button variant='contained' onClick={handleClose}   >
                        Exit
                    </Button>
                </Typography>
            </Paper>
        </>
    )
}
