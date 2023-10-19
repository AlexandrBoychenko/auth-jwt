"use client";
import React from "react";
import Cookies from "universal-cookie";
import { verifyJwtToken } from "@/libs/auth";
import { useRouter } from "next/navigation";

export function useAuth() {
    const cookies = new Cookies();
    const router = useRouter();

    const [auth, setAuth] = React.useState(null);

    const getVerifiedtoken = async () => {
        const token = cookies.get("token") ?? null;
        const verifiedToken = await verifyJwtToken(token);
        setAuth(verifiedToken);
    };

    const logout = () => {
        cookies.remove("token");
        setAuth(null);
        router.push('/login');
    };

    React.useEffect(() => {
        getVerifiedtoken();
    }, []);
    return { auth, logout };
}
