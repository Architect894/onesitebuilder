"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SiteNav from "@/templates/shared/SiteNav";
import { useSiteScroll } from "@/templates/shared/useSiteScroll";
import SectionBackground, { getBgColor } from "@/templates/shared/SectionBackground";
import { SCENE_FADE, getSceneAnimation } from "@/templates/shared/sceneTransition";

const SECTIONS = ["hero", "about", "services", "gallery", "cta"];
const FADE = SCENE_FADE;

export default function LuxeMinimalTemplate({ site, branding, content, links, isEditor = false, editorPanel = null, onEditorPanelChange = null }) {
    const SCROLL_SECTIONS = new Set(["about", "services"]);
    const { view, switchView, containerRef, getScrollRef } = useSiteScroll(SECTIONS, { scrollSections: SCROLL_SECTIONS, isEditor });

    const switchViewRef = useRef(switchView);
    switchViewRef.current = switchView;

    useEffect(() => {
        if (!isEditor || !editorPanel) return;
        switchViewRef.current(editorPanel);
    }, [editorPanel, isEditor]);

    function sa(id) {
        return getSceneAnimation(SECTIONS, view, id);
    }

    const ss = content.sectionStyle ?? {};
    const hero = content.hero ?? {};
    const about = content.about ?? {};
    const cta = content.cta ?? {};
    const contact = content.contact ?? {};
    const social = content.social ?? {};
    const footer = content.footer ?? {};
    const services = content.services ?? [];
    const gallery = content.gallery ?? [];
    const servicesSection = content.servicesSection ?? {};
    const gallerySection = content.gallerySection ?? {};
    const featured = content.featured ?? {};

    const accent = branding?.accentColor ?? "#1a1a1a";
    const heroBg = getBgColor(ss.hero?.bg, "#fafafa");
    const aboutBg = getBgColor(ss.about?.bg, "#ffffff");
    const servicesBg = getBgColor(ss.services?.bg, "#fafafa");
    const galleryBg = getBgColor(ss.gallery?.bg, "#ffffff");
    const ctaBg = getBgColor(ss.cta?.bg, "#fafafa");

    /* Detect light or dark based on bg to choose text color */
    function textFor(bg) {
        if (!bg) return "#111111";
        const hex = bg.replace("#", "");
        const r = parseInt(hex.substring(0, 2), 16);
        const g = parseInt(hex.substring(2, 4), 16);
        const b = parseInt(hex.substring(4, 6), 16);
        const lum = (0.299 * r + 0.587 * g + 0.114 * b) / 255;
        return lum > 0.55 ? "#111111" : "#ffffff";
    }

    const heroText = textFor(heroBg);
    const aboutText = textFor(aboutBg);
    const servicesText = textFor(servicesBg);
    const ctaText = textFor(ctaBg);

    /* ── Section renderers ── */

    function renderHero() {
        return (
            <div
                className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden px-12"
                style={{ backgroundColor: heroBg }}
                data-preview-section="hero"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.hero.bg"
                data-edit-label="Hero Background"
            >
                <SectionBackground value={ss.hero?.bg} />
                {/* Accent dot — top left */}
                <div
                    className="absolute top-10 left-10 w-8 h-8 rounded-full opacity-80"
                    style={{ backgroundColor: accent }}
                />

                <div className="max-w-4xl w-full text-left">
                    {/* Site name — small */}
                    <p
                        className="text-[11px] uppercase tracking-[0.5em] mb-8 font-medium"
                        style={{ color: `${heroText}40` }}
                    >
                        {site?.name ?? ""}
                    </p>

                    {/* Massive headline */}
                    <h1
                        className="font-black leading-[0.88] tracking-tighter mb-8"
                        style={{ fontSize: "clamp(4rem, 10vw, 10rem)", color: hero.textColor ?? heroText }}
                        data-edit-type="text"
                        data-edit-field="content.hero.headline"
                        data-edit-label="Headline"
                        data-edit-color-field="content.hero.textColor"
                    >
                        {hero.headline}
                    </h1>

                    <div className="flex items-end justify-between gap-12">
                        <p
                            className="text-base leading-relaxed max-w-sm"
                            style={{ color: hero.subheadlineColor ?? `${hero.textColor ?? heroText}60` }}
                            data-edit-type="textarea"
                            data-edit-field="content.hero.subheadline"
                            data-edit-label="Subheadline"
                            data-edit-color-field="content.hero.subheadlineColor"
                        >
                            {hero.subheadline}
                        </p>

                        <a
                            href={isEditor ? undefined : (hero.buttonHref || "#")}
                            className="flex-shrink-0 inline-flex items-center gap-3 text-sm font-semibold tracking-[0.15em] uppercase transition-all duration-300 group"
                            style={{ color: hero.buttonTextColor ?? accent }}
                            data-edit-type="url"
                            data-edit-field="content.hero.buttonHref"
                            data-edit-label="Hero Button Link"
                        >
                            <span
                                data-edit-type="text"
                                data-edit-field="content.hero.buttonLabel"
                                data-edit-label="Hero Button Text"
                            >
                                {hero.buttonLabel ?? "Get Started"}
                            </span>
                            <svg
                                className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"
                                viewBox="0 0 16 16" fill="none"
                            >
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                </div>

                {/* Bottom thin line */}
                <div
                    className="absolute bottom-0 left-10 right-10 h-px"
                    style={{ backgroundColor: `${heroText}10` }}
                />

                {/* Scroll hint */}
                <div
                    className="absolute bottom-7 right-10 text-[9px] uppercase tracking-[0.4em] pointer-events-none"
                    style={{ color: `${heroText}25` }}
                >
                    Scroll ↓
                </div>
            </div>
        );
    }

    function renderAbout() {
        const img = gallery[0]?.url ?? null;
        return (
            <div
                ref={isEditor ? undefined : getScrollRef("about")}
                className="relative w-full h-full overflow-y-auto"
                style={{ backgroundColor: aboutBg }}
                data-preview-section="about"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.about.bg"
                data-edit-label="About Background"
            >
                <SectionBackground value={ss.about?.bg} />
                {/* Accent bar — top */}
                <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: accent }}
                />

                <div
                    className={img ? "grid min-h-full" : "flex min-h-full items-center"}
                    style={img ? { gridTemplateColumns: "1fr 40%" } : {}}
                >
                {/* Left column */}
                <div className={`flex flex-col justify-center px-16 py-24 ${img ? "" : "max-w-2xl mx-auto"}`}>
                    <p
                        className="text-[13px] uppercase tracking-[0.4em] mb-6 font-semibold"
                        style={{ color: about.eyebrowColor ?? accent }}
                        data-edit-type="text"
                        data-edit-field="content.about.eyebrow"
                        data-edit-label="About Eyebrow"
                        data-edit-color-field="content.about.eyebrowColor"
                    >
                        {about.eyebrow ?? "About"}
                    </p>

                    <h2
                        className="font-black leading-tight mb-6"
                        style={{ fontSize: "clamp(2rem, 4.5vw, 4.5rem)", color: about.headingColor ?? aboutText }}
                        data-edit-type="text"
                        data-edit-field="content.about.title"
                        data-edit-label="About Title"
                        data-edit-color-field="content.about.headingColor"
                    >
                        {about.title}
                    </h2>

                    <p
                        className="text-base leading-loose max-w-[40ch]"
                        style={{ color: about.bodyColor ?? `${aboutText}60` }}
                        data-edit-type="textarea"
                        data-edit-field="content.about.body"
                        data-edit-label="About Description"
                        data-edit-color-field="content.about.bodyColor"
                    >
                        {about.body}
                    </p>
                </div>

                {/* Right: image, if available */}
                {img && (
                    <div className="sticky top-0 h-screen overflow-hidden self-start">
                        <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                            data-edit-type="image"
                            data-edit-field="content.gallery.0.url"
                            data-edit-label="About Image"
                        />
                        {/* subtle left fade */}
                        <div
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(to right, ${aboutBg} 0%, transparent 25%)` }}
                        />
                    </div>
                )}
                </div>
            </div>
        );
    }

    function renderServices() {
        return (
            <div
                ref={isEditor ? undefined : getScrollRef("services")}
                className="relative w-full h-full overflow-y-auto"
                style={{ backgroundColor: servicesBg }}
                data-preview-section="services"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.services.bg"
                data-edit-label="Services Background"
            >
                <SectionBackground value={ss.services?.bg} />
                <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: `${servicesText}08` }}
                />

                <div className="max-w-4xl w-full mx-auto px-16 py-24">
                    <div className="flex items-baseline justify-between mb-12">
                        <h2
                            className="font-black"
                            style={{ fontSize: "clamp(2rem, 5vw, 5rem)", color: servicesSection.headingColor ?? servicesText }}
                            data-edit-type="text"
                            data-edit-field="content.servicesSection.heading"
                            data-edit-label="Services Heading"
                            data-edit-color-field="content.servicesSection.headingColor"
                        >
                            {servicesSection.heading ?? "Services"}
                        </h2>
                        <span
                            className="text-[11px] uppercase tracking-[0.5em]"
                            style={{ color: accent }}
                        >
                            {services.length} offered
                        </span>
                    </div>

                    <div className="space-y-0">
                        {services.map((svc, i) => (
                            <div
                                key={i}
                                className="flex items-baseline gap-8 py-4 border-b"
                                style={{ borderColor: `${servicesText}08` }}
                            >
                                <span
                                    className="text-xs w-8 flex-shrink-0 font-bold"
                                    style={{ color: servicesSection.numberColor ?? accent }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span
                                    className="text-xl font-light flex-1"
                                    style={{ color: servicesSection.textColor ?? servicesText }}
                                    data-edit-type="text"
                                    data-edit-field={`content.services.${i}`}
                                    data-edit-label={`Service ${i + 1}`}
                                >
                                    {svc}
                                </span>
                                <svg className="w-4 h-4 opacity-15 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </div>
                        ))}
                        {services.length === 0 && (
                            <p className="text-sm py-4" style={{ color: `${servicesText}30` }}>No services added yet</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    function renderGallery() {
        const imgs = gallery.slice(0, 8);
        const galleryText = textFor(galleryBg);
        return (
            <div
                className="relative w-full h-full flex flex-col overflow-hidden"
                style={{ backgroundColor: galleryBg }}
                data-preview-section="gallery"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.gallery.bg"
                data-edit-label="Gallery Background"
            >
                <SectionBackground value={ss.gallery?.bg} />
                <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: `${galleryText}08` }}
                />

                <div className="flex-shrink-0 flex items-center justify-between px-14 pt-10 pb-5">
                    <h2
                        className="font-black"
                        style={{ fontSize: "clamp(1.5rem, 3vw, 3rem)", color: gallerySection.headingColor ?? galleryText }}
                        data-edit-type="text"
                        data-edit-field="content.gallerySection.heading"
                        data-edit-label="Gallery Heading"
                        data-edit-color-field="content.gallerySection.headingColor"
                    >
                        {gallerySection.heading ?? "Work"}
                    </h2>
                    <div
                        className="w-10 h-10 rounded-full flex items-center justify-center"
                        style={{ backgroundColor: accent }}
                    >
                        <svg className="w-5 h-5" viewBox="0 0 16 16" fill="none" style={{ color: textFor(accent) }}>
                            <rect x="2" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="9" y="2" width="5" height="5" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="2" y="9" width="5" height="5" stroke="currentColor" strokeWidth="1.5" />
                            <rect x="9" y="9" width="5" height="5" stroke="currentColor" strokeWidth="1.5" />
                        </svg>
                    </div>
                </div>

                <div className="flex-1 min-h-0 grid grid-cols-4 gap-1 px-14 pb-12">
                    {imgs.map((img, i) => (
                        <div key={img.id ?? i} className="relative overflow-hidden group">
                            <img
                                src={img.url}
                                alt=""
                                className="w-full h-full object-cover transition-opacity duration-500 group-hover:opacity-90"
                                data-edit-type="image"
                                data-edit-field={`content.gallery.${i}.url`}
                                data-edit-label={`Gallery Image ${i + 1}`}
                            />
                        </div>
                    ))}
                    {imgs.length === 0 && (
                        <div className="col-span-4 flex items-center justify-center text-sm tracking-widest uppercase" style={{ color: `${galleryText}20` }}>
                            Add gallery images
                        </div>
                    )}
                </div>
            </div>
        );
    }

    function renderCta() {
        return (
            <div
                className="relative w-full h-full flex flex-col items-start justify-center overflow-hidden px-16"
                style={{ backgroundColor: ctaBg }}
                data-preview-section="cta"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.cta.bg"
                data-edit-label="CTA Background"
            >
                <SectionBackground value={ss.cta?.bg} />
                <div
                    className="absolute top-0 left-0 right-0 h-0.5"
                    style={{ backgroundColor: `${ctaText}08` }}
                />
                <div
                    className="absolute left-0 top-0 bottom-0 w-1"
                    style={{ backgroundColor: accent }}
                />

                <div className="max-w-2xl pl-8">
                    <p
                        className="text-[13px] uppercase tracking-[0.4em] mb-6 font-semibold"
                        style={{ color: cta.eyebrowColor ?? accent }}
                        data-edit-type="text"
                        data-edit-field="content.cta.eyebrow"
                        data-edit-label="CTA Eyebrow"
                        data-edit-color-field="content.cta.eyebrowColor"
                    >
                        {cta.eyebrow ?? "Ready to start?"}
                    </p>

                    <h2
                        className="font-black leading-tight mb-8"
                        style={{ fontSize: "clamp(3rem, 8vw, 8rem)", color: cta.headingColor ?? ctaText }}
                        data-edit-type="text"
                        data-edit-field="content.cta.heading"
                        data-edit-label="CTA Heading"
                        data-edit-color-field="content.cta.headingColor"
                    >
                        {cta.heading ?? site?.name ?? ""}
                    </h2>

                    <div className="flex items-center gap-8 mb-10">
                        {contact.email && (
                            <a
                                href={isEditor ? undefined : `mailto:${contact.email}`}
                                className="text-sm tracking-wide transition-opacity hover:opacity-60"
                                style={{ color: `${ctaText}50` }}
                                data-edit-type="text"
                                data-edit-field="content.contact.email"
                                data-edit-label="Email"
                            >
                                {contact.email}
                            </a>
                        )}
                        {contact.phone && (
                            <a
                                href={isEditor ? undefined : `tel:${contact.phone}`}
                                className="text-sm tracking-wide transition-opacity hover:opacity-60"
                                style={{ color: `${ctaText}50` }}
                                data-edit-type="text"
                                data-edit-field="content.contact.phone"
                                data-edit-label="Phone"
                            >
                                {contact.phone}
                            </a>
                        )}
                    </div>

                    <a
                        href={isEditor ? undefined : (cta.href || "#")}
                        className="inline-flex items-center gap-3 text-sm font-semibold tracking-[0.2em] uppercase group transition-all duration-300"
                        style={{ color: cta.buttonTextColor ?? accent }}
                        data-edit-type="url"
                        data-edit-field="content.cta.href"
                        data-edit-label="CTA Button Link"
                    >
                        <span
                            data-edit-type="text"
                            data-edit-field="content.cta.label"
                            data-edit-label="CTA Button Text"
                        >
                            {cta.label ?? "Get in touch"}
                        </span>
                        <svg className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

                {/* Social + copyright bottom right */}
                <div className="absolute bottom-8 right-14 flex items-center gap-8">
                    {(isEditor || social.instagram || social.facebook || social.tiktok) && (
                        <div className="flex gap-4">
                            {(isEditor || social.instagram) && (
                                <a
                                    href={isEditor ? undefined : social.instagram}
                                    className="transition-opacity hover:opacity-60"
                                    style={{ color: `${ctaText}30` }}
                                    data-edit-type="url"
                                    data-edit-field="content.social.instagram"
                                    data-edit-label="Instagram URL"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="2" y="2" width="20" height="20" rx="5" />
                                        <circle cx="12" cy="12" r="4" />
                                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                                    </svg>
                                </a>
                            )}
                            {(isEditor || social.facebook) && (
                                <a
                                    href={isEditor ? undefined : social.facebook}
                                    className="transition-opacity hover:opacity-60"
                                    style={{ color: `${ctaText}30` }}
                                    data-edit-type="url"
                                    data-edit-field="content.social.facebook"
                                    data-edit-label="Facebook URL"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                    </svg>
                                </a>
                            )}
                            {(isEditor || social.tiktok) && (
                                <a
                                    href={isEditor ? undefined : social.tiktok}
                                    className="transition-opacity hover:opacity-60"
                                    style={{ color: `${ctaText}30` }}
                                    data-edit-type="url"
                                    data-edit-field="content.social.tiktok"
                                    data-edit-label="TikTok URL"
                                >
                                    <svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.35a8.28 8.28 0 004.83 1.53V6.44a4.85 4.85 0 01-1.06-.25h.05z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    )}
                    <p
                        className="text-[10px] tracking-widest"
                        style={{ color: footer.textColor ?? `${ctaText}20` }}
                        data-edit-type="textarea"
                        data-edit-field="content.footer.description"
                        data-edit-label="Footer Text"
                        data-edit-color-field="content.footer.textColor"
                    >
                        {footer.description ?? `© ${new Date().getFullYear()} ${site?.name ?? ""}`}
                    </p>
                </div>
            </div>
        );
    }

    /* ── EDITOR MODE ── */
    if (isEditor) {
        function nav(s) { switchView(s); onEditorPanelChange?.(s); }
        const idx = SECTIONS.indexOf(view);
        return (
            <main className="relative w-full h-full overflow-hidden" suppressHydrationWarning>
                {view === "hero" && renderHero()}
                {view === "about" && renderAbout()}
                {view === "services" && renderServices()}
                {view === "gallery" && renderGallery()}
                {view === "cta" && renderCta()}

                <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-black/75 backdrop-blur-md rounded-full px-3 py-2 border border-white/10 shadow-xl">
                    <button
                        onClick={() => idx > 0 && nav(SECTIONS[idx - 1])}
                        disabled={idx === 0}
                        className="w-5 h-5 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15 19l-7-7 7-7" /></svg>
                    </button>
                    <div className="flex items-center gap-1.5">
                        {SECTIONS.map((s) => (
                            <button key={s} onClick={() => nav(s)} title={s}
                                className={`rounded-full transition-all duration-200 ${s === view ? "w-4 h-1.5 bg-white" : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"}`}
                            />
                        ))}
                    </div>
                    <button
                        onClick={() => idx < SECTIONS.length - 1 && nav(SECTIONS[idx + 1])}
                        disabled={idx === SECTIONS.length - 1}
                        className="w-5 h-5 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                    >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M9 5l7 7-7 7" /></svg>
                    </button>
                </div>
            </main>
        );
    }

    /* ── LIVE MODE ── */
    return (
        <main ref={containerRef} className="relative h-screen overflow-hidden" suppressHydrationWarning>
            <SiteNav sections={SECTIONS} view={view} switchView={switchView} accent={accent} theme="light" />

            {SECTIONS.map((s) => (
                <motion.div
                    key={s}
                    animate={sa(s)}
                    transition={FADE}
                    className="absolute inset-0"
                    style={{ pointerEvents: s === view ? "auto" : "none" }}
                >
                    {s === "hero" && renderHero()}
                    {s === "about" && renderAbout()}
                    {s === "services" && renderServices()}
                    {s === "gallery" && renderGallery()}
                    {s === "cta" && renderCta()}
                </motion.div>
            ))}
        </main>
    );
}
