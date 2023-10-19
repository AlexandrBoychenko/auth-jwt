"use client";
import { useAuth } from "@/hooks/useAuth";
import Link from "next/link";
import 'tailwindcss/tailwind.css';

export default function Home() {
  const { auth } = useAuth();
  return <div className='flex flex-col justify-center items-center md:h-screen'>
    <h1>Some Home Page</h1>
    <header>
      <nav>
        {auth ? (
          <p>User is already logged in</p>
        ) : (
          <Link className='underline' href="/login">Login</Link>
        )}
      </nav>
    </header>
  </div>
}
