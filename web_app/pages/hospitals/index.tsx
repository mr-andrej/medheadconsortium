import Link from 'next/link';
import { useEffect, useState } from 'react';
import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

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
        <div>
            <h1>Hospitals</h1>
            <ul>
                {hospitals.map((hospital) => (
                    <li key={hospital.id}>
                        <Link href={`/hospitals/${hospital.id}`}>
                            {hospital.name} - {hospital.location}
                        </Link>
                        <p>Total Beds: {hospital.numberOfAllBeds}</p>
                        <p>Available Beds: {hospital.numberOfAvailableBeds}</p>
                        <p>Unavailable Beds: {hospital.numberOfUnavailableBeds}</p>
                        <p>Specializations:</p>
                        <ul>
                            {hospital.specializations.map((specialization, index) => (
                                <li key={index}>{specialization}</li>
                            ))}
                        </ul>
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default HospitalList;
