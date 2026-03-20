"use client";

import Link from "next/link";
import { motion } from "framer-motion";

const NAV_LINKS = [
    { href: "/pricing", label: "Pricing" },
];

export default function AnimatedNav({ user }) {
    return (
        <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
            className="sticky top-0 z-50 w-full"
            style={{ background: "#111113", borderBottom: "1px solid rgba(249,115,22,0.30)" }}
        >
            <div className="max-w-6xl mx-auto px-6 md:px-10 h-20 flex items-center justify-between">

                {/* Logo */}
                <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.08, ease: [0.22, 1, 0.36, 1] }}
                >
                    <Link href="/">
                        <img
                            src="/SimplePeekTransparentWhite.png"
                            alt="Simple Peek"
                            className="h-10 w-auto"
                        />
                    </Link>
                </motion.div>

                {/* Right side */}
                <motion.div
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.5, delay: 0.12, ease: [0.22, 1, 0.36, 1] }}
                    className="flex items-center gap-5"
                >
                    {NAV_LINKS.map((item) => (
                        <Link
                            key={item.href}
                            href={item.href}
                            className="hidden md:block"
                        >
                            <motion.span
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                className="inline-block px-4 py-2 rounded-md border border-orange-500/50 hover:border-orange-500 text-orange-400 hover:text-orange-300 text-sm font-semibold transition-all duration-150"
                            >
                                {item.label}
                            </motion.span>
                        </Link>
                    ))}

                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="hidden sm:block text-sm text-zinc-500">
                                {user.name?.split(" ")[0] || user.email?.split("@")[0]}
                            </span>
                            <Link href="/app">
                                <motion.span
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-block px-4 py-1.5 rounded-md bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors duration-150 shadow-md shadow-orange-500/20"
                                >
                                    Dashboard
                                </motion.span>
                            </Link>
                        </div>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Link href="/login">
                                <motion.span
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-block px-4 py-2 rounded-md border border-orange-500/50 hover:border-orange-500 text-orange-400 hover:text-orange-300 text-sm font-semibold transition-all duration-150"
                                >
                                    Log in
                                </motion.span>
                            </Link>
                            <Link href="/signup">
                                <motion.span
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    className="inline-block px-4 py-2 rounded-md bg-orange-500 hover:bg-orange-400 text-white text-sm font-semibold transition-colors duration-150 shadow-lg shadow-orange-500/25"
                                >
                                    Get started
                                </motion.span>
                            </Link>
                        </div>
                    )}
                </motion.div>
            </div>
        </motion.header>
    );
}
