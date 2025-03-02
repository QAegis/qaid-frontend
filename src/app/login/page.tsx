"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { signIn } from "next-auth/react";
import { FcGoogle } from "react-icons/fc";

const LoginForm = () => {
    const [email, setEmail] = useState("");
    const [companyName, setCompanyName] = useState("");
    const [password, setPassword] = useState("");
    const [step, setStep] = useState(1);
    const [error, setError] = useState("");
    const [companyExists, setCompanyExists] = useState(false);
    const router = useRouter();

    const handleNextEmail = () => {
        if (!email.trim() || !email.includes("@")) {
            setError("Please enter a valid work email.");
            return;
        }
        setError("");
        setStep(2);
    };

    const handleNextCompanyName = async () => {
        if (!companyName.trim()) {
            setError("Please enter your company name.");
            return;
        }
        setError("");
        const fullCompanyName = `${companyName}.qaid.com`;

        // Actual logic to check if the company exists
        const companyExists = await checkCompanyExists(fullCompanyName);

        if (!companyExists) {
            setError("Company does not exist. <a href='https://link.to/retrieve-company'>Retrieve Company Name</a>");
        } else {
            setCompanyExists(true);
            setError("");
            setStep(3);
        }
    };

    const handleSubmit = () => {
        if (!password.trim()) {
            setError("Please enter your password.");
            return;
        }
        setError("");
        // Perform your login logic here
    };

    const checkCompanyExists = async (companyName: string) => {
        // Replace with actual logic to check if the company exists
        // Here we just simulate the check
        return new Promise((resolve) => {
            setTimeout(() => {
                resolve(companyName === "example.qaid.com");
            }, 1000);
        });
    };

    const handleGoogleSignIn = async () => {
        try {
            await signIn("google", { callbackUrl: "/dashboard" });
        } catch (error) {
            console.error("Google Sign-In Failed:", error);
        }
    };

    return (
        <div className="flex flex-col justify-start items-center h-screen p-32 bg-[#ffffff] font-poppins">
            <div className="mb-6 text-center">
                <h1 className="text-3xl text-[#2B3733]">Login into your suite</h1>
            </div>
            <div className="w-full max-w-sm">
                <div className="bg-white p-8 rounded-sm">
                    {step === 1 && (
                        <>
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
                                onClick={handleNextEmail}
                                className="w-full mt-4 p-2 bg-[#2D767F] text-white rounded-sm hover:bg-[#1E6262]"
                            >
                                Next
                            </button>
                        </>
                    )}
                    {step === 2 && (
                        <>
                            <label htmlFor="CompanyName" className="text-[#2B3733] text-sm">
                                Enter Your Company Name
                            </label>
                            <input
                                type="text"
                                placeholder="Company Name"
                                value={companyName}
                                onChange={(e) => setCompanyName(e.target.value)}
                                className="w-full p-2 mt-2 border rounded-sm placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-[#B4F1F1]"
                            />
                            {error && <p className="text-red-500 text-sm mt-2" dangerouslySetInnerHTML={{ __html: error }}></p>}

                            <button
                                type="submit"
                                onClick={handleNextCompanyName}
                                disabled={!companyExists}
                                className={`w-full mt-4 p-2 ${companyExists ? 'bg-[#2D767F] text-white hover:bg-[#1E6262]' : 'bg-gray-400 cursor-not-allowed'} rounded-sm`}
                            >
                                Next
                            </button>
                        </>
                    )}
                    {step === 3 && (
                        <>
                            <label htmlFor="Password" className="text-[#2B3733] text-sm">
                                Enter Your Password
                            </label>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full p-2 mt-2 border rounded-sm placeholder:text-xs focus:outline-none focus:ring-2 focus:ring-[#B4F1F1]"
                            />
                            {error && <p className="text-red-500 text-sm mt-2">{error}</p>}

                            <button
                                type="submit"
                                onClick={handleSubmit}
                                className="w-full mt-4 p-2 bg-[#2D767F] text-white rounded-sm hover:bg-[#1E6262]"
                            >
                                Login
                            </button>
                        </>
                    )}

                    {/* Divider */}
                    <div className="relative my-4 flex items-center w-full">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="mx-4 text-sm text-gray-600">or Sign in with</span>
                        <div className="flex-grow border-t border-gray-300"></div>
                    </div>

                    <div className="flex justify-center mt-10">
                        <button
                            type="button"
                            onClick={handleGoogleSignIn}
                            className="w-[30%] flex items-center justify-center text-center gap-2 p-2 border rounded-sm hover:bg-gray-100 text-[#323338]"
                        >
                            <FcGoogle size={20} /> Google
                        </button>
                    </div>

                    <p className="mt-6 text-xs text-center">
                        Don’t have an account?{" "}
                        <span
                            className="text-[#2D767F] font-semibold cursor-pointer"
                            onClick={() => router.push("/register")}
                        >
                            Sign Up
                        </span>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;