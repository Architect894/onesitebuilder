"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useEffect, useState } from "react";

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
    const [sites, setSites] = useState([]);
    const [loading, setLoading] = useState(true);
    const [actionLoading, setActionLoading] = useState(null);

    useEffect(() => {
        fetch("/api/sites")
            .then((res) => res.json())
            .then((data) => {
                setSites(data.sites || []);
                setLoading(false);
            })
            .catch(() => setLoading(false));
    }, []);

    const handlePublishToggle = async (site) => {
        const newStatus = site.status === "published" ? "draft" : "published";
        setActionLoading(site.id);
        try {
            const res = await fetch(`/api/sites/${site.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: newStatus }),
            });
            if (res.ok) {
                const { site: updated } = await res.json();
                setSites((prev) =>
                    prev.map((s) => (s.id === site.id ? { ...s, status: updated.status } : s))
                );
            }
        } finally {
            setActionLoading(null);
        }
    };

    const handleDelete = async (site) => {
        if (!window.confirm(`Delete "${site.name}"? This cannot be undone.`)) return;
        setActionLoading(site.id);
        try {
            const res = await fetch(`/api/sites/${site.id}`, { method: "DELETE" });
            if (res.ok) {
                setSites((prev) => prev.filter((s) => s.id !== site.id));
            }
        } finally {
            setActionLoading(null);
        }
    };

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
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-blush-100 via-blush-200 to-blush-100 bg-clip-text text-transparent">Your Sites</h1>
                <p className="text-sm text-blush-300/70 mt-2">
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
                    className="inline-flex items-center rounded-lg bg-gradient-to-r from-blush-100 to-blush-200 px-8 py-4 text-sm font-bold text-midnight-900 transition shadow-lg shadow-blush-200/20 hover:shadow-xl hover:shadow-blush-200/40"
                >
                    Choose A New Template
                </Link>
            </motion.div>

            {/* Grid */}
            {loading ? (
                <div className="text-blush-400/50 text-sm">Loading your sites...</div>
            ) : sites.length === 0 ? (
                <div className="text-blush-400/50 text-sm">No sites yet. Create one above.</div>
            ) : (
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
                        className="group overflow-hidden rounded-2xl border border-blush-300/15 bg-midnight-800/50 transition hover:border-blush-300/30 hover:bg-midnight-700/60 backdrop-blur-sm"
                    >

                        {/* Live Preview */}
                        <div className="relative h-[200px] w-full overflow-hidden border-b border-blush-300/15 bg-midnight-950">
                            {site.status === "published" ? (
                                <iframe
                                    src={`/sites/${site.subdomain}`}
                                    className="pointer-events-none scale-[0.35] origin-top-left w-[285%] h-[285%]"
                                />
                            ) : (
                                <div className="w-full h-full flex flex-col items-center justify-center gap-2">
                                    <div className="w-10 h-10 rounded-full border border-blush-300/25 flex items-center justify-center">
                                        <svg className="w-5 h-5 text-blush-400/40" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>
                                    </div>
                                    <p className="text-xs text-blush-400/40 font-medium">{site.templateKey}</p>
                                </div>
                            )}
                        </div>

                        {/* Card Content */}
                        <div className="p-5">

                            <div className="flex items-start justify-between gap-2 mb-1">
                                <h2 className="text-lg font-medium text-blush-200 truncate">
                                    {site.name}
                                </h2>
                                <span className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-medium ${
                                    site.status === "published"
                                        ? "bg-emerald-500/20 text-emerald-400 border border-emerald-500/30"
                                        : "bg-blush-500/20 text-blush-400 border border-blush-500/30"
                                }`}>
                                    {site.status === "published" ? "Live" : "Draft"}
                                </span>
                            </div>

                            <p className="text-xs text-blush-400/50 mb-4">
                                {site.subdomain}.simplepeek.com
                            </p>

                            {/* Primary actions */}
                            <div className="flex gap-2 mb-2">
                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="flex-1">
                                    <Link
                                        href={`/app/sites/${site.id}`}
                                        className="block text-center rounded-lg bg-gradient-to-r from-blush-100 to-blush-200 px-4 py-2 text-sm font-bold text-midnight-900 transition"
                                    >
                                        Edit
                                    </Link>
                                </motion.div>

                                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                                    <Link
                                        href={`/sites/${site.subdomain}`}
                                        target="_blank"
                                        className={`block text-center rounded-lg border px-3 py-2 text-sm font-medium transition ${
                                            site.status === "published"
                                                ? "border-blush-300/40 text-blush-200 hover:bg-blush-200/10"
                                                : "border-blush-300/20 text-blush-400/50 hover:bg-blush-200/5"
                                        }`}
                                    >
                                        {site.status === "published" ? "View ↗" : "Preview ↗"}
                                    </Link>
                                </motion.div>
                            </div>

                            {/* Secondary actions */}
                            <div className="flex gap-2">
                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    disabled={actionLoading === site.id}
                                    onClick={() => handlePublishToggle(site)}
                                    className={`flex-1 py-1.5 text-xs rounded-lg border transition disabled:opacity-50 ${
                                        site.status === "published"
                                            ? "border-blush-300/30 text-blush-300/70 hover:bg-blush-200/10"
                                            : "border-emerald-500/40 text-emerald-400 hover:bg-emerald-500/10"
                                    }`}
                                >
                                    {actionLoading === site.id
                                        ? "..."
                                        : site.status === "published"
                                        ? "Unpublish"
                                        : "Publish"}
                                </motion.button>

                                <motion.button
                                    whileHover={{ scale: 1.03 }}
                                    whileTap={{ scale: 0.97 }}
                                    disabled={actionLoading === site.id}
                                    onClick={() => handleDelete(site)}
                                    className="px-3 py-1.5 text-xs rounded-lg border border-red-500/30 text-red-400 hover:bg-red-500/10 transition disabled:opacity-50"
                                >
                                    Delete
                                </motion.button>
                            </div>

                        </div>

                    </motion.div>
                ))}

            </motion.div>
            )}

        </motion.div>
    );
}