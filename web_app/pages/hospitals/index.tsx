import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';
import { AppBar, Toolbar, Typography, Button, Container, List, ListItem, ListItemText, Divider } from '@mui/material';

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
        <Container>
            <AppBar position="static">
                <Toolbar>
                    <Link href="/">
                        <Typography
                            variant="h5"
                            style={{
                                flexGrow: 1,
                                fontWeight: 'bold',
                                letterSpacing: '1.5px',
                                color: '#fff',
                                marginRight: 'auto',
                                cursor: 'pointer',
                                textDecoration: 'none',
                            }}
                        >
                            MedHead
                        </Typography>
                    </Link>
                    <Button color="inherit" component={Link} href="/hospitals" sx={{ mx: 1 }}>Hospitals</Button>
                    <Button color="inherit" component={Link} href="/patients" sx={{ mx: 1 }}>Patients</Button>
                    <Button color="inherit" component={Link} href="/responders" sx={{ mx: 1 }}>Emergency Responders</Button>
                    <Button color="inherit" component={Link} href="/chat/hospital" sx={{ mx: 1 }}>Talk to hospital (ER)</Button>
                    <Button color="inherit" component={Link} href="/chat/er" sx={{ mx: 1 }}>Talk to ER (Hospital)</Button>
                </Toolbar>
            </AppBar>
            <Typography variant="h4" component="h1" gutterBottom style={{ marginTop: '20px' }}>
                Hospitals
            </Typography>
            <List>
                {hospitals.map((hospital) => (
                    <div key={hospital.id}>
                        <ListItem button component={Link} href={`/hospitals/${hospital.id}`}>
                            <ListItemText primary={`${hospital.name} - ${hospital.location}`} />
                        </ListItem>
                        <ListItemText secondary={`Total Beds: ${hospital.numberOfAllBeds}`} />
                        <ListItemText secondary={`Available Beds: ${hospital.numberOfAvailableBeds}`} />
                        <ListItemText secondary={`Unavailable Beds: ${hospital.numberOfUnavailableBeds}`} />
                        <ListItemText secondary="Specializations:" />
                        <List dense>
                            {hospital.specializations.map((specialization, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={specialization} />
                                </ListItem>
                            ))}
                        </List>
                        <Divider />
                    </div>
                ))}
            </List>
        </Container>
    );
};

export default HospitalList;
