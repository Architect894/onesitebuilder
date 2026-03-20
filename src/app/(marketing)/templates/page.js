"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import TemplatePreviewModal from "@/components/TemplatePreviewModal";
import { getAllTemplates } from "@/features/templates/registry";

const CATEGORIES = [
    { label: "All Templates", slug: null },
    { label: "Photo Booth", slug: "photo-booth" },
    { label: "Wedding DJ", slug: "wedding-dj" },
    { label: "Event Venue", slug: "event-venue" },
    { label: "Wedding Photographer", slug: "wedding-photographer" },
    { label: "Videographer", slug: "videographer" },
    { label: "Restaurant", slug: "restaurant" },
    { label: "Salon", slug: "salon" },
    { label: "Real Estate", slug: "real-estate" },
    { label: "Consulting", slug: "consulting" },
];

const STYLE_ACCENTS = {
    photo:   { ring: "border-amber-500/50",  dot: "#d4a574", chip: "bg-amber-500/10 text-amber-300/80 border-amber-500/20" },
    modern:  { ring: "border-rose-500/50",   dot: "#e07070", chip: "bg-rose-500/10 text-rose-300/80 border-rose-500/20" },
    classic: { ring: "border-blue-500/50",   dot: "#7090d4", chip: "bg-blue-500/10 text-blue-300/80 border-blue-500/20" },
    minimal: { ring: "border-gray-400/50",   dot: "#aaaaaa", chip: "bg-gray-500/10 text-gray-300/80 border-gray-400/20" },
    // Factory-based style accents
    "luxe-dark": { ring: "border-amber-500/50",  dot: "#c9a96e", chip: "bg-amber-500/10 text-amber-300/80 border-amber-500/20" },
    "luxe-light": { ring: "border-gray-700/50",  dot: "#1a1a1a", chip: "bg-gray-600/10 text-gray-300/80 border-gray-600/20" },
    "editorial": { ring: "border-red-500/50",    dot: "#ff6b6b", chip: "bg-red-500/10 text-red-300/80 border-red-500/20" },
    "bold-modern": { ring: "border-blue-500/50", dot: "#0066ff", chip: "bg-blue-500/10 text-blue-300/80 border-blue-500/20" },
    "minimal-elegant": { ring: "border-amber-700/50", dot: "#8b7355", chip: "bg-amber-700/10 text-amber-300/80 border-amber-700/20" },
};

function TemplateCard({ template, onPreview }) {
    const accent = STYLE_ACCENTS[template.style] || STYLE_ACCENTS.minimal;

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="group rounded-2xl overflow-hidden border border-amber-200/20 bg-gray-900/60 backdrop-blur-sm hover:border-amber-200/40 transition-all"
        >
            {/* Thumbnail */}
            <div className="relative h-52 bg-gray-950 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-gray-900 to-gray-950" />
                <div className="relative text-center">
                    <div
                        className={`w-14 h-14 rounded-full border-2 mx-auto mb-3 flex items-center justify-center ${accent.ring}`}
                        style={{ boxShadow: `0 0 24px ${accent.dot}33` }}
                    >
                        <div className="w-5 h-5 rounded-full" style={{ backgroundColor: accent.dot }} />
                    </div>
                    <p className="text-sm font-semibold text-white/80">{template.name}</p>
                    <p className="text-xs text-white/40 mt-0.5 capitalize">{template.style}</p>
                </div>

                {/* Hover overlay */}
                <button
                    onClick={() => onPreview(template)}
                    className="absolute inset-0 w-full h-full flex items-center justify-center opacity-0 group-hover:opacity-100 bg-black/60 transition-all"
                >
                    <span className="px-5 py-2 bg-white/15 backdrop-blur-sm rounded-lg text-white text-sm font-medium border border-white/20 hover:bg-white/25 transition">
                        Live Preview
                    </span>
                </button>
            </div>

            {/* Card body */}
            <div className="p-5">
                <h3 className="text-base font-semibold text-amber-200">{template.name}</h3>
                <p className="text-xs text-amber-200/50 mt-1 mb-3 leading-relaxed line-clamp-2">{template.description}</p>

                {/* Tags */}
                <div className="flex flex-wrap gap-1.5 mb-4">
                    {(template.industries || []).map((ind) => (
                        <span
                            key={ind}
                            className={`text-xs px-2 py-0.5 rounded-full border ${accent.chip}`}
                        >
                            {ind.replace(/-/g, " ")}
                        </span>
                    ))}
                </div>

                {/* Actions */}
                <div className="flex gap-2">
                    <button
                        onClick={() => onPreview(template)}
                        className="flex-1 py-2 text-xs rounded-lg border border-amber-200/30 text-amber-200/70 hover:border-amber-200/60 hover:text-amber-200 transition"
                    >
                        Preview
                    </button>
                    <Link
                        href={`/signup?template=${template.key}`}
                        className="flex-1 py-2 text-xs text-center rounded-lg bg-gradient-to-r from-amber-100 to-amber-200 text-gray-900 font-bold hover:shadow-lg hover:shadow-amber-200/20 transition"
                    >
                        Use Template
                    </Link>
                </div>
            </div>
        </motion.div>
    );
}

