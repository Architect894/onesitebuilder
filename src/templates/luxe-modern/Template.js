"use client";

import FadeIn from "@/components/ui/FadeIn";
import {
    motion,
    useScroll,
    useSpring,
    useTransform,
    useReducedMotion,
} from "framer-motion";
import { useMemo, useRef } from "react";

export default function LuxeModernTemplate({
    site,
    branding,
    content,
    links,
    isEditor = false,
}) {
    const reduceMotion = useReducedMotion();

    const pageRef = useRef(null);

    const { scrollYProgress } = useScroll({
        target: pageRef,
        offset: ["start start", "end end"],
    });

    const progress = useSpring(scrollYProgress, {
        stiffness: 120,
        damping: 25,
    });

    const heroFloat = useTransform(progress, [0, 0.3], [0, -30]);

    const galleryRef = useRef(null);

    const { scrollYProgress: galleryProgress } = useScroll({
        target: galleryRef,
        offset: ["start 0.9", "end 0.2"],
    });

    const gp = useSpring(galleryProgress, {
        stiffness: 150,
        damping: 28,
    });

    const collagePresets = useMemo(
        () => [
            { x: -100, y: 80, r: -10 },
            { x: 80, y: 110, r: 8 },
            { x: 120, y: -60, r: 12 },
            { x: -70, y: -100, r: -12 },
            { x: 60, y: 40, r: 6 },
            { x: -120, y: 30, r: -8 },
        ],
        []
    );

    return (
        <main
            ref={pageRef}
            className={`relative text-white overflow-hidden ${isEditor ? "builder-mode" : ""
                }`}
        >
            {/* HERO */}

            <section
                data-preview-section={isEditor ? "hero" : undefined}
                className="py-48 border-b border-white/10"
            >
                <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-20 items-center">
                    <motion.img
                        src={content.hero.logo}
                        alt={site.name}
                        className="w-72 md:w-80"
                        style={{ y: heroFloat }}
                    />

                    <div>
                        <FadeIn>
                            <p
                                className="uppercase tracking-[0.35em] text-xs"
                                style={{ color: branding.accentColor }}
                            >
                                {content.hero.eyebrow}
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.2}>
                            <h1 className="mt-8 text-5xl font-semibold leading-tight">
                                {content.hero.headline}
                            </h1>
                        </FadeIn>

                        <FadeIn delay={0.3}>
                            <p className="mt-8 text-neutral-400 text-lg">
                                {content.hero.subheadline}
                            </p>
                        </FadeIn>

                        <FadeIn delay={0.4}>
                            <motion.a
                                href={content.cta.href}
                                whileHover={{ scale: 1.06 }}
                                className="mt-10 inline-flex px-10 py-4 rounded-full text-sm font-medium"
                                style={{ backgroundColor: branding.primaryColor }}
                            >
                                {content.cta.label}
                            </motion.a>
                        </FadeIn>
                    </div>
                </div>
            </section>

            {/* ABOUT */}

            <section
                data-preview-section={isEditor ? "about" : undefined}
                className="py-32 border-b border-white/10"
            >
                <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-16">
                    <FadeIn>
                        <div>
                            <h2 className="text-3xl font-semibold">
                                {content.about.title}
                            </h2>

                            <p className="mt-6 text-neutral-400 text-lg">
                                {content.about.body}
                            </p>
                        </div>
                    </FadeIn>

                    <div
                        className="rounded-3xl p-10 border border-white/10"
                        style={{ backgroundColor: branding.neutralColor }}
                    >
                        <p className="uppercase text-xs tracking-[0.3em]">Services</p>

                        <ul className="mt-8 space-y-6">
                            {content.services.map((service) => (
                                <li
                                    key={service}
                                    className="border-b border-white/10 pb-4"
                                >
                                    {service}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            {/* GALLERY */}

            <section
                ref={galleryRef}
                data-preview-section={isEditor ? "gallery" : undefined}
                className="py-32 border-b border-white/10"
            >
                <div className="mx-auto max-w-6xl px-6">
                    <h2 className="text-4xl font-semibold mb-16">
                        Recent moments
                    </h2>

                    <div className="grid md:grid-cols-3 gap-10">
                        {content.gallery.map((image, i) => {
                            const preset = collagePresets[i % collagePresets.length];

                            const x = useTransform(gp, [0, 1], [preset.x, 0]);
                            const y = useTransform(gp, [0, 1], [preset.y, 0]);
                            const rotate = useTransform(gp, [0, 1], [preset.r, 0]);

                            return (
                                <motion.div
                                    key={image.id}
                                    style={{ x, y, rotate }}
                                    className="rounded-3xl overflow-hidden border border-white/10"
                                >
                                    <img
                                        src={image.url}
                                        alt={site.name}
                                        className="w-full h-[340px] object-cover"
                                    />
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FOOTER */}

            <footer
                data-preview-section={isEditor ? "footer" : undefined}
                className="py-20 text-sm text-neutral-500"
            >
                <div className="mx-auto max-w-6xl px-6 flex justify-between">
                    <p>{site.name}</p>

                    <div className="flex gap-6">
                        <a href={links.instagram}>Instagram</a>
                        <a href={links.facebook}>Facebook</a>
                        <a href={links.tiktok}>TikTok</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}