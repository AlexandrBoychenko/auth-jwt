import { NextResponse } from 'next/server';

export function GET() {
    return NextResponse.json({ username: 'Linda', usersername: 'Baltor' });
}