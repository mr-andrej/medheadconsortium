import HospitalDetail from './[id]';
import axios from 'axios';
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';

// Mock useRouter
let useRouter: any;
useRouter = jest.spyOn(require('next/router'), 'useRouter');
useRouter.mockImplementation(() => ({
    query: { id: '1' },
    push: jest.fn(),
}));

// Mock axios
jest.mock('axios');
const mockedAxios = axios as jest.Mocked<typeof axios>;

const mockHospitalData = {
    id: 1,
    name: 'St. Mary Hospital',
    location: 'Praed St, Paddington, London',
    numberOfAllBeds: 500,
    numberOfAvailableBeds: 320,
    numberOfUnavailableBeds: 180,
    specializations: ['Cardiology', 'Neurology'],
};

describe('<HospitalDetail />', () => {
    beforeEach(() => {
        mockedAxios.get.mockResolvedValue({ data: mockHospitalData });
    });

    it('renders without crashing', async () => {
        render(<HospitalDetail />);
        await waitFor(() => expect(screen.getByText('Edit Hospital: St. Mary Hospital')).toBeInTheDocument());
    });

    it('populates form fields correctly', async () => {
        render(<HospitalDetail />);
        await waitFor(() => expect(screen.getByDisplayValue('St. Mary Hospital')).toBeInTheDocument());
        expect(screen.getByDisplayValue('Praed St, Paddington, London')).toBeInTheDocument();
        expect(screen.getByDisplayValue('500')).toBeInTheDocument();
        expect(screen.getByDisplayValue('320')).toBeInTheDocument();
        expect(screen.getByDisplayValue('180')).toBeInTheDocument();
        expect(screen.getByLabelText('Cardiology').checked).toBe(true);
        expect(screen.getByLabelText('Neurology').checked).toBe(true);
        expect(screen.getByLabelText('Orthopedics').checked).toBe(false);
    });

    it('handles update correctly', async () => {
        mockedAxios.put.mockResolvedValue({ status: 200 });
        render(<HospitalDetail />);
        await waitFor(() => expect(screen.getByText('Edit Hospital: St. Mary Hospital')).toBeInTheDocument());

        const nameInput = screen.getByDisplayValue('St. Mary Hospital');
        fireEvent.change(nameInput, { target: { value: 'Updated Hospital' } });

        const updateButton = screen.getByText('Update Hospital');
        fireEvent.click(updateButton);

        await waitFor(() => expect(mockedAxios.put).toHaveBeenCalledWith('http://localhost:9999/api/hospitals/1', {
            ...mockHospitalData,
            name: 'Updated Hospital',
        }));
    });

    it('handles delete correctly', async () => {
        mockedAxios.delete.mockResolvedValue({ status: 200 });
        render(<HospitalDetail />);
        await waitFor(() => expect(screen.getByText('Edit Hospital: St. Mary Hospital')).toBeInTheDocument());

        const deleteButton = screen.getByText('Delete Hospital');
        fireEvent.click(deleteButton);

        await waitFor(() => expect(mockedAxios.delete).toHaveBeenCalledWith('http://localhost:9999/api/hospitals/1'));
    });
});
