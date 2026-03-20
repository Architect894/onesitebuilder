"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useMemo, useRef } from "react";
import Link from "next/link";
import LuxePhotoTemplate from "@/templates/luxe-photo/Template";
import LuxeModernTemplate from "@/templates/luxe-modern/Template";
import LuxeClassicTemplate from "@/templates/luxe-classic/Template";
import LuxeMinimalTemplate from "@/templates/luxe-minimal/Template";
import TemplateShowcaseLuxeDark from "@/templates/prebuilt/TemplateShowcaseLuxeDark";
import TemplateStoryLuxeLight from "@/templates/prebuilt/TemplateStoryLuxeLight";
import TemplateVisualFirstEditorial from "@/templates/prebuilt/TemplateVisualFirstEditorial";
import TemplateConversionBoldModern from "@/templates/prebuilt/TemplateConversionBoldModern";
import TemplateShowcaseMinimalElegant from "@/templates/prebuilt/TemplateShowcaseMinimalElegant";

// All template components keyed by their key
const allTemplateComponents = {
    // Legacy templates
    "luxe-photo": LuxePhotoTemplate,
    "luxe-modern": LuxeModernTemplate,
    "luxe-classic": LuxeClassicTemplate,
    "luxe-minimal": LuxeMinimalTemplate,
    // Factory templates
    "showcase-luxe-dark": TemplateShowcaseLuxeDark,
    "story-luxe-light": TemplateStoryLuxeLight,
    "visual-first-editorial": TemplateVisualFirstEditorial,
    "conversion-bold-modern": TemplateConversionBoldModern,
    "showcase-minimal-elegant": TemplateShowcaseMinimalElegant,
};

const defaultTemplates = [
    { key: "luxe-photo", name: "Luxe Photo", description: "" },
    { key: "luxe-modern", name: "Luxe Modern", description: "" },
    { key: "luxe-classic", name: "Luxe Classic", description: "" },
    { key: "luxe-minimal", name: "Luxe Minimal", description: "" },
];

