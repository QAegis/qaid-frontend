"use client";

import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Logo from "@/components/Logo";

const LayoutWrapper = ({ children }: { children: React.ReactNode }) => {
    const pathname = usePathname();
    const isAuthPage = pathname === "/login" || pathname === "/register";

    return (
        <div className="min-h-screen flex flex-col">
            {!isAuthPage && <Navbar />} {/* Show Navbar only on Home */}

            {isAuthPage && (
                <div className="absolute left-12">
                    <Logo /> 
                </div>
            )}

            <div className="flex-grow">{children}</div> {/* Prevents pushing down */}
        </div>
    );
};

export default LayoutWrapper;
