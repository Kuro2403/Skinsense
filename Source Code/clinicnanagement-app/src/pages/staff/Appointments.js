import React from 'react'
import SideBar from '../components/Staff/SideBar';
import Box from '@mui/material/Box';
import NavBar from '../components/Staff/NavBar';
import AppointmentsList from '../staff/manager/Appointments/AppointmentsList'
const Appointments = () => {
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
export default Appointments;
