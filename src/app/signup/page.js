"use client";

import { motion } from "framer-motion";
import Link from "next/link";

export default function SignupPage() {
    return (
        <div className="relative min-h-screen flex items-center justify-center bg-black text-white px-6 overflow-hidden">

            {/* Background Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-neutral-900 via-black to-black" />
            <div className="absolute -top-40 -right-40 w-[500px] h-[500px] bg-white/5 rounded-full blur-3xl" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-white/5 rounded-full blur-3xl" />

            <motion.div
                initial={{ opacity: 0, y: 40 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="relative w-full max-w-md"
            >
                <div className="rounded-3xl border border-white/10 bg-neutral-900/70 backdrop-blur-xl p-10 shadow-2xl">

                    <h1 className="text-3xl font-semibold tracking-tight">
                        Create your account
                    </h1>

                    <p className="mt-3 text-neutral-400 text-sm">
                        Start building your first site today.
                    </p>

                    <div className="mt-8 space-y-5">

                        <input
                            type="text"
                            placeholder="Full Name"
                            className="w-full rounded-xl bg-black border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/30 transition"
                        />

                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-xl bg-black border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/30 transition"
                        />

                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full rounded-xl bg-black border border-white/10 px-4 py-3 text-sm outline-none focus:border-white/30 transition"
                        />

                    </div>

                    <button className="mt-8 w-full rounded-full bg-white py-3 text-sm font-medium text-black transition hover:scale-[1.03] active:scale-95">
                        Create Account
                    </button>

                    <p className="mt-6 text-sm text-neutral-400 text-center">
                        Already have an account?{" "}
                        <Link href="/login" className="text-white hover:underline">
                            Log in
                        </Link>
                    </p>

                </div>
            </motion.div>

        </div>
    );
}