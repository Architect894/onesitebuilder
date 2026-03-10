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
                            className="w-full h-24 rounded-lg shadow-lg border border-gray-700 transition-all group-hover:shadow-2xl"
                            style={{ backgroundColor: color }}
                        />
                        <p className="text-xs text-gray-400 mt-2 text-center group-hover:text-amber-200 transition-colors">
                            {shade}
                        </p>
                        <p className="text-xs text-gray-500 text-center font-mono\">{color}</p>
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
        <main className="min-h-screen bg-gradient-to-b from-gray-800 via-gray-850 to-gray-800 pt-32 pb-20">
            <div className="max-w-7xl mx-auto px-6">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-16"
                >
                    <h1 className="text-5xl md:text-6xl font-bold mb-4">
                        <span className="bg-gradient-to-r from-amber-400 to-amber-600 bg-clip-text text-transparent">
                            Color Palette
                        </span>
                    </h1>
                    <p className="text-gray-400 text-lg">
                        Simple Peek's comprehensive color system for consistent branding
                    </p>
                </motion.div>

                <div className="space-y-16">
                    <ColorSwatch name="Primary - Deep Slate" shades={colors.primary} />
                    <ColorSwatch name="Accent - Warm Amber" shades={colors.accent} />
                    <ColorSwatch name="Secondary - Slate Blue" shades={colors.secondary} />

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
                                        className="w-full h-32 rounded-lg shadow-lg border border-gray-700 transition-all group-hover:shadow-2xl"
                                        style={{ backgroundColor: color }}
                                    />
                                    <p className="text-sm text-gray-400 mt-2 text-center capitalize group-hover:text-amber-400 transition-colors">
                                        {name}
                                    </p>
                                    <p className="text-xs text-gray-500 text-center font-mono">{color}</p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.div>
                </div>
            </div>
        </main>
    );
}
