"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SiteNav from "@/templates/shared/SiteNav";
import { useSiteScroll } from "@/templates/shared/useSiteScroll";
import SectionBackground, { getBgColor } from "@/templates/shared/SectionBackground";
import { SCENE_FADE, getSceneAnimation } from "@/templates/shared/sceneTransition";

const SECTIONS = ["hero", "gallery", "about", "services", "cta"];
const FADE = SCENE_FADE;

export default function LuxePhotoTemplate({ site, branding, content, links, isEditor = false, editorPanel = null, onEditorPanelChange = null }) {
    const SCROLL_SECTIONS = new Set(["about", "services"]);
    const { view, switchView, containerRef, getScrollRef } = useSiteScroll(SECTIONS, { scrollSections: SCROLL_SECTIONS, isEditor });

    // Keep a stable ref to switchView so the effect below doesn't need it as a dep
    const switchViewRef = useRef(switchView);
    switchViewRef.current = switchView;

    // Sync external panel selection (SiteEditorClient section tabs → template view)
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
    const gallerySection = content.gallerySection ?? {};
    const servicesSection = content.servicesSection ?? {};

    const accent = ss.hero?.accentColor ?? branding?.accentColor ?? "#d4a574";
    const heroBg = getBgColor(ss.hero?.bg, "#0a0a0a");
    const galleryBg = getBgColor(ss.gallery?.bg, "#0f0f0f");
    const aboutBg = getBgColor(ss.about?.bg, "#0c0c0c");
    const ctaBg = getBgColor(ss.cta?.bg, "#111111");

    /* ── Section renderers (called as functions, not components) ── */

    function renderHero() {
        return (
            <div
                className="relative w-full h-full flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: heroBg }}
                data-preview-section="hero"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.hero.bg"
                data-edit-label="Hero Background"
            >
                <SectionBackground value={ss.hero?.bg} />
                {/* Background image */}
                {gallery[0]?.url && (
                    <div className="absolute inset-0">
                        <img src={gallery[0].url} alt="" className="w-full h-full object-cover" />
                        <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-black/55 to-black/85" />
                    </div>
                )}

                {/* Ambient accent glow */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 110%, ${accent}22 0%, transparent 60%)` }}
                />

                <div className="relative z-10 max-w-4xl mx-auto px-12 text-center">
                    {hero.logo && (
                        <img
                            src={hero.logo}
                            alt={site?.name ?? ""}
                            className="h-10 w-auto mx-auto mb-14 object-contain opacity-90"
                            data-edit-type="image"
                            data-edit-field="content.hero.logo"
                            data-edit-label="Logo"
                        />
                    )}

                    <p
                        className="text-[13px] uppercase tracking-[0.35em] mb-6 font-semibold"
                        style={{ color: accent }}
                        data-edit-type="text"
                        data-edit-field="content.hero.eyebrow"
                        data-edit-label="Eyebrow Text"
                        data-edit-color-field="content.sectionStyle.hero.accentColor"
                    >
                        {hero.eyebrow}
                    </p>

                    <h1
                        className="font-black leading-[0.92] tracking-tight mb-8"
                        style={{ fontSize: "clamp(3rem, 7.5vw, 7rem)", color: hero.textColor ?? "#ffffff" }}
                        data-edit-type="text"
                        data-edit-field="content.hero.headline"
                        data-edit-label="Headline"
                        data-edit-color-field="content.hero.textColor"
                    >
                        {hero.headline}
                    </h1>

                    <p
                        className="text-lg max-w-lg mx-auto mb-14 font-light leading-relaxed"
                        style={{ color: hero.subheadlineColor ?? `${hero.textColor ?? "#ffffff"}70` }}
                        data-edit-type="textarea"
                        data-edit-field="content.hero.subheadline"
                        data-edit-label="Subheadline"
                        data-edit-color-field="content.hero.subheadlineColor"
                    >
                        {hero.subheadline}
                    </p>

                    <a
                        href={isEditor ? undefined : (hero.buttonHref || "#")}
                        className="inline-flex items-center gap-3 px-10 py-4 text-sm font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:gap-5"
                        style={{ backgroundColor: hero.buttonColor ?? accent, color: hero.buttonTextColor ?? "#000000" }}
                        data-edit-type="url"
                        data-edit-field="content.hero.buttonHref"
                        data-edit-label="Hero Button Link"
                    >
                        <span
                            data-edit-type="text"
                            data-edit-field="content.hero.buttonLabel"
                            data-edit-label="Hero Button Text"
                        >
                            {hero.buttonLabel ?? "Book Now"}
                        </span>
                        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

                {/* bottom hint */}
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/20 pointer-events-none select-none">
                    <span className="text-[9px] tracking-[0.4em] uppercase">Scroll</span>
                    <motion.div animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
                </div>

                <div className="absolute bottom-0 inset-x-0 h-px" style={{ background: `linear-gradient(90deg, transparent, ${accent}40, transparent)` }} />
            </div>
        );
    }

    function renderGallery() {
        const imgs = gallery.slice(0, 6);
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
                <div className="flex-shrink-0 flex items-end justify-between px-12 pt-12 pb-6">
                    <div>
                        <p
                            className="text-[13px] uppercase tracking-[0.35em] mb-2 font-semibold"
                            style={{ color: accent }}
                            data-edit-type="text"
                            data-edit-field="content.gallerySection.eyebrow"
                            data-edit-label="Gallery Eyebrow"
                            data-edit-color-field="content.sectionStyle.hero.accentColor"
                        >
                            {gallerySection.eyebrow ?? "Portfolio"}
                        </p>
                        <h2
                            className="text-4xl font-black leading-tight"
                            style={{ color: gallerySection.headingColor ?? "#ffffff" }}
                            data-edit-type="text"
                            data-edit-field="content.gallerySection.title"
                            data-edit-label="Gallery Title"
                            data-edit-color-field="content.gallerySection.headingColor"
                        >
                            {gallerySection.title ?? "Featured Work"}
                        </h2>
                    </div>
                    <div className="w-20 h-px" style={{ backgroundColor: `${accent}50` }} />
                </div>

                <div className="flex-1 min-h-0 grid grid-cols-3 gap-1.5 px-12 pb-12">
                    {imgs.map((img, i) => (
                        <div key={img.id ?? i} className="relative overflow-hidden group">
                            <img
                                src={img.url}
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.04]"
                                data-edit-type="image"
                                data-edit-field={`content.gallery.${i}.url`}
                                data-edit-label={`Gallery Image ${i + 1}`}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                        </div>
                    ))}
                    {imgs.length === 0 && (
                        <div className="col-span-3 flex items-center justify-center text-white/15 text-sm tracking-widest uppercase">
                            Add gallery images to display portfolio
                        </div>
                    )}
                </div>
            </div>
        );
    }

    function renderAbout() {
        const img = gallery[1]?.url ?? gallery[0]?.url ?? null;
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
                <div
                    className={img ? "grid min-h-full" : "flex min-h-full items-center"}
                    style={img ? { gridTemplateColumns: "45% 1fr" } : {}}
                >
                {img && (
                    <div className="sticky top-0 h-screen overflow-hidden self-start">
                        <img
                            src={img}
                            alt=""
                            className="w-full h-full object-cover"
                            data-edit-type="image"
                            data-edit-field={`content.gallery.${gallery[1]?.url ? 1 : 0}.url`}
                            data-edit-label="About Image"
                        />
                        <div className="absolute inset-0 bg-black/30" />
                    </div>
                )}

                <div className={`flex flex-col justify-center ${img ? "px-16 py-24" : "max-w-2xl mx-auto px-16 py-24"}`}>
                    <div className="w-10 h-px mb-10" style={{ backgroundColor: accent }} />
                    <p
                        className="text-[13px] uppercase tracking-[0.35em] mb-4 font-semibold"
                        style={{ color: accent }}
                        data-edit-type="text"
                        data-edit-field="content.about.eyebrow"
                        data-edit-label="About Eyebrow"
                        data-edit-color-field="content.sectionStyle.hero.accentColor"
                    >
                        {about.eyebrow ?? "Our Story"}
                    </p>

                    <h2
                        className="text-4xl font-black leading-tight mb-6"
                        style={{ color: about.headingColor ?? "#ffffff" }}
                        data-edit-type="text"
                        data-edit-field="content.about.title"
                        data-edit-label="About Title"
                        data-edit-color-field="content.about.headingColor"
                    >
                        {about.title}
                    </h2>

                    <p
                        className="text-base leading-relaxed max-w-[40ch]"
                        style={{ color: about.bodyColor ?? "#a0a0a0" }}
                        data-edit-type="textarea"
                        data-edit-field="content.about.body"
                        data-edit-label="About Body"
                        data-edit-color-field="content.about.bodyColor"
                    >
                        {about.body}
                    </p>
                </div>
                </div>
            </div>
        );
    }

    function renderServices() {
        return (
            <div
                ref={isEditor ? undefined : getScrollRef("services")}
                className="relative w-full h-full overflow-y-auto"
                style={{ backgroundColor: getBgColor(ss.services?.bg, "#0a0a0a") }}
                data-preview-section="services"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.services.bg"
                data-edit-label="Services Background"
            >
                <SectionBackground value={ss.services?.bg} />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 80% 20%, ${accent}10 0%, transparent 55%)` }}
                />
                <div className="relative max-w-3xl w-full mx-auto px-12 py-24">
                    <p
                        className="text-[13px] uppercase tracking-[0.35em] mb-3 font-semibold"
                        style={{ color: servicesSection.eyebrowColor ?? accent }}
                        data-edit-type="text"
                        data-edit-field="content.servicesSection.eyebrow"
                        data-edit-label="Services Eyebrow"
                        data-edit-color-field="content.servicesSection.eyebrowColor"
                    >
                        {servicesSection.eyebrow ?? "What We Offer"}
                    </p>
                    <h2
                        className="text-4xl font-black mb-12"
                        style={{ color: servicesSection.headingColor ?? "#ffffff" }}
                        data-edit-type="text"
                        data-edit-field="content.servicesSection.heading"
                        data-edit-label="Services Heading"
                        data-edit-color-field="content.servicesSection.headingColor"
                    >
                        {servicesSection.heading ?? "Our Services"}
                    </h2>
                    <div className="space-y-0">
                        {services.map((svc, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-6 py-5 border-b border-white/8"
                            >
                                <span className="text-xs font-bold pt-0.5 flex-shrink-0 w-7" style={{ color: servicesSection.numberColor ?? accent }}>
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span
                                    className="text-base font-light leading-snug flex-1"
                                    style={{ color: servicesSection.textColor ?? "rgba(255,255,255,0.75)" }}
                                    data-edit-type="text"
                                    data-edit-field={`content.services.${i}`}
                                    data-edit-label={`Service ${i + 1}`}
                                >{svc}</span>
                            </div>
                        ))}
                        {services.length === 0 && (
                            <p className="text-white/20 text-sm py-4">No services added yet</p>
                        )}
                    </div>
                </div>
            </div>
        );
    }

    function renderCta() {
        return (
            <div
                className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
                style={{ backgroundColor: ctaBg }}
                data-preview-section="cta"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.cta.bg"
                data-edit-label="CTA Background"
            >
                <SectionBackground value={ss.cta?.bg} />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}16 0%, transparent 60%)` }}
                />

                <div className="relative max-w-md w-full mx-auto px-8 text-center">
                    <div className="w-14 h-px mx-auto mb-10" style={{ backgroundColor: accent }} />

                    <p
                        className="text-[13px] uppercase tracking-[0.35em] mb-5 font-semibold"
                        style={{ color: accent }}
                        data-edit-type="text"
                        data-edit-field="content.cta.eyebrow"
                        data-edit-label="CTA Eyebrow"
                        data-edit-color-field="content.sectionStyle.hero.accentColor"
                    >
                        {cta.eyebrow ?? "Ready to Work Together?"}
                    </p>

                    <h2
                        className="text-4xl font-black mb-3 leading-tight"
                        style={{ color: cta.headingColor ?? "#ffffff" }}
                        data-edit-type="text"
                        data-edit-field="content.cta.heading"
                        data-edit-label="CTA Heading"
                        data-edit-color-field="content.cta.headingColor"
                    >
                        {cta.heading ?? "Let's Create Something Amazing"}
                    </h2>

                    {(contact.email || contact.phone) && (
                        <p className="flex items-center justify-center gap-3 text-sm mb-10" style={{ color: `${hero.textColor ?? "#ffffff"}40` }}>
                            {contact.email && (
                                <a
                                    href={isEditor ? undefined : `mailto:${contact.email}`}
                                    className="hover:text-white transition-colors"
                                    data-edit-type="text"
                                    data-edit-field="content.contact.email"
                                    data-edit-label="Email"
                                >
                                    {contact.email}
                                </a>
                            )}
                            {contact.email && contact.phone && <span style={{ color: `${hero.textColor ?? "#ffffff"}18` }}>·</span>}
                            {contact.phone && (
                                <a
                                    href={isEditor ? undefined : `tel:${contact.phone}`}
                                    className="hover:text-white transition-colors"
                                    data-edit-type="text"
                                    data-edit-field="content.contact.phone"
                                    data-edit-label="Phone"
                                >
                                    {contact.phone}
                                </a>
                            )}
                        </p>
                    )}

                    <a
                        href={isEditor ? undefined : (cta.href || "#")}
                        className="inline-flex items-center gap-3 px-10 py-4 text-sm font-semibold tracking-[0.18em] uppercase transition-all duration-300 hover:gap-5"
                        style={{ backgroundColor: cta.color ?? accent, color: cta.textColor ?? "#000000" }}
                        data-edit-type="buttonColor"
                        data-edit-field="content.cta.color"
                        data-edit-label="CTA Button Color"
                    >
                        <span
                            data-edit-type="text"
                            data-edit-field="content.cta.label"
                            data-edit-label="CTA Button Text"
                        >
                            {cta.label ?? "Book Now"}
                        </span>
                        <svg className="w-4 h-4 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>

                    {(isEditor || social.instagram || social.tiktok || social.facebook) && (
                        <div className="mt-10 flex items-center justify-center gap-5">
                            {(isEditor || social.instagram) && (
                                <a
                                    href={isEditor ? undefined : social.instagram}
                                    className="transition-colors"
                                    style={{ color: `${hero.textColor ?? "#ffffff"}25` }}
                                    data-edit-type="url"
                                    data-edit-field="content.social.instagram"
                                    data-edit-label="Instagram URL"
                                >
                                    <svg className="w-5 h-5 hover:opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <rect x="2" y="2" width="20" height="20" rx="5" />
                                        <circle cx="12" cy="12" r="4" />
                                        <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                                    </svg>
                                </a>
                            )}
                            {(isEditor || social.facebook) && (
                                <a
                                    href={isEditor ? undefined : social.facebook}
                                    className="transition-colors"
                                    style={{ color: `${hero.textColor ?? "#ffffff"}25` }}
                                    data-edit-type="url"
                                    data-edit-field="content.social.facebook"
                                    data-edit-label="Facebook URL"
                                >
                                    <svg className="w-5 h-5 hover:opacity-80" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                        <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                    </svg>
                                </a>
                            )}
                            {(isEditor || social.tiktok) && (
                                <a
                                    href={isEditor ? undefined : social.tiktok}
                                    className="transition-colors"
                                    style={{ color: `${hero.textColor ?? "#ffffff"}25` }}
                                    data-edit-type="url"
                                    data-edit-field="content.social.tiktok"
                                    data-edit-label="TikTok URL"
                                >
                                    <svg className="w-5 h-5 hover:opacity-80" viewBox="0 0 24 24" fill="currentColor">
                                        <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.35a8.28 8.28 0 004.83 1.53V6.44a4.85 4.85 0 01-1.06-.25h.05z" />
                                    </svg>
                                </a>
                            )}
                        </div>
                    )}

                    <p
                        className="mt-14 text-xs"
                        style={{ color: footer.textColor ?? `${hero.textColor ?? "#ffffff"}18` }}
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

    /* ── EDITOR MODE: one panel at a time with navigation ── */
    if (isEditor) {
        function nav(s) { switchView(s); onEditorPanelChange?.(s); }
        const idx = SECTIONS.indexOf(view);
        return (
            <main className="relative w-full h-full overflow-hidden" suppressHydrationWarning>
                {/* Active panel only — ensures EditableFieldOverlay sees correct elements */}
                {view === "hero" && renderHero()}
                {view === "gallery" && renderGallery()}
                {view === "about" && renderAbout()}
                {view === "services" && renderServices()}
                {view === "cta" && renderCta()}

                {/* Floating panel navigation pill */}
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
                            <button
                                key={s}
                                onClick={() => nav(s)}
                                title={s}
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

    /* ── LIVE MODE: full-screen crossfading scroll sections ── */
    return (
        <main ref={containerRef} className="relative h-screen overflow-hidden" suppressHydrationWarning>
            <SiteNav sections={SECTIONS} view={view} switchView={switchView} accent={accent} />

            {SECTIONS.map((s) => (
                <motion.div
                    key={s}
                    animate={sa(s)}
                    transition={FADE}
                    className="absolute inset-0"
                    style={{ pointerEvents: s === view ? "auto" : "none" }}
                >
                    {s === "hero" && renderHero()}
                    {s === "gallery" && renderGallery()}
                    {s === "about" && renderAbout()}
                    {s === "services" && renderServices()}
                    {s === "cta" && renderCta()}
                </motion.div>
            ))}
        </main>
    );
}
