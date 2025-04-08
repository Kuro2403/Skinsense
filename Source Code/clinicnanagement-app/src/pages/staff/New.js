import React from 'react'
import SideBar from '../components/Staff/SideBar';
import NavBar from '../components/Staff/NavBar';
import Box from '@mui/material/Box';
import AppointmentsList from './manager/News/NewList'
const News = () => {
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
export default News;
