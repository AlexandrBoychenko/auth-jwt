import { SignJWT } from "jose";
import { NextResponse } from "next/server";
import { getJwtSecretKey } from "@/libs/auth";

export async function POST(request) {
    const body = await request.json();
    if (body.username === "test-name" && body.password === "password1234") {
        const token = await new SignJWT({
            username: body.username,
        })
            .setProtectedHeader({ alg: "HS256" })
            .setIssuedAt()
            .setExpirationTime("30s")
            .sign(getJwtSecretKey());
        const response = NextResponse.json(
            { success: true },
            { status: 200, headers: { "content-type": "application/json" } }
        );
        response.cookies.set({
            name: "token",
            value: token,
            path: "/",
        });
        // Temporary stub for user profile
        response.cookies.set({
            name: "user-name",
            value: body.username,
            path: "/",
        });
        return response;
    }
    return NextResponse.json({ success: false });
}