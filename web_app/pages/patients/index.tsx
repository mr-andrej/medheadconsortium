import React, {useEffect, useState} from 'react';
import Header from "@/components/Header";
import {Button, Container, Typography} from '@mui/material';
import '../../public/style.css';

interface Patient {
    id: number;
    fullName: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    patientContactNumber: string;
    emergencyContactNumber: string;
    medicalHistory: string;
}

const PatientList = () => {
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch('http://localhost:9999/api/patients');
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setPatients(data);
            } catch (error: any) {
                console.error("There was a problem with the fetch operation:", error.message);
            }
        };

        fetchData();
    }, []);

    return (
        <Container className={"glass"}>
            <Header/>
            <Typography variant="h4" component="h1" gutterBottom
                        style={{marginTop: '20px', color: 'rgba(0, 0, 0, 0.7)'}}>
                Patients
            </Typography>
            {patients.map((patient) => (
                <div key={patient.id} className="glassTable">
                    <div className="tableRow header">
                        <div className="tableCell">{patient.fullName}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Date of Birth</div>
                        <div className="tableCell">{patient.dateOfBirth}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Gender</div>
                        <div className="tableCell">{patient.gender}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Address</div>
                        <div className="tableCell">{patient.address}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Contact Number</div>
                        <div className="tableCell">{patient.patientContactNumber}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Emergency Contact</div>
                        <div className="tableCell">{patient.emergencyContactNumber}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Medical History</div>
                        <div className="tableCell">{patient.medicalHistory}</div>
                    </div>
                    <div style={{padding: '15px', textAlign: 'right'}}>
                        <Button href={`/patients/${patient.id}`}>
                            <div className="editButton">Edit</div>
                        </Button>
                    </div>
                </div>
            ))}
        </Container>
    );
};

export default PatientList;
