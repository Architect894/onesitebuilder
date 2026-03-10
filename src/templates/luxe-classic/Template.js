"use client";

import FadeIn from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

export default function LuxeClassicTemplate({
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
            {/* HERO - CENTERED ELEGANCE */}
            <section
                data-preview-section={isEditor ? "hero" : undefined}
                className="relative min-h-screen flex items-center justify-center border-b border-white/10"
                style={{ backgroundColor: sectionStyle.hero?.bg ?? "#000000" }}
            >
                <div className="mx-auto max-w-4xl px-6 text-center relative z-10">
                    {/* Top accent line */}
                    <motion.div
                        className="w-12 h-px mx-auto mb-8"
                        style={{ backgroundColor: heroAccentColor }}
                        initial={{ width: 0 }}
                        animate={{ width: 48 }}
                        transition={{ duration: 0.8 }}
                    />

                    <FadeIn delay={0.1}>
                        <p
                            className="text-xs uppercase tracking-[0.4em] font-light mb-6"
                            style={{ color: heroAccentColor }}
                            data-editable-field="content.hero.eyebrow"
                        >
                            {content.hero.eyebrow}
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <h1
                            className="text-7xl md:text-8xl font-serif font-light leading-tight mb-6 cursor-text hover:opacity-80 transition"
                            style={{ color: heroTextColor }}
                            data-editable-field="content.hero.headline"
                        >
                            {content.hero.headline}
                        </h1>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <p
                            className="text-lg md:text-xl font-light leading-relaxed mb-12 cursor-text hover:opacity-80 transition max-w-2xl mx-auto"
                            style={{ color: heroTextColor }}
                            data-editable-field="content.hero.subheadline"
                        >
                            {content.hero.subheadline}
                        </p>
                    </FadeIn>

                    {/* Bottom accent line */}
                    <motion.div
                        className="w-12 h-px mx-auto mb-12"
                        style={{ backgroundColor: heroAccentColor }}
                        initial={{ width: 0 }}
                        animate={{ width: 48 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                    />

                    <FadeIn delay={0.5}>
                        <motion.a
                            href={content.cta.href}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center px-12 py-4 rounded-sm text-xs uppercase tracking-[0.2em] font-light transition-all border"
                            style={{
                                color: ctaTextColor,
                                backgroundColor: ctaButtonColor,
                                borderColor: ctaButtonColor,
                            }}
                        >
                            {content.cta.label}
                        </motion.a>
                    </FadeIn>
                </div>
            </section>

            {/* ABOUT - TRADITIONAL LAYOUT */}
            <section
                data-preview-section={isEditor ? "about" : undefined}
                className="relative py-32 border-b border-white/10"
                style={{ backgroundColor: sectionStyle.about?.bg ?? "#0a0a0a" }}
            >
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid md:grid-cols-2 gap-20 items-start">
                        {/* Left: About Text */}
                        <FadeIn>
                            <div>
                                <motion.div
                                    className="w-1 h-12 mb-8"
                                    style={{ backgroundColor: heroAccentColor }}
                                    initial={{ height: 0 }}
                                    whileInView={{ height: 48 }}
                                    viewport={{ once: true }}
                                />

                                <p className="text-xs uppercase tracking-[0.3em] font-light mb-4" style={{ color: heroAccentColor }}>
                                    Our Legacy
                                </p>

                                <h2
                                    className="text-6xl font-serif font-light leading-tight mb-8 cursor-text hover:opacity-80 transition"
                                    style={{ color: aboutHeadingColor }}
                                    data-editable-field="content.about.title"
                                >
                                    {content.about.title}
                                </h2>

                                <p
                                    className="text-lg font-light leading-relaxed mb-12 cursor-text hover:opacity-80 transition"
                                    style={{ color: aboutBodyColor }}
                                    data-editable-field="content.about.body"
                                >
                                    {content.about.body}
                                </p>
                            </div>
                        </FadeIn>

                        {/* Right: Image */}
                        <FadeIn delay={0.1}>
                            <motion.div
                                className="relative aspect-square rounded-sm overflow-hidden border border-white/10"
                                whileHover={{ scale: 1.02 }}
                                transition={{ duration: 0.6 }}
                            >
                                <img
                                    src={content.gallery?.[0]?.url || "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800"}
                                    alt="About"
                                    className="w-full h-full object-cover"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent" />
                            </motion.div>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* SERVICES - MINIMALIST LIST */}
            <section className="relative py-32 border-b border-white/10" style={{ backgroundColor: sectionStyle.hero?.bg ?? "#000000" }}>
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid md:grid-cols-2 gap-20">
                        <FadeIn>
                            <div>
                                <p className="text-xs uppercase tracking-[0.3em] font-light mb-4" style={{ color: heroAccentColor }}>
                                    Expertise
                                </p>
                                <h2 className="text-5xl font-serif font-light leading-tight">
                                    Specializations
                                </h2>
                            </div>
                        </FadeIn>

                        <FadeIn delay={0.1}>
                            <ul className="space-y-8">
                                {content.services && content.services.map((service) => (
                                    <motion.li
                                        key={service}
                                        className="pb-8 border-b border-white/10 text-lg font-light cursor-text hover:opacity-80 transition"
                                        whileHover={{ x: 4 }}
                                    >
                                        {service}
                                    </motion.li>
                                ))}
                            </ul>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* PORTFOLIO - ELEVATED GRID */}
            <section
                data-preview-section={isEditor ? "gallery" : undefined}
                className="relative py-32 border-b border-white/10"
                style={{ backgroundColor: sectionStyle.about?.bg ?? "#0a0a0a" }}
            >
                <div className="mx-auto max-w-7xl px-6">
                    <FadeIn>
                        <div className="mb-20">
                            <motion.div
                                className="w-1 h-12 mb-6"
                                style={{ backgroundColor: heroAccentColor }}
                                initial={{ height: 0 }}
                                whileInView={{ height: 48 }}
                                viewport={{ once: true }}
                            />
                            <p className="text-xs uppercase tracking-[0.3em] font-light mb-4" style={{ color: heroAccentColor }}>
                                Portfolio
                            </p>
                            <h2 className="text-5xl font-serif font-light leading-tight">
                                Featured Works
                            </h2>
                        </div>
                    </FadeIn>

                    {/* Portfolio Grid */}
                    <div className="grid md:grid-cols-2 gap-8">
                        {content.gallery && content.gallery.map((image, i) => (
                            <motion.div
                                key={image.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: i * 0.1 }}
                                className="group relative aspect-video rounded-sm overflow-hidden border border-white/10 cursor-pointer"
                            >
                                <motion.img
                                    src={image.url}
                                    alt="Portfolio"
                                    className="w-full h-full object-cover"
                                    whileHover={{ scale: 1.05 }}
                                    transition={{ duration: 0.6 }}
                                />
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </section>

            {/* TESTIMONIALS/CREDENTIALS */}
            <section className="relative py-32 border-b border-white/10" style={{ backgroundColor: sectionStyle.hero?.bg ?? "#000000" }}>
                <div className="mx-auto max-w-6xl px-6">
                    <FadeIn>
                        <div className="text-center mb-20">
                            <motion.div
                                className="w-1 h-12 mx-auto mb-6"
                                style={{ backgroundColor: heroAccentColor }}
                                initial={{ height: 0 }}
                                whileInView={{ height: 48 }}
                                viewport={{ once: true }}
                            />
                            <p className="text-xs uppercase tracking-[0.3em] font-light mb-4" style={{ color: heroAccentColor }}>
                                Recognition
                            </p>
                            <h2 className="text-5xl font-serif font-light">
                                Awards & Recognition
                            </h2>
                        </div>
                    </FadeIn>

                    <div className="grid md:grid-cols-3 gap-12">
                        {[
                            { title: "Industry Leader", desc: "Recognized for excellence" },
                            { title: "Award Winner", desc: "International accolades" },
                            { title: "Trusted Partner", desc: "500+ satisfied clients" },
                        ].map((item, i) => (
                            <FadeIn key={item.title} delay={i * 0.1}>
                                <div className="text-center">
                                    <motion.div
                                        className="w-1 h-8 mx-auto mb-6"
                                        style={{ backgroundColor: heroAccentColor }}
                                        initial={{ height: 0 }}
                                        whileInView={{ height: 32 }}
                                        viewport={{ once: true }}
                                    />
                                    <h3 className="text-xl font-serif font-light mb-2">{item.title}</h3>
                                    <p className="text-neutral-400 text-sm font-light">{item.desc}</p>
                                </div>
                            </FadeIn>
                        ))}
                    </div>
                </div>
            </section>

            {/* CTA SECTION */}
            <section className="relative py-32 border-b border-white/10" style={{ backgroundColor: sectionStyle.about?.bg ?? "#0a0a0a" }}>
                <div className="mx-auto max-w-3xl px-6 text-center">
                    <FadeIn>
                        <motion.div
                            className="w-1 h-12 mx-auto mb-8"
                            style={{ backgroundColor: heroAccentColor }}
                            initial={{ height: 0 }}
                            whileInView={{ height: 48 }}
                            viewport={{ once: true }}
                        />
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <h2 className="text-6xl font-serif font-light mb-8">
                            Let's Create Together
                        </h2>
                    </FadeIn>

                    <FadeIn delay={0.2}>
                        <p className="text-lg font-light text-neutral-400 mb-12">
                            We'd love to discuss your vision
                        </p>
                    </FadeIn>

                    <FadeIn delay={0.3}>
                        <motion.a
                            href={content.cta.href}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="inline-flex items-center justify-center px-12 py-4 rounded-sm text-xs uppercase tracking-[0.2em] font-light transition-all border"
                            style={{
                                color: ctaTextColor,
                                backgroundColor: ctaButtonColor,
                                borderColor: ctaButtonColor,
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
                className="relative py-24 border-t border-white/10"
                style={{ backgroundColor: sectionStyle.footer?.bg ?? "#000000" }}
            >
                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid md:grid-cols-4 gap-12 mb-16 pb-16 border-b border-white/10">
                        <div>
                            <p className="font-serif font-light text-xl mb-2">{site.name}</p>
                            <p className="text-neutral-500 text-sm font-light">
                                Timeless elegance and exceptional craftsmanship
                            </p>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] font-light mb-6" style={{ color: heroAccentColor }}>
                                Contact
                            </p>
                            {content.contact?.email && (
                                <a href={`mailto:${content.contact.email}`} className="text-sm font-light text-neutral-400 hover:text-white transition block mb-2">
                                    {content.contact.email}
                                </a>
                            )}
                            {content.contact?.phone && (
                                <a href={`tel:${content.contact.phone}`} className="text-sm font-light text-neutral-400 hover:text-white transition">
                                    {content.contact.phone}
                                </a>
                            )}
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] font-light mb-6" style={{ color: heroAccentColor }}>
                                Navigate
                            </p>
                            <ul className="space-y-2">
                                <li><a href="#" className="text-sm font-light text-neutral-400 hover:text-white transition">Home</a></li>
                                <li><a href="#" className="text-sm font-light text-neutral-400 hover:text-white transition">About</a></li>
                                <li><a href="#" className="text-sm font-light text-neutral-400 hover:text-white transition">Work</a></li>
                            </ul>
                        </div>

                        <div>
                            <p className="text-xs uppercase tracking-[0.2em] font-light mb-6" style={{ color: heroAccentColor }}>
                                Social
                            </p>
                            {content.social && (
                                <div className="flex flex-col gap-2">
                                    {content.social.instagram && (
                                        <a href={content.social.instagram} target="_blank" rel="noopener noreferrer" className="text-sm font-light text-neutral-400 hover:text-white transition">
                                            Instagram
                                        </a>
                                    )}
                                    {content.social.tiktok && (
                                        <a href={content.social.tiktok} target="_blank" rel="noopener noreferrer" className="text-sm font-light text-neutral-400 hover:text-white transition">
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
