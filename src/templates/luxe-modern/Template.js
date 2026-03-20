"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SiteNav from "@/templates/shared/SiteNav";
import { useSiteScroll } from "@/templates/shared/useSiteScroll";
import SectionBackground, { getBgColor } from "@/templates/shared/SectionBackground";
import { SCENE_FADE, getSceneAnimation } from "@/templates/shared/sceneTransition";

const SECTIONS = ["hero", "about", "features", "portfolio", "cta"];
const FADE = SCENE_FADE;

export default function LuxeModernTemplate({ site, branding, content, links, isEditor = false, editorPanel = null, onEditorPanelChange = null }) {
    const SCROLL_SECTIONS = new Set(["about", "features"]);
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
    const features = content.features ?? {};
    const portfolio = content.portfolio ?? {};
    const stats = content.stats ?? [];

    const accent = ss.hero?.accentColor ?? branding?.accentColor ?? "#d4a574";
    const heroBg = getBgColor(ss.hero?.bg, "#0d0d0d");
    const aboutBg = getBgColor(ss.about?.bg, "#111111");
    const featuresBg = getBgColor(ss.features?.bg, ss.hero?.bg ? getBgColor(ss.hero.bg, "#0d0d0d") : "#0d0d0d");
    const ctaBg = getBgColor(ss.cta?.bg, "#0a0a0a");

    /* ── Section renderers ── */

    function renderHero() {
        return (
            <div
                className="relative w-full h-full flex overflow-hidden"
                style={{ backgroundColor: heroBg }}
                data-preview-section="hero"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.hero.bg"
                data-edit-label="Hero Background"
            >
                <SectionBackground value={ss.hero?.bg} />
                {/* Accent bar — left edge */}
                <div className="w-1.5 flex-shrink-0" style={{ backgroundColor: accent }} />

                {/* Ambient glow behind headline */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 30% 50%, ${accent}14 0%, transparent 55%)` }}
                />

                {/* Content */}
                <div className="flex-1 flex items-center px-16 py-20">
                    <div className="max-w-3xl">
                        {hero.logo && (
                            <img
                                src={hero.logo}
                                alt={site?.name ?? ""}
                                className="h-10 w-auto mb-14 object-contain"
                                data-edit-type="image"
                                data-edit-field="content.hero.logo"
                                data-edit-label="Logo"
                            />
                        )}

                        <p
                            className="text-[13px] uppercase tracking-[0.35em] mb-5 font-semibold"
                            style={{ color: accent }}
                            data-edit-type="text"
                            data-edit-field="content.hero.eyebrow"
                            data-edit-label="Eyebrow"
                            data-edit-color-field="content.sectionStyle.hero.accentColor"
                        >
                            {hero.eyebrow}
                        </p>

                        <h1
                            className="font-black leading-[0.9] tracking-tight mb-8"
                            style={{ fontSize: "clamp(3rem, 7vw, 6.5rem)", color: hero.textColor ?? "#ffffff" }}
                            data-edit-type="text"
                            data-edit-field="content.hero.headline"
                            data-edit-label="Headline"
                            data-edit-color-field="content.hero.textColor"
                        >
                            {hero.headline}
                        </h1>

                        <p
                            className="text-lg max-w-md leading-relaxed mb-12"
                            style={{ color: hero.subheadlineColor ?? `${hero.textColor ?? "#ffffff"}55` }}
                            data-edit-type="textarea"
                            data-edit-field="content.hero.subheadline"
                            data-edit-label="Subheadline"
                            data-edit-color-field="content.hero.subheadlineColor"
                        >
                            {hero.subheadline}
                        </p>

                        <div className="flex items-center gap-6">
                            <a
                                href={isEditor ? undefined : (hero.buttonHref || "#")}
                                className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase transition-all duration-300"
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
                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                                    <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                                </svg>
                            </a>

                            {contact.email && (
                                <a
                                    href={isEditor ? undefined : `mailto:${contact.email}`}
                                    className="text-sm font-medium tracking-wider transition-opacity hover:opacity-80"
                                    style={{ color: `${hero.textColor ?? "#ffffff"}40` }}
                                    data-edit-type="text"
                                    data-edit-field="content.contact.email"
                                    data-edit-label="Email"
                                >
                                    {contact.email}
                                </a>
                            )}
                        </div>
                    </div>
                </div>

                {/* Right: gallery image preview */}
                {gallery[0]?.url && (
                    <div className="w-[38%] flex-shrink-0 relative overflow-hidden">
                        <img src={gallery[0].url} alt="" className="w-full h-full object-cover" />
                        <div
                            className="absolute inset-0"
                            style={{ background: `linear-gradient(to right, ${heroBg} 0%, ${heroBg}aa 15%, transparent 50%)` }}
                        />
                    </div>
                )}
            </div>
        );
    }

    function renderAbout() {
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
                <div className="flex min-h-full">
                <div className="w-1.5 flex-shrink-0" style={{ backgroundColor: `${ss.about?.accentColor ?? accent}80` }} />

                {/* About text */}
                <div className="flex-1 flex flex-col justify-center px-16 py-20">
                    <p
                        className="text-[13px] uppercase tracking-[0.35em] mb-4 font-semibold"
                        style={{ color: ss.about?.accentColor ?? accent }}
                        data-edit-type="text"
                        data-edit-field="content.about.eyebrow"
                        data-edit-label="About Eyebrow"
                        data-edit-color-field="content.sectionStyle.about.accentColor"
                    >
                        {about.eyebrow ?? "Our Story"}
                    </p>

                    <h2
                        className="text-5xl font-black leading-tight mb-6 max-w-lg"
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
                        style={{ color: about.bodyColor ?? "#808080" }}
                        data-edit-type="textarea"
                        data-edit-field="content.about.body"
                        data-edit-label="About Body"
                        data-edit-color-field="content.about.bodyColor"
                    >
                        {about.body}
                    </p>
                </div>

                {/* Stats — right panel */}
                {stats.length > 0 && (
                    <div className="w-[42%] flex-shrink-0 flex items-center justify-center px-12 py-20 border-l border-white/6">
                        <div className="grid grid-cols-2 gap-6 w-full max-w-sm">
                            {stats.map((stat, i) => (
                                <div
                                    key={i}
                                    className="rounded-xl border border-white/8 bg-white/3 p-7"
                                >
                                    <div
                                        className="text-4xl font-black leading-none mb-2"
                                        style={{ color: ss.about?.accentColor ?? accent }}
                                    >
                                        {stat.value}
                                    </div>
                                    <div className="text-xs text-white/40 tracking-wider uppercase">{stat.label}</div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
                </div>
            </div>
        );
    }

    function renderFeatures() {
        return (
            <div
                ref={isEditor ? undefined : getScrollRef("features")}
                className="relative w-full h-full overflow-y-auto"
                style={{ backgroundColor: featuresBg }}
                data-preview-section="features"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.features.bg"
                data-edit-label="Features Background"
            >
                <SectionBackground value={ss.features?.bg} />
                <div className="flex min-h-full">
                <div className="w-1.5 flex-shrink-0" style={{ backgroundColor: `${accent}70` }} />

                {/* Large background number */}
                <div
                    className="absolute right-12 bottom-8 text-[18rem] font-black leading-none pointer-events-none select-none"
                    style={{ color: `${accent}05` }}
                >
                    {services.length || "·"}
                </div>

                <div className="flex-1 flex flex-col justify-center px-16 py-16 relative">
                    <p
                        className="text-[13px] uppercase tracking-[0.35em] mb-3 font-semibold"
                        style={{ color: features.eyebrowColor ?? accent }}
                        data-edit-type="text"
                        data-edit-field="content.features.eyebrow"
                        data-edit-label="Features Eyebrow"
                        data-edit-color-field="content.features.eyebrowColor"
                    >
                        {features.eyebrow ?? "What We Do"}
                    </p>

                    <h2
                        className="text-4xl font-black mb-10"
                        style={{ color: features.headingColor ?? "#ffffff" }}
                        data-edit-type="text"
                        data-edit-field="content.features.heading"
                        data-edit-label="Features Heading"
                        data-edit-color-field="content.features.headingColor"
                    >
                        {features.heading ?? "Our Services"}
                    </h2>

                    <div className="grid grid-cols-2 gap-x-14 gap-y-0 max-w-3xl">
                        {services.map((svc, i) => (
                            <div
                                key={i}
                                className="flex items-start gap-5 py-4 border-b border-white/6"
                            >
                                <span
                                    className="text-2xl font-black leading-none mt-1 flex-shrink-0"
                                    style={{ color: features.numberColor ?? `${accent}35` }}
                                >
                                    {String(i + 1).padStart(2, "0")}
                                </span>
                                <span
                                    className="text-base font-light pt-1 leading-snug flex-1"
                                    style={{ color: features.textColor ?? "rgba(255,255,255,0.7)" }}
                                    data-edit-type="text"
                                    data-edit-field={`content.services.${i}`}
                                    data-edit-label={`Service ${i + 1}`}
                                >{svc}</span>
                            </div>
                        ))}
                        {services.length === 0 && (
                            <p className="text-white/20 text-sm col-span-2 py-4">No services added yet</p>
                        )}
                    </div>
                </div>                </div>            </div>
        );
    }

    function renderPortfolio() {
        const imgs = gallery.slice(0, 6);
        return (
            <div
                className="relative w-full h-full flex flex-col overflow-hidden"
                style={{ backgroundColor: getBgColor(ss.gallery?.bg, "#0a0a0a") }}
                data-preview-section="portfolio"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.gallery.bg"
                data-edit-label="Portfolio Background"
            >
                <SectionBackground value={ss.gallery?.bg} />
                <div className="absolute top-0 left-1.5 right-0 h-px" style={{ backgroundColor: `${accent}30` }} />

                <div className="flex-shrink-0 flex items-end justify-between px-16 pt-12 pb-6">
                    <div>
                        <p
                            className="text-[13px] uppercase tracking-[0.35em] mb-2 font-semibold"
                            style={{ color: accent }}
                            data-edit-type="text"
                            data-edit-field="content.portfolio.eyebrow"
                            data-edit-label="Portfolio Eyebrow"
                            data-edit-color-field="content.sectionStyle.hero.accentColor"
                        >
                            {portfolio.eyebrow ?? "Recent Work"}
                        </p>
                        <h2
                            className="text-4xl font-black"
                            style={{ color: portfolio.headingColor ?? "#ffffff" }}
                            data-edit-type="text"
                            data-edit-field="content.portfolio.heading"
                            data-edit-label="Portfolio Heading"
                            data-edit-color-field="content.portfolio.headingColor"
                        >
                            {portfolio.heading ?? "Our Portfolio"}
                        </h2>
                    </div>
                    <div className="w-1.5 h-10 rounded-full" style={{ backgroundColor: accent }} />
                </div>

                <div className="flex-1 min-h-0 grid grid-cols-3 gap-2 px-16 pb-14">
                    {imgs.map((img, i) => (
                        <div key={img.id ?? i} className="relative overflow-hidden group rounded-sm">
                            <img
                                src={img.url}
                                alt=""
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-[1.05]"
                                data-edit-type="image"
                                data-edit-field={`content.gallery.${i}.url`}
                                data-edit-label={`Portfolio Image ${i + 1}`}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/25 transition-colors duration-500" />
                            <div
                                className="absolute bottom-0 left-0 w-full h-0.5 scale-x-0 group-hover:scale-x-100 transition-transform duration-400 origin-left"
                                style={{ backgroundColor: accent }}
                            />
                        </div>
                    ))}
                    {imgs.length === 0 && (
                        <div className="col-span-3 flex items-center justify-center text-white/15 text-sm tracking-widest uppercase">
                            Add portfolio images
                        </div>
                    )}
                </div>
            </div>
        );
    }

    function renderCta() {
        return (
            <div
                className="relative w-full h-full flex overflow-hidden"
                style={{ backgroundColor: ctaBg }}
                data-preview-section="cta"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.cta.bg"
                data-edit-label="CTA Background"
            >
                <SectionBackground value={ss.cta?.bg} />
                <div className="w-1.5 flex-shrink-0" style={{ backgroundColor: accent }} />

                {/* CTA content */}
                <div className="flex-1 flex flex-col justify-center px-16 py-20">
                    <p
                        className="text-[13px] uppercase tracking-[0.35em] mb-5 font-semibold"
                        style={{ color: accent }}
                        data-edit-type="text"
                        data-edit-field="content.cta.eyebrow"
                        data-edit-label="CTA Eyebrow"
                        data-edit-color-field="content.sectionStyle.hero.accentColor"
                    >
                        {cta.eyebrow ?? "Get In Touch"}
                    </p>

                    <h2
                        className="text-5xl font-black leading-tight mb-4 max-w-lg"
                        style={{ color: cta.headingColor ?? "#ffffff" }}
                        data-edit-type="text"
                        data-edit-field="content.cta.heading"
                        data-edit-label="CTA Heading"
                        data-edit-color-field="content.cta.headingColor"
                    >
                        {cta.heading ?? "Ready to Get Started?"}
                    </h2>

                    <p
                        className="text-sm mb-10 max-w-sm leading-relaxed"
                        style={{ color: cta.bodyColor ?? "rgba(255,255,255,0.4)" }}
                        data-edit-type="textarea"
                        data-edit-field="content.cta.body"
                        data-edit-label="CTA Body"
                        data-edit-color-field="content.cta.bodyColor"
                    >
                        {cta.body ?? "Contact us today and let's discuss your event."}
                    </p>

                    <a
                        href={isEditor ? undefined : (cta.href || "#")}
                        className="inline-flex items-center gap-3 px-8 py-4 text-sm font-bold tracking-[0.15em] uppercase w-fit transition-all duration-300"
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
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>
                </div>

                {/* Contact details — right panel */}
                <div className="w-[38%] flex-shrink-0 flex flex-col justify-center px-14 py-20 border-l border-white/6">
                    <div className="space-y-7">
                        {contact.email && (
                            <div>
                                <p className="text-[9px] uppercase tracking-widest mb-1.5" style={{ color: `${accent}60` }}>Email</p>
                                <a
                                    href={isEditor ? undefined : `mailto:${contact.email}`}
                                    className="text-white/65 text-sm hover:text-white transition-colors leading-relaxed"
                                    data-edit-type="text"
                                    data-edit-field="content.contact.email"
                                    data-edit-label="Email"
                                >
                                    {contact.email}
                                </a>
                            </div>
                        )}
                        {contact.phone && (
                            <div>
                                <p className="text-[9px] uppercase tracking-widest mb-1.5" style={{ color: `${accent}60` }}>Phone</p>
                                <a
                                    href={isEditor ? undefined : `tel:${contact.phone}`}
                                    className="text-white/65 text-sm hover:text-white transition-colors"
                                    data-edit-type="text"
                                    data-edit-field="content.contact.phone"
                                    data-edit-label="Phone"
                                >
                                    {contact.phone}
                                </a>
                            </div>
                        )}
                        {(isEditor || social.instagram || social.facebook || social.tiktok) && (
                            <div>
                                <p className="text-[9px] uppercase tracking-widest mb-3" style={{ color: `${accent}60` }}>Social</p>
                                <div className="flex gap-4">
                                    {(isEditor || social.instagram) && (
                                        <a
                                            href={isEditor ? undefined : social.instagram}
                                            className="text-white/30 hover:text-white transition-colors"
                                            data-edit-type="url"
                                            data-edit-field="content.social.instagram"
                                            data-edit-label="Instagram URL"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <rect x="2" y="2" width="20" height="20" rx="5" />
                                                <circle cx="12" cy="12" r="4" />
                                                <circle cx="17.5" cy="6.5" r="1" fill="currentColor" />
                                            </svg>
                                        </a>
                                    )}
                                    {(isEditor || social.facebook) && (
                                        <a
                                            href={isEditor ? undefined : social.facebook}
                                            className="text-white/30 hover:text-white transition-colors"
                                            data-edit-type="url"
                                            data-edit-field="content.social.facebook"
                                            data-edit-label="Facebook URL"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                                                <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />
                                            </svg>
                                        </a>
                                    )}
                                    {(isEditor || social.tiktok) && (
                                        <a
                                            href={isEditor ? undefined : social.tiktok}
                                            className="text-white/30 hover:text-white transition-colors"
                                            data-edit-type="url"
                                            data-edit-field="content.social.tiktok"
                                            data-edit-label="TikTok URL"
                                        >
                                            <svg className="w-5 h-5" viewBox="0 0 24 24" fill="currentColor">
                                                <path d="M19.59 6.69a4.83 4.83 0 01-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 01-2.88 2.5 2.89 2.89 0 01-2.89-2.89 2.89 2.89 0 012.89-2.89c.28 0 .54.04.79.1V9.01a6.27 6.27 0 00-.79-.05 6.34 6.34 0 00-6.34 6.34 6.34 6.34 0 006.34 6.34 6.34 6.34 0 006.33-6.34V8.35a8.28 8.28 0 004.83 1.53V6.44a4.85 4.85 0 01-1.06-.25h.05z" />
                                            </svg>
                                        </a>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    <p
                        className="mt-16 text-xs"
                        style={{ color: footer.textColor ?? "rgba(255,255,255,0.12)" }}
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
                {view === "features" && renderFeatures()}
                {view === "portfolio" && renderPortfolio()}
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
                    {s === "about" && renderAbout()}
                    {s === "features" && renderFeatures()}
                    {s === "portfolio" && renderPortfolio()}
                    {s === "cta" && renderCta()}
                </motion.div>
            ))}
        </main>
    );
}
