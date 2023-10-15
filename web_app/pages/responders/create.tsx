import React, {useState} from 'react';
import {useRouter} from 'next/router';

interface EmergencyResponder {
    name: string;
    organization: string;
    contactNumber: string;
    specialization: string;
    location: string;
    notes: string;
}

const CreateResponder = () => {
    const router = useRouter();
    const [responder, setResponder] = useState<EmergencyResponder>({
        name: '',
        organization: '',
        contactNumber: '',
        specialization: '',
        location: '',
        notes: ''
    });

    const handleSubmit = async () => {
        try {
            const response = await fetch('http://localhost:9999/api/responders', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(responder)
            });

            if (response.status === 201) {
                // Redirect to the responders list after successful creation
                await router.push('/emergencyResponders');
            } else {
                console.error('Error creating the responder:', response);
            }
        } catch (error) {
            console.error('There was an error creating the responder:', error);
        }
    };

    return (
        <div>
            <h1>Create New Responder</h1>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={responder.name}
                    onChange={(e) => setResponder({...responder, name: e.target.value})}
                />
            </div>
            <div>
                <label>Organization:</label>
                <input
                    type="text"
                    value={responder.organization}
                    onChange={(e) => setResponder({...responder, organization: e.target.value})}
                />
            </div>
            <div>
                <label>Contact Number:</label>
                <input
                    type="text"
                    value={responder.contactNumber}
                    onChange={(e) => setResponder({...responder, contactNumber: e.target.value})}
                />
            </div>
            <div>
                <label>Specialization:</label>
                <input
                    type="text"
                    value={responder.specialization}
                    onChange={(e) => setResponder({...responder, specialization: e.target.value})}
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    value={responder.location}
                    onChange={(e) => setResponder({...responder, location: e.target.value})}
                />
            </div>
            <div>
                <label>Notes:</label>
                <textarea
                    rows={5}
                    value={responder.notes}
                    onChange={(e) => setResponder({...responder, notes: e.target.value})}
                />
            </div>
            <button onClick={handleSubmit}>Create Responder</button>
        </div>
    );
};

export default CreateResponder;
