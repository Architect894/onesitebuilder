"use client";

import FadeIn from "@/components/ui/FadeIn";
import { motion } from "framer-motion";
import { useState } from "react";

export default function LuxePhotoTemplate({
    site,
    branding,
    content,
    links,
    isEditor = false
}) {
    const [selectedImage, setSelectedImage] = useState(null);

    const sectionStyle = content.sectionStyle ?? {};
    const heroAccentColor = sectionStyle.hero?.accentColor ?? branding.primaryColor;
    const heroTextColor = content.hero?.textColor ?? "#ffffff";
    const ctaButtonColor = content.cta?.color ?? branding.primaryColor;
    const ctaTextColor = content.cta?.textColor ?? "#ffffff";

    const images = content.gallery || [];

    return (
        <main
            className={`text-white overflow-hidden ${isEditor ? "builder-mode" : ""}`}
            suppressHydrationWarning
        >
            {/* HERO - FULL WIDTH IMAGE WITH TEXT OVERLAY */}
            <section
                data-preview-section={isEditor ? "hero" : undefined}
                className="relative h-screen flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: sectionStyle.hero?.bg ?? "#000000" }}
            >
                {/* Animated Background Image */}
                <motion.div
                    className="absolute inset-0 w-full h-full"
                    initial={{ scale: 1.05, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    transition={{ duration: 1.2, ease: "easeOut" }}
                >
                    {images.length > 0 && (
                        <img
                            src={images[0].url}
                            alt="Hero Background"
                            className="w-full h-full object-cover"
                        />
                    )}
                    {/* Gradient Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/50 to-black/70" />
                </motion.div>

                {/* Logo */}
                <motion.div
                    className="absolute top-8 left-6 md:left-12 z-20"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                >
                    <img
                        src={content.hero.logo}
                        alt={site.name}
                        className="w-32 md:w-40 object-contain"
                    />
                </motion.div>

                {/* Hero Content - Centered */}
                <div className="relative z-10 max-w-3xl mx-auto px-6 text-center">
                    <FadeIn delay={0.3}>
                        <p
                            className="text-xs uppercase tracking-[0.4em] mb-6 font-light"
                            style={{ color: heroAccentColor }}
                            data-editable-field="content.hero.eyebrow"
                        >
                            {content.hero.eyebrow}
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.4}>
                        <h1
                            className="text-6xl md:text-7xl font-light tracking-tight leading-[1.1] mb-6 cursor-text hover:opacity-80 transition"
                            style={{ color: heroTextColor }}
                            data-editable-field="content.hero.headline"
                        >
                            {content.hero.headline}
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.5}>
                        <p
                            className="text-lg md:text-xl font-light leading-relaxed mb-12 cursor-text hover:opacity-80 transition max-w-2xl mx-auto"
                            style={{ color: heroTextColor }}
                            data-editable-field="content.hero.subheadline"
                        >
                            {content.hero.subheadline}
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.6}>
                        <motion.a
                            href={content.cta.href}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center px-12 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-medium transition-all duration-500"
                            style={{
                                backgroundColor: ctaButtonColor,
                                color: ctaTextColor,
                            }}
                        >
                            {content.cta.label}
                            <span className="ml-3">↓</span>
                        </motion.a>
                    </FadeIn>
                </div>

                {/* Scroll Indicator */}
                <motion.div
                    className="absolute bottom-8 left-1/2 -translate-x-1/2 z-10"
                    animate={{ y: [0, 8, 0] }}
                    transition={{ duration: 2, repeat: Infinity }}
                >
                    <div className="w-6 h-10 border border-white/40 rounded-full flex items-start justify-center p-2">
                        <div className="w-1 h-2 bg-white/60 rounded-full" />
                    </div>
                </motion.div>
            </section>

            {/* ABOUT - SPLIT LAYOUT WITH IMAGE & TEXT */}
            <section
                data-preview-section={isEditor ? "about" : undefined}
                className="relative py-32 border-b border-white/10"
                style={{ backgroundColor: sectionStyle.about?.bg ?? "#0a0a0a" }}
            >
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Text Side */}
                        <FadeIn>
                            <div>
                                <p
                                    className="text-xs uppercase tracking-[0.35em] mb-4 font-light"
                                    style={{ color: heroAccentColor }}
                                >
                                    ABOUT
                                </p>
                                <h2
                                    className="text-5xl font-light leading-tight mb-6 cursor-text hover:opacity-80 transition"
                                    style={{ color: content.about?.headingColor ?? "#ffffff" }}
                                    data-editable-field="content.about.title"
                                >
                                    {content.about.title}
                                </h2>

                                <p
                                    className="text-lg leading-relaxed font-light mb-8 cursor-text hover:opacity-80 transition"
                                    style={{ color: content.about?.bodyColor ?? "#d4d4d4" }}
                                    data-editable-field="content.about.body"
                                >
                                    {content.about.body}
                                </p>

                                {/* Services as Minimal List */}
                                <div className="space-y-4 mt-12">
                                    <p className="text-xs uppercase tracking-[0.3em] font-light text-neutral-500">
                                        WHAT WE DO
                                    </p>
                                    <ul className="space-y-3">
                                        {content.services && content.services.map((service) => (
                                            <li
                                                key={service}
                                                className="flex items-center gap-3 text-neutral-300 font-light hover:text-white transition"
                                            >
                                                <span
                                                    className="w-2 h-2 rounded-full"
                                                    style={{ backgroundColor: heroAccentColor }}
                                                />
                                                {service}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            </div>
                        </FadeIn>

                        {/* Image Side */}
                        <FadeIn delay={0.1}>
                            <motion.div
                                className="relative h-[500px] rounded-2xl overflow-hidden"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.6 }}
                            >
                                {images.length > 1 && (
                                    <img
                                        src={images[1].url}
                                        alt="Featured"
                                        className="w-full h-full object-cover"
                                    />
                                )}
                                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            </motion.div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* GALLERY - DYNAMIC MASONRY LAYOUT */}
            <section
                data-preview-section={isEditor ? "gallery" : undefined}
                className="relative py-32 border-b border-white/10"
                style={{ backgroundColor: sectionStyle.gallery?.bg ?? "#000000" }}
            >
                <div className="mx-auto max-w-7xl px-6">
                    <FadeIn>
                        <div className="mb-16">
                            <p className="text-xs uppercase tracking-[0.35em] mb-4 font-light text-neutral-500">
                                GALLERY
                            </p>
                            <h2 className="text-5xl font-light leading-tight">
                                Featured Work
                            </h2>
                        </div>
                    </FadeIn>

                    {/* Masonry Grid */}
                    <div className="grid md:grid-cols-3 gap-6 auto-rows-[300px]">
                        {images.map((image, i) => {
                            const isLarge = i % 5 === 0 || i % 5 === 3; // Every 5th or 4th is 2x size
                            return (
                                <motion.div
                                    key={image.id}
                                    className={`relative group rounded-lg overflow-hidden cursor-pointer ${
                                        isLarge ? "md:col-span-2 md:row-span-2" : ""
                                    }`}
                                    whileHover={{ scale: 0.98 }}
                                    onClick={() => setSelectedImage(image)}
                                >
                                    <img
                                        src={image.url}
                                        alt="Gallery"
                                        className="w-full h-full object-cover"
                                    />

                                    {/* Hover Overlay */}
                                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                        <motion.div
                                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                                            whileHover={{ scale: 1.1 }}
                                        >
                                            <div
                                                className="w-12 h-12 rounded-full flex items-center justify-center"
                                                style={{ backgroundColor: heroAccentColor }}
                                            >
                                                <span className="text-black font-bold">+</span>
                                            </div>
                                        </motion.div>
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>
            {/* STATS/HIGHLIGHTS SECTION */}
            <section className="relative py-32 border-b border-white/10" style={{ backgroundColor: sectionStyle.about?.bg ?? "#0a0a0a" }}>
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { label: "Projects Completed", value: "500+" },
                            { label: "Happy Clients", value: "1200+" },
                            { label: "Years Experience", value: "10+" },
                        ].map((stat, i) => (
                            <FadeIn delay={i * 0.15} key={stat.label}>
                                <div className="text-center">
                                    <p
                                        className="text-5xl md:text-6xl font-light mb-2"
                                        style={{ color: heroAccentColor }}
                                    >
                                        {stat.value}
                                    </p>
                                    <p className="text-neutral-400 uppercase text-xs tracking-[0.2em]">
                                        {stat.label}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="relative py-32 border-b border-white/10" style={{ backgroundColor: sectionStyle.hero?.bg ?? "#000000" }}>
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <FadeIn>
                        <p className="text-xs uppercase tracking-[0.35em] mb-6 font-light text-neutral-500">
                            READY TO WORK TOGETHER?
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <h2 className="text-6xl font-light mb-8">
                            Let's Create Something Amazing
                        </h2>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <motion.a
                            href={content.cta.href}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center px-12 py-4 rounded-full text-sm uppercase tracking-[0.2em] font-medium"
                            style={{
                                backgroundColor: ctaButtonColor,
                                color: ctaTextColor,
                            }}
                        >
                            Get In Touch
                        </motion.a>
                    </FadeIn>
                </div>
            </section>

            {/* FOOTER */}
            <footer
                data-preview-section={isEditor ? "footer" : undefined}
                className="py-16 border-t border-white/10"
                style={{ backgroundColor: sectionStyle.footer?.bg ?? "#000000" }}
            >
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid md:grid-cols-3 gap-12 mb-12 pb-12 border-b border-white/5">
                        <div>
                            <img
                                src={content.hero.logo}
                                alt={site.name}
                                className="w-24 mb-4"
                            />
                            <p className="text-neutral-400 text-sm font-light">
                                {site.name}
                            </p>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-neutral-600 mb-4 font-light">
                                CONTACT
                            </p>
                            {content.contact?.email && (
                                <a
                                    href={`mailto:${content.contact.email}`}
                                    className="text-neutral-300 hover:text-white transition text-sm font-light block"
                                >
                                    {content.contact.email}
                                </a>
                            )}
                            {content.contact?.phone && (
                                <a
                                    href={`tel:${content.contact.phone}`}
                                    className="text-neutral-300 hover:text-white transition text-sm font-light"
                                >
                                    {content.contact.phone}
                                </a>
                            )}
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] text-neutral-600 mb-4 font-light">
                                FOLLOW
                            </p>
                            {content.social && (
                                <div className="flex gap-4">
                                    {content.social.instagram && (
                                        <a
                                            href={content.social.instagram}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-neutral-400 hover:text-white transition text-sm font-light"
                                        >
                                            Instagram
                                        </a>
                                    )}
                                    {content.social.tiktok && (
                                        <a
                                            href={content.social.tiktok}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="text-neutral-400 hover:text-white transition text-sm font-light"
                                        >
                                            TikTok
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="text-center text-neutral-600 text-xs font-light">
                        © {new Date().getFullYear()} {site.name}. All rights reserved.
                    </div>
                </div>
            </footer>
        </main>
    );
}