"use client";
import { useMemo } from "react";

/* ═══════════════════════════════════════════════════════════════════════════
   PALETTES — 10 luxury color sets, each with a base + 4 gradient stops
   ═══════════════════════════════════════════════════════════════════════════ */
export const PALETTES = {
    obsidian:   { name: "Obsidian",   base: "#0a0a12", stops: ["#0a0a12", "#18183a", "#0e1024", "#1e1e48"] },
    champagne:  { name: "Champagne",  base: "#f0dcc0", stops: ["#f0dcc0", "#dcc49a", "#e8d0ae", "#c8a87a"] },
    burgundy:   { name: "Burgundy",   base: "#280810", stops: ["#280810", "#501830", "#3c0e1e", "#681e3c"] },
    sapphire:   { name: "Sapphire",   base: "#0a1428", stops: ["#0a1428", "#142a58", "#0e1e3c", "#1a3468"] },
    emerald:    { name: "Emerald",    base: "#081810", stops: ["#081810", "#103828", "#0c2818", "#145038"] },
    roseGold:   { name: "Rose Gold",  base: "#261616", stops: ["#261616", "#3e2a28", "#342020", "#4c3232"] },
    onyx:       { name: "Onyx",       base: "#080808", stops: ["#080808", "#1c1c1c", "#121212", "#242424"] },
    ivory:      { name: "Ivory",      base: "#f4efe6", stops: ["#f4efe6", "#e6dcc8", "#eee8dc", "#d8c8a8"] },
    midnight:   { name: "Midnight",   base: "#08081a", stops: ["#08081a", "#14143a", "#0e0e2a", "#1c1c4a"] },
    bronze:     { name: "Bronze",     base: "#1a1408", stops: ["#1a1408", "#302412", "#241c0c", "#3c2c16"] },
};

/* ═══════════════════════════════════════════════════════════════════════════
   ANIMATIONS — 5 motion styles for animated backgrounds
   ═══════════════════════════════════════════════════════════════════════════ */
export const ANIMATIONS = {
    aurora:   { name: "Aurora",   css: "bg-aurora   20s ease infinite" },
    pulse:    { name: "Pulse",    css: "bg-pulse    8s  ease infinite" },
    shimmer:  { name: "Shimmer",  css: "bg-shimmer  12s linear infinite" },
    drift:    { name: "Drift",    css: "bg-drift    16s ease infinite" },
    radiance: { name: "Radiance", css: "bg-radiance 10s ease infinite" },
};

/* The <style> block with all keyframes — injected once per page */
const KEYFRAMES = `
@keyframes bg-aurora {
  0%   { background-position: 0% 50%; }
  50%  { background-position: 100% 50%; }
  100% { background-position: 0% 50%; }
}
@keyframes bg-pulse {
  0%, 100% { opacity: .55; transform: scale(1); }
  50%      { opacity: .85; transform: scale(1.05); }
}
@keyframes bg-shimmer {
  0%   { background-position: -200% 0; }
  100% { background-position: 200% 0; }
}
@keyframes bg-drift {
  0%   { background-position: 0% 0%; }
  50%  { background-position: 100% 100%; }
  100% { background-position: 0% 0%; }
}
@keyframes bg-radiance {
  0%, 100% { transform: scale(1);   opacity: .6; }
  50%      { transform: scale(1.3); opacity: .9; }
}
`;

/* ═══════════════════════════════════════════════════════════════════════════
   parseBgValue  — normalise a raw background value (string | object)
   ═══════════════════════════════════════════════════════════════════════════ */
export function parseBgValue(raw, fallback = "#000000") {
    if (!raw) return { mode: "color", color: fallback };
    if (typeof raw === "string") return { mode: "color", color: raw };
    return raw;
}

/* ═══════════════════════════════════════════════════════════════════════════
   getBgColor — extract a solid CSS colour from any bg value (for fallback)
   ═══════════════════════════════════════════════════════════════════════════ */
export function getBgColor(raw, fallback = "#000000") {
    if (!raw) return fallback;
    if (typeof raw === "string") return raw;
    if (raw.mode === "color") return raw.color ?? fallback;
    if (raw.mode === "image") return raw.color ?? fallback;
    if (raw.mode === "animated") return PALETTES[raw.palette]?.base ?? fallback;
    return fallback;
}

/* ═══════════════════════════════════════════════════════════════════════════
   <SectionBackground>  — drop this as the first child of a section <div>
   For solid colours it renders nothing (parent handles backgroundColor).
   For images / animated palettes it renders an absolute overlay.
   ═══════════════════════════════════════════════════════════════════════════ */
export default function SectionBackground({ value }) {
    const bg = parseBgValue(value);

    /* ── Image mode ────────────────────────────────────────────────── */
    if (bg.mode === "image" && bg.url) {
        return (
            <div
                className="absolute inset-0 pointer-events-none z-[-1]"
                style={{
                    backgroundImage: `url(${bg.url})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    opacity: bg.opacity ?? 1,
                }}
            />
        );
    }

    /* ── Animated mode ─────────────────────────────────────────────── */
    if (bg.mode === "animated" && bg.palette && bg.animation) {
        return <AnimatedLayer palette={bg.palette} animation={bg.animation} />;
    }

    return null;
}

/* ── internal animated overlay ─────────────────────────────────────────── */
function AnimatedLayer({ palette, animation }) {
    const pal = PALETTES[palette];
    const anim = ANIMATIONS[animation];
    if (!pal || !anim) return null;

    const style = useMemo(() => {
        const stops = pal.stops;
        const isRadial = animation === "pulse" || animation === "radiance";

        const gradient = isRadial
            ? `radial-gradient(ellipse at 50% 50%, ${stops[0]}, ${stops[1]}, ${stops[2]}, ${stops[3]})`
            : `linear-gradient(135deg, ${stops[0]}, ${stops[1]}, ${stops[2]}, ${stops[3]}, ${stops[0]})`;

        return {
            position: "absolute",
            inset: 0,
            zIndex: -1,
            pointerEvents: "none",
            background: gradient,
            backgroundSize: isRadial ? "150% 150%" : "300% 300%",
            animation: anim.css,
        };
    }, [palette, animation, pal, anim]);

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: KEYFRAMES }} />
            <div style={style} />
        </>
    );
}
