import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { useRouter } from 'next/navigation';
import LoginPage from './page';
import { act } from 'react-dom/test-utils';

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
        const mockFetch = jest.fn();
        global.fetch = mockFetch;

        useRouter.mockReturnValue({});

        render(<LoginPage />);

        const usernameInput = screen.getByPlaceholderText('Enter your username');
        const passwordInput = screen.getByPlaceholderText('Enter your password');
        const loginButton = screen.getByText('Login');

        fireEvent.change(usernameInput, { target: { value: 'testuser' } });
        fireEvent.change(passwordInput, { target: { value: 'testpassword' } });

        mockFetch.mockResolvedValue({ json: () => ({ success: true }) });

        await act(() => fireEvent.click(loginButton));

        // Ensure that fetch is called with the correct data
        expect(mockFetch).toHaveBeenCalledWith('/api/login', {
            method: 'POST',
            body: JSON.stringify({ username: 'testuser', password: 'testpassword' }),
        });

        // Ensure that router.push and router.refresh are called (twise because test rerenders)
        expect(useRouter).toHaveBeenCalledTimes(4);
    });

    it('displays an alert when login fails', async () => {
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

        const alertElement = await screen.findByText('Login or password are incorrect');

        expect(alertElement).toBeInTheDocument();
    });
});
