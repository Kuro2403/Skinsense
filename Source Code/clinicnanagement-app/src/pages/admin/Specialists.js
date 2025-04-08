import React from 'react'
import SideBar from '../components/Admin/SideBar';
import NavBar from '../components/Admin/NavBar';
import Box from '@mui/material/Box';
import SpecialistList from './manager/Specialists/SpecialistList'
const Specialists = () => {
    return (
        <>
            <div className='bgColor'>
                <NavBar />
                <Box height={55} />
                <Box sx={{ display: 'flex' }}>
                    <SideBar />
                    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                        <SpecialistList />
                    </Box>
                </Box>
            </div>
        </>
    )
}
export default Specialists;
