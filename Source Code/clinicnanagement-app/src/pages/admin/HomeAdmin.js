import React, { useEffect } from 'react';
import '../../assets/css/admin.scss';
import SideBar from '../components/Admin/SideBar';
import NavBar from '../components/Admin/NavBar';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import { useNavigate } from 'react-router-dom';
import { checkLoggedIn } from '../../helper/Util';
import PatientList from './manager/Patients/PatientList';
const Home = () => {
    const navigate = useNavigate();
    useEffect(() => {
        const role = sessionStorage.getItem('Role');
        if (role.toLowerCase() !== 'admin') {
            navigate('/');
            return;
        }
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
            <Box height={50} />
            <Box sx={{ display: 'flex' }}>
                <SideBar />
                <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <img
                                src='https://res.cloudinary.com/dabdclkhv/image/upload/v1691692989/imageadmin_fvqont.png'
                                alt="Hình ảnh"
                                style={{ width: '100%', maxHeight: "90%" }}
                            />
                        </Grid>
                    </Grid>
                    <Grid container spacing={4}>
                        <Grid item xs={12}>
                            <Card sx={{ height: 54 + "vh" }}>
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