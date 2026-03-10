"use client";

import FadeIn from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

export default function LuxeModernTemplate({
    site,
    branding,
    content,
    links,
    isEditor = false,
}) {
    const sectionStyle = content.sectionStyle ?? {};
    const heroAccentColor = sectionStyle.hero?.accentColor ?? branding.primaryColor;
    const heroTextColor = content.hero?.textColor ?? "#ffffff";
    const aboutHeadingColor = content.about?.headingColor ?? "#ffffff";
    const aboutBodyColor = content.about?.bodyColor ?? "#d4d4d4";
    const ctaButtonColor = content.cta?.color ?? branding.primaryColor;
    const ctaTextColor = content.cta?.textColor ?? "#ffffff";

    return (
        <main
            className={`text-white overflow-hidden ${isEditor ? "builder-mode" : ""}`}
            suppressHydrationWarning
        >
            {/* HERO - SPLIT LAYOUT WITH ACCENT */}
            <section
                data-preview-section={isEditor ? "hero" : undefined}
                className="relative py-32 border-b border-white/10"
                style={{ backgroundColor: sectionStyle.hero?.bg ?? "#000000" }}
            >
                <div className="mx-auto max-w-7xl px-6">
                    {/* Accent Line */}
                    <div
                        className="absolute left-0 top-0 bottom-0 w-1"
                        style={{ backgroundColor: heroAccentColor }}
                    />

                    <div className="grid md:grid-cols-2 gap-20 items-center">
                        {/* Content */}
                        <div className="relative z-10">
                            <FadeIn>
                                <p
                                    className="text-xs uppercase tracking-[0.4em] mb-4 font-semibold"
                                    style={{ color: heroAccentColor }}
                                    data-editable-field="content.hero.eyebrow"
                                >
                                    {content.hero.eyebrow}
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.1}>
                                <h1
                                    className="text-6xl md:text-7xl font-bold leading-tight mb-6 cursor-text hover:opacity-80 transition"
                                    style={{ color: heroTextColor }}
                                    data-editable-field="content.hero.headline"
                                >
                                    {content.hero.headline}
                                </h1>
                            </FadeIn>

                            <FadeIn delay={0.2}>
                                <p
                                    className="text-lg leading-relaxed mb-10 max-w-lg cursor-text hover:opacity-80 transition"
                                    style={{ color: aboutBodyColor }}
                                    data-editable-field="content.hero.subheadline"
                                >
                                    {content.hero.subheadline}
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.3}>
                                <motion.a
                                    href={content.cta.href}
                                    whileHover={{ scale: 1.06, x: 4 }}
                                    whileTap={{ scale: 0.95 }}
                                    className="inline-flex items-center justify-center px-8 py-3 rounded-sm text-sm font-semibold uppercase tracking-[0.15em] transition-all"
                                    style={{
                                        backgroundColor: ctaButtonColor,
                                        color: ctaTextColor,
                                    }}
                                >
                                    {content.cta.label}
                                </motion.a>
                            </FadeIn>
                        </div>

                        {/* Image */}
                        <motion.div
                            className="relative"
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="relative aspect-square rounded-lg overflow-hidden bg-neutral-900 border border-white/10">
                                <img
                                    src={content.gallery?.[0]?.url || content.hero.logo}
                                    alt="Hero"
                                    className="w-full h-full object-cover"
                                />
                            </div>
                            {/* Decorative Elements */}
                            <div
                                className="absolute -top-4 -right-4 w-24 h-24 border-2 rounded-lg pointer-events-none"
                                style={{ borderColor: heroAccentColor }}
                            />
                        </motion.div>
                    </div>
                </div>
            </section>

            {/* FEATURES - CARD GRID */}
            <section
                className="relative py-32 border-b border-white/10"
                style={{ backgroundColor: sectionStyle.about?.bg ?? "#0a0a0a" }}
            >
                <div className="mx-auto max-w-7xl px-6">
                    <FadeIn>
                        <div className="mb-16">
                            <p
                                className="text-xs uppercase tracking-[0.4em] mb-4 font-semibold"
                                style={{ color: heroAccentColor }}
                            >
                                WHY CHOOSE US
                            </p>
                            <h2 className="text-5xl font-bold leading-tight">
                                Key Features
                            </h2>
                        </div>
                    </FadeIn>

                    {/* Feature Cards */}
                    <div className="grid md:grid-cols-3 gap-8">
                        {content.services && content.services.map((service, i) => (
                            <FadeIn key={service} delay={i * 0.1}>
                                <motion.div
                                    whileHover={{ y: -4 }}
                                    className="group relative p-8 rounded-lg border border-white/10 hover:border-white/30 transition-all cursor-text"
                                    style={{ backgroundColor: "rgba(255,255,255,0.02)" }}
                                >
                                    {/* Card Number */}
                                    <div
                                        className="absolute top-6 right-6 w-10 h-10 rounded-full flex items-center justify-center text-xs font-bold"
                                        style={{
                                            backgroundColor: heroAccentColor,
                                            color: "#000000",
                                        }}
                                    >
                                        {i + 1}
                                    </div>

                                    <h3 className="text-xl font-semibold mb-4">{service}</h3>
                                    <p className="text-neutral-400 text-sm leading-relaxed">
                                        Discover what makes this feature essential for your success
                                    </p>

                                    {/* Hover Accent */}
                                    <div
                                        className="absolute bottom-0 left-0 h-1 w-full opacity-0 group-hover:opacity-100 transition-opacity"
                                        style={{ backgroundColor: heroAccentColor }}
                                    />
                                </motion.div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* ABOUT - TEXT + IMAGE */}
            <section
                data-preview-section={isEditor ? "about" : undefined}
                className="relative py-32 border-b border-white/10"
                style={{ backgroundColor: sectionStyle.hero?.bg ?? "#000000" }}
            >
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid md:grid-cols-2 gap-16 items-center">
                        {/* Image */}
                        <FadeIn>
                            <motion.div
                                whileHover={{ scale: 1.02 }}
                                className="rounded-lg overflow-hidden border border-white/10"
                            >
                                <img
                                    src={content.gallery?.[1]?.url || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"}
                                    alt="About"
                                    className="w-full h-[500px] object-cover"
                                />
                            </motion.div>
                        </FadeIn>

                        {/* Content */}
                        <FadeIn delay={0.1}>
                            <div>
                                <p
                                    className="text-xs uppercase tracking-[0.4em] mb-4 font-semibold"
                                    style={{ color: heroAccentColor }}
                                >
                                    OUR STORY
                                </p>
                                <h2
                                    className="text-5xl font-bold leading-tight mb-8 cursor-text hover:opacity-80 transition"
                                    style={{ color: aboutHeadingColor }}
                                    data-editable-field="content.about.title"
                                >
                                    {content.about.title}
                                </h2>

                                <p
                                    className="text-lg leading-relaxed mb-8 cursor-text hover:opacity-80 transition"
                                    style={{ color: aboutBodyColor }}
                                    data-editable-field="content.about.body"
                                >
                                    {content.about.body}
                                </p>

                                <motion.a
                                    href={content.cta.href}
                                    whileHover={{ x: 4 }}
                                    className="inline-flex items-center text-sm font-semibold uppercase tracking-[0.15em] group"
                                    style={{ color: heroAccentColor }}
                                >
                                    Learn More
                                    <span className="ml-2 transition-transform group-hover:translate-x-2">
                                        →
                                    </span>
                                </motion.a>
                            </div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* PORTFOLIO - SHOWCASE */}
            <section
                data-preview-section={isEditor ? "gallery" : undefined}
                className="relative py-32 border-b border-white/10"
                style={{ backgroundColor: sectionStyle.about?.bg ?? "#0a0a0a" }}
            >
                <div className="mx-auto max-w-7xl px-6">
                    <FadeIn>
                        <div className="mb-16">
                            <p
                                className="text-xs uppercase tracking-[0.4em] mb-4 font-semibold"
                                style={{ color: heroAccentColor }}
                            >
                                RECENT WORK
                            </p>
                            <h2 className="text-5xl font-bold leading-tight">
                                Our Portfolio
                            </h2>
                        </div>
                    </FadeIn>

                    {/* Portfolio Grid */}
                    <div className="grid md:grid-cols-2 gap-6">
                        {content.gallery && content.gallery.map((image, i) => (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                whileHover={{ scale: 0.98 }}
                                className="group relative aspect-video rounded-lg overflow-hidden cursor-pointer border border-white/10"
                            >
                                <img
                                    src={image.url}
                                    alt="Portfolio"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/40 transition-all duration-300 flex items-center justify-center">
                                    <span className="text-white font-semibold opacity-0 group-hover:opacity-100 transition">
                                        View Project
                                    </span>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* STATS */}
            <section className="relative py-32 border-b border-white/10" style={{ backgroundColor: sectionStyle.hero?.bg ?? "#000000" }}>
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid md:grid-cols-4 gap-8">
                        {[
                            { value: "1000+", label: "Happy Customers" },
                            { value: "50+", label: "Awards Won" },
                            { value: "15+", label: "Years Active" },
                            { value: "99%", label: "Satisfaction Rate" },
                        ].map((stat, i) => (
                            <FadeIn delay={i * 0.1} key={stat.label}>
                                <div className="text-center">
                                    <p
                                        className="text-5xl font-bold mb-2"
                                        style={{ color: heroAccentColor }}
                                    >
                                        {stat.value}
                                    </p>
                                    <p className="text-neutral-400 text-sm uppercase tracking-[0.15em]">
                                        {stat.label}
                                    </p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA */}
            <section className="relative py-32 border-b border-white/10" style={{ backgroundColor: sectionStyle.about?.bg ?? "#0a0a0a" }}>
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <FadeIn>
                        <h2 className="text-6xl font-bold mb-8">
                            Ready to Begin?
                        </h2>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <p className="text-lg text-neutral-400 mb-10">
                            Let's create something amazing together
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <motion.a
                            href={content.cta.href}
                            whileHover={{ scale: 1.06 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center px-10 py-4 rounded-sm text-sm font-semibold uppercase tracking-[0.15em]"
                            style={{
                                backgroundColor: ctaButtonColor,
                                color: ctaTextColor,
                            }}
                        >
                            {content.cta.label}
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
                <div className="mx-auto max-w-7xl px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-12 pb-12 border-b border-white/10">
                        <div>
                            <p className="font-semibold mb-4">{site.name}</p>
                            <p className="text-neutral-400 text-sm">
                                Modern solutions for modern problems
                            </p>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.15em] font-semibold mb-4">
                                Company
                            </p>
                            <ul className="space-y-2 text-sm text-neutral-400">
                                <li><a href="#" className="hover:text-white transition">About</a></li>
                                <li><a href="#" className="hover:text-white transition">Services</a></li>
                                <li><a href="#" className="hover:text-white transition">Work</a></li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.15em] font-semibold mb-4">
                                Contact
                            </p>
                            {content.contact?.email && (
                                <a href={`mailto:${content.contact.email}`} className="text-neutral-400 text-sm hover:text-white transition block">
                                    {content.contact.email}
                                </a>
                            )}
                            {content.contact?.phone && (
                                <a href={`tel:${content.contact.phone}`} className="text-neutral-400 text-sm hover:text-white transition">
                                    {content.contact.phone}
                                </a>
                            )}
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.15em] font-semibold mb-4">
                                Follow
                            </p>
                            {content.social && (
                                <div className="flex gap-3">
                                    {content.social.instagram && (
                                        <a href={content.social.instagram} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition">
                                            IG
                                        </a>
                                    )}
                                    {content.social.tiktok && (
                                        <a href={content.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-neutral-400 hover:text-white transition">
                                            TT
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="flex flex-col md:flex-row justify-between items-center gap-4 text-sm text-neutral-600">
                        <p>© {new Date().getFullYear()} {site.name}. All rights reserved.</p>
                        <div className="flex gap-6">
                            <a href="#" className="hover:text-neutral-300 transition">Privacy</a>
                            <a href="#" className="hover:text-neutral-300 transition">Terms</a>
                        </div>
                    </div>
                </div>
            </footer>
        </main>
    );
}