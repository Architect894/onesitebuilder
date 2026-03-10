"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import LuxePhotoTemplate from "@/templates/luxe-photo/Template";
import LuxeModernTemplate from "@/templates/luxe-modern/Template";
import LuxeClassicTemplate from "@/templates/luxe-classic/Template";
import LuxeMinimalTemplate from "@/templates/luxe-minimal/Template";

// Mock data for template preview
const mockData = {
    site: {
        name: "Preview Site",
        template: "luxe-photo",
    },
    branding: {
        primaryColor: "#d4a574",
        accentColor: "#c6a16e",
        neutralColor: "#000000",
    },
    content: {
        hero: {
            logo: "/realphotobooth.png",
            eyebrow: "Premium Template",
            headline: "See exactly what you'll get",
            subheadline: "This is a live preview of the template design",
            textColor: "#ffffff",
        },
        about: {
            title: "About This Template",
            body: "This template features elegant design and smooth animations. Perfect for showcasing your work.",
            headingColor: "#ffffff",
            bodyColor: "#d4d4d4",
        },
        services: ["Service 1", "Service 2", "Service 3"],
        gallery: [
            {
                id: "img_001",
                url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop"
            },
            {
                id: "img_002",
                url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop"
            },
            {
                id: "img_003",
                url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop"
            }
        ],
        cta: {
            label: "Get Started",
            href: "#contact",
            color: "#d4a574",
            textColor: "#ffffff",
        },
        contact: {
            email: "hello@example.com",
            phone: "(555) 123-4567",
        },
        sectionStyle: {
            hero: { bg: "#1a1a1a", accentColor: "#d4a574" },
            about: { bg: "#1a1a1a", accentColor: "#d4a574" },
            gallery: { bg: "#1a1a1a", accentColor: "#d4a574" },
            footer: { bg: "#0d0d0d" },
        },
    },
    links: {
        cta: "#contact",
    },
};

const templates = [
    {
        key: "luxe-photo",
        name: "Luxe Photo",
        description: "Perfect for photography, events, and visual-driven businesses",
        Component: LuxePhotoTemplate,
        color: "from-amber-700/30 to-amber-900/30",
    },
    {
        key: "luxe-modern",
        name: "Luxe Modern",
        description: "Sleek and contemporary design for modern brands",
        Component: LuxeModernTemplate,
        color: "from-rose-700/30 to-rose-900/30",
    },
    {
        key: "luxe-classic",
        name: "Luxe Classic",
        description: "Timeless elegance for established businesses",
        Component: LuxeClassicTemplate,
        color: "from-blue-700/30 to-blue-900/30",
    },
    {
        key: "luxe-minimal",
        name: "Luxe Minimal",
        description: "Ultra-clean and minimalist for modern simplicity",
        Component: LuxeMinimalTemplate,
        color: "from-gray-400/30 to-gray-600/30",
    },
];

export default function TemplateGallery() {
    const [current, setCurrent] = useState(0);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const next = () => setCurrent((prev) => (prev + 1) % templates.length);
    const prev = () => setCurrent((prev) => (prev - 1 + templates.length) % templates.length);

    const currentTemplate = templates[current];
    const CurrentComponent = currentTemplate.Component;

    return (
        <section className="relative z-10 py-32 px-6">
            <div className="max-w-7xl mx-auto">
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    viewport={{ once: true }}
                    className="text-center mb-16"
                >
                    <h2 className="text-5xl md:text-6xl font-bold text-gray-100 mb-4">
                        Explore Our <span className="text-amber-200">Templates</span>
                    </h2>
                    <p className="text-lg text-gray-400">
                        See exactly what you're choosing. Use the slideshow to preview each design.
                    </p>
                </motion.div>

                <div className="relative">
                    {/* Template Preview Window */}
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={current}
                            initial={{ opacity: 0, x: 100 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: -100 }}
                            transition={{ duration: 0.5 }}
                            className="bg-white rounded-2xl overflow-hidden shadow-2xl shadow-black/50 h-[600px] md:h-[800px] border border-gray-200"
                        >
                            {/* Preview Container */}
                            <div className="w-full h-full overflow-auto">
                                <div className="w-full min-h-full bg-white">
                                    {mounted ? (
                                        <CurrentComponent
                                            site={mockData.site}
                                            branding={mockData.branding}
                                            content={mockData.content}
                                            links={mockData.links}
                                        />
                                    ) : (
                                        <div className="w-full h-full flex items-center justify-center bg-gray-100">
                                            <div className="text-gray-500">Loading template...</div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    {/* Navigation Buttons */}
                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={prev}
                        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 z-20 w-12 h-12 rounded-full bg-amber-200 hover:bg-amber-100 text-gray-900 font-bold text-xl shadow-lg transition-all"
                    >
                        ←
                    </motion.button>

                    <motion.button
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                        onClick={next}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 z-20 w-12 h-12 rounded-full bg-amber-200 hover:bg-amber-100 text-gray-900 font-bold text-xl shadow-lg transition-all"
                    >
                        →
                    </motion.button>

                    {/* Indicators */}
                    <div className="flex justify-center gap-2 mt-6">
                        {templates.map((_, index) => (
                            <motion.button
                                key={index}
                                onClick={() => setCurrent(index)}
                                className={`h-2 rounded-full transition-all ${
                                    index === current ? "bg-amber-300 w-8" : "bg-gray-600 w-2"
                                }`}
                                whileHover={{ scale: 1.2 }}
                            />
                        ))}
                    </div>
                </div>

                {/* Template Info & CTA */}
                <motion.div
                    key={current}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="mt-12 text-center"
                >
                    <h3 className="text-3xl md:text-4xl font-bold text-amber-200 mb-4">
                        {currentTemplate.name}
                    </h3>
                    <p className="text-lg text-gray-300 mb-8 max-w-2xl mx-auto">
                        {currentTemplate.description}
                    </p>

                    <motion.div
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                    >
                        <Link href={`/signup?template=${currentTemplate.key}`}>
                            <button className="px-10 py-4 bg-gradient-to-r from-amber-100 to-amber-200 text-gray-900 font-bold rounded-lg shadow-xl shadow-amber-200/30 hover:shadow-2xl hover:shadow-amber-200/50 transition-all cursor-pointer text-lg">
                                Choose {currentTemplate.name} Template
                            </button>
                        </Link>
                    </motion.div>

                    {/* Keyboard hint */}
                    <p className="text-sm text-gray-500 mt-6">
                        💡 Use arrow buttons or click the dots to browse templates
                    </p>
                </motion.div>
            </div>
        </section>
    );
}
