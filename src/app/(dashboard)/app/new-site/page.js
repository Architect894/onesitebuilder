"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

const TemplateCard = ({ template, onSelect }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            whileHover={{ scale: 1.02 }}
            className="group cursor-pointer"
            onClick={() => onSelect(template)}
        >
            <div className="rounded-2xl overflow-hidden border border-amber-200/20 bg-gray-900/50 backdrop-blur-sm transition hover:border-amber-200/40">
                {/* Template Preview */}
                <div className="relative h-64 bg-black">
                    <div className="absolute inset-0 flex items-center justify-center">
                        <div className="text-center">
                            <div className="text-5xl mb-4">✨</div>
                            <p className="text-amber-200/60">{template.name}</p>
                        </div>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6">
                    <h3 className="text-xl font-semibold text-amber-200">
                        {template.name}
                    </h3>
                    <p className="text-sm text-amber-200/60 mt-2">
                        {template.description}
                    </p>

                    {/* CTA Button */}
                    <motion.button
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        className="mt-6 w-full py-3 rounded-lg bg-gradient-to-r from-amber-100 to-amber-200 text-gray-900 text-sm font-bold transition"
                    >
                        Choose This Template
                    </motion.button>
                </div>
            </div>
        </motion.div>
    );
};

export default function NewSitePage() {
    const router = useRouter();
    const [templates, setTemplates] = useState([]);
    const [loading, setLoading] = useState(true);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [showForm, setShowForm] = useState(false);
    const [formData, setFormData] = useState({
        name: "",
        subdomain: "",
    });
    const [error, setError] = useState("");
    const [creating, setCreating] = useState(false);

    useEffect(() => {
        const fetchTemplates = async () => {
            try {
                const response = await fetch("/api/templates");
                const data = await response.json();
                setTemplates(data.templates || []);
            } catch (err) {
                setError("Failed to load templates");
            } finally {
                setLoading(false);
            }
        };

        fetchTemplates();
    }, []);

    const handleSelectTemplate = (template) => {
        setSelectedTemplate(template);
        setShowForm(true);
    };

    const handleCreateSite = async (e) => {
        e.preventDefault();
        setError("");
        setCreating(true);

        try {
            const response = await fetch("/api/sites", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    name: formData.name,
                    subdomain: formData.subdomain,
                    templateKey: selectedTemplate.key,
                    status: "draft",
                    branding: {
                        primaryColor: selectedTemplate.defaults?.branding?.primaryColor || "#d4a574",
                        accentColor: selectedTemplate.defaults?.branding?.accentColor || "#f1c886",
                        neutralColor: selectedTemplate.defaults?.branding?.neutralColor || "#000000",
                    },
                    content: {
                        hero: {
                            logo: null,
                            eyebrow: "Welcome to your site",
                            headline: formData.name,
                            subheadline: "Create something amazing",
                        },
                        about: {
                            title: "About",
                            body: "Tell your story here.",
                        },
                        services: ["Service 1", "Service 2", "Service 3"],
                        gallery: [
                            {
                                id: "1",
                                url: "https://images.unsplash.com/photo-1579783902614-e3fb5141b0cb?w=500&h=500&fit=crop",
                            },
                            {
                                id: "2",
                                url: "https://images.unsplash.com/photo-1516321318423-f06f70a504f0?w=500&h=500&fit=crop",
                            },
                            {
                                id: "3",
                                url: "https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=500&h=500&fit=crop",
                            },
                        ],
                        cta: {
                            label: "Get Started",
                            href: "https://example.com",
                        },
                    },
                    links: {
                        instagram: "",
                        facebook: "",
                        tiktok: "",
                    },
                }),
            });

            if (!response.ok) {
                const data = await response.json();
                throw new Error(data.error || "Failed to create site");
            }

            const { site } = await response.json();
            router.push(`/app/sites/${site.id}`);
        } catch (err) {
            setError(err.message || "Failed to create site");
        } finally {
            setCreating(false);
        }
    };

    return (
        <div className="space-y-12">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
            >
                <h1 className="text-4xl md:text-5xl font-bold bg-gradient-to-r from-amber-100 via-amber-200 to-amber-100 bg-clip-text text-transparent">
                    Choose Your Template
                </h1>
                <p className="text-amber-200/70 mt-4 text-lg">
                    Select a template below to get started with your new site.
                </p>
            </motion.div>

            {loading ? (
                <div className="text-center py-12">
                    <p className="text-amber-200/60">Loading templates...</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {templates.map((template) => (
                        <TemplateCard
                            key={template.key}
                            template={template}
                            onSelect={handleSelectTemplate}
                        />
                    ))}
                </div>
            )}

            {/* Site Creation Form Modal */}
            {showForm && selectedTemplate && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50"
                    onClick={() => setShowForm(false)}
                >
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ duration: 0.3 }}
                        className="bg-gray-900 border border-amber-200/20 rounded-2xl p-8 max-w-md w-full mx-4"
                        onClick={(e) => e.stopPropagation()}
                    >
                        <h2 className="text-2xl font-bold text-amber-200 mb-2">
                            Create New Site
                        </h2>
                        <p className="text-amber-200/60 text-sm mb-6">
                            Using {selectedTemplate.name} template
                        </p>

                        {error && (
                            <div className="bg-red-500/20 border border-red-500/50 rounded-lg p-3 mb-4">
                                <p className="text-red-200 text-sm">{error}</p>
                            </div>
                        )}

                        <form onSubmit={handleCreateSite} className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-amber-200 mb-2">
                                    Site Name
                                </label>
                                <input
                                    type="text"
                                    required
                                    placeholder="My Awesome Site"
                                    className="w-full px-4 py-2 rounded-lg bg-gray-950 border border-amber-200/20 text-gray-100 placeholder-gray-600 outline-none focus:border-amber-200/60 transition"
                                    value={formData.name}
                                    onChange={(e) =>
                                        setFormData({ ...formData, name: e.target.value })
                                    }
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-amber-200 mb-2">
                                    Subdomain
                                </label>
                                <div className="flex items-center gap-2">
                                    <input
                                        type="text"
                                        required
                                        placeholder="myawesomesite"
                                        className="flex-1 px-4 py-2 rounded-lg bg-gray-950 border border-amber-200/20 text-gray-100 placeholder-gray-600 outline-none focus:border-amber-200/60 transition"
                                        value={formData.subdomain}
                                        onChange={(e) =>
                                            setFormData({
                                                ...formData,
                                                subdomain: e.target.value.toLowerCase(),
                                            })
                                        }
                                    />
                                    <span className="text-amber-200/60 text-sm">
                                        .simplpeek.app
                                    </span>
                                </div>
                                <p className="text-xs text-amber-200/50 mt-1">
                                    3-40 characters, lowercase and hyphens only
                                </p>
                            </div>

                            <div className="flex gap-3 pt-4">
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="button"
                                    onClick={() => setShowForm(false)}
                                    className="flex-1 py-2 rounded-lg border border-amber-200/40 text-amber-200 font-medium transition hover:bg-amber-200/10"
                                    disabled={creating}
                                >
                                    Cancel
                                </motion.button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    type="submit"
                                    className="flex-1 py-2 rounded-lg bg-gradient-to-r from-amber-100 to-amber-200 text-gray-900 font-bold transition"
                                    disabled={creating}
                                >
                                    {creating ? "Creating..." : "Create Site"}
                                </motion.button>
                            </div>
                        </form>
                    </motion.div>
                </motion.div>
            )}
        </div>
    );
}
