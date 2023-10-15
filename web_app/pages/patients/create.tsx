import React, {useState} from 'react';
import {useRouter} from 'next/router';

interface Patient {
    fullName: string;
    dateOfBirth: string;
    gender: string;
    address: string;
    patientContactNumber: string;
    emergencyContactNumber: string;
    medicalHistory: string;
}

const CreatePatient = () => {
    const router = useRouter();
    const [patient, setPatient] = useState<Patient>({
        fullName: '',
        dateOfBirth: '',
        gender: '',
        address: '',
        patientContactNumber: '',
        emergencyContactNumber: '',
        medicalHistory: ''
    });

    const handleSubmit = async () => {
        // Create a new patient in the backend
        await fetch(`http://localhost:9999/api/patients`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(patient)
        });

        // Redirect to the patients list after successful creation
        await router.push('/patients');
    };

    return (
        <div>
            <h1>Create New Patient</h1>
            <div>
                <label>Name:</label>
                <input
                    type="text"
                    value={patient.fullName}
                    onChange={(e) => setPatient({...patient, fullName: e.target.value})}
                />
            </div>
            <div>
                <label>Date of Birth:</label>
                <input
                    type="date"
                    value={patient.dateOfBirth}
                    onChange={(e) => setPatient({...patient, dateOfBirth: e.target.value})}
                />
            </div>
            <div>
                <label>Gender:</label>
                <input
                    type="text"
                    value={patient.gender}
                    onChange={(e) => setPatient({...patient, gender: e.target.value})}
                />
            </div>
            <div>
                <label>Address:</label>
                <input
                    type="text"
                    value={patient.address}
                    onChange={(e) => setPatient({...patient, address: e.target.value})}
                />
            </div>
            <div>
                <label>Contact Number:</label>
                <input
                    type="tel"
                    value={patient.patientContactNumber}
                    onChange={(e) => setPatient({...patient, patientContactNumber: e.target.value})}
                />
            </div>
            <div>
                <label>Emergency Contact:</label>
                <input
                    type="tel"
                    value={patient.emergencyContactNumber}
                    onChange={(e) => setPatient({...patient, emergencyContactNumber: e.target.value})}
                />
            </div>
            <div>
                <label>Medical History:</label>
                <textarea
                    rows={5}
                    value={patient.medicalHistory}
                    onChange={(e) => setPatient({...patient, medicalHistory: e.target.value})}
                />
            </div>
            <button onClick={handleSubmit}>Create Patient</button>
        </div>
    );
};

export default CreatePatient;
