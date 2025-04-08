import React from 'react'
import SideBar from '../components/Staff/SideBar';
import NavBar from '../components/Staff/NavBar';
import Box from '@mui/material/Box';
import AppointmentsList from '../staff/manager/Invoices/InvoiceList'
const Invoices = () => {
    return (
        <>
            <div className='bgColor'>
                <NavBar />
                <Box height={55} />
                <Box sx={{ display: 'flex' }}>
                    <SideBar />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <AppointmentsList />
                    </Box>
                </Box>
            </div>

        </>

    )
}
export default Invoices;
