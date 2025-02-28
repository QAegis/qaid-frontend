"use client";
import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { FcGoogle } from "react-icons/fc";

const RegisterForm = () => {
    const [email, setEmail] = useState("");
    const [step, setStep] = useState(1);
    const [fullName, setFullName] = useState("");
    const [password, setPassword] = useState("");
    const [accountName, setAccountName] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const searchParams = useSearchParams();

    // Check if token is present in URL
    useEffect(() => {
        if (searchParams) {
            const token = searchParams.get("token");
            if (token) {
                setStep(2); // Move to the next step
            }
        }
    }, [searchParams]);

    // Handle email submission (Step 1)
    const handleNext = async () => {
        if (!email) return;
        setLoading(true);
        setMessage("");

        try {
            const response = await fetch("/api/send-email", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();
            if (result.success) {
                setMessage("A verification link has been sent to your email.");
            } else {
                setMessage("Failed to send verification email.");
            }
        } catch {
            setMessage("An error occurred. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col items-center justify-center h-screen bg-white">
            <div className="p-6 bg-[#ECFFFB] rounded-xl shadow-md w-96">
                <h2 className="text-2xl font-bold text-center mb-4">Register</h2>

                {step === 1 && (
                    <>
                        <button className="w-full flex items-center justify-center gap-2 p-3 border rounded-md hover:bg-gray-100">
                            <FcGoogle size={20} /> Sign up with Google
                        </button>
                        <div className="relative my-4 flex items-center">
                            <div className="flex-grow border-t border-gray-400"></div>
                            <span className="mx-4 text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-400"></div>
                        </div>

                        <input
                            type="email"
                            placeholder="Enter your work email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D767F]"
                        />
                        <button
                            onClick={handleNext}
                            className="w-full mt-4 p-3 bg-[#2D767F] text-white rounded-md hover:bg-[#1E6262]"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Next"}
                        </button>

                        {message && <p className="text-sm text-center text-gray-600 mt-2">{message}</p>}
                    </>
                )}

                {step === 2 && (
                    <>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D767F] mt-4"
                        />
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D767F] mt-4"
                        />
                        <input
                            type="text"
                            placeholder="Account Name"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D767F] mt-4"
                        />
                        <button className="w-full mt-4 p-3 bg-[#2D767F] text-white rounded-md hover:bg-[#1E6262]">
                            Continue
                        </button>
                    </>
                )}
            </div>
        </div>
    );
};

export default RegisterForm;
