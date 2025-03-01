"use client";
import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
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
    const router = useRouter();

    return (
        <div className="flex flex-col items-center justify-start h-screen bg-white pt-16">
            {/* Page Title */}
            <div className="mb-6 text-center">
                <h2 className="text-2xl font-bold text-[#2B3733]">Welcome to Q-Aid</h2>
                <h5 className="text-[#2B3733] text-sm text-opacity-75">Get started - Test management at its peak</h5>
            </div>

            {/* Form Container */}
            <div className="p-6 rounded-xl w-96 bg-white">
                {step === 1 && (
                    <>
                        {/* Google Sign-Up Button */}
                        <button className="w-full flex items-center justify-center gap-2 p-2 border rounded-sm hover:bg-gray-100 text-[#2B3733] text-xs">
                            <FcGoogle size={20} /> Continue with Google
                        </button>
                        <div className="relative my-4 flex items-center w-full">
                            <div className="flex-grow border-t border-gray-300"></div>
                            <span className="mx-4 text-gray-500">or</span>
                            <div className="flex-grow border-t border-gray-300"></div>
                        </div>

                        {/* Email Input */}
                        <input
                            type="email"
                            placeholder="name@company.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border placeholder:text-xs rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2D767F]"
                        />

                        {/* Next Button */}
                        <button
                            onClick={handleNext}
                            className="w-full mt-4 p-2 bg-[#2D767F] text-white rounded-sm hover:bg-[#1E6262]"
                            disabled={loading}
                        >
                            {loading ? "Sending..." : "Next"}
                        </button>

                        {/* Terms and Conditions */}
                        <p className="text-xs text-center text-gray-600 mt-4">
                            By proceeding, you agree to our <span className="text-[#2D767F] cursor-pointer">Terms of Service</span> and <span className="text-[#2D767F] cursor-pointer">Privacy Policy</span>.
                        </p>

                        {/* Message */}
                        {message && <p className="text-sm text-center text-gray-600 mt-2">{message}</p>}
                    </>
                )}

                {step === 2 && (
                    <>
                        {/* Full Name Input */}
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full p-2 border placeholder:text-xs rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2D767F] mt-4"
                        />

                        {/* Password Input */}
                        <input
                            type="password"
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border placeholder:text-xs rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2D767F] mt-4"
                        />

                        {/* Account Name Input */}
                        <input
                            type="text"
                            placeholder="Account Name"
                            value={accountName}
                            onChange={(e) => setAccountName(e.target.value)}
                            className="w-full p-3 border placeholder:text-xs rounded-sm focus:outline-none focus:ring-2 focus:ring-[#2D767F] mt-4"
                        />

                        {/* Continue Button */}
                        <button className="w-full mt-4 p-2 bg-[#2D767F] text-white rounded-sm hover:bg-[#1E6262]">
                            Continue
                        </button>
                    </>
                )}
            </div>



            <p className="mt-36 text-sm">
                Already have an account?{" "}
                <span
                    className="text-[#2D767F] cursor-pointer"
                    onClick={() => router.push("/login")}
                >
                    Sign In
                </span>
            </p>
        </div>
    );
};

export default RegisterForm;
