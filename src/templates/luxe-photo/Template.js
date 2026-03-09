"use client";

import FadeIn from "@/components/ui/FadeIn";
import { motion, useScroll, useSpring, useTransform, useReducedMotion } from "framer-motion";
import { useMemo, useRef } from "react";

export default function LuxePhotoTemplate({ site, branding, content, links }) {
    // Per-section backgrounds (editor can set these via schema + nested field ids)
    const sectionStyle = content.sectionStyle ?? {};
    const heroBg = sectionStyle.hero?.bg ?? "#000000";
    const aboutBg = sectionStyle.about?.bg ?? "#050505";
    const galleryBg = sectionStyle.gallery?.bg ?? "#000000";
    const footerBg = sectionStyle.footer?.bg ?? "#000000";

    const reduceMotion = useReducedMotion();

    // Global subtle motion layer for “premium feel”
    const pageRef = useRef(null);
    const { scrollYProgress: pageProgress } = useScroll({
        target: pageRef,
        offset: ["start start", "end end"],
    });

    const pg = useSpring(pageProgress, { stiffness: 120, damping: 25, mass: 0.6 });
    const washY = useTransform(pg, [0, 1], [0, -120]);
    const washOpacity = useTransform(pg, [0, 0.25, 1], [0.18, 0.22, 0.18]);

    // Hero parallax polish
    const heroParallaxY = useTransform(pg, [0, 0.35], [0, -28]);
    const heroParallaxOpacity = useTransform(pg, [0, 0.22], [1, 0.92]);

    // Gallery section scroll progress for collage assembly
    const galleryRef = useRef(null);
    const { scrollYProgress: galleryProgress } = useScroll({
        target: galleryRef,
        offset: ["start 0.85", "end 0.15"],
    });
    const gp = useSpring(galleryProgress, { stiffness: 140, damping: 26, mass: 0.55 });

    const collagePresets = useMemo(
        () => [
            { x: -90, y: 70, r: -9, s: 0.92 },
            { x: 60, y: 110, r: 8, s: 0.92 },
            { x: 100, y: -50, r: 10, s: 0.92 },
            { x: -70, y: -90, r: -11, s: 0.92 },
            { x: 80, y: 35, r: 6, s: 0.92 },
            { x: -110, y: 25, r: -6, s: 0.92 },
        ],
        []
    );

    return (
        <main ref={pageRef} className="text-white">
            {/* Background wash layer */}
            <motion.div
                aria-hidden
                className="pointer-events-none fixed inset-0 -z-10"
                style={{
                    opacity: reduceMotion ? 0.14 : washOpacity,
                    transform: "translateZ(0)",
                }}
            >
                <motion.div
                    className="absolute inset-0"
                    style={{
                        y: reduceMotion ? 0 : washY,
                        background: `radial-gradient(circle at 20% 35%, ${branding.primaryColor}1f, transparent 60%),
                        radial-gradient(circle at 80% 30%, ${branding.accentColor}14, transparent 55%),
                        radial-gradient(circle at 55% 80%, ${branding.primaryColor}10, transparent 60%)`,
                    }}
                />
            </motion.div>

            {/* HERO */}
            <section
                data-preview-section="hero"
                className="relative overflow-hidden border-b border-white/10 py-48 scroll-mt-6"
                style={{ backgroundColor: heroBg }}
            >
                {/* Soft radial glow */}
                <motion.div
                    aria-hidden
                    className="pointer-events-none absolute inset-0"
                    style={{
                        opacity: reduceMotion ? 1 : heroParallaxOpacity,
                        y: reduceMotion ? 0 : heroParallaxY,
                        background: `radial-gradient(circle at 25% 40%, ${branding.primaryColor}22, transparent 65%)`,
                    }}
                />

                <div className="mx-auto max-w-6xl px-6">
                    <div className="grid items-center gap-20 md:grid-cols-2">
                        {/* LEFT — LOGO */}
                        <FadeIn delay={0.05}>
                            <div className="flex justify-center md:justify-start">
                                <img
                                    src={content.hero.logo}
                                    alt={site.name}
                                    className="w-56 object-contain opacity-95 md:w-72 lg:w-80"
                                />
                            </div>
                        </FadeIn>

                        {/* RIGHT — TEXT */}
                        <div className="max-w-xl">
                            <FadeIn delay={0.15}>
                                <p
                                    className="text-xs uppercase tracking-[0.35em] text-neutral-500"
                                    style={{ color: branding.accentColor }}
                                >
                                    {content.hero.eyebrow}
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.25}>
                                <h1 className="mt-8 text-4xl font-semibold tracking-tight leading-[1.15] md:text-5xl">
                                    {content.hero.headline}
                                </h1>
                            </FadeIn>

                            <FadeIn delay={0.35}>
                                <p className="mt-8 text-base leading-relaxed text-neutral-400 md:text-lg">
                                    {content.hero.subheadline}
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.45}>
                                <div className="mt-8">
                                    <a
                                        href={content.cta.href}
                                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-10 py-4 text-sm font-medium transition-colors duration-500"
                                        style={{
                                            backgroundColor: branding.primaryColor,
                                            color: "white",
                                        }}
                                    >
                                        {/* Continuous Sheen */}
                                        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                                            <span className="sheen absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                                        </span>

                                        {/* Center Burst */}
                                        <span className="pointer-events-none absolute inset-0 flex items-center justify-center">
                                            <span className="absolute h-0 w-0 rounded-full bg-white/20 opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:h-[300%] group-hover:w-[300%] group-hover:opacity-100" />
                                        </span>

                                        <span className="relative z-10">{content.cta.label}</span>
                                    </a>
                                </div>
                            </FadeIn>
                        </div>
                    </div>
                </div>
            </section>

            {/* ABOUT */}
            <section
                data-preview-section="about"
                className="relative border-b border-white/10 py-28 scroll-mt-6"
                style={{ backgroundColor: aboutBg }}
            >
                <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2">
                    <FadeIn>
                        <div>
                            <h2 className="text-3xl font-semibold tracking-tight">{content.about.title}</h2>
                            <p className="mt-6 text-lg leading-relaxed text-neutral-400">{content.about.body}</p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div
                            className="rounded-3xl border border-white/10 p-10"
                            style={{
                                backgroundColor: branding.neutralColor,
                                color: "white",
                            }}
                        >
                            <p className="text-md uppercase tracking-[0.25em] text-white">Services</p>

                            <ul className="mt-8 space-y-4 text-lg">
                                {content.services.map((service) => (
                                    <li key={service} className="border-b border-white/5 pb-4">
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* GALLERY — collage assembles on scroll */}
            <section
                ref={galleryRef}
                data-preview-section="gallery"
                className="relative border-b border-white/10 py-28 scroll-mt-6"
                style={{ backgroundColor: galleryBg }}
            >
                <div className="mx-auto max-w-6xl px-6">
                    {/* Header reveals with section scroll */}
                    <motion.div
                        style={
                            reduceMotion
                                ? { opacity: 1, y: 0 }
                                : {
                                    opacity: useTransform(gp, [0, 0.25], [0, 1]),
                                    y: useTransform(gp, [0, 1], [18, 0]),
                                }
                        }
                        className="mb-14"
                    >
                        <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Gallery</p>
                        <h2 className="mt-4 text-4xl font-semibold tracking-tight">Recent moments</h2>
                    </motion.div>

                    <div className="grid gap-8 md:grid-cols-3">
                        {content.gallery.map((image, i) => {
                            const preset = collagePresets[i % collagePresets.length];

                            const x = reduceMotion ? 0 : useTransform(gp, [0, 1], [preset.x, 0]);
                            const y = reduceMotion ? 0 : useTransform(gp, [0, 1], [preset.y, 0]);
                            const rotate = reduceMotion ? 0 : useTransform(gp, [0, 1], [preset.r, 0]);
                            const scale = reduceMotion ? 1 : useTransform(gp, [0, 1], [preset.s, 1]);
                            const opacity = reduceMotion ? 1 : useTransform(gp, [0, 0.35], [0, 1]);

                            // extra depth polish
                            const lift = reduceMotion ? 0 : useTransform(gp, [0, 1], [10, 0]);

                            return (
                                <motion.div
                                    key={image.id}
                                    style={{
                                        x,
                                        y,
                                        rotate,
                                        scale,
                                        opacity,
                                        transform: "translateZ(0)",
                                    }}
                                    className="group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 will-change-transform"
                                >
                                    <motion.img
                                        src={image.url}
                                        alt={site.name}
                                        className="h-[340px] w-full object-cover"
                                        style={{ y: lift }}
                                        whileHover={reduceMotion ? undefined : { scale: 1.03 }}
                                        transition={{ type: "spring", stiffness: 220, damping: 22 }}
                                    />

                                    {/* subtle gloss */}
                                    <div className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                                        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0" />
                                    </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer
                data-preview-section="footer"
                className="py-16 scroll-mt-6"
                style={{ backgroundColor: footerBg }}
            >
                <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
                    <p>{site.name}</p>
                    <div className="flex gap-6">
                        <a href={links.instagram} className="transition-colors hover:text-white">
                            Instagram
                        </a>
                        <a href={links.facebook} className="transition-colors hover:text-white">
                            Facebook
                        </a>
                        <a href={links.tiktok} className="transition-colors hover:text-white">
                            TikTok
                        </a>
                    </div>
                </div>
            </footer>

            {/* Optional: keep everything feeling “buttery” even if sheen class isn't globally defined */}
            <style jsx global>{`
        @keyframes simplepeek-sheen {
        0% {
            transform: translateX(-140%);
            opacity: 0;
        }
        15% {
            opacity: 1;
        }
        55% {
            opacity: 1;
        }
        100% {
            transform: translateX(340%);
            opacity: 0;
        }
        }
        .sheen {
        animation: simplepeek-sheen 2.8s cubic-bezier(0.22, 1, 0.36, 1) infinite;
        }
    `}</style>
        </main>
    );
}