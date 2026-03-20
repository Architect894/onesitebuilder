"use client";

import { useEffect, useRef } from "react";
import { motion } from "framer-motion";
import SiteNav from "@/templates/shared/SiteNav";
import { useSiteScroll } from "@/templates/shared/useSiteScroll";
import SectionBackground, { getBgColor } from "@/templates/shared/SectionBackground";
import { SCENE_FADE, getSceneAnimation } from "@/templates/shared/sceneTransition";

const SECTIONS = ["hero", "about", "services", "portfolio", "cta"];
const FADE = SCENE_FADE;

export default function LuxeClassicTemplate({ site, branding, content, links, isEditor = false, editorPanel = null, onEditorPanelChange = null }) {
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
    const portfolio = content.portfolio ?? {};
    const credentials = content.credentials ?? {};

    const accent = ss.hero?.accentColor ?? branding?.accentColor ?? "#c9a96e";
    const heroBg = getBgColor(ss.hero?.bg, "#0d0b0a");
    const aboutBg = getBgColor(ss.about?.bg, "#0f0d0c");
    const servicesBg = getBgColor(ss.services?.bg, ss.hero?.bg ? getBgColor(ss.hero.bg, "#0d0b0a") : "#0d0b0a");
    const portfolioBg = getBgColor(ss.gallery?.bg, "#0a0a0a");
    const ctaBg = getBgColor(ss.cta?.bg, "#111111");

    /* thin rule element */
    const Rule = ({ color }) => (
        <div className="flex items-center gap-4 my-1">
            <div className="flex-1 h-px" style={{ backgroundColor: `${color ?? accent}35` }} />
            <div className="w-1 h-1 rounded-full" style={{ backgroundColor: `${color ?? accent}60` }} />
            <div className="flex-1 h-px" style={{ backgroundColor: `${color ?? accent}35` }} />
        </div>
    );

    /* ── Section renderers ── */

    function renderHero() {
        return (
            <div
                className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
                style={{ backgroundColor: heroBg, fontFamily: "Georgia, 'Times New Roman', serif" }}
                data-preview-section="hero"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.hero.bg"
                data-edit-label="Hero Background"
            >
                <SectionBackground value={ss.hero?.bg} />
                {/* Warm candlelight ambient */}
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 60%, ${accent}16 0%, transparent 65%)` }}
                />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 0%, ${accent}08 0%, transparent 50%)` }}
                />

                <div className="relative z-10 max-w-2xl w-full mx-auto px-12 text-center">
                    {hero.logo && (
                        <img
                            src={hero.logo}
                            alt={site?.name ?? ""}
                            className="h-10 w-auto mx-auto mb-10 object-contain opacity-85"
                            data-edit-type="image"
                            data-edit-field="content.hero.logo"
                            data-edit-label="Logo"
                        />
                    )}

                    <Rule />
                    <div className="py-6">
                        <p
                            className="text-[13px] uppercase tracking-[0.45em] mb-7 font-semibold"
                            style={{ color: accent }}
                            data-edit-type="text"
                            data-edit-field="content.hero.eyebrow"
                            data-edit-label="Eyebrow"
                            data-edit-color-field="content.sectionStyle.hero.accentColor"
                        >
                            {hero.eyebrow}
                        </p>

                        <h1
                            className="font-bold tracking-wide leading-snug mb-6"
                            style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)", color: hero.textColor ?? "#f5f0e8" }}
                            data-edit-type="text"
                            data-edit-field="content.hero.headline"
                            data-edit-label="Headline"
                            data-edit-color-field="content.hero.textColor"
                        >
                            {hero.headline}
                        </h1>

                        <p
                            className="text-base leading-relaxed mb-10 tracking-wide font-normal"
                            style={{ color: hero.subheadlineColor ?? `${hero.textColor ?? "#f5f0e8"}60` }}
                            data-edit-type="textarea"
                            data-edit-field="content.hero.subheadline"
                            data-edit-label="Subheadline"
                            data-edit-color-field="content.hero.subheadlineColor"
                        >
                            {hero.subheadline}
                        </p>

                        <a
                            href={isEditor ? undefined : (hero.buttonHref || "#")}
                            className="inline-flex items-center gap-3 px-8 py-3.5 text-xs font-medium tracking-[0.3em] uppercase border transition-all duration-300 hover:gap-5"
                            style={{ borderColor: `${accent}60`, color: hero.buttonTextColor ?? hero.textColor ?? "#f5f0e8", backgroundColor: hero.buttonColor ?? "transparent" }}
                            data-edit-type="url"
                            data-edit-field="content.hero.buttonHref"
                            data-edit-label="Hero Button Link"
                        >
                            <span
                                data-edit-type="text"
                                data-edit-field="content.hero.buttonLabel"
                                data-edit-label="Hero Button Text"
                            >
                                {hero.buttonLabel ?? "Enquire Now"}
                            </span>
                            <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                                <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                            </svg>
                        </a>
                    </div>
                    <Rule />
                </div>

                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 pointer-events-none">
                    <motion.div
                        animate={{ y: [0, 5, 0] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                        style={{ color: `${accent}35` }}
                    >
                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none">
                            <path d="M8 3v10M4 9l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </motion.div>
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
                style={{ backgroundColor: aboutBg, fontFamily: "Georgia, 'Times New Roman', serif" }}
                data-preview-section="about"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.about.bg"
                data-edit-label="About Background"
            >
                <SectionBackground value={ss.about?.bg} />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 0% 50%, ${ss.about?.accentColor ?? accent}10 0%, transparent 55%)` }}
                />

                <div
                    className={img ? "grid min-h-full" : "flex min-h-full items-center"}
                    style={img ? { gridTemplateColumns: "40% 1fr" } : {}}
                >
                {/* Left: decorative image */}
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
                        <div className="absolute inset-0 bg-black/35" />
                        <div
                            className="absolute right-0 top-0 bottom-0 w-24"
                            style={{ background: `linear-gradient(to right, transparent, ${aboutBg})` }}
                        />
                    </div>
                )}

                <div className={`flex flex-col justify-center ${img ? "px-16 py-24" : "max-w-2xl mx-auto px-16 py-24 text-center"}`}>
                    <p
                        className="text-[13px] uppercase tracking-[0.45em] mb-5 font-semibold"
                        style={{ color: ss.about?.accentColor ?? accent }}
                        data-edit-type="text"
                        data-edit-field="content.about.eyebrow"
                        data-edit-label="About Eyebrow"
                        data-edit-color-field="content.sectionStyle.about.accentColor"
                    >
                        {about.eyebrow ?? "Our Legacy"}
                    </p>

                    <div className="w-8 h-px mb-8" style={{ backgroundColor: `${ss.about?.accentColor ?? accent}50` }} />

                    <h2
                        className="font-bold leading-snug mb-7"
                        style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)", color: about.headingColor ?? "#f5f0e8" }}
                        data-edit-type="text"
                        data-edit-field="content.about.title"
                        data-edit-label="About Title"
                        data-edit-color-field="content.about.headingColor"
                    >
                        {about.title}
                    </h2>

                    <p
                        className="text-base leading-loose max-w-[42ch] font-normal"
                        style={{ color: about.bodyColor ?? "#9a9080" }}
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
                style={{ backgroundColor: servicesBg, fontFamily: "Georgia, 'Times New Roman', serif" }}
                data-preview-section="services"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.services.bg"
                data-edit-label="Services Background"
            >
                <SectionBackground value={ss.services?.bg} />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 100%, ${accent}10 0%, transparent 55%)` }}
                />

                <div className="relative max-w-2xl w-full mx-auto px-12 py-24 text-center">
                    <p
                        className="text-[13px] uppercase tracking-[0.45em] mb-4 font-semibold"
                        style={{ color: servicesSection.eyebrowColor ?? accent }}
                        data-edit-type="text"
                        data-edit-field="content.servicesSection.eyebrow"
                        data-edit-label="Services Eyebrow"
                        data-edit-color-field="content.servicesSection.eyebrowColor"
                    >
                        {servicesSection.eyebrow ?? "Expertise"}
                    </p>

                    <h2
                        className="font-bold leading-snug mb-3"
                        style={{ fontSize: "clamp(1.8rem, 3vw, 3rem)", color: servicesSection.headingColor ?? "#f5f0e8" }}
                        data-edit-type="text"
                        data-edit-field="content.servicesSection.heading"
                        data-edit-label="Services Heading"
                        data-edit-color-field="content.servicesSection.headingColor"
                    >
                        {servicesSection.heading ?? "Specializations"}
                    </h2>

                    <div className="w-10 h-px mx-auto mb-10" style={{ backgroundColor: `${accent}40` }} />

                    <div className="grid grid-cols-2 gap-x-8 gap-y-0 text-left">
                        {services.map((svc, i) => (
                            <div
                                key={i}
                                className="flex items-baseline gap-3 py-3.5 border-b"
                                style={{ borderColor: `${accent}15` }}
                            >
                                <span className="text-[9px]" style={{ color: servicesSection.numberColor ?? `${accent}70` }}>✦</span>
                                <span
                                    className="text-sm tracking-wide flex-1"
                                    style={{ color: servicesSection.textColor ?? "rgba(245,240,232,0.70)" }}
                                    data-edit-type="text"
                                    data-edit-field={`content.services.${i}`}
                                    data-edit-label={`Service ${i + 1}`}
                                >{svc}</span>
                            </div>
                        ))}
                        {services.length === 0 && (
                            <p className="text-white/20 text-sm col-span-2 py-4 text-center">No services added yet</p>
                        )}
                    </div>

                    {/* Credentials / awards if present */}
                    {credentials.heading && credentials.items?.length > 0 && (
                        <div className="mt-10">
                            <div className="w-10 h-px mx-auto mb-6" style={{ backgroundColor: `${accent}25` }} />
                            <p
                                className="text-[10px] uppercase tracking-[0.55em] mb-5"
                                style={{ color: `${accent}60` }}
                                data-edit-type="text"
                                data-edit-field="content.credentials.heading"
                                data-edit-label="Credentials Heading"
                            >
                                {credentials.heading}
                            </p>
                            <div className="flex items-center justify-center gap-6 flex-wrap">
                                {credentials.items.slice(0, 3).map((item, i) => (
                                    <div key={i} className="text-center px-4">
                                        <p className="text-xs font-bold tracking-widest" style={{ color: accent }}>{item.title}</p>
                                        {item.desc && <p className="text-[10px] mt-1" style={{ color: "rgba(245,240,232,0.35)" }}>{item.desc}</p>}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        );
    }

    function renderPortfolio() {
        const imgs = gallery.slice(0, 6);
        return (
            <div
                className="relative w-full h-full flex flex-col overflow-hidden"
                style={{ backgroundColor: portfolioBg, fontFamily: "Georgia, 'Times New Roman', serif" }}
                data-preview-section="portfolio"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.gallery.bg"
                data-edit-label="Portfolio Background"
            >
                <SectionBackground value={ss.gallery?.bg} />
                <div className="flex-shrink-0 flex items-end justify-between px-14 pt-12 pb-6">
                    <div>
                        <p
                            className="text-[13px] uppercase tracking-[0.45em] mb-2 font-semibold"
                            style={{ color: accent }}
                            data-edit-type="text"
                            data-edit-field="content.portfolio.eyebrow"
                            data-edit-label="Portfolio Eyebrow"
                            data-edit-color-field="content.sectionStyle.hero.accentColor"
                        >
                            {portfolio.eyebrow ?? "Portfolio"}
                        </p>
                        <h2
                            className="font-bold leading-none"
                            style={{ fontSize: "clamp(1.8rem, 3.5vw, 3.5rem)", color: portfolio.headingColor ?? "#f5f0e8" }}
                            data-edit-type="text"
                            data-edit-field="content.portfolio.heading"
                            data-edit-label="Portfolio Heading"
                            data-edit-color-field="content.portfolio.headingColor"
                        >
                            {portfolio.heading ?? "Featured Works"}
                        </h2>
                    </div>
                    <div className="text-right">
                        <div className="w-8 h-px ml-auto mb-1" style={{ backgroundColor: `${accent}50` }} />
                        <p className="text-[9px] tracking-widest uppercase" style={{ color: `${accent}40` }}>{imgs.length} works</p>
                    </div>
                </div>

                <div className="flex-1 min-h-0 grid grid-cols-3 gap-1 px-14 pb-14">
                    {imgs.map((img, i) => (
                        <div key={img.id ?? i} className="relative overflow-hidden group">
                            <img
                                src={img.url}
                                alt=""
                                className="w-full h-full object-cover transition-all duration-700 group-hover:scale-[1.03]"
                                data-edit-type="image"
                                data-edit-field={`content.gallery.${i}.url`}
                                data-edit-label={`Portfolio Image ${i + 1}`}
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-500" />
                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                                style={{ boxShadow: `inset 0 0 0 1px ${accent}30` }}
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
                className="relative w-full h-full flex flex-col items-center justify-center overflow-hidden"
                style={{ backgroundColor: ctaBg, fontFamily: "Georgia, 'Times New Roman', serif" }}
                data-preview-section="cta"
                data-edit-type="background"
                data-edit-field="content.sectionStyle.cta.bg"
                data-edit-label="CTA Background"
            >
                <SectionBackground value={ss.cta?.bg} />
                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{ background: `radial-gradient(ellipse at 50% 50%, ${accent}12 0%, transparent 65%)` }}
                />

                <div className="relative max-w-xl w-full mx-auto px-12 text-center">
                    <div className="flex items-center gap-5 justify-center mb-10">
                        <div className="flex-1 h-px" style={{ backgroundColor: `${accent}25` }} />
                        <div className="w-2 h-2 rounded-full border" style={{ borderColor: `${accent}50` }} />
                        <div className="flex-1 h-px" style={{ backgroundColor: `${accent}25` }} />
                    </div>

                    <p
                        className="text-[13px] uppercase tracking-[0.45em] mb-6 font-semibold"
                        style={{ color: accent }}
                        data-edit-type="text"
                        data-edit-field="content.cta.eyebrow"
                        data-edit-label="CTA Eyebrow"
                        data-edit-color-field="content.sectionStyle.hero.accentColor"
                    >
                        {cta.eyebrow ?? "Begin Your Story"}
                    </p>

                    <h2
                        className="font-bold leading-snug mb-5"
                        style={{ fontSize: "clamp(2rem, 4vw, 4rem)", color: cta.headingColor ?? "#f5f0e8" }}
                        data-edit-type="text"
                        data-edit-field="content.cta.heading"
                        data-edit-label="CTA Heading"
                        data-edit-color-field="content.cta.headingColor"
                    >
                        {cta.heading ?? "Let's Create Something Timeless"}
                    </h2>

                    {(contact.email || contact.phone) && (
                        <div className="flex items-center justify-center gap-5 mb-8 text-sm">
                            {contact.email && (
                                <a
                                    href={isEditor ? undefined : `mailto:${contact.email}`}
                                    className="tracking-wide transition-opacity hover:opacity-60"
                                    style={{ color: `rgba(245,240,232,0.45)` }}
                                    data-edit-type="text"
                                    data-edit-field="content.contact.email"
                                    data-edit-label="Email"
                                >
                                    {contact.email}
                                </a>
                            )}
                            {contact.email && contact.phone && (
                                <span style={{ color: `${accent}30` }}>·</span>
                            )}
                            {contact.phone && (
                                <a
                                    href={isEditor ? undefined : `tel:${contact.phone}`}
                                    className="tracking-wide transition-opacity hover:opacity-60"
                                    style={{ color: `rgba(245,240,232,0.45)` }}
                                    data-edit-type="text"
                                    data-edit-field="content.contact.phone"
                                    data-edit-label="Phone"
                                >
                                    {contact.phone}
                                </a>
                            )}
                        </div>
                    )}

                    <a
                        href={isEditor ? undefined : (cta.href || "#")}
                        className="inline-flex items-center gap-3 px-8 py-3.5 text-xs font-medium tracking-[0.3em] uppercase border transition-all duration-300 hover:gap-5"
                        style={{ borderColor: `${accent}60`, color: cta.textColor ?? "#f5f0e8", backgroundColor: cta.color ?? "transparent" }}
                        data-edit-type="buttonColor"
                        data-edit-field="content.cta.color"
                        data-edit-label="CTA Button Color"
                    >
                        <span
                            data-edit-type="text"
                            data-edit-field="content.cta.label"
                            data-edit-label="CTA Button Text"
                        >
                            {cta.label ?? "Enquire Now"}
                        </span>
                        <svg className="w-3.5 h-3.5 flex-shrink-0" viewBox="0 0 16 16" fill="none">
                            <path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </a>

                    {(isEditor || social.instagram || social.facebook) && (
                        <div className="mt-10 flex items-center justify-center gap-6">
                            {(isEditor || social.instagram) && (
                                <a
                                    href={isEditor ? undefined : social.instagram}
                                    className="transition-opacity hover:opacity-60"
                                    style={{ color: `${accent}40` }}
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
                                    style={{ color: `${accent}40` }}
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
                                    style={{ color: `${accent}40` }}
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
                        className="mt-12 text-[10px] tracking-widest"
                        style={{ color: footer.textColor ?? "rgba(245,240,232,0.18)" }}
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
                    {s === "services" && renderServices()}
                    {s === "portfolio" && renderPortfolio()}
                    {s === "cta" && renderCta()}
                </motion.div>
            ))}
        </main>
    );
}
