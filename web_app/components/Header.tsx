// components/Header.tsx
import React from 'react';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Link from 'next/link';

import '../public/style.css';

const Header: React.FC = () => {
    return (
        <AppBar position="sticky" className={"glassHeader"}>
            <Toolbar>
                <Link href="/" style={{textDecoration: 'none'}}>
                    <Typography
                        variant="h5"
                        style={{
                            flexGrow: 1,
                            fontWeight: 'bold',
                            letterSpacing: '1.5px',
                            color: 'black',
                            marginRight: 'auto',
                            cursor: 'pointer'
                        }}
                    >
                        MedHead
                    </Typography>
                </Link>
                <Button color="inherit" component={Link} href="/hospitals" sx={{mx: 1}}>Hospitals</Button>
                <Button color="inherit" component={Link} href="/patients" sx={{mx: 1}}>Patients</Button>
                <Button color="inherit" component={Link} href="/responders" sx={{mx: 1}}>Emergency Responders</Button>
                <Button color="inherit" component={Link} href="/chat/hospital" sx={{mx: 1}}>Talk to hospital
                    (ER)</Button>
                <Button color="inherit" component={Link} href="/chat/er" sx={{mx: 1}}>Talk to ER (Hospital)</Button>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
