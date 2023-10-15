import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

import { Container, Button } from '@mui/material';
import Header from "@/components/Header";

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

const PatientDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [patient, setPatient] = useState<Patient | null>(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:9999/api/patients/${id}`);
                const data = await response.json();
                setPatient(data);
            };

            fetchData();
        }
    }, [id]);

    const deletePatient = async () => {
        try {
            const response = await axios.delete(`http://localhost:9999/api/patients/${id}`);
            if (response.status === 200) {
                // Redirect to the patients list after successful deletion
                await router.push('/patients');
            } else {
                console.error('Error deleting the patient:', response);
            }
        } catch (error) {
            console.error('There was an error deleting the patient:', error);
        }
    };

    const handleSubmit = async () => {
        // Update the patient data in the backend
        await fetch(`http://localhost:9999/api/patients/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        });

        // Redirect or show a success message
    };

    if (!patient) return <div>Loading...</div>;

    return (
        <Container className="glass">
            <Header />
            <h1>Edit Patient: {patient.fullName}</h1>
            <div className="formGroup">
                <label>Name:</label>
                <input
                    className="glassInput"
                    type="text"
                    value={patient.fullName}
                    onChange={(e) => setPatient({ ...patient, fullName: e.target.value })}
                />
            </div>
            <div className="formGroup">
                <label>Date of Birth:</label>
                <input
                    className="glassInput"
                    type="date"
                    value={patient.dateOfBirth}
                    onChange={(e) => setPatient({ ...patient, dateOfBirth: e.target.value })}
                />
            </div>
            <div className="formGroup">
                <label>Gender:</label>
                <input
                    className="glassInput"
                    type="text"
                    value={patient.gender}
                    onChange={(e) => setPatient({ ...patient, gender: e.target.value })}
                />
            </div>
            <div className="formGroup">
                <label>Address:</label>
                <input
                    className="glassInput"
                    type="text"
                    value={patient.address}
                    onChange={(e) => setPatient({ ...patient, address: e.target.value })}
                />
            </div>
            <div className="formGroup">
                <label>Contact Number:</label>
                <input
                    className="glassInput"
                    type="tel"
                    value={patient.patientContactNumber}
                    onChange={(e) => setPatient({ ...patient, patientContactNumber: e.target.value })}
                />
            </div>
            <div className="formGroup">
                <label>Emergency Contact:</label>
                <input
                    className="glassInput"
                    type="tel"
                    value={patient.emergencyContactNumber}
                    onChange={(e) => setPatient({ ...patient, emergencyContactNumber: e.target.value })}
                />
            </div>
            <div className="formGroup">
                <label>Medical History:</label>
                <textarea
                    className="glassTextarea"
                    rows={5}
                    value={patient.medicalHistory}
                    onChange={(e) => setPatient({ ...patient, medicalHistory: e.target.value })}
                />
            </div>
            <div style={{ padding: '15px', textAlign: 'right' }}>
                <Button onClick={handleSubmit}>
                    <div className="glassButton">Update Patient</div>
                </Button>
            </div>
            <div style={{ padding: '15px', textAlign: 'right' }}>
                <Button onClick={deletePatient}>
                    <div className="glassButton bg-red">Delete Patient</div>
                </Button>
            </div>
        </Container>
    );
};

export default PatientDetail;
