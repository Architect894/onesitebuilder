"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import sites from "@/data/mock/sites.json";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
            delayChildren: 0.2,
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

export default function DashboardHome() {
    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
            className="space-y-10"
        >

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            >
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 bg-clip-text text-transparent">Your Sites</h1>
                <p className="text-sm text-amber-200/70 mt-2">
                    Manage and edit your website templates.
                </p>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
            >
                <Link
                    href="/app/new-site"
                    className="inline-flex items-center rounded-lg bg-gradient-to-r from-amber-100 to-amber-200 px-8 py-4 text-sm font-bold text-gray-900 transition shadow-lg shadow-amber-200/30 hover:shadow-xl hover:shadow-amber-200/50"
                >
                    Choose A New Template
                </Link>
            </motion.div>

            {/* Grid */}
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="grid gap-8 md:grid-cols-2 xl:grid-cols-3"
            >

                {sites.map((site) => (
                    <motion.div
                        key={site.id}
                        variants={itemVariants}
                        className="group overflow-hidden rounded-2xl border border-amber-200/20 bg-gray-900/50 transition hover:border-amber-200/40 hover:bg-gray-800/70 backdrop-blur-sm"
                    >

                        {/* Live Preview */}
                        <div className="relative h-[200px] w-full overflow-hidden border-b border-amber-200/20 bg-black">

                            <iframe
                                src={`/sites/${site.subdomain}`}
                                className="pointer-events-none scale-[0.35] origin-top-left w-[285%] h-[285%]"
                            />

                        </div>

                        {/* Card Content */}
                        <div className="p-6">

                            <h2 className="text-lg font-medium text-amber-200">
                                {site.name}
                            </h2>

                            <p className="text-sm text-amber-200/60 mt-1">
                                Template: {site.templateKey}
                            </p>

                            {/* Actions */}
                            <div className="mt-6 flex gap-3">

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1"
                                >
                                    <Link
                                        href={`/app/sites/${site.id}`}
                                        className="block text-center rounded-lg bg-gradient-to-r from-amber-100 to-amber-200 px-4 py-2 text-sm font-bold text-gray-900 transition"
                                    >
                                        Edit
                                    </Link>
                                </motion.div>

                                <motion.div
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="flex-1"
                                >
                                    <Link
                                        href={`/sites/${site.subdomain}`}
                                        className="block text-center rounded-lg border border-amber-200/40 px-4 py-2 text-sm font-medium text-amber-200 transition hover:bg-amber-200/10 hover:border-amber-200/60"
                                    >
                                        View
                                    </Link>
                                </motion.div>

                            </div>

                        </div>

                    </motion.div>
                ))}

            </motion.div>

        </motion.div>
    );
}