// pages/home.js
'use client';
import { useRouter } from 'next/navigation';

const HomePage = () => {
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white font-[Montserrat]">
            <h1 className="text-4xl font-bold text-[#2D767F] mb-6">Welcome to Our Platform</h1>
            <p className="text-lg text-gray-600 mb-8 font-[Poppins]">Your journey starts here.</p>

            <div className="flex gap-4">
                <button
                    onClick={() => router.push('/login')}
                    className="px-6 py-3 bg-[#2D767F] text-white rounded-md hover:bg-[#1E6262] transition"
                >
                    Login
                </button>
                <button
                    onClick={() => router.push('/register')}
                    className="px-6 py-3 border border-[#2D767F] text-[#2D767F] rounded-md hover:bg-[#ECFFFB] transition"
                >
                    Sign Up
                </button>
            </div>
        </div>
    );
};

export default HomePage;
