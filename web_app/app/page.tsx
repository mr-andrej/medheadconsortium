import Image from 'next/image'
import React from "react";
import PatientList from "@/components/PatientList";
import Link from "next/link";

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
        <div style={{ textAlign: 'center', marginTop: '100px' }}>
            <h1>Welcome to the Health System Portal</h1>
            <p>Select a service to proceed:</p>

            <div style={{ marginTop: '40px' }}>
                <Link href="/hospitals">
                    <span style={linkStyle}>Hospitals</span>
                </Link>

                <Link href="/patients">
                    <span style={linkStyle}>Patients</span>
                </Link>

                <Link href="/responders">
                    <span style={linkStyle}>Emergency Responders</span>
                </Link>

                <Link href="/chat">
                    <span style={linkStyle}>Go to chat</span>
                </Link>

            </div>
        </div>
    );
}
