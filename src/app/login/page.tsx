"use client";  
import { useState } from "react";  
import { useRouter } from "next/navigation";  
import { FcGoogle } from "react-icons/fc";  

const LoginForm = () => {  
    const [email, setEmail] = useState("");  
    const [step, setStep] = useState(1);  
    const [companyName, setCompanyName] = useState("");  
    const [password, setPassword] = useState("");  
    const [error, setError] = useState("");  
    const router = useRouter();  

    const handleNext = () => {  
        if (!email.trim() || !email.includes("@")) {  
            setError("Please enter a valid work email.");  
            return;  
        }  
        setError("");  
        setStep(2);  
    };  

    const handleVerifyCompany = () => {  
        if (!companyName.trim()) {  
            setError("Please enter your company name.");  
            return;  
        }  
        setError("");  
        setStep(3);  
    };  

    const handleLogin = () => {  
        if (!password.trim()) {  
            setError("Password is required.");  
            return;  
        }  
        setError("");  
        console.log("Logging in with:", { email, companyName, password });  
        router.push("/dashboard");  
    };  

    return (  
        <div className="flex justify-center items-center min-h-screen bg-white">  
            <div className="flex flex-col items-center p-6 rounded-xl w-96">  
                <h1 className="text-[#2B3733] p-4 mt-6 text-center">Welcome Back</h1> {/* Page Title */}  
                {step === 1 && (  
                    <>  
                        <label htmlFor="Email" className="text-[#2B3733] p-4">Enter Your Work Email</label>  
                        <input  
                            type="email"  
                            placeholder="Work Email"  
                            value={email}  
                            onChange={(e) => setEmail(e.target.value)}  
                            className="w-full p-4 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D767F]"  
                        />  
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}  
                        <button onClick={handleNext} className="w-full mt-4 p-3 bg-[#2D767F] text-white rounded-md hover:bg-[#1E6262]">  
                            Next  
                        </button>  
                        <p className="mt-4">— Or sign in with —</p>  
                        <hr className="w-full border-[#2D767F] border-b-2 mb-4" /> {/* Extended Stroke */}  
                        <button className="w-full flex items-center justify-center gap-2 p-3 border rounded-md hover:bg-gray-100">  
                            <FcGoogle size={20} /> Sign in with Google  
                        </button>  
                        <p className="mt-4 text-sm">  
                            Don’t have an account?{" "}  
                            <span className="text-[#2D767F] cursor-pointer" onClick={() => router.push("/register")}>  
                                Sign Up  
                            </span>  
                        </p>  
                    </>  
                )}  

                {step === 2 && (  
                    <>  
                        <input  
                            type="text"  
                            placeholder="Company Name"  
                            value={companyName}  
                            onChange={(e) => setCompanyName(e.target.value)}  
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D767F]"  
                        />  
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}  
                        <button onClick={handleVerifyCompany} className="w-full mt-4 p-3 bg-[#2D767F] text-white rounded-md hover:bg-[#1E6262]">  
                            Verify Company  
                        </button>  
                        <p className="mt-4 text-sm text-[#2D767F] cursor-pointer">Forgot Company Name?</p>  
                    </>  
                )}  

                {step === 3 && (  
                    <>  
                        <input  
                            type="password"  
                            placeholder="Password"  
                            value={password}  
                            onChange={(e) => setPassword(e.target.value)}  
                            className="w-full p-3 border rounded-md focus:outline-none focus:ring-2 focus:ring-[#2D767F]"  
                        />  
                        {error && <p className="text-red-500 text-sm mt-2">{error}</p>}  
                        <button onClick={handleLogin} className="w-full mt-4 p-3 bg-[#2D767F] text-white rounded-md hover:bg-[#1E6262]">  
                            Sign In  
                        </button>  
                        <p className="mt-4 text-sm text-[#2D767F] cursor-pointer">Forgot Password?</p>  
                        <p className="mt-2 text-sm text-[#2D767F] cursor-pointer">Login into another account</p>  
                    </>  
                )}  
            </div>  
        </div>  
    );  
};  

export default LoginForm;  