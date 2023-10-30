import request from 'supertest';
import { POST } from './route';
import { getJwtSecretKey } from '../../../libs/auth';
import * as Jose from "jose";

jest.mock('../../../libs/auth', () => ({
    getJwtSecretKey: jest.fn(),
}));

jest.mock('next/dist/server/web/exports/next-response.js', () => ({ Request: jest.fn(), error: jest.fn(() => 'Error text') }));

jest.mock('jose', () => ({
    SignJWT: jest.fn(() => Jose.SignJWT)
}));


// describe('POST API Endpoint', () => {
//     it('should return a success response with a token for valid credentials', async () => {
//         getJwtSecretKey.mockReturnValue('your-secret-key');

//         const validCredentials = {
//             username: 'test-name',
//             password: 'password1234',
//         };
 
//         const response = await request(POST)
//             .post('/api/login')
//             .set('Content-Type', 'application/json')
//             .send(JSON.stringify(validCredentials));
//         ;
//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({ success: true });
//         expect(response.headers['content-type']).toBe('application/json');
//         expect(response.header['set-cookie']).toContain('token=');
//     });

//     it('should return a failure response for invalid credentials', async () => {
//         const invalidCredentials = {
//             username: 'invalid-username',
//             password: 'invalid-password',
//         };

//         const response = await request(POST)
//             .post('/')
//             .send(invalidCredentials);

//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({ success: false });
//     });

//     it('should handle errors and return an error response', async () => {
//         const errorMock = jest.spyOn(NextResponse, 'error');
//         errorMock.mockReturnValue(NextResponse.json({ error: 'Some error' }));

//         const invalidBody = {
//             // Invalid body to trigger an error
//         };

//         const response = await request(POST)
//             .post('/')
//             .send(invalidBody);

//         expect(response.status).toBe(200);
//         expect(response.body).toEqual({ error: 'Some error' });

//         errorMock.mockRestore(); // Restore the original behavior of NextResponse.error
//     });
// });
