import React, {useEffect, useState} from 'react';
import {Button, Container, Typography} from '@mui/material';
import Header from "@/components/Header";
import '../../public/style.css';

interface EmergencyResponder {
    id: number;
    name: string;
    organization: string;
    contactNumber: string;
    specialization: string;
    location: string;
    notes: string;
}

const EmergencyResponderList = () => {
    const [responders, setResponders] = useState<EmergencyResponder[]>([]);

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:9999/api/responders');
            const data = await response.json();
            setResponders(data);
        };

        fetchData();
    }, []);

    return (
        <Container className={"glass"}>
            <Header/>
            <Typography variant="h4" component="h1" gutterBottom
                        style={{marginTop: '20px', color: 'rgba(0, 0, 0, 0.7)'}}>
                Emergency Responders
            </Typography>
            {responders.map((responder) => (
                <div key={responder.id} className="glassTable">
                    <div className="tableRow header">
                        <div className="tableCell">{responder.name}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Organization</div>
                        <div className="tableCell">{responder.organization}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Contact Number</div>
                        <div className="tableCell">{responder.contactNumber}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Specialization</div>
                        <div className="tableCell">{responder.specialization}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Location</div>
                        <div className="tableCell">{responder.location}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Notes</div>
                        <div className="tableCell">{responder.notes}</div>
                    </div>
                    <div style={{padding: '15px', textAlign: 'right'}}>
                        <Button href={`/responders/${responder.id}`}>
                            <div className="editButton">Edit</div>
                        </Button>
                    </div>
                </div>
            ))}
        </Container>
    );
};

export default EmergencyResponderList;
