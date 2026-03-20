"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import Link from "next/link";
import LuxePhotoTemplate from "@/templates/luxe-photo/Template";
import LuxeModernTemplate from "@/templates/luxe-modern/Template";
import LuxeClassicTemplate from "@/templates/luxe-classic/Template";
import LuxeMinimalTemplate from "@/templates/luxe-minimal/Template";
import TemplatePreviewModal from "@/components/TemplatePreviewModal";

const FADE = { duration: 0.75, ease: [0.16, 1, 0.3, 1] };

// All scenes in order
const VIEWS = ["hero", "templates", "how", "why", "testimonials", "cta"];
const VIEW_LABELS = ["Home", "Templates", "How it works", "Features", "Reviews", "Get Started"];

// Scenes that show in the bottom panel (= VIEWS minus "hero")
const SPLIT_VIEWS = ["templates", "how", "why", "testimonials", "cta"];

const TEMPLATES = [
    { key: "luxe-photo",   name: "Luxe Photo",   description: "Perfect for photography, events & visual-driven businesses", Component: LuxePhotoTemplate },
    { key: "luxe-modern",  name: "Luxe Modern",  description: "Sleek and contemporary for modern brands",                  Component: LuxeModernTemplate },
    { key: "luxe-classic", name: "Luxe Classic", description: "Timeless elegance for established businesses",              Component: LuxeClassicTemplate },
    { key: "luxe-minimal", name: "Luxe Minimal", description: "Ultra-clean minimalist for modern simplicity",              Component: LuxeMinimalTemplate },
];

