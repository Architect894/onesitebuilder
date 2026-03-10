"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("http://localhost:3001/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                setError(data.error || "Failed to log in");
                setLoading(false);
                return;
            }

            // Success - redirect to dashboard
            router.push("/app");
        } catch (err) {
            setError("An error occurred. Please try again.");
            setLoading(false);
        }
    };
    return (
        <div className="relative min-h-screen flex items-center justify-center text-white px-6 overflow-hidden"
            style={{
                background: `
                    radial-gradient(circle at top left, rgba(212, 165, 116, 0.08), transparent 30%),
                    radial-gradient(circle at 85% 15%, rgba(252, 232, 195, 0.06), transparent 25%),
                    radial-gradient(circle at bottom right, rgba(212, 165, 116, 0.05), transparent 35%),
                    linear-gradient(135deg, #16161c 0%, #23232b 38%, #2f2d33 62%, #1d1d24 100%)`
            }}>

            {/* Animated background glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-10 left-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-1/4 w-96 h-96 bg-amber-700/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-md"
            >
                <div className="rounded-3xl border border-amber-200/20 bg-gray-900/60 backdrop-blur-xl p-10 shadow-2xl shadow-amber-200/10">

                    <motion.h1
                        initial={{ opacity: 0, y: -20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-3xl font-bold tracking-tight text-gray-100"
                    >
                        Welcome back
                    </motion.h1>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        className="mt-3 text-amber-200/70 text-sm"
                    >
                        Log in to manage your sites.
                    </motion.p>

                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.4, staggerChildren: 0.1 }}
                        className="mt-8 space-y-5"
                    >
                        <form onSubmit={handleSubmit} className="space-y-5">
                            <input
                                type="email"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full rounded-xl bg-gray-950 border border-amber-200/20 px-4 py-3 text-sm text-gray-100 placeholder-gray-600 outline-none focus:border-amber-200/60 transition"
                                required
                            />

                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-xl bg-gray-950 border border-amber-200/20 px-4 py-3 text-sm text-gray-100 placeholder-gray-600 outline-none focus:border-amber-200/60 transition"
                                required
                            />

                            {error && (
                                <div className="rounded-lg bg-red-900/30 border border-red-700/50 px-4 py-3 text-sm text-red-200">
                                    {error}
                                </div>
                            )}

                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 0.6, delay: 0.5 }}
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <button 
                                    type="submit"
                                    disabled={loading}
                                    className="mt-8 w-full rounded-lg bg-gradient-to-r from-amber-100 to-amber-200 py-3 text-sm font-bold text-gray-900 transition shadow-lg shadow-amber-200/30 hover:shadow-xl hover:shadow-amber-200/50 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {loading ? "Logging in..." : "Log In"}
                                </button>
                            </motion.div>
                        </form>
                    </motion.div>

                    <motion.p
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 0.8, delay: 0.6 }}
                        className="mt-6 text-sm text-amber-200/50 text-center"
                    >
                        Don't have an account?{" "}
                        <Link href="/signup" className="text-amber-200 hover:text-amber-100 transition">
                            Sign up
                        </Link>
                    </motion.p>

                </div>
            </motion.div>

        </div>
    );
}
