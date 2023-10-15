"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Patient {
    id: number;
    fullName: string;
    dateOfBirth: string;
    address: string;
}

function PatientList() {
    const [patients, setPatients] = useState<Patient[]>([]);

    useEffect(() => {
        async function fetchPatients() {
            try {
                const response = await axios.get<Patient[]>('http://localhost:9999/api/patients');
                setPatients(response.data);
            } catch (error) {
                console.error("Error fetching patients:", error);
            }
        }

        fetchPatients();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Patients</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {patients.map(patient => (
                    <li key={patient.id} style={{ padding: '10px', borderBottom: '1px solid #e1e1e1' }}>
                        <h3>{patient.fullName}</h3>
                        <p><strong>Date of Birth:</strong> {patient.dateOfBirth}</p>
                        <p><strong>Address:</strong> {patient.address}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default PatientList;
