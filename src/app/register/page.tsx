"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [error, setError] = useState("");
    const router = useRouter();

    const handleNext = () => {
        if (!email.trim() || !email.includes("@")) {
            setError("Please enter a valid work email.");
            return;
        }
        setError("");
        router.push("/register/start-freemium");
    };

    const handleGoogleSignIn = async () => {
        try {
            await signIn("google", { callbackUrl: "/dashboard", redirect: true });
        } catch (error) {
            console.error("Google Sign-In Failed:", error);
        }
    };

    return (
        <div className="flex flex-col justify-start items-center h-screen p-32 bg-[#ffffff] font-poppins">
            <div className="mb-6 text-center">
                <h1 className="text-3xl text-[#2B3733]">Create Your Account</h1>
            </div>
            <div className="w-full max-w-sm">
                <div className="bg-white p-8 rounded-sm">
                    <button
                        type="button"
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-2 p-2 border rounded-sm hover:bg-gray-100 text-[#323338]"
                    >
                        <FcGoogle size={20} /> Continue with Google
                    </button>

                    {/* Divider */}
                    <div className="relative my-4 flex items-center w-full">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-sm text-gray-600">or use Email</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <label htmlFor="Email" className="text-[#2B3733] text-sm">
                        Enter Your Work Email
                    </label>
                    <input
                        type="email"
                        placeholder="Work Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="w-full p-2 mt-2 border rounded-sm placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-[#B4F1F1]"
                    />
                    {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                    <button
                        type="submit"
                        onClick={handleNext}
                        className="w-full mt-4 p-2 bg-[#2D767F] text-white rounded-sm hover:bg-[#1E6262]"
                    >
                        Next
                    </button>

                    <p className="mt-6 text-xs text-center">
                        Already have an account?{" "}
                        <span
                            className="text-[#2D767F] font-semibold cursor-pointer"
                            onClick={() => router.push("/login")}
                        >
                            Sign In
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default RegisterForm;
