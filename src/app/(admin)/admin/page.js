"use client";

import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.15,
            delayChildren: 0.3,
        },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
};

export default function AdminHomePage() {
    return (
        <main className="relative min-h-screen text-white px-6 py-20 overflow-hidden"
            style={{
                background: `
                    radial-gradient(circle at top left, rgba(212, 165, 116, 0.08), transparent 30%),
                    radial-gradient(circle at 85% 15%, rgba(252, 232, 195, 0.06), transparent 25%),
                    radial-gradient(circle at bottom right, rgba(212, 165, 116, 0.05), transparent 35%),
                    linear-gradient(135deg, #16161c 0%, #23232b 38%, #2f2d33 62%, #1d1d24 100%)`
            }}>

            {/* Animated background glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-40 left-10 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-40 right-20 w-96 h-96 bg-amber-700/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
            </div>

            <div className="relative z-10 mx-auto max-w-5xl">
                <motion.div
                    initial={{ opacity: 0, y: -30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                >
                    <p className="text-sm uppercase tracking-[0.2em] text-amber-200/60">
                        Admin Panel
                    </p>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                    className="mt-4 text-5xl md:text-6xl font-bold"
                >
                    <span className="bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 bg-clip-text text-transparent">
                        Template Management
                    </span>
                </motion.h1>

                <motion.p
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                    className="mt-6 text-lg text-amber-200/70 max-w-2xl"
                >
                    Manage and configure your site templates from here. This is your internal control panel for all admin functions.
                </motion.p>

                <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className="mt-12 grid md:grid-cols-2 gap-6"
                >
                    <motion.div
                        variants={itemVariants}
                        className="group relative p-6 rounded-2xl border border-amber-200/20 bg-gray-900/40 backdrop-blur-sm hover:border-amber-200/40 transition"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition" />
                        <h3 className="relative text-xl font-semibold text-amber-200">Templates</h3>
                        <p className="relative mt-2 text-amber-200/60">Create, edit, and manage website templates</p>
                    </motion.div>

                    <motion.div
                        variants={itemVariants}
                        className="group relative p-6 rounded-2xl border border-amber-200/20 bg-gray-900/40 backdrop-blur-sm hover:border-amber-200/40 transition"
                    >
                        <div className="absolute inset-0 bg-gradient-to-br from-amber-200/5 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition" />
                        <h3 className="relative text-xl font-semibold text-amber-200">Settings</h3>
                        <p className="relative mt-2 text-amber-200/60">Configure system and branding settings</p>
                    </motion.div>
                </motion.div>
            </div>
        </main>
    );
}