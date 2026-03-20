"use client";

import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const res = await fetch("/api/auth/login", {
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

            const firstName = data.user?.name?.split(" ")[0] || data.user?.email?.split("@")[0] || "there";
            setLoading(false);
            setSuccess(firstName);
            setTimeout(() => { window.location.href = "/app"; }, 1800);
        } catch (err) {
            setError("An error occurred. Please try again.");
            setLoading(false);
        }
    };
    return (
        <div className="relative min-h-screen flex items-center justify-center text-white px-6 overflow-hidden"
            style={{ background: '#131317' }}>

            {/* Aurora background */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="blob-drift-1 absolute inset-0" style={{
                    background: 'linear-gradient(-42deg, transparent 12%, rgba(80,76,98,0.09) 28%, rgba(92,86,112,0.17) 44%, rgba(86,80,106,0.13) 57%, rgba(72,68,88,0.05) 72%, transparent 86%)',
                    backgroundSize: '300% 300%',
                }} />
                <div className="blob-drift-3 absolute inset-0" style={{
                    background: 'linear-gradient(-52deg, transparent 22%, rgba(155,56,6,0.020) 38%, rgba(172,66,9,0.038) 50%, rgba(150,54,5,0.016) 63%, transparent 80%)',
                    backgroundSize: '320% 320%',
                }} />
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(8,8,12,0.50) 100%)',
                }} />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                className="relative w-full max-w-md"
            >
                <AnimatePresence mode="wait">
                    {success ? (
                        <motion.div
                            key="success"
                            initial={{ opacity: 0, scale: 0.92 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                            className="rounded-3xl border border-orange-400/20 bg-gray-900/60 backdrop-blur-xl p-10 shadow-2xl shadow-orange-500/10 text-center"
                        >
                            {/* Animated checkmark ring */}
                            <motion.div
                                initial={{ scale: 0, rotate: -30 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ delay: 0.1, type: "spring", stiffness: 220, damping: 15 }}
                                className="mx-auto mb-6 w-20 h-20 rounded-full bg-orange-400/10 border-2 border-orange-400/30 flex items-center justify-center"
                            >
                                <motion.svg
                                    viewBox="0 0 28 28"
                                    fill="none"
                                    className="w-10 h-10"
                                    strokeWidth={2.5}
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                >
                                    <motion.path
                                        d="M5 14l6 6L23 8"
                                        stroke="rgb(253 186 116)"
                                        initial={{ pathLength: 0 }}
                                        animate={{ pathLength: 1 }}
                                        transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
                                    />
                                </motion.svg>
                            </motion.div>

                            <motion.h2
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: 0.3, duration: 0.5 }}
                                className="text-2xl font-bold text-gray-100"
                            >
                                Welcome back, {success}!
                            </motion.h2>

                            <motion.p
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.5, duration: 0.5 }}
                                className="mt-3 text-orange-300/70 text-sm"
                            >
                                Taking you to your dashboard&hellip;
                            </motion.p>

                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: 0.7 }}
                                className="mt-6 flex justify-center gap-1.5"
                            >
                                {[0, 1, 2].map((i) => (
                                    <motion.span
                                        key={i}
                                        className="w-1.5 h-1.5 rounded-full bg-orange-300/50"
                                        animate={{ opacity: [0.3, 1, 0.3] }}
                                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                                    />
                                ))}
                            </motion.div>
                        </motion.div>
                    ) : (
                        <motion.div
                            key="form"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            transition={{ duration: 0.3 }}
                            className="rounded-3xl border border-orange-400/20 bg-gray-900/60 backdrop-blur-xl p-10 shadow-2xl shadow-orange-500/5"
                        >
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.1 }}
                                className="mb-6"
                            >
                                <Link href="/" className="inline-flex items-center gap-1.5 text-xs text-orange-300/50 hover:text-orange-300/80 transition-colors">
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" className="w-3.5 h-3.5"><path fillRule="evenodd" d="M14 8a.75.75 0 0 1-.75.75H4.56l3.22 3.22a.75.75 0 1 1-1.06 1.06l-4.5-4.5a.75.75 0 0 1 0-1.06l4.5-4.5a.75.75 0 0 1 1.06 1.06L4.56 7.25H13.25A.75.75 0 0 1 14 8Z" clipRule="evenodd" /></svg>
                                    Back to home
                                </Link>
                            </motion.div>

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
                                className="mt-3 text-orange-300/60 text-sm"
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
                                        className="w-full rounded-xl bg-gray-950 border border-orange-400/20 px-4 py-3 text-sm text-gray-100 placeholder-gray-600 outline-none focus:border-orange-400/50 transition"
                                        required
                                    />

                                    <input
                                        type="password"
                                        placeholder="Password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full rounded-xl bg-gray-950 border border-orange-400/20 px-4 py-3 text-sm text-gray-100 placeholder-gray-600 outline-none focus:border-orange-400/50 transition"
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
                                            className="mt-8 w-full rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 py-3 text-sm font-bold text-white transition shadow-lg shadow-orange-500/30 hover:shadow-xl hover:shadow-orange-500/50 disabled:opacity-50 disabled:cursor-not-allowed"
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
                                className="mt-6 text-sm text-orange-300/50 text-center"
                            >
                                Don't have an account?{" "}
                                <Link href="/signup" className="text-orange-400 hover:text-orange-300 transition">
                                    Sign up
                                </Link>
                            </motion.p>
                        </motion.div>
                    )}
                </AnimatePresence>
            </motion.div>

        </div>
    );
}
