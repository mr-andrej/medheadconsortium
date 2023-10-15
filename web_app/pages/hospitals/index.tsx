import React, {useEffect, useState} from 'react';
import {Client} from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import {Button, Container, Typography} from '@mui/material';
import Header from "@/components/Header";
import '../../public/style.css';

interface Hospital {
    id: number;
    name: string;
    location: string;
    numberOfAllBeds: number;
    numberOfAvailableBeds: number;
    numberOfUnavailableBeds: number;
    specializations: string[];
}

const HospitalList = () => {
    const [hospitals, setHospitals] = useState<Hospital[]>([]);
    const stompClient = new Client();

    useEffect(() => {
        const fetchData = async () => {
            const response = await fetch('http://localhost:9999/api/hospitals');
            const data = await response.json();
            setHospitals(data);
        };

        fetchData();

        // WebSocket setup
        stompClient.webSocketFactory = () => new SockJS('http://localhost:9999/ws');
        stompClient.onConnect = () => {
            console.log('Connected');
            stompClient.subscribe('/topic/hospitals', (messageOutput) => {
                if (messageOutput.body) {
                    const newHospitals = JSON.parse(messageOutput.body);
                    setHospitals(newHospitals);
                }
            });
        };
        stompClient.activate();

        return () => {
            stompClient.deactivate();
        };
    }, []);

    return (
        <Container className={"glass"}>
            <Header/>
            <Typography variant="h4" component="h1" gutterBottom
                        style={{marginTop: '20px', color: 'rgba(0, 0, 0, 0.7)'}}>
                Hospitals
            </Typography>
            {hospitals.map((hospital) => (
                <div key={hospital.id} className="glassTable">
                    <div className="tableRow header">
                        <div className="tableCell">{hospital.name}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Location</div>
                        <div className="tableCell">{hospital.location}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Total Beds</div>
                        <div className="tableCell">{hospital.numberOfAllBeds}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Available Beds</div>
                        <div className="tableCell">{hospital.numberOfAvailableBeds}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Unavailable Beds</div>
                        <div className="tableCell">{hospital.numberOfUnavailableBeds}</div>
                    </div>
                    <div className="tableRow">
                        <div className="tableCell">Specializations</div>
                        <div className="tableCell">
                            <ul>
                                {hospital.specializations.map((specialization, index) => (
                                    <li key={index}>{specialization}</li>
                                ))}
                            </ul>
                        </div>
                    </div>
                    <div style={{padding: '15px', textAlign: 'right'}}>
                        <Button href={`/hospitals/${hospital.id}`}>
                            <div className="editButton">Edit</div>
                        </Button>
                    </div>
                </div>
            ))}
        </Container>
    );
};

export default HospitalList;
