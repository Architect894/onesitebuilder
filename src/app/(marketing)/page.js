"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import Link from "next/link";
import TemplateGallery from "@/components/TemplateGallery";

export default function MarketingPage() {
    const [hoveredCard, setHoveredCard] = useState(null);

    const features = [
        {
            title: "Simple Interface",
            description: "Clean, intuitive design that anyone can use",
            icon: "✨",
        },
        {
            title: "Real-time Updates",
            description: "See changes instantly as you work",
            icon: "⚡",
        },
        {
            title: "Secure & Reliable",
            description: "Your data is always protected",
            icon: "🔒",
        },
    ];

    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.2,
                delayChildren: 0.3,
            },
        },
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 20 },
        visible: {
            opacity: 1,
            y: 0,
            transition: { duration: 0.6 },
        },
    };

    return (
        <main className="relative overflow-hidden">
            {/* Animated background elements */}
            <div className="fixed top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-10 left-10 w-96 h-96 bg-amber-700/1 rounded-full blur-3xl animate-pulse" />
                <div className="absolute bottom-20 right-20 w-96 h-96 bg-amber-700/1 rounded-full blur-3xl animate-pulse" style={{ animationDelay: "1s" }} />
            </div>

            {/* Hero Banner */}
            <motion.section
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                className="relative z-10 py-8 px-6 bg-gradient-to-r from-amber-300/10 to-amber-200/10 border-b border-amber-200/20"
            >
                <div className="max-w-5xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                    >
                        <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4">
                            Beautiful websites for creators, freelancers, and small businesses
                        </h1>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6, delay: 0.3 }}
                        className="flex flex-col sm:flex-row gap-3 justify-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="/signup">
                                <button className="px-8 py-3 bg-gradient-to-r from-amber-100 to-amber-200 text-gray-900 font-bold rounded-lg shadow-xl shadow-amber-200/30 hover:shadow-2xl hover:shadow-amber-200/50 transition-all cursor-pointer text-base interactive-button">
                                    Start Free
                                </button>
                            </Link>
                        </motion.div>

                        <motion.div
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                        >
                            <Link href="#templates">
                                <button className="px-8 py-3 border-2 border-amber-200/50 text-amber-100 font-bold rounded-lg hover:border-amber-200 hover:bg-amber-200/10 transition-all cursor-pointer text-base">
                                    See Templates
                                </button>
                            </Link>
                        </motion.div>
                    </motion.div>
                </div>
            </motion.section>

            {/* Template Gallery - Main Feature */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 py-16 px-6"
                id="templates"
            >
                <TemplateGallery />
            </motion.section>

            {/* Why Simple Peek Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 py-16 px-6"
            >
                <div className="max-w-6xl mx-auto">
                    <motion.h2
                        initial={{ opacity: 0, y: -20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="text-4xl md:text-5xl font-bold text-center mb-12 text-gray-100"
                    >
                        Why Simple Peek?
                    </motion.h2>

                    <motion.div
                        variants={containerVariants}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        className="grid md:grid-cols-3 gap-8"
                    >
                        {features.map((feature, index) => (
                            <motion.div
                                key={index}
                                variants={itemVariants}
                                onHoverStart={() => setHoveredCard(index)}
                                onHoverEnd={() => setHoveredCard(null)}
                                className="group relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-amber-200/10 to-transparent rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity blur-xl" />

                                <motion.div
                                    animate={{
                                        y: hoveredCard === index ? -8 : 0,
                                    }}
                                    className="relative bg-gradient-to-br from-gray-700/50 to-gray-800/50 backdrop-blur-xl p-8 rounded-2xl border border-gray-600/50 group-hover:border-amber-700/50 transition-all cursor-pointer card-hover"
                                >
                                    <motion.div
                                        className={`text-5xl mb-4 block`}
                                        animate={{ rotate: hoveredCard === index ? 12 : 0, scale: hoveredCard === index ? 1.2 : 1 }}
                                    >
                                        {feature.icon}
                                    </motion.div>

                                    <h3 className="text-xl font-bold text-amber-200 mb-3">
                                        {feature.title}
                                    </h3>

                                    <p className="text-gray-300 text-sm leading-relaxed">
                                        {feature.description}
                                    </p>

                                    <motion.div
                                        className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-amber-700 to-amber-800 rounded-b-2xl origin-left"
                                        animate={{ scaleX: hoveredCard === index ? 1 : 0 }}
                                        transition={{ duration: 0.4 }}
                                    />
                                </motion.div>
                            </motion.div>
                        ))}
                    </motion.div>
                </div>
            </motion.section>

            {/* CTA Section */}
            <motion.section
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.8 }}
                viewport={{ once: true }}
                className="relative z-10 py-16 px-6"
            >
                <div className="max-w-3xl mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.6 }}
                        viewport={{ once: true }}
                        className="bg-gradient-to-r from-amber-300/20 to-amber-200/20 backdrop-blur-xl rounded-2xl p-12 border border-amber-200/30 text-center"
                    >
                        <h3 className="text-2xl font-bold text-gray-100 mb-2">
                            Ready to Get Started?
                        </h3>
                        <p className="text-gray-300 mb-4 text-base">
                            Join thousands of creators and businesses using Simple Peek
                        </p>

                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="px-10 py-4 bg-gradient-to-r from-amber-100 to-amber-200 text-gray-900 font-bold rounded-lg shadow-xl shadow-amber-200/30 hover:shadow-2xl hover:shadow-amber-200/50 transition-all cursor-pointer text-lg interactive-button"
                        >
                            Start Your Free Trial
                        </motion.button>
                    </motion.div>
                </div>
            </motion.section>

            {/* Footer */}
            <motion.footer
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="relative z-10 border-t border-gray-700/30 py-8 px-6 mt-8"
            >
                <div className="max-w-6xl mx-auto flex justify-between items-center">
                    <p className="text-gray-400">&copy; 2026 Simple Peek. All rights reserved.</p>
                    <div className="flex gap-6 text-gray-400">
                        <Link href="/colors" className="hover:text-amber-200 transition-colors">
                            Colors
                        </Link>
                        <a href="#" className="hover:text-amber-200 transition-colors">
                            Privacy
                        </a>
                        <a href="#" className="hover:text-amber-200 transition-colors">
                            Terms
                        </a>
                    </div>
                </div>
            </motion.footer>
        </main>
    );
}
