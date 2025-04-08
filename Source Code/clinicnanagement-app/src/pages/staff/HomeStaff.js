import React, { useEffect } from 'react';
import '../../assets/css/admin.scss';
import SideBar from '../components/Staff/SideBar';
import NavBar from '../components/Staff/NavBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import { checkLoggedIn } from '../../helper/Util';
import PatientList from '../admin/manager/Patients/PatientList';
const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        async function checkLogin() {
            const isLoggedIn = await checkLoggedIn();
            if (!isLoggedIn) {
                navigate('/login');
            }
        }
        checkLogin();
    }, [navigate]);
    return (
        <>
            <NavBar />
            <Box height={30} />
            <Box sx={{ display: 'flex' }}>
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <img
                                src='https://res.cloudinary.com/dabdclkhv/image/upload/v1691710418/staff_japit0.png'
                                alt="Hình ảnh"
                                style={{ width: '100%', maxHeight: "90%" }}
                            />
                        </Grid>
                    </Grid>
                    <Box height={20} />
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Card sx={{ height: 51 + "vh" }}>
                                <CardContent>
                                    <PatientList />
                                </CardContent>
                            </Card>
                        </Grid>
                    </Grid>
                </Box>
            </Box >
        </>
    )
}

export default Home;