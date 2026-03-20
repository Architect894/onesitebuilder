"use client";

import { useRouter } from "next/navigation";

export default function LogoutButton() {
    const router = useRouter();

    const handleLogout = async () => {
        await fetch("/api/auth/logout", { method: "POST" });
        window.location.href = "/login";
    };

    return (
        <button
            onClick={handleLogout}
            className="text-sm px-4 py-1.5 rounded-full border border-blush-300/20 text-blush-300/70 hover:text-white hover:border-blush-300/40 hover:bg-blush-300/10 transition-all duration-200"
        >
            Sign out
        </button>
    );
}
