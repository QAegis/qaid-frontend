'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../hooks/useAuth';

export default function Home() {
  const { isAuthenticated, user, loading } = useAuth();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (!loading) {
      if (!isAuthenticated) {
        router.push('/login');
      } else {
        setIsLoading(false);
      }
    }
  }, [isAuthenticated, loading, router]);

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <main className="container mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-6">Welcome to the Dashboard</h1>
      
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">User Profile</h2>
          <p className="mb-2"><strong>Name:</strong> {user.name}</p>
          <p className="mb-2"><strong>Email:</strong> {user.email}</p>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Your Applications</h3>
            {/* Application list would go here */}
            <p className="text-gray-600">No applications yet.</p>
          </div>
          
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-3">Recent Activity</h3>
            {/* Activity list would go here */}
            <ul className="list-disc pl-5">
              <li className="mb-1">Profile updated (2 days ago)</li>
              <li className="mb-1">Logged in from new device (5 days ago)</li>
            </ul>
          </div>
          
          <button 
            className="mt-8 bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            onClick={() => {/* Handle action */}}
          >
            Start New Application
          </button>
        </div>
      )}
    </main>
  );
}