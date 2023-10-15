import '../public/style.css';
import React from "react";
import Link from "next/link";
import {Container} from '@mui/material';

export default function Home() {

    const linkStyle = {
        display: 'inline-block',
        margin: '20px',
        padding: '10px 20px',
        border: '1px solid #ddd',
        borderRadius: '5px',
        textDecoration: 'none',
        color: 'white',
        transition: 'background-color 0.3s',
        ':hover': {
            backgroundColor: '#f5f5f5'
        }
    };

    return (
        <Container className="glass" style={{textAlign: 'center', marginTop: '100px'}}>
            <h1>Welcome to the Health System Portal</h1>
            <p>Select a service to proceed:</p>

            <div style={{marginTop: '40px'}}>
                <Link href="/hospitals">
                    <div className="glassButton" style={linkStyle}>Hospitals</div>
                </Link>

                <Link href="/patients">
                    <div className="glassButton" style={linkStyle}>Patients</div>
                </Link>

                <Link href="/responders">
                    <div className="glassButton" style={linkStyle}>Emergency Responders</div>
                </Link>

                <Link href="/chat/hospital">
                    <div className="glassButton" style={linkStyle}>Talk to hospital (ER)</div>
                </Link>

                <Link href="/chat/er">
                    <div className="glassButton" style={linkStyle}>Talk to ER (Hospital)</div>
                </Link>
            </div>
        </Container>
    );
}