export default function TemplatesPage() {
    const [activeCategory, setActiveCategory] = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const allTemplates = getAllTemplates();
    const filtered = activeCategory
        ? allTemplates.filter((t) => Array.isArray(t.industries) && t.industries.includes(activeCategory))
        : allTemplates;

    const handlePreview = (template) => {
        setSelectedTemplate(template);
        setIsModalOpen(true);
    };

    return (
        <main
            className="relative min-h-screen"
            style={{
                background: `
                    radial-gradient(circle at top left, rgba(212, 165, 116, 0.07), transparent 35%),
                    radial-gradient(circle at 80% 20%, rgba(252, 232, 195, 0.05), transparent 30%),
                    linear-gradient(135deg, #16161c 0%, #1d1d24 100%)`,
            }}
        >
            {/* Header */}
            <section className="relative z-10 pt-20 pb-12 px-6 text-center">
                <motion.div
                    initial={{ opacity: 0, y: -16 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.7 }}
                >
                    <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 bg-clip-text text-transparent mb-4">
                        Choose Your Template
                    </h1>
                    <p className="text-lg text-amber-200/60 max-w-xl mx-auto">
                        Professionally designed one-page websites for your business. Pick a style, customize your content, and publish.
                    </p>
                </motion.div>
            </section>

            {/* Category filters */}
            <section className="relative z-10 px-6 pb-10">
                <div className="max-w-5xl mx-auto">
                    <div className="flex flex-wrap gap-2 justify-center">
                        {CATEGORIES.map((cat) => (
                            <button
                                key={cat.slug ?? "_all"}
                                onClick={() => setActiveCategory(cat.slug)}
                                className={`px-4 py-1.5 rounded-full text-sm font-medium transition-all ${
                                    activeCategory === cat.slug
                                        ? "bg-amber-200 text-gray-900"
                                        : "border border-amber-200/30 text-amber-200/60 hover:border-amber-200/70 hover:text-amber-200"
                                }`}
                            >
                                {cat.label}
                            </button>
                        ))}
                    </div>
                </div>
            </section>

            {/* Template grid */}
            <section className="relative z-10 px-6 pb-24">
                <div className="max-w-6xl mx-auto">
                    {filtered.length === 0 ? (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            className="text-center py-24"
                        >
                            <div className="w-16 h-16 rounded-full border border-amber-200/20 flex items-center justify-center mx-auto mb-4">
                                <svg className="w-7 h-7 text-amber-200/30" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                            <p className="text-amber-200/50 font-medium">No templates for this category yet.</p>
                            <p className="text-amber-200/30 text-sm mt-1">More designs coming soon.</p>
                            <button
                                onClick={() => setActiveCategory(null)}
                                className="mt-6 text-sm text-amber-200/60 border border-amber-200/30 px-4 py-2 rounded-lg hover:border-amber-200/60 hover:text-amber-200 transition"
                            >
                                View all templates
                            </button>
                        </motion.div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                            {filtered.map((template, i) => (
                                <motion.div
                                    key={template.key}
                                    initial={{ opacity: 0, y: 24 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 0.5, delay: i * 0.08 }}
                                >
                                    <TemplateCard template={template} onPreview={handlePreview} />
                                </motion.div>
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Preview Modal */}
            <TemplatePreviewModal
                template={selectedTemplate}
                templates={filtered}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTemplateChange={setSelectedTemplate}
            />
        </main>
    );
}
