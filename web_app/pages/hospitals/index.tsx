"use client";
import axios from 'axios';
import { useState, useEffect } from 'react';

interface Hospital {
    id: number;
    name: string;
    location: string;
}

function HospitalList() {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);

    useEffect(() => {
        async function fetchHospitals() {
            try {
                const response = await axios.get<Hospital[]>('http://localhost:9000/api/hospitals');
                setHospitals(response.data);
            } catch (error) {
                console.error("Error fetching hospitals:", error);
            }
        }

        fetchHospitals();
    }, []);

    return (
        <div style={{ padding: '20px', maxWidth: '600px', margin: '0 auto' }}>
            <h2 style={{ textAlign: 'center', marginBottom: '20px' }}>Hospitals</h2>
            <ul style={{ listStyleType: 'none', padding: 0 }}>
                {hospitals.map(hospital => (
                    <li key={hospital.id} style={{ padding: '10px', borderBottom: '1px solid #e1e1e1' }}>
                        <h3>{hospital.name}</h3>
                        <p><strong>Location:</strong> {hospital.location}</p>
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default HospitalList;
