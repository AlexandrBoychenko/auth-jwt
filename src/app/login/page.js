'use client';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import 'tailwindcss/tailwind.css';
import { Terminal } from 'lucide-react';
import { useState } from 'react';
import { AlertUI } from '@/components/ui/alertUI';
import { errors } from '../consts/errors';

export default function LoginPage() {
  const router = useRouter();
  const { login: { title, description } } = errors;

  const [showAlert, setShowAlert] = useState('');

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formData = new FormData(event.target);
    const username = formData.get('username');
    const password = formData.get('password');
    const res = await fetch('/api/login', {
      method: 'POST',
      body: JSON.stringify({ username, password }),
    });
    try {
      const { success } = await res.json();
      if (success) {
        router.push('/protected');
        router.refresh();
      } else {
        setShowAlert('unauthorized');
      }
    } catch (error) {
      setShowAlert('default');
    }

  };

  const onContainerClick = () => setShowAlert('');

  return (
    <>
      <div
        className="flex flex-col justify-center items-center md:h-screen w-full"
        onClick={onContainerClick}
      >
        <div className="md:w-1/6 m-3">
          <Image src="/login.png" alt="Login Image" width={800} height={600} />
        </div>
        <div className="flex flex-col items-center justify-center w-full md:w-1/2">
          <div className="w-full max-w-md space-y-8">
            <div>
              <h1 className="text-2xl font-bold">Welcome back!</h1>
              <p className="mt-2 text-gray-600">
                Please sign in to your account.
              </p>
            </div>
            <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
              <div>
                <label
                  htmlFor="username"
                  className="block font-bold text-gray-700"
                >
                  Username
                </label>
                <input
                  id="username"
                  type="text"
                  name="username"
                  placeholder="Enter your username"
                  className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="password"
                  className="block font-bold text-gray-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  placeholder="Enter your password"
                  className="w-full px-4 py-3 mt-1 border-gray-300 rounded-md focus:border-indigo-500 focus:ring focus:ring-indigo-200"
                  required
                />
              </div>
              <div>
                <Button
                  type="submit"
                  className="w-full px-4 py-3 font-bold text-white bg-indigo-500 rounded-md hover:bg-indigo-600 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700"
                >
                  Login
                </Button>
              </div>
            </form>
          </div>
        </div>
      </div>
      {showAlert && (
        <AlertUI {...{ title, description: description[showAlert] }}
        />
      )}
    </>
  );
}