const mockData = {
    site: {
        name: "Preview Site",
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

export default function TemplatePreviewModal({
    template,
    templates = defaultTemplates,
    isOpen,
    onClose,
    onTemplateChange,
    onChoose,
}) {
    const [mounted, setMounted] = useState(false);
    const [currentIndex, setCurrentIndex] = useState(0);
    const previewScrollRef = useRef(null);

    const activeTemplates = useMemo(() => {
        if (Array.isArray(templates) && templates.length > 0) return templates;
        return defaultTemplates;
    }, [templates]);

    const currentTemplate = activeTemplates[currentIndex] || template;
    // Look up component by key from all available templates
    const TemplateComponent = allTemplateComponents[currentTemplate?.key];

    const goToTemplate = (nextIndex) => {
        const safeIndex = ((nextIndex % activeTemplates.length) + activeTemplates.length) % activeTemplates.length;
        const nextTemplate = activeTemplates[safeIndex];
        setCurrentIndex(safeIndex);
        if (typeof onTemplateChange === "function" && nextTemplate) {
            onTemplateChange(nextTemplate);
        }
    };

    const goNext = () => goToTemplate(currentIndex + 1);
    const goPrev = () => goToTemplate(currentIndex - 1);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        if (!template) return;
        const idx = activeTemplates.findIndex((tpl) => tpl.key === template.key);
        if (idx >= 0) setCurrentIndex(idx);
    }, [template, activeTemplates]);

    useEffect(() => {
        if (!isOpen) return;
        const handleKeyDown = (event) => {
            if (event.key === "ArrowRight") goNext();
            if (event.key === "ArrowLeft") goPrev();
        };
        window.addEventListener("keydown", handleKeyDown);
        return () => window.removeEventListener("keydown", handleKeyDown);
    }, [isOpen, currentIndex, activeTemplates]);

    useEffect(() => {
        if (previewScrollRef.current) {
            previewScrollRef.current.scrollTop = 0;
        }
    }, [currentIndex]);

    if (!template) return null;

    return (
        <AnimatePresence>
            {isOpen && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 z-40 backdrop-blur-sm"
                    />

                    {/* Modal */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                        transition={{ duration: 0.3 }}
                        className="fixed inset-0 z-50 flex items-center justify-center p-4"
                    >
                        {/* Modal Container */}
                        <motion.div
                            className="relative w-full h-full max-h-screen bg-midnight-950 rounded-2xl overflow-hidden shadow-2xl border border-orange-300/15 flex flex-col"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="absolute inset-0 pointer-events-none">
                                <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[44rem] h-[44rem] bg-orange-400/10 blur-3xl" />
                                <div className="absolute -bottom-40 right-0 w-[30rem] h-[30rem] bg-midnight-500/20 blur-3xl" />
                            </div>

                            {/* Header */}
                            <div className="relative flex-shrink-0 bg-midnight-950/90 border-b border-orange-300/20 px-6 py-4">
                                <div className="text-center">
                                    <h2 className="text-2xl font-bold text-amber-100">
                                        {currentTemplate?.name}
                                    </h2>
                                    <p className="text-amber-100/55 text-sm mt-1">
                                        {currentTemplate?.description}
                                    </p>
                                </div>

                                {/* Close Button */}
                                <button
                                    onClick={onClose}
                                    className="absolute right-6 top-1/2 -translate-y-1/2 w-10 h-10 rounded-lg bg-midnight-800 hover:bg-midnight-700 transition flex items-center justify-center text-amber-100/70 hover:text-amber-100 border border-orange-300/15"
                                >
                                    <svg
                                        className="w-5 h-5"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            strokeWidth={2}
                                            d="M6 18L18 6M6 6l12 12"
                                        />
                                    </svg>
                                </button>
                            </div>

                            {/* Template Preview */}
                            <div
                                ref={previewScrollRef}
                                className="relative flex-1 overflow-auto bg-midnight-900"
                            >
                                {mounted && TemplateComponent ? (
                                    <div className="w-full bg-white">
                                        <TemplateComponent
                                            site={mockData.site}
                                            branding={mockData.branding}
                                            content={mockData.content}
                                        />
                                    </div>
                                ) : (
                                    <div className="w-full h-full flex items-center justify-center">
                                        <p className="text-amber-100/55">Loading template...</p>
                                    </div>
                                )}
                            </div>

                            {/* Footer */}
                            <div className="relative flex-shrink-0 bg-midnight-950/90 border-t border-orange-300/20 px-6 py-4">
                                <div className="flex items-center justify-center gap-2">
                                    <button
                                        onClick={goPrev}
                                        className="w-9 h-9 rounded-lg bg-midnight-800 hover:bg-midnight-700 transition flex items-center justify-center text-amber-100/70 hover:text-amber-100 border border-orange-300/15"
                                        aria-label="Previous template"
                                    >
                                        <span className="text-lg leading-none">&#8592;</span>
                                    </button>
                                    <span className="text-xs text-amber-100/55 min-w-16 text-center">
                                        {currentIndex + 1} / {activeTemplates.length}
                                    </span>
                                    <button
                                        onClick={goNext}
                                        className="w-9 h-9 rounded-lg bg-midnight-800 hover:bg-midnight-700 transition flex items-center justify-center text-amber-100/70 hover:text-amber-100 border border-orange-300/15"
                                        aria-label="Next template"
                                    >
                                        <span className="text-lg leading-none">&#8594;</span>
                                    </button>
                                </div>

                                <div className="mt-4 text-center">
                                    <p className="text-amber-100/80">
                                        Love this design? Get started now.
                                    </p>
                                    {activeTemplates.length > 1 ? (
                                        <p className="text-xs text-amber-100/45 mt-1">
                                            Tip: use arrow keys or on-screen arrows to switch templates.
                                        </p>
                                    ) : null}
                                </div>

                                <div className="mt-3 flex justify-center">
                                    {onChoose ? (
                                        <motion.button
                                            whileHover={{ scale: 1.04 }}
                                            whileTap={{ scale: 0.97 }}
                                            onClick={() => onChoose(currentTemplate)}
                                            className="px-6 py-2.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold rounded-xl transition cursor-pointer text-sm shadow-lg shadow-orange-500/30"
                                        >
                                            Choose This Template
                                        </motion.button>
                                    ) : (
                                        <Link href={`/signup?template=${currentTemplate?.key}`}>
                                            <motion.div
                                                whileHover={{ scale: 1.04 }}
                                                whileTap={{ scale: 0.97 }}
                                                className="px-6 py-2.5 bg-gradient-to-r from-orange-400 to-orange-500 text-white font-bold rounded-xl transition cursor-pointer text-sm shadow-lg shadow-orange-500/30"
                                            >
                                                Choose This Template
                                            </motion.div>
                                        </Link>
                                    )}
                                </div>
                            </div>
                        </motion.div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
