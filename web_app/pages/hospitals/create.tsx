// pages/hospitals/create.tsx

import React, { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/router';

const CreateHospital: React.FC = () => {
    const [name, setName] = useState('');
    const [location, setLocation] = useState('');
    const [number_of_all_beds, setNumberOfAllBeds] = useState(0);
    const [number_of_available_beds, setNumberOfAvailableBeds] = useState(0);
    const [number_of_unavailable_beds, setNumberOfUnavailableBeds] = useState(0);

    const router = useRouter();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        try {
            await axios.post('http://localhost:9000/api/hospitals', {
                name,
                location,
                number_of_all_beds,
                number_of_available_beds,
                number_of_unavailable_beds
            });
            router.push('/hospitals');
        } catch (error) {
            console.error("Error creating the hospital:", error);
        }
    };

    return (
        <div>
            <h1>Create a New Hospital</h1>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Name:</label>
                    <input
                        type="text"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Location:</label>
                    <input
                        type="text"
                        value={location}
                        onChange={(e) => setLocation(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <label>Total Beds:</label>
                    <input
                        type="number"
                        value={number_of_all_beds}
                        onChange={(e) => setNumberOfAllBeds(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>Available Beds:</label>
                    <input
                        type="number"
                        value={number_of_available_beds}
                        onChange={(e) => setNumberOfAvailableBeds(Number(e.target.value))}
                        required
                    />
                </div>
                <div>
                    <label>Unavailable Beds:</label>
                    <input
                        type="number"
                        value={number_of_unavailable_beds}
                        onChange={(e) => setNumberOfUnavailableBeds(Number(e.target.value))}
                        required
                    />
                </div>
                <button type="submit">Create Hospital</button>
            </form>
        </div>
    );
};

export default CreateHospital;
