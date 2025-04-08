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

    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);
        return () => clearTimeout(timer);
    }, []);

    const pages = ['Patients Examined', 'Create Invoice'];

    const handleClick = (page) => {
        console.log("Clicked on page:", page);
    };

    const navLink = pages.map((page, index) => (
        <Link
            key={page} // Use a more meaningful identifier if available (e.g., page ID).
            underline="hover"
            to={"/Doctor/" + page}
            style={{
                textDecoration: 'none',
                fontSize: 25,
                paddingRight: 30,
                color: 'black',
                fontStyle: 'normal',
                fontWeight: 700,
                lineHeight: 'normal'
            }}
            onClick={() => handleClick(page)}
        >
            {page}
        </Link>
    ));

    return (
        <Box sx={{ height: 157 }}>
            <AppBar sx={{ backgroundColor: 'black', height: 58 }}>
                <Toolbar style={{ display: 'flex', justifyContent: 'flex-end', marginRight: 79 }}>
                    {loading ? (
                        <Skeleton variant="text" animation="wave" width={'100%'} />
                    ) : (
                        <AccountMenu />
                    )}
                </Toolbar>
            </AppBar>
            <Stack spacing={2} direction="row">
                <Link
                    color="initial"
                    to="/Doctor"
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
