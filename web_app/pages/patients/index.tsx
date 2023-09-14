import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
        <div>
            <h1>Patients</h1>
            <ul>
                {patients.map((patient) => (
                    <li key={patient.id}>
                        <Link href={`/patients/${patient.id}`}>
                            {patient.fullName}
                        </Link>
                        <p>Date of Birth: {patient.dateOfBirth}</p>
                        <p>Gender: {patient.gender}</p>
                        <p>Address: {patient.address}</p>
                        <p>Contact Number: {patient.patientContactNumber}</p>
                        <p>Emergency Contact: {patient.emergencyContactNumber}</p>
                        <p>Medical History: {patient.medicalHistory}</p>
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default PatientList;
