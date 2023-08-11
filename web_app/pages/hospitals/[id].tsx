import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';

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
    const { id } = router.query;
    const [hospital, setHospital] = useState<Hospital | null>(null);

    useEffect(() => {
        if (id) {
            const fetchData = async () => {
                const response = await fetch(`http://localhost:9000/api/hospitals/${id}`);
                const data = await response.json();
                setHospital(data);
            };

            fetchData();
        }
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

    const handleSubmit = async () => {
        // Update the hospital data in the backend
        await fetch(`http://localhost:9000/api/hospitals/${id}`, {
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
        <div>
            <h1>Edit Hospital: {hospital.name}</h1>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={hospital.name}
                    onChange={(e) => setHospital({ ...hospital, name: e.target.value })}
                />
            </div>
            <div>
                <label>Location:</label>
                <input
                    type="text"
                    value={hospital.location}
                    onChange={(e) => setHospital({ ...hospital, location: e.target.value })}
                />
            </div>
            <div>
                <label>Total Beds:</label>
                <input
                    type="number"
                    value={hospital.numberOfAllBeds}
                    onChange={(e) => setHospital({ ...hospital, numberOfAllBeds: Number(e.target.value) })}
                />
            </div>
            <div>
                <label>Available Beds:</label>
                <input
                    type="number"
                    value={hospital.numberOfAvailableBeds}
                    onChange={(e) => setHospital({ ...hospital, numberOfAvailableBeds: Number(e.target.value) })}
                />
            </div>
            <div>
                <label>Unavailable Beds:</label>
                <input
                    type="number"
                    value={hospital.numberOfUnavailableBeds}
                    onChange={(e) => setHospital({ ...hospital, numberOfUnavailableBeds: Number(e.target.value) })}
                />
            </div>
            <div>
                <h3>Specializations:</h3>
                {existingSpecializations.map((specialization) => (
                    <div key={specialization}>
                        <input
                            type="checkbox"
                            id={specialization}
                            value={specialization}
                            checked={hospital.specializations.includes(specialization)}
                            onChange={handleSpecializationChange}
                        />
                        <label htmlFor={specialization}>{specialization}</label>
                    </div>
                ))}
            </div>
            <button onClick={handleSubmit}>Update Hospital</button>
        </div>
    );
};

export default HospitalDetail;
