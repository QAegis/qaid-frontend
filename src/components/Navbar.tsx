import Link from "next/link";

const Navbar = () => {
    return (
        <nav className="flex justify-between items-center px-6 py-4 bg-white shadow-md">
            {/* Placeholder LOGO */}
            <h1 className="text-2xl font-bold text-[#2D767F]">LOGO</h1>

            {/* Navigation Links */}
            <div className="flex space-x-6">
                <Link href="/" className="text-[#2B3733] hover:text-[#2D767F]">Home</Link>
                <Link href="/login" className="text-[#2B3733] hover:text-[#2D767F]">Login</Link>
                <Link href="/register" className="text-[#2B3733] hover:text-[#2D767F]">Register</Link>
            </div>
        </nav>
    );
};

export default Navbar;
