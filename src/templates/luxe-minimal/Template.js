"use client";

import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import FadeIn from "@/components/ui/FadeIn";

export default function LuxeMinimalTemplate({ site, branding, content, links, isEditor }) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) return null;

    const heroAccentColor = branding?.primaryColor || "#000000";
    const heroTextColor = branding?.neutralColor || "#000000";
    const ctaButtonColor = branding?.primaryColor || "#000000";
    const ctaTextColor = branding?.neutralColor || "#ffffff";

    return (
        <main
            className={`text-gray-900 overflow-hidden bg-white ${isEditor ? "builder-mode" : ""}`}
            suppressHydrationWarning
        >
            {/* HERO - MINIMAL ELEGANCE */}
            <section
                data-preview-section={isEditor ? "hero" : undefined}
                className="relative min-h-screen flex items-center justify-center px-6"
                style={{ backgroundColor: "#ffffff" }}
            >
                <div className="max-w-4xl mx-auto text-center">
                    <FadeIn delay={0.1}>
                        <h1
                            className="text-6xl md:text-8xl font-light leading-tight mb-12 cursor-text hover:opacity-70 transition"
                            style={{ color: heroTextColor }}
                            data-editable-field="content.hero.headline"
                        >
                            {content.hero.headline}
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <p
                            className="text-lg md:text-2xl font-light leading-relaxed mb-16 max-w-2xl mx-auto cursor-text hover:opacity-70 transition"
                            style={{ color: heroTextColor, opacity: 0.7 }}
                            data-editable-field="content.hero.subheadline"
                        >
                            {content.hero.subheadline}
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <motion.a
                            href={content.cta.href}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block px-12 py-4 text-sm font-light uppercase tracking-[0.3em] border-2 transition-all"
                            style={{
                                borderColor: heroAccentColor,
                                color: heroAccentColor,
                            }}
                        >
                            {content.cta.label}
                        </motion.a>
                    </FadeIn>
                </div>
            </section>

            {/* ABOUT - BREATHING SPACE */}
            <section
                data-preview-section={isEditor ? "about" : undefined}
                className="relative py-40 px-6 bg-white"
            >
                <div className="max-w-3xl mx-auto">
                    <FadeIn>
                        <h2
                            className="text-5xl md:text-6xl font-light leading-tight mb-16 cursor-text hover:opacity-70 transition"
                            style={{ color: heroTextColor }}
                            data-editable-field="content.about.title"
                        >
                            {content.about.title}
                        </h2>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <p
                            className="text-xl font-light leading-relaxed mb-8 cursor-text hover:opacity-70 transition"
                            style={{ color: heroTextColor, opacity: 0.7 }}
                            data-editable-field="content.about.body"
                        >
                            {content.about.body}
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* FEATURED IMAGE - FULL WIDTH BREATHING */}
            <section className="relative py-40 px-6 bg-white">
                <div className="max-w-5xl mx-auto">
                    <FadeIn>
                        <motion.img
                            src={content.gallery?.[0]?.url || "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?w=1000"}
                            alt="Featured"
                            className="w-full aspect-[4/3] object-cover mb-16"
                            whileHover={{ scale: 1.01 }}
                            transition={{ duration: 0.8 }}
                        />
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <p
                            className="text-base font-light text-center"
                            style={{ color: heroTextColor, opacity: 0.5 }}
                        >
                            Featured work
                        </p>
                    </FadeIn>
                </div>
            </section>

            {/* SERVICES - MINIMAL LIST */}
            <section className="relative py-40 px-6 bg-white border-t border-gray-200 border-opacity-50">
                <div className="max-w-3xl mx-auto">
                    <FadeIn>
                        <h2
                            className="text-4xl font-light mb-20 cursor-text hover:opacity-70 transition"
                            style={{ color: heroTextColor }}
                        >
                            Services
                        </h2>
                    </FadeIn>

                    <div className="space-y-12">
                        {content.services &&
                            content.services.map((service, i) => (
                                <FadeIn key={service} delay={i * 0.05}>
                                    <p
                                        className="text-lg font-light cursor-text hover:opacity-70 transition"
                                        style={{ color: heroTextColor, opacity: 0.8 }}
                                    >
                                        {service}
                                    </p>
                                </FadeIn>
                            ))}
                    </div>
                </div>
            </section>

            {/* GALLERY - GRID WITH SPACE */}
            <section
                data-preview-section={isEditor ? "gallery" : undefined}
                className="relative py-40 px-6 bg-white"
            >
                <div className="max-w-6xl mx-auto">
                    <FadeIn>
                        <h2
                            className="text-4xl font-light mb-20 cursor-text hover:opacity-70 transition"
                            style={{ color: heroTextColor }}
                        >
                            Work
                        </h2>
                    </FadeIn>

                    <div className="grid md:grid-cols-2 gap-12">
                        {content.gallery &&
                            content.gallery.map((image, i) => (
                                <motion.div
                                    key={image.id}
                                    initial={{ opacity: 0, y: 40 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: i * 0.1 }}
                                    className="group"
                                >
                                    <motion.img
                                        src={image.url}
                                        alt="Work"
                                        className="w-full aspect-square object-cover mb-6 cursor-pointer"
                                        whileHover={{ scale: 1.02 }}
                                        transition={{ duration: 0.6 }}
                                    />
                                    <p
                                        className="text-sm font-light text-center"
                                        style={{ color: heroTextColor, opacity: 0.5 }}
                                    >
                                        Project {i + 1}
                                    </p>
                                </motion.div>
                            ))}
                    </div>
                </div>
            </section>

            {/* FINAL CTA - BREATHER */}
            <section className="relative py-40 px-6 bg-white border-t border-gray-200 border-opacity-50">
                <div className="max-w-2xl mx-auto text-center">
                    <FadeIn>
                        <h2
                            className="text-5xl md:text-6xl font-light leading-tight mb-12 cursor-text hover:opacity-70 transition"
                            style={{ color: heroTextColor }}
                        >
                            Ready to start?
                        </h2>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <motion.a
                            href={content.cta.href}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-block px-12 py-4 text-sm font-light uppercase tracking-[0.3em] border-2 transition-all"
                            style={{
                                borderColor: ctaButtonColor,
                                color: ctaButtonColor,
                            }}
                        >
                            {content.cta.label}
                        </motion.a>
                    </FadeIn>
                </div>
            </section>

            {/* FOOTER - MINIMAL */}
            <footer
                data-preview-section={isEditor ? "footer" : undefined}
                className="relative py-20 px-6 bg-white border-t border-gray-200 border-opacity-50"
            >
                <div className="max-w-6xl mx-auto">
                    <div className="text-center mb-12">
                        <p
                            className="text-sm font-light"
                            style={{ color: heroTextColor, opacity: 0.5 }}
                        >
                            {site.name}
                        </p>
                    </div>

                    <div className="grid md:grid-cols-3 gap-12">
                        <div>
                            {content.contact?.email && (
                                <a
                                    href={`mailto:${content.contact.email}`}
                                    className="block text-sm font-light transition"
                                    style={{ color: heroTextColor, opacity: 0.7 }}
                                >
                                    {content.contact.email}
                                </a>
                            )}
                        </div>

                        <div>
                            {content.contact?.phone && (
                                <a
                                    href={`tel:${content.contact.phone}`}
                                    className="block text-sm font-light transition"
                                    style={{ color: heroTextColor, opacity: 0.7 }}
                                >
                                    {content.contact.phone}
                                </a>
                            )}
                        </div>

                        <div>
                            {content.social && (
                                <div className="flex justify-center md:justify-end gap-6">
                                    {content.social.instagram && (
                                        <a
                                            href={content.social.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-light transition"
                                            style={{ color: heroTextColor, opacity: 0.7 }}
                                        >
                                            Instagram
                                        </a>
                                    )}
                                    {content.social.twitter && (
                                        <a
                                            href={content.social.twitter}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-sm font-light transition"
                                            style={{ color: heroTextColor, opacity: 0.7 }}
                                        >
                                            Twitter
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div
                        className="text-center text-xs font-light mt-20 pt-12 border-t border-gray-200 border-opacity-50"
                        style={{ color: heroTextColor, opacity: 0.4 }}
                    >
                        © {new Date().getFullYear()} {site.name}. All rights reserved.
                    </div>
                </div>
            </footer>
        </main>
    );
}
