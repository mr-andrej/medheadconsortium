import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import {Button, Container} from '@mui/material';
import Header from '@/components/Header';

interface EmergencyResponder {
    id: number;
    name: string;
    organization: string;
    contactNumber: string;
    specialization: string;
    location: string;
    notes: string;
}

const EmergencyResponderDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [responder, setResponder] = useState<EmergencyResponder | null>(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:9999/api/responders/${id}`);
                const data = await response.json();
                setResponder(data);
            };

            fetchData();
        }
    }, [id]);

    const deleteResponder = async () => {
        try {
            const response = await axios.delete(`http://localhost:9999/api/emergencyResponders/${id}`);
            if (response.status === 200) {
                // Redirect to the responders list after successful deletion
                await router.push('/emergencyResponders');
            } else {
                console.error('Error deleting the responder:', response);
            }
        } catch (error) {
            console.error('There was an error deleting the responder:', error);
        }
    };

    const handleSubmit = async () => {
        // Update the responder data in the backend
        await fetch(`http://localhost:9999/api/emergencyResponders/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(responder)
        });

        // Redirect or show a success message
    };

    if (!responder) return <div>Loading...</div>;

    return (
        <Container className="glass">
            <Header />
            <h1>Edit Responder: {responder.name}</h1>
            <div className="formGroup">
                <label>Name:</label>
                <input
                    className="glassInput"
                    type="text"
                    value={responder.name}
                    onChange={(e) => setResponder({ ...responder, name: e.target.value })}
                />
            </div>
            <div className="formGroup">
                <label>Organization:</label>
                <input
                    className="glassInput"
                    type="text"
                    value={responder.organization}
                    onChange={(e) => setResponder({ ...responder, organization: e.target.value })}
                />
            </div>
            <div className="formGroup">
                <label>Contact Number:</label>
                <input
                    className="glassInput"
                    type="tel"
                    value={responder.contactNumber}
                    onChange={(e) => setResponder({ ...responder, contactNumber: e.target.value })}
                />
            </div>
            <div className="formGroup">
                <label>Specialization:</label>
                <input
                    className="glassInput"
                    type="text"
                    value={responder.specialization}
                    onChange={(e) => setResponder({ ...responder, specialization: e.target.value })}
                />
            </div>
            <div className="formGroup">
                <label>Location:</label>
                <input
                    className="glassInput"
                    type="text"
                    value={responder.location}
                    onChange={(e) => setResponder({ ...responder, location: e.target.value })}
                />
            </div>
            <div className="formGroup">
                <label>Notes:</label>
                <textarea
                    className="glassTextarea"
                    rows={5}
                    value={responder.notes}
                    onChange={(e) => setResponder({ ...responder, notes: e.target.value })}
                />
            </div>
            <div style={{ padding: '15px', textAlign: 'right' }}>
                <Button onClick={handleSubmit}>
                    <div className="glassButton">Update Responder</div>
                </Button>
            </div>
            <div style={{ padding: '15px', textAlign: 'right' }}>
                <Button onClick={deleteResponder}>
                    <div className="glassButton bg-red">Delete Responder</div>
                </Button>
            </div>
        </Container>
    );
};

export default EmergencyResponderDetail;
