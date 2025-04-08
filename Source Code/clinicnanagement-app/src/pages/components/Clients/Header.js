import React, { useState, useEffect } from "react";
import Box from '@mui/material/Box';
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Stack from '@mui/material/Stack';
import { Breadcrumbs, Skeleton } from '@mui/material';
import { Link } from 'react-router-dom';
import AccountMenu from './Account_menu.js'

const Header = () => {
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');

    useEffect(() => {
        const storedUserName = sessionStorage.getItem('Email');
        if (storedUserName) {
            setUserName(storedUserName);
        }
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const breadcrumbs = userName
        ? []
        : [
            <Link key="login" underline="hover" to="/Login" style={{ textDecoration: 'none', color: 'white' }}>
                Login
            </Link>,
            <Link
                key="register"
                underline="hover"
                to="/Register"
                style={{ textDecoration: 'none', color: 'white' }}
            >
                Register
            </Link>,
        ];



    const pages = ['News', 'About us', 'Detect Acne', 'Appointment', 'Medical Record', 'Invoice'];

    const navLink = pages.map((page, index) => (
        <Link
            key={page} // Use a more meaningful identifier if available (e.g., page ID).
            underline="hover"
            to={"/" + page}
            style={{
                textDecoration: 'none',
                fontSize: 25,
                paddingRight: 30,
                color: 'black',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal',
                display: userName || page === 'News' || page === 'About us' ? 'inline-block' : 'none'
            }}
        >
            {page}
        </Link>
    ));


    return (
        <Box sx={{ height: 157 }}>
            <AppBar sx={{ backgroundColor: 'black', height: 58 }}>
                <Toolbar style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 79 }}>
                    <Stack spacing={2} direction="row">
                        {loading ? (
                            <Skeleton variant="text" animation="wave" width={'100%'} />
                        ) : (
                            <Breadcrumbs separator="|" aria-label="breadcrumb" style={{ color: 'gray' }}>
                                {breadcrumbs}
                            </Breadcrumbs>
                        )}
                    </Stack>
                    {userName && <AccountMenu />}
                </Toolbar>
            </AppBar>
            <Stack spacing={2} direction="row">
                <Link
                    color="initial"
                    to="/"
                    style={{
                        color: '#000000',
                        fontSize: 50,
                        fontStyle: 'normal',
                        fontWeight: 300,
                        lineHeight: 'normal',
                        fontFamily: 'Noto Serif',
                        marginTop: 78.5,
                        marginLeft: 69,
                        textDecoration: 'none'
                    }}
                >
                    {loading ? <Skeleton variant="text" width={300} /> : 'SKINSENSE'}
                </Link>
                <div style={{ marginTop: 100, marginLeft: 'auto', marginRight: 100 }}>
                    {loading ? (
                        <Skeleton variant="text" width={900} />
                    ) : (
                        <Breadcrumbs separator="" aria-label="breadcrumb" style={{ color: 'gray' }}>
                            {navLink}
                        </Breadcrumbs>
                    )}
                </div>
            </Stack>
        </Box>
    );
}

export default Header;
