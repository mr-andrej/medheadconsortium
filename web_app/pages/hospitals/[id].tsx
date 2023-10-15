import React, {useState, useEffect} from 'react';
import {useRouter} from 'next/router';
import axios from "axios";
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {Button, Container } from '@mui/material';
import Header from '@/components/Header';

interface Hospital {
    id: number;
    name: string;
    location: string;
    numberOfAllBeds: number;
    numberOfAvailableBeds: number;
    numberOfUnavailableBeds: number;
    specializations: string[];
}

const existingSpecializations = [
    'Cardiology',
    'Neurology',
    'Orthopedics',
    'Gastroenterology',
    'Dermatology',
    'Pediatrics',
    'Oncology',
    'Rheumatology',
    'Urology',
    'Endocrinology',
    'Nephrology',
    'Pulmonology',
    'Ophthalmology',
    'Hematology',
    'Radiology'
];

const HospitalDetail = () => {
    const router = useRouter();
    const {id} = router.query;
    const [hospital, setHospital] = useState<Hospital | null>(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:9999/api/hospitals/${id}`);
                const data = await response.json();
                setHospital(data);
            };

            fetchData().then(r => console.log("fetchData() has been called"));
        }

        // WebSocket setup
        const socket = new SockJS('http://localhost:9999/ws');
        const stompClient = new Client({
            webSocketFactory: () => socket,
            onConnect: () => {
                console.log('Connected to WebSocket');

                // Here you can set up any subscriptions if needed
                // Example:
                // stompClient.subscribe('/topic/someTopic', (message) => {
                //     if (message.body) {
                //         const updatedData = JSON.parse(message.body);
                //         // Do something with the updatedData
                //     }
                // });
            }
        });
        stompClient.activate();

        return () => {
            if (stompClient && stompClient.connected) {
                stompClient.deactivate();
                console.log('Disconnected from WebSocket');
            }
        };

    }, [id]);

    const handleSpecializationChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setHospital((prev) => {
            if (!prev) return null; // If prev is null, return null

            if (e.target.checked) {
                return {
                    ...prev,
                    specializations: [...prev.specializations, value]
                } as Hospital;
            } else {
                return {
                    ...prev,
                    specializations: prev.specializations.filter((s) => s !== value)
                } as Hospital;
            }
        });
    };

    const deleteHospital = async () => {
        try {
            const response = await axios.delete(`http://localhost:9999/api/hospitals/${id}`);
            if (response.status === 200) {
                // Redirect to the hospitals list after successful deletion
                await router.push('/hospitals');
            } else {
                console.error('Error deleting the hospital:', response);
            }
        } catch (error) {
            console.error('There was an error deleting the hospital:', error);
        }
    };

    const handleSubmit = async () => {
        // Update the hospital data in the backend
        await fetch(`http://localhost:9999/api/hospitals/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(hospital)
        });

        // Redirect or show a success message
    };

    if (!hospital) return <div>Loading...</div>;

    return (
        <Container className="glass">
            <Header />
            <h1>Edit Hospital: {hospital.name}</h1>
            <div className="formGroup">
                <label>Name:</label>
                <input
                    className="glassInput"
                    type="text"
                    value={hospital.name}
                    onChange={(e) => setHospital({...hospital, name: e.target.value})}
                />
            </div>
            <div className="formGroup">
                <label>Location:</label>
                <input
                    className="glassInput"
                    type="text"
                    value={hospital.location}
                    onChange={(e) => setHospital({...hospital, location: e.target.value})}
                />
            </div>
            <div className="formGroup">
                <label>Total Beds:</label>
                <input
                    className="glassInput"
                    type="number"
                    value={hospital.numberOfAllBeds}
                    onChange={(e) => setHospital({...hospital, numberOfAllBeds: Number(e.target.value)})}
                />
            </div>
            <div className="formGroup">
                <label>Available Beds:</label>
                <input
                    className="glassInput"
                    type="number"
                    value={hospital.numberOfAvailableBeds}
                    onChange={(e) => setHospital({...hospital, numberOfAvailableBeds: Number(e.target.value)})}
                />
            </div>
            <div className="formGroup">
                <label>Unavailable Beds:</label>
                <input
                    className="glassInput"
                    type="number"
                    value={hospital.numberOfUnavailableBeds}
                    onChange={(e) => setHospital({...hospital, numberOfUnavailableBeds: Number(e.target.value)})}
                />
            </div>
            <div className="formGroup">
                <h3>Specializations:</h3>
                {existingSpecializations.map((specialization) => (
                    <div key={specialization}>
                        <input
                            type="checkbox"
                            id={specialization}
                            value={specialization}
                            className="glassCheckbox"
                            checked={hospital.specializations.includes(specialization)}
                            onChange={handleSpecializationChange}
                        />
                        <label htmlFor={specialization}>{specialization}</label>
                    </div>
                ))}
            </div>
            <div style={{ padding: '15px', textAlign: 'right' }}>
                <Button onClick={handleSubmit}>
                    <div className="glassButton">Update Hospital</div>
                </Button>
            </div>
            <div style={{ padding: '15px', textAlign: 'right' }}>
                <Button onClick={deleteHospital}>
                    <div className="glassButton bg-red">Delete Hospital</div>
                </Button>
            </div>
        </Container>

    );
};

export default HospitalDetail;
