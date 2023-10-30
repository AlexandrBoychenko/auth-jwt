import { isUserRestricted } from '@/libs/auth';

const { NextResponse } = require('next/server');

export async function POST(request) {
    const body = await request.json();
    return NextResponse.json(
        {
            userAllowed: body.username === "test-name",
            restricted: isUserRestricted()
        },
        {
            status: 200,
            headers: { "content-type": "application/json" }
        });
};
