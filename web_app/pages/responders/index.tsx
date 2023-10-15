import React, { useState, useEffect } from 'react';
import Link from 'next/link';

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
        <div>
            <h1>Emergency Responders</h1>
            <ul>
                {responders.map((responder) => (
                    <li key={responder.id}>
                        <Link href={`/emergencyResponders/${responder.id}`}>
                            {responder.name}
                        </Link>
                        <p>Organization: {responder.organization}</p>
                        <p>Contact Number: {responder.contactNumber}</p>
                        <p>Specialization: {responder.specialization}</p>
                        <p>Location: {responder.location}</p>
                        <p>Notes: {responder.notes}</p>
                        <br />
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default EmergencyResponderList;
