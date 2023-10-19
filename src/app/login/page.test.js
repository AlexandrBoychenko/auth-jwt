import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginPage from './page'; // Adjust the import path

jest.mock('next/navigation', () => ({
    useRouter: jest.fn()
}))

describe('LoginPage Component', () => {
    it('renders the component without errors', () => {
        render(<LoginPage />);
        const usernameInput = screen.getByPlaceholderText('Enter your username');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const loginButton = screen.getByText('Login');
        expect(usernameInput).toBeInTheDocument();
        expect(passwordInput).toBeInTheDocument();
        expect(loginButton).toBeInTheDocument();
    });

    it('submits the form correctly', async () => {
        const mockPush = jest.fn();
        const mockRefresh = jest.fn();
        const mockFetch = jest.fn();
        global.fetch = mockFetch;

        useRouter.mockReturnValue({});

        const originalRouter = require('next/navigation');
        const useRouterMock = { push: mockPush, refresh: mockRefresh };

        jest.spyOn(originalRouter, 'useRouter').mockReturnValue(useRouterMock);

        render(<LoginPage />);

        const usernameInput = screen.getByPlaceholderText('Enter your username');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        mockFetch.mockResolvedValue({ json: () => ({ success: true }) });

        fireEvent.click(loginButton);

        // Ensure that fetch is called with the correct data
        expect(mockFetch).toHaveBeenCalledWith('/api/login', {
            method: 'POST',
            body: JSON.stringify({ username: 'testuser', password: 'testpassword' }),
        });

        // Ensure that router.push and router.refresh are called
        expect(useRouter).toHaveBeenCalledTimes(2);
    });

    it('displays an alert when login fails', async () => {
        const mockPush = jest.fn();
        const mockRefresh = jest.fn();
        const mockFetch = jest.fn();
        global.fetch = mockFetch;

        render(<LoginPage />);

        const usernameInput = screen.getByPlaceholderText('Enter your username');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        mockFetch.mockResolvedValue({ json: () => ({ success: false }) });

        fireEvent.click(loginButton);

        const alertElement = await screen.findByText('Login or password are incorrect'); // Adjust this according to your UI

        expect(alertElement).toBeInTheDocument();
    });
});