const MOCK = {
    site:     { name: "Preview Site", template: "luxe-photo" },
    branding: { primaryColor: "#d4a574", accentColor: "#c6a16e", neutralColor: "#000000" },
    content:  {
        hero:     { logo: "/realphotobooth.png", eyebrow: "Premium Template", headline: "See exactly what you'll get", subheadline: "Live preview of the template design", textColor: "#ffffff" },
        about:    { title: "About", body: "Elegant design with smooth animations.", headingColor: "#ffffff", bodyColor: "#d4d4d4" },
        services: ["Service 1", "Service 2", "Service 3"],
        gallery:  [
            { id: "img_001", url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1200&auto=format&fit=crop" },
            { id: "img_002", url: "https://images.unsplash.com/photo-1519225421980-715cb0215aed?q=80&w=1200&auto=format&fit=crop" },
            { id: "img_003", url: "https://images.unsplash.com/photo-1522673607200-164d1b6ce486?q=80&w=1200&auto=format&fit=crop" },
        ],
        cta:          { label: "Get Started", href: "#contact", color: "#d4a574", textColor: "#ffffff" },
        contact:      { email: "hello@example.com", phone: "(555) 123-4567" },
        sectionStyle: {
            hero:    { bg: "#1a1a1a", accentColor: "#d4a574" },
            about:   { bg: "#1a1a1a", accentColor: "#d4a574" },
            gallery: { bg: "#1a1a1a", accentColor: "#d4a574" },
            footer:  { bg: "#0d0d0d" },
        },
    },
    links: { cta: "#contact" },
};

export default function MarketingPage() {
    const [hoveredCard, setHoveredCard]           = useState(null);
    const [selectedTemplate, setSelectedTemplate] = useState(null);
    const [isModalOpen, setIsModalOpen]           = useState(false);
    const [templateIdx, setTemplateIdx]           = useState(0);
    const [mounted, setMounted]                   = useState(false);
    const [showCrossfadeHint, setShowCrossfadeHint] = useState(true);
    useEffect(() => setMounted(true), []);

    const [view, setView]      = useState("hero");
    const viewRef              = useRef("hero");
    const transitioningRef     = useRef(false);
    const containerRef         = useRef(null);
    const outerPreviewRef      = useRef(null);
    const [previewScale, setPreviewScale] = useState(0.7);
    const switchViewRef        = useRef(null);
    const goNextRef            = useRef(null);
    const goPrevRef            = useRef(null);

    switchViewRef.current = (next) => {
        if (viewRef.current === next || transitioningRef.current) return;
        transitioningRef.current = true;
        setShowCrossfadeHint(false);
        viewRef.current = next;
        setView(next);
        setTimeout(() => { transitioningRef.current = false; }, 900);
    };
    goNextRef.current = () => {
        const idx = VIEWS.indexOf(viewRef.current);
        if (idx < VIEWS.length - 1) switchViewRef.current(VIEWS[idx + 1]);
    };
    goPrevRef.current = () => {
        const idx = VIEWS.indexOf(viewRef.current);
        if (idx > 0) switchViewRef.current(VIEWS[idx - 1]);
    };

    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        const onWheel = (e) => {
            const down = e.deltaY > 10;
            const up   = e.deltaY < -10;
            if (!down && !up) return;
            setShowCrossfadeHint(false);
            e.preventDefault();
            if (down) goNextRef.current();
            else      goPrevRef.current();
        };
        el.addEventListener("wheel", onWheel, { passive: false });
        return () => el.removeEventListener("wheel", onWheel);
    }, []);

    // Touch swipe support — lets mobile users swipe up/down to navigate sections
    useEffect(() => {
        const el = containerRef.current;
        if (!el) return;
        let startY = 0;
        const onTouchStart = (e) => { startY = e.touches[0].clientY; };
        const onTouchEnd = (e) => {
            const diff = startY - e.changedTouches[0].clientY;
            if (Math.abs(diff) < 50) return;
            setShowCrossfadeHint(false);
            if (diff > 0) goNextRef.current();
            else          goPrevRef.current();
        };
        el.addEventListener("touchstart", onTouchStart, { passive: true });
        el.addEventListener("touchend", onTouchEnd, { passive: true });
        return () => {
            el.removeEventListener("touchstart", onTouchStart);
            el.removeEventListener("touchend", onTouchEnd);
        };
    }, []);

    useEffect(() => {
        const update = () => {
            if (outerPreviewRef.current)
                setPreviewScale(outerPreviewRef.current.offsetWidth / 1280);
        };
        update();
        const ro = new ResizeObserver(update);
        if (outerPreviewRef.current) ro.observe(outerPreviewRef.current);
        return () => ro.disconnect();
    }, []);

    const splitMode = view !== "hero";

    // Direction-aware animate for the bottom crossfade panels
    const bottomAnimate = (id) => {
        const isCurrent = view === id;
        const vi = SPLIT_VIEWS.indexOf(view);
        const li = SPLIT_VIEWS.indexOf(id);
        return {
            opacity:      isCurrent ? 1 : 0,
            y:            isCurrent ? 0 : li < vi ? -16 : 16,
            filter:       isCurrent ? "blur(0px)" : "blur(4px)",
            pointerEvents: isCurrent ? "auto" : "none",
        };
    };

    const CurrentTpl = TEMPLATES[templateIdx].Component;

    const features = [
        { icon: "⚡", title: "Launch in Minutes",  desc: "Sign up, pick a template, fill in details — live before coffee gets cold." },
        { icon: "🎯", title: "No Tech Skills",      desc: "Visual and point-and-click. Fill out a form, build a site." },
        { icon: "🎨", title: "Your Brand, Exactly", desc: "Customize colors, photos, and text. Fully yours from day one." },
        { icon: "🔄", title: "Instant Updates",     desc: "Change hours, add photos, update pricing — goes live immediately." },
        { icon: "📱", title: "Mobile-First",         desc: "Every template looks great on phones, tablets, and desktops." },
        { icon: "🔒", title: "Safe & Secure",        desc: "SSL included, daily backups, trusted infrastructure." },
    ];

    const steps = [
        { n: "01", title: "Pick a template",  desc: "Browse our library and find the design that fits your business." },
        { n: "02", title: "Make it yours",    desc: "Add your logo, photos, and details using our visual editor. No code, ever." },
        { n: "03", title: "Go live",          desc: "Hit publish. Your site is live on a custom link instantly." },
    ];

    const reviews = [
        { q: "I had my photo booth site up in under 10 minutes. Clients kept asking who built it.",       name: "Marissa T.",  role: "Photo Booth Owner",    init: "MT", bg: "bg-midnight-600" },
        { q: "I'm terrible with tech but I set up my whole DJ page by myself. Looks so professional.", name: "DJ Kevin R.", role: "Wedding DJ",            init: "KR", bg: "bg-midnight-500" },
        { q: "I update my gallery every week after events — it takes two minutes. Love it.",            name: "Sarah P.",   role: "Wedding Photographer", init: "SP", bg: "bg-midnight-700" },
    ];

    return (
        <main className="h-screen overflow-hidden relative">

            {/* Aurora background */}
            <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
                {/* Primary grey aurora — sweeps top-right → bottom-left */}
                <div className="blob-drift-1 absolute inset-0" style={{
                    background: 'linear-gradient(-42deg, transparent 12%, rgba(80,76,98,0.09) 28%, rgba(92,86,112,0.17) 44%, rgba(86,80,106,0.13) 57%, rgba(72,68,88,0.05) 72%, transparent 86%)',
                    backgroundSize: '300% 300%',
                }} />
                {/* Secondary grey aurora — counter-sweeps, adds depth layering */}
                <div className="blob-drift-2 absolute inset-0" style={{
                    background: 'linear-gradient(-36deg, transparent 18%, rgba(65,62,80,0.07) 34%, rgba(76,72,94,0.12) 50%, rgba(68,64,84,0.08) 63%, transparent 80%)',
                    backgroundSize: '280% 280%',
                }} />
                {/* Faint warm aurora — orange barely at 4% opacity, only warmth not colour */}
                <div className="blob-drift-3 absolute inset-0" style={{
                    background: 'linear-gradient(-52deg, transparent 22%, rgba(155,56,6,0.020) 38%, rgba(172,66,9,0.038) 50%, rgba(150,54,5,0.016) 63%, transparent 80%)',
                    backgroundSize: '320% 320%',
                }} />
                {/* Edge vignette — frames content, adds perceived depth */}
                <div className="absolute inset-0" style={{
                    background: 'radial-gradient(ellipse at 50% 45%, transparent 35%, rgba(8,8,12,0.55) 100%)',
                }} />
            </div>

            <div ref={containerRef} className="relative h-full z-10">

                {/* ══ HERO — full screen ══ */}
                <motion.div
                    animate={{
                        opacity: view === "hero" ? 1 : 0,
                        y:       view === "hero" ? 0 : -28,
                        filter:  view === "hero" ? "blur(0px)" : "blur(5px)",
                    }}
                    transition={FADE}
                    style={{ pointerEvents: view === "hero" ? "auto" : "none" }}
                    className="absolute inset-0 flex flex-col items-center justify-center px-6 pb-16 text-center"
                >
                    <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
                        className="mb-8 inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-orange-400/25 bg-orange-400/[0.08] text-orange-300/80 text-xs font-semibold tracking-widest uppercase"
                    >
                        <span className="w-1.5 h-1.5 rounded-full bg-orange-400 animate-pulse" />
                        One page. All your business needs.
                    </motion.div>
                    <motion.h1 initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.1 }}
                        className="max-w-4xl text-5xl md:text-7xl font-bold leading-[1.08] tracking-tight text-gray-50"
                    >
                        Your business,{" "}
                        <span className="bg-gradient-to-r from-orange-300 via-orange-400 to-orange-200 bg-clip-text text-transparent">
                            online in minutes.
                        </span>
                    </motion.h1>
                    <motion.p initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-6 max-w-xl text-lg md:text-xl text-gray-400 leading-relaxed"
                    >
                        Pick a stunning template, add your details, and publish — no designer, no developer, no headaches.
                    </motion.p>
                    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.7, delay: 0.3 }}
                        className="mt-10 flex flex-col sm:flex-row items-center gap-4"
                    >
                        <Link href="/signup">
                            <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 text-white text-base font-bold shadow-xl shadow-orange-500/30"
                            >
                                Start for free
                                <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                            </motion.span>
                        </Link>
                        <motion.button onClick={() => switchViewRef.current("templates")} whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}
                            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl border border-orange-400/20 text-gray-300 text-base font-medium hover:border-orange-400/40 hover:text-orange-200 transition-all cursor-pointer"
                        >
                            Browse templates
                        </motion.button>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.55 }}
                        className="mt-14 flex items-center gap-3 text-sm text-gray-500"
                    >
                        <div className="flex -space-x-2">
                            {["bg-slate-600","bg-orange-500","bg-slate-500","bg-orange-400"].map((c, i) => (
                                <div key={i} className={`w-7 h-7 rounded-full ${c} border-2 border-slate-950`} />
                            ))}
                        </div>
                        <span>Trusted by <span className="text-orange-300/80 font-semibold">2,400+</span> small businesses</span>
                    </motion.div>
                    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1.4, duration: 0.6 }}
                        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-gray-600 text-xs select-none"
                    >
                        <span className="text-[10px] tracking-widest uppercase mb-1">Scroll to explore</span>
                        <motion.div animate={{ y: [0, 6, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}>
                            <svg className="w-5 h-5" viewBox="0 0 20 20" fill="none"><path d="M10 4v12M5 11l5 5 5-5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        </motion.div>
                    </motion.div>
                </motion.div>

                {/* ══ SPLIT LAYOUT — carousel top, content bottom ══ */}
                <motion.div
                    animate={{
                        opacity: splitMode ? 1 : 0,
                        filter:  splitMode ? "blur(0px)" : "blur(5px)",
                    }}
                    transition={FADE}
                    style={{ pointerEvents: splitMode ? "auto" : "none" }}
                    className="absolute inset-0 flex flex-col"
                >
                    {/* ── BOTTOM: Template carousel ── always visible in split mode */}
                    <div className="flex-1 min-h-0 flex flex-col px-8 pt-2 pb-4 order-last overflow-hidden">
                        {/* Centered Start free button */}
                        <div className="flex-shrink-0 flex justify-center mb-2">
                            <Link href="/signup">
                                <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                    className="inline-flex items-center gap-1.5 px-6 py-2 rounded-lg bg-gradient-to-r from-orange-400 to-orange-500 text-white text-sm font-bold shadow-lg cursor-pointer"
                                >
                                    Select this template
                                    <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                </motion.span>
                            </Link>
                        </div>

                        {/* Preview card — browser chrome + properly scaled */}
                        <div className="flex-1 min-h-0 w-full max-w-4xl mx-auto relative flex flex-col">
                            <AnimatePresence mode="wait">
                                <motion.div key={templateIdx}
                                    initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}
                                    transition={{ duration: 0.3 }}
                                    onClick={() => { setSelectedTemplate(TEMPLATES[templateIdx]); setIsModalOpen(true); }}
                                    className="cursor-pointer group overflow-hidden rounded-xl border border-slate-700/60 hover:border-orange-400/40 transition-colors shadow-2xl flex-1 flex flex-col"
                                >
                                    {/* Browser chrome bar */}
                                    <div className="bg-slate-800/90 border-b border-slate-700/60 px-4 py-2 flex items-center gap-3 flex-shrink-0">
                                        <div className="flex gap-1.5">
                                            <div className="w-2.5 h-2.5 rounded-full bg-red-500/60" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-yellow-500/60" />
                                            <div className="w-2.5 h-2.5 rounded-full bg-green-500/60" />
                                        </div>
                                        <div className="flex-1 bg-slate-700/50 rounded px-3 py-1 text-center">
                                            <span className="text-[10px] text-gray-400 font-mono">{TEMPLATES[templateIdx].key}.simplepeek.com</span>
                                        </div>
                                    </div>
                                    {/* Scaled template — clipped to card height */}
                                    <div
                                        ref={outerPreviewRef}
                                        className="relative overflow-hidden flex-1 min-h-0"
                                    >
                                        <div style={{ width: "1280px", transformOrigin: "top left", transform: `scale(${previewScale})`, pointerEvents: "none" }}>
                                            {mounted
                                                ? <CurrentTpl site={MOCK.site} branding={MOCK.branding} content={MOCK.content} links={MOCK.links} />
                                                : <div style={{ height: "420px" }} className="flex items-center justify-center bg-gray-100"><p className="text-gray-500 text-sm">Loading...</p></div>
                                            }
                                        </div>
                                        {/* Bottom fade — hints there's more */}
                                        <div className="absolute bottom-0 left-0 right-0 h-10 bg-gradient-to-t from-slate-950/70 to-transparent pointer-events-none group-hover:opacity-0 transition-opacity" />
                                        {/* Corner badge */}
                                        <div className="absolute bottom-3 right-3 flex items-center gap-1.5 bg-black/60 backdrop-blur-sm text-orange-300 text-xs font-semibold px-3 py-1.5 rounded-full border border-orange-300/20 group-hover:opacity-0 transition-opacity pointer-events-none">
                                            <svg className="w-3 h-3" viewBox="0 0 16 16" fill="none"><path d="M10 2h4v4M14 2l-6 6M6 4H3a1 1 0 00-1 1v8a1 1 0 001 1h8a1 1 0 001-1v-3" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                            Preview full screen
                                        </div>
                                        {/* Hover overlay */}
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/50 transition-all duration-300 flex flex-col items-center justify-center gap-3">
                                            <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center gap-2">
                                                <div className="w-14 h-14 rounded-full bg-orange-400/90 backdrop-blur-sm flex items-center justify-center shadow-xl">
                                                    <svg className="w-6 h-6 text-white" viewBox="0 0 24 24" fill="none"><path d="M15 3h6v6M9 21H3v-6M21 3l-7 7M3 21l7-7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                </div>
                                                <span className="text-white text-sm font-bold">See it full screen</span>
                                                <span className="text-white/60 text-xs">Click to explore every detail</span>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>
                            </AnimatePresence>
                            {/* Arrows — outside the card, inside the max-w-4xl boundary */}
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                                onClick={(e) => { e.stopPropagation(); setTemplateIdx(i => (i - 1 + TEMPLATES.length) % TEMPLATES.length); }}
                                className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 w-9 h-9 rounded-full bg-orange-400 hover:bg-orange-300 text-white font-bold text-base shadow-lg cursor-pointer z-10 flex items-center justify-center"
                            >&#8592;</motion.button>
                            <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}
                                onClick={(e) => { e.stopPropagation(); setTemplateIdx(i => (i + 1) % TEMPLATES.length); }}
                                className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 w-9 h-9 rounded-full bg-orange-400 hover:bg-orange-300 text-white font-bold text-base shadow-lg cursor-pointer z-10 flex items-center justify-center"
                            >&#8594;</motion.button>
                        </div>

                        {/* Name + description + dots — right-aligned below card, animated */}
                        <AnimatePresence mode="wait">
                            <motion.div key={templateIdx}
                                initial={{ opacity: 0, x: 24, filter: "blur(6px)" }}
                                animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                                exit={{ opacity: 0, x: -16, filter: "blur(4px)" }}
                                transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                                className="flex-shrink-0 w-full max-w-4xl mx-auto flex items-end justify-end gap-5 mt-2"
                            >
                                <div className="flex gap-1.5 mb-0.5">
                                    {TEMPLATES.map((_, i) => (
                                        <button key={i} onClick={() => setTemplateIdx(i)}
                                            className={`h-1.5 rounded-full transition-all cursor-pointer ${i === templateIdx ? "bg-orange-400 w-5" : "bg-slate-600 w-1.5 hover:bg-slate-400"}`}
                                        />
                                    ))}
                                </div>
                                <div className="text-right">
                                    <p className="text-lg font-black text-orange-300 leading-tight">{TEMPLATES[templateIdx].name}</p>
                                    <p className="text-xs text-gray-500 mt-0.5">{TEMPLATES[templateIdx].description}</p>
                                </div>
                            </motion.div>
                        </AnimatePresence>
                    </div>

                    {/* Divider */}
                    <div className="flex-shrink-0 border-t border-slate-700/50 mx-8 order-2" />

                    {/* ── TOP: crossfading content panels ── */}
                    {/* Back to top — absolute, pinned just below nav */}
                    <button
                        onClick={() => switchViewRef.current("hero")}
                        className="absolute top-16 left-8 z-30 flex items-center gap-1.5 text-xs text-slate-500 hover:text-orange-300/80 transition-colors cursor-pointer"
                    >
                        <svg className="w-3 h-3 rotate-180" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                        Back to top
                    </button>
                    <div className="flex-shrink-0 relative overflow-hidden pt-16 order-first" style={{ height: "26vh" }}>

                        {/* templates intro — cream wash, editorial */}
                        <motion.div animate={bottomAnimate("templates")} transition={FADE}
                            className="absolute inset-0 flex flex-col items-center justify-center px-8 text-center gap-3"
                        >
                            {/* blush radial glow */}
                            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 0%, rgba(249,115,22,0.12) 0%, transparent 65%)" }} />
                            <p className="text-[10px] font-semibold tracking-widest uppercase text-orange-400/60">Browse templates</p>
                            <h2 className="text-4xl md:text-5xl font-black text-slate-50 leading-tight">
                                Find your{" "}
                                <span className="bg-gradient-to-r from-orange-300 to-orange-200 bg-clip-text text-transparent">perfect look.</span>
                            </h2>
                            <p className="text-slate-400 text-sm max-w-sm">
                                Preview any template below. Click for full screen.
                            </p>
                        </motion.div>

                        {/* how it works — warm light cards on cream-tinted surface */}
                        <motion.div animate={bottomAnimate("how")} transition={FADE}
                            className="absolute inset-0 flex items-center justify-center px-5 sm:px-10"
                        >
                            {/* midnight side glows */}
                            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 20% 50%, rgba(249,115,22,0.08) 0%, transparent 55%), radial-gradient(ellipse at 80% 50%, rgba(30,41,59,0.15) 0%, transparent 50%)" }} />
                            <div className="w-full max-w-3xl">
                                <p className="text-[10px] font-semibold tracking-widest uppercase text-orange-400/50 mb-2 sm:mb-4 text-center">How it works</p>
                                <div className="grid grid-cols-3 gap-2 sm:gap-4">
                                    {steps.map((step, i) => (
                                        <motion.div key={i}
                                            initial={{ opacity: 0, y: 16 }} animate={view === "how" ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 0.5, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
                                            className="relative rounded-xl sm:rounded-2xl border border-orange-400/15 bg-slate-700/20 backdrop-blur-sm px-3 sm:px-5 py-2 sm:py-4 flex flex-col gap-1 sm:gap-2 overflow-hidden"
                                        >
                                            <span className="absolute -right-1 -top-3 text-7xl font-black text-orange-300/[0.08] leading-none select-none pointer-events-none">{step.n}</span>
                                            <div className="w-6 h-0.5 rounded-full bg-gradient-to-r from-orange-400 to-orange-300/20 mb-1" />
                                            <h3 className="text-sm font-black text-slate-100 leading-tight">{step.title}</h3>
                                            <p className="text-xs text-slate-400/70 leading-relaxed">{step.desc}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* why simplepeek — deep espresso, bold cream stats */}
                        <motion.div animate={bottomAnimate("why")} transition={FADE}
                            className="absolute inset-0 flex items-center justify-center px-6 sm:px-12"
                        >
                            {/* dark center vignette + cream bottom glow */}
                            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 110%, rgba(249,115,22,0.08) 0%, transparent 55%)" }} />
                            <div className="w-full max-w-3xl">
                                <p className="text-[10px] font-semibold tracking-widest uppercase text-orange-400/50 mb-4 text-center">Why SimplePeek</p>
                                <div className="grid grid-cols-3 gap-px bg-orange-400/10 rounded-2xl overflow-hidden border border-orange-400/10">
                                    {[
                                        { stat: "< 5 min", label: "to go live",      accent: "text-orange-300" },
                                        { stat: "Zero",    label: "code required",   accent: "text-orange-400" },
                                        { stat: "100%",    label: "customizable",    accent: "text-orange-300" },
                                    ].map((item, i) => (
                                        <motion.div key={i}
                                            initial={{ opacity: 0, y: 10 }} animate={view === "why" ? { opacity: 1, y: 0 } : {}}
                                            transition={{ duration: 0.45, delay: i * 0.1 }}
                                            className="text-center bg-slate-800/60 px-4 py-5"
                                        >
                                            <p className={`text-3xl font-black ${item.accent} mb-1`}>{item.stat}</p>
                                            <p className="text-xs text-slate-400/70 uppercase tracking-widest">{item.label}</p>
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        </motion.div>

                        {/* testimonials — warm espresso card, big quote treatment */}
                        <motion.div animate={bottomAnimate("testimonials")} transition={FADE}
                            className="absolute inset-0 flex items-center justify-center px-6 sm:px-12"
                        >
                            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% 50%, rgba(15,23,42,0.55) 0%, transparent 70%)" }} />
                            <div className="relative w-full max-w-xl">
                                {/* big decorative quote mark */}
                                <span className="absolute -top-2 -left-4 text-6xl font-black text-orange-300/15 leading-none select-none">&ldquo;</span>
                                <div className="rounded-2xl border border-orange-400/[0.12] bg-slate-700/40 backdrop-blur-sm px-8 py-5">
                                    <div className="flex justify-center gap-0.5 mb-3">
                                        {[...Array(5)].map((_, s) => (
                                            <svg key={s} className="w-4 h-4 text-orange-400" viewBox="0 0 20 20" fill="currentColor">
                                                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                                            </svg>
                                        ))}
                                    </div>
                                    <blockquote className="text-lg font-bold text-slate-100 leading-snug mb-4 text-center">
                                        &#8220;I had my photo booth site up in under 10 minutes. Clients kept asking who built it.&#8221;
                                    </blockquote>
                                    <div className="flex items-center justify-center gap-2">
                                        <div className="w-7 h-7 rounded-full bg-slate-600 border border-orange-400/20 flex items-center justify-center text-xs font-bold text-orange-200">MT</div>
                                        <div className="text-left">
                                            <p className="text-xs font-semibold text-orange-300">Marissa T.</p>
                                            <p className="text-[10px] text-slate-400/60">Photo Booth Owner</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </motion.div>

                        {/* cta — lightest, most cream, most contrast */}
                        <motion.div animate={bottomAnimate("cta")} transition={FADE}
                            className="absolute inset-0 flex items-center justify-center px-5 sm:px-8"
                        >
                            {/* cream top glow — brightest panel */}
                            <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse at 50% -10%, rgba(249,115,22,0.14) 0%, transparent 60%), radial-gradient(ellipse at 50% 100%, rgba(30,41,59,0.20) 0%, transparent 50%)" }} />
                            <div className="relative w-full max-w-lg text-center">
                                <p className="text-[10px] font-semibold tracking-widest uppercase text-orange-400/60 mb-3">Ready?</p>
                                <h2 className="text-4xl md:text-5xl font-black text-slate-50 leading-tight mb-2">
                                    Your site is{" "}
                                    <span className="bg-gradient-to-r from-orange-300 to-orange-400 bg-clip-text text-transparent">waiting.</span>
                                </h2>
                                <p className="text-slate-400 text-sm mb-5">No credit card. No developer. Live in under 5 minutes.</p>
                                <Link href="/signup">
                                    <motion.span whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.97 }}
                                        className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-orange-400 to-orange-500 text-white text-base font-bold shadow-xl shadow-orange-500/30 cursor-pointer"
                                    >
                                        Create a free account
                                        <svg className="w-4 h-4" viewBox="0 0 16 16" fill="none"><path d="M3 8h10M9 4l4 4-4 4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                    </motion.span>
                                </Link>
                                <div className="flex justify-center items-center gap-6 text-xs text-slate-500 mt-4">
                                    <Link href="/pricing" className="hover:text-orange-400 transition-colors">Pricing</Link>
                                    <a href="#" className="hover:text-orange-400 transition-colors">Privacy</a>
                                    <a href="#" className="hover:text-orange-400 transition-colors">Terms</a>
                                    <span>&#169; 2026 SimplePeek</span>
                                </div>
                            </div>
                        </motion.div>

                    </div>{/* /bottom panels */}
                </motion.div>{/* /split layout */}

                {/* Nav dots */}
                <div className="absolute right-3 top-1/2 -translate-y-1/2 flex flex-col z-20">
                    {VIEWS.map((id, i) => (
                        <button key={id} onClick={() => switchViewRef.current(id)} title={VIEW_LABELS[i]}
                            className="w-7 h-7 flex items-center justify-center cursor-pointer"
                        >
                            <span className={`block rounded-full transition-all duration-300 ${view === id ? "bg-orange-400 w-2.5 h-2.5" : "bg-slate-600 w-1.5 h-1.5 hover:bg-slate-400"}`} />
                        </button>
                    ))}
                </div>

                <AnimatePresence>
                    {splitMode && showCrossfadeHint ? (
                        <motion.div
                            initial={{ opacity: 0, y: 8 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 8 }}
                            transition={{ duration: 0.35 }}
                            className="absolute left-1/2 -translate-x-1/2 bottom-6 z-20 pointer-events-none"
                        >
                            <div className="px-4 py-2 rounded-full border border-orange-300/20 bg-slate-950/55 backdrop-blur-md text-[11px] tracking-wide text-orange-200/75 shadow-lg">
                                Scroll or swipe to crossfade through sections
                            </div>
                        </motion.div>
                    ) : null}
                </AnimatePresence>

            </div>

            <TemplatePreviewModal
                template={selectedTemplate}
                templates={TEMPLATES}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onTemplateChange={setSelectedTemplate}
            />
        </main>
    );
}
