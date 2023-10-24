import request from 'supertest';
import { POST } from './route';
import { getJwtSecretKey } from '../../../libs/auth';
import { NextResponse } from "next/server";
import * as Jose from "jose";

jest.mock('../../../libs/auth', () => ({
    getJwtSecretKey: jest.fn(),
}));

jest.mock('next/dist/server/web/exports/next-response.js', () => ({
    Response: jest.fn(),
}));

jest.mock('jose', () => ({
    SignJWT: jest.fn(() => Jose.SignJWT)
}));

describe('POST API Endpoint', () => {
    it('should return a success response with a token for valid credentials', async (done) => {
        getJwtSecretKey.mockReturnValue('your-secret-key');

        const validCredentials = {
            username: 'test-name',
            password: 'password1234',
        };


        const response = await request(POST)
            .post('/api/login')
            .send(validCredentials);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: true });
        expect(response.headers['content-type']).toBe('application/json');
        expect(response.header['set-cookie']).toContain('token=');

        // You can add more specific assertions for the token and cookies if needed
    });

    it('should return a failure response for invalid credentials', async () => {
        const invalidCredentials = {
            username: 'invalid-username',
            password: 'invalid-password',
        };

        const response = await request(POST)
            .post('/')
            .send(invalidCredentials);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ success: false });
    });

    it('should handle errors and return an error response', async () => {
        const errorMock = jest.spyOn(NextResponse, 'error');
        errorMock.mockReturnValue(NextResponse.json({ error: 'Some error' }));

        const invalidBody = {
            // Invalid body to trigger an error
        };

        const response = await request(POST)
            .post('/')
            .send(invalidBody);

        expect(response.status).toBe(200);
        expect(response.body).toEqual({ error: 'Some error' });

        errorMock.mockRestore(); // Restore the original behavior of NextResponse.error
    });
});
