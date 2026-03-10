"use client";

import { motion } from "framer-motion";

const ColorSwatch = ({ name, shades }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
        >
            <h3 className="text-2xl font-bold text-amber-200">{name}</h3>
            <div className="grid grid-cols-5 gap-3">
                {Object.entries(shades).map(([shade, color]) => (
                    <motion.div
                        key={shade}
                        whileHover={{ scale: 1.1, rotate: 2 }}
                        className="group cursor-pointer"
                    >
                        <div
                            className="w-full h-24 rounded-lg shadow-lg border border-amber-200/20 transition-all group-hover:shadow-2xl group-hover:shadow-amber-200/30 group-hover:border-amber-200/40"
                            style={{ backgroundColor: color }}
                        />
                        <p className="text-xs text-amber-200/60 mt-2 text-center group-hover:text-amber-200 transition-colors">
                            {shade}
                        </p>
                        <p className="text-xs text-amber-200/40 text-center font-mono">{color}</p>
                    </motion.div>
                ))}
            </div>
        </motion.div>
    );
};

export default function ColorsPage() {
    const colors = {
        primary: {
            "50": "#f6f6f7",
            "100": "#ececef",
            "200": "#d9d9df",
            "300": "#bebec8",
            "400": "#8a8a96",
            "500": "#6a6a77",
            "600": "#55555f",
            "700": "#4a4a52",
            "800": "#3a3a41",
            "900": "#2a2a30",
        },
        accent: {
            "50": "#fafafa",
            "100": "#f5f5f5",
            "200": "#eeeeee",
            "300": "#e0e0e0",
            "400": "#d1d5db",
            "500": "#a0a0a8",
            "600": "#7a7a82",
            "700": "#5a5a62",
            "800": "#4a4a52",
            "900": "#3a3a41",
        },
        secondary: {
            "50": "#fffbf0",
            "100": "#fef3e2",
            "200": "#fce8c3",
            "300": "#f9dca4",
            "400": "#f1c886",
            "500": "#d4a574",
            "600": "#bf9458",
            "700": "#a68247",
            "800": "#8a6a39",
            "900": "#6f542c",
        },
        semantic: {
            success: "#10b981",
            warning: "#f59e0b",
            error: "#ef4444",
            info: "#3b82f6",
        },
    };

    return (
        <main className="relative min-h-screen text-white pt-32 pb-20 overflow-hidden"
            style={{
                background: `
                    radial-gradient(circle at top left, rgba(212, 165, 116, 0.08), transparent 30%),
                    radial-gradient(circle at 85% 15%, rgba(252, 232, 195, 0.06), transparent 25%),
                    radial-gradient(circle at bottom right, rgba(212, 165, 116, 0.05), transparent 35%),
                    linear-gradient(135deg, #16161c 0%, #23232b 38%, #2f2d33 62%, #1d1d24 100%)`
            }}>

            {/* Animated background glows */}
            <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-40 left-1/4 w-96 h-96 bg-amber-700/10 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-40 right-1/4 w-96 h-96 bg-amber-700/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1.5s" }} />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 bg-clip-text text-transparent">
                            Color Palette
                        </span>
                    </h1>
                    <p className="text-amber-200/70 text-lg">
                        Simple Peek's comprehensive color system for consistent branding
                    </p>
                </motion.div>

                <div className="space-y-16">
                    <ColorSwatch name="Primary - Deep Slate" shades={colors.primary} />
                    <ColorSwatch name="Accent - Gunmetal Lighter" shades={colors.accent} />
                    <ColorSwatch name="Secondary - Warm Gold" shades={colors.secondary} />

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        className="space-y-4"
                    >
                        <h3 className="text-2xl font-bold text-amber-200">Semantic Colors</h3>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            {Object.entries(colors.semantic).map(([name, color]) => (
                                <motion.div
                                    key={name}
                                    whileHover={{ scale: 1.05 }}
                                    className="group cursor-pointer"
                                >
                                    <div
                                        className="w-full h-32 rounded-lg shadow-lg border border-amber-200/20 transition-all group-hover:shadow-2xl group-hover:shadow-amber-200/30"
                                        style={{ backgroundColor: color }}
                                    />
                                    <p className="text-sm text-amber-200/60 mt-2 text-center capitalize group-hover:text-amber-200 transition-colors">
                                        {name}
                                    </p>
                                    <p className="text-xs text-amber-200/40 text-center font-mono">{color}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
