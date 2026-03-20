"use client";
import { useState, useCallback } from "react";
import { PALETTES, ANIMATIONS, parseBgValue, getBgColor } from "@/templates/shared/SectionBackground";

export default function FieldRenderer({ field, value, onChange }) {
    const isText = field.type === "text" || field.type === "url";
    const isTextarea = field.type === "textarea";
    const isColor =
        field.type === "color" ||
        field.type === "sectionColor" ||
        field.type === "bgColor" ||
        field.type === "buttonColor" ||
        field.type === "textColor";
    
    const isAmbientColor = field.type === "ambientColor";
    const isBackground = field.type === "background";

    const swatches = [
        "#000000",
        "#ffffff",
        "#1a1a1a",
        "#f5f5f5",
        "#d4a574",
        "#f1c886",
        "#9c8762",
        "#e6b17e",
    ];

    const ambientColors = [
        { name: "Pure Black", value: "#000000" },
        { name: "Deep Charcoal", value: "#0a0a0a" },
        { name: "Midnight", value: "#0f0f1a" },
        { name: "Dark Navy", value: "#0d1117" },
        { name: "Deep Slate", value: "#1a1a2e" },
        { name: "Dark Warm", value: "#1a1410" },
        { name: "Deep Forest", value: "#0a1612" },
        { name: "Dark Plum", value: "#15101a" },
        { name: "Deep Charcoal Alt", value: "#1a1a1a" },
        { name: "Almost Black", value: "#050505" },
    ];

    return (
        <div className="space-y-3">
            <label className="block">
                <p className="text-sm font-semibold text-white mb-2">{field.label}</p>

                {isText && (
                    <input
                        type={field.type === "url" ? "url" : "text"}
                        value={value ?? ""}
                        onChange={(e) => onChange(field.id, e.target.value)}
                        placeholder={field.label}
                        className="w-full px-3 py-3 text-base bg-neutral-700 border-2 border-neutral-600 rounded-lg text-white font-medium hover:border-neutral-500 focus:border-blue-500 focus:outline-none transition"
                    />
                )}

                {isTextarea && (
                    <textarea
                        value={value ?? ""}
                        onChange={(e) => onChange(field.id, e.target.value)}
                        placeholder={field.label}
                        rows={5}
                        className="w-full px-3 py-3 text-base bg-neutral-700 border-2 border-neutral-600 rounded-lg text-white resize-none hover:border-neutral-500 focus:border-blue-500 focus:outline-none transition"
                    />
                )}

                {isColor && (
                    <div className="space-y-3">
                        <div className="flex gap-3 items-center">
                            <input
                                type="color"
                                value={value ?? "#000000"}
                                onChange={(e) => onChange(field.id, e.target.value)}
                                className="h-14 w-16 cursor-pointer rounded-lg border-2 border-neutral-600 hover:border-neutral-500 transition"
                            />
                            <div className="flex-1">
                                <input
                                    type="text"
                                    value={value ?? "#000000"}
                                    onChange={(e) => onChange(field.id, e.target.value)}
                                    className="w-full px-3 py-3 text-base bg-neutral-700 border-2 border-neutral-600 rounded-lg text-white font-mono hover:border-neutral-500 focus:border-blue-500 focus:outline-none transition"
                                />
                            </div>
                            <div
                                className="h-14 w-14 rounded-lg border-2 border-neutral-600 flex-shrink-0"
                                style={{ backgroundColor: value ?? "#000000" }}
                            />
                        </div>

                        {/* Quick swatches */}
                        <div className="flex flex-wrap gap-2">
                            {swatches.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => onChange(field.id, c)}
                                    className="h-10 w-10 rounded-lg border-2 border-neutral-600 hover:border-white transition hover:scale-110"
                                    style={{ backgroundColor: c }}
                                    title={c}
                                />
                            ))}
                        </div>
                    </div>
                )}

                {isAmbientColor && (
                    <div className="space-y-2 mb-4">
                        <div className="grid grid-cols-5 gap-2">
                            {ambientColors.map((color) => (
                                <button
                                    key={color.value}
                                    type="button"
                                    onClick={() => onChange(field.id, color.value)}
                                    className={`group relative h-12 rounded-lg border-2 transition-all hover:scale-105 ${
                                        value === color.value
                                            ? "border-blue-500 ring-2 ring-blue-500"
                                            : "border-neutral-600 hover:border-neutral-500"
                                    }`}
                                    style={{ backgroundColor: color.value }}
                                    title={color.name}
                                >
                                    <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-white opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                                        {color.name}
                                    </span>
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {isBackground && (
                    <BackgroundPicker
                        fieldId={field.id}
                        value={value}
                        onChange={onChange}
                        swatches={swatches}
                    />
                )}
            </label>
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   BackgroundPicker — three-mode picker: Solid · Image · Ambiance
   ═══════════════════════════════════════════════════════════════════════════ */
function BackgroundPicker({ fieldId, value, onChange, swatches }) {
    const bg = parseBgValue(value);
    const [tab, setTab] = useState(bg.mode === "image" ? "image" : bg.mode === "animated" ? "ambiance" : "solid");
    const [uploading, setUploading] = useState(false);

    const emit = useCallback((val) => onChange(fieldId, val), [fieldId, onChange]);

    const tabs = [
        { id: "solid",    label: "Solid" },
        { id: "image",    label: "Image" },
        { id: "ambiance", label: "Ambiance" },
    ];

    /* ── image upload handler ─────────────────────────────────────────── */
    const handleImageUpload = useCallback(async (e) => {
        const file = e.target.files?.[0];
        if (!file || !file.type.startsWith("image/")) return;
        setUploading(true);
        try {
            const fd = new FormData();
            fd.append("file", file);
            const res = await fetch("/api/upload", { method: "POST", body: fd });
            if (!res.ok) throw new Error("Upload failed");
            const { url } = await res.json();
            emit({ mode: "image", url, color: getBgColor(value, "#000000") });
        } catch {
            /* silently fail — user can retry */
        } finally {
            setUploading(false);
        }
    }, [emit, value]);

    return (
        <div className="space-y-3">
            {/* Tab bar */}
            <div className="flex rounded-lg overflow-hidden border border-neutral-600">
                {tabs.map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        className={[
                            "flex-1 py-2 text-xs font-semibold uppercase tracking-wider transition-colors",
                            tab === t.id
                                ? "bg-blue-600 text-white"
                                : "bg-neutral-700 text-neutral-300 hover:bg-neutral-600",
                        ].join(" ")}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* ── Solid colour ─────────────────────────────────────────── */}
            {tab === "solid" && (
                <div className="space-y-3">
                    <div className="flex gap-3 items-center">
                        <input
                            type="color"
                            value={bg.mode === "color" ? (bg.color ?? "#000000") : getBgColor(value, "#000000")}
                            onChange={(e) => emit({ mode: "color", color: e.target.value })}
                            className="h-14 w-16 cursor-pointer rounded-lg border-2 border-neutral-600 hover:border-neutral-500 transition"
                        />
                        <div className="flex-1">
                            <input
                                type="text"
                                value={bg.mode === "color" ? (bg.color ?? "#000000") : getBgColor(value, "#000000")}
                                onChange={(e) => emit({ mode: "color", color: e.target.value })}
                                className="w-full px-3 py-3 text-base bg-neutral-700 border-2 border-neutral-600 rounded-lg text-white font-mono hover:border-neutral-500 focus:border-blue-500 focus:outline-none transition"
                            />
                        </div>
                        <div
                            className="h-14 w-14 rounded-lg border-2 border-neutral-600 flex-shrink-0"
                            style={{ backgroundColor: getBgColor(value, "#000000") }}
                        />
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {swatches.map((c) => (
                            <button
                                key={c}
                                type="button"
                                onClick={() => emit({ mode: "color", color: c })}
                                className="h-10 w-10 rounded-lg border-2 border-neutral-600 hover:border-white transition hover:scale-110"
                                style={{ backgroundColor: c }}
                                title={c}
                            />
                        ))}
                    </div>
                </div>
            )}

            {/* ── Image ────────────────────────────────────────────────── */}
            {tab === "image" && (
                <div className="space-y-3">
                    {bg.mode === "image" && bg.url && (
                        <div className="relative rounded-lg overflow-hidden border border-neutral-600 aspect-video">
                            <img src={bg.url} alt="" className="w-full h-full object-cover" />
                            <button
                                type="button"
                                onClick={() => emit({ mode: "color", color: bg.color ?? "#000000" })}
                                className="absolute top-2 right-2 bg-black/70 hover:bg-black text-white text-xs px-2 py-1 rounded"
                            >
                                Remove
                            </button>
                        </div>
                    )}
                    <label className="block cursor-pointer">
                        <div className={[
                            "flex items-center justify-center gap-2 py-4 rounded-lg border-2 border-dashed transition",
                            uploading
                                ? "border-blue-500 bg-blue-500/10 text-blue-400"
                                : "border-neutral-600 hover:border-neutral-400 text-neutral-400 hover:text-white",
                        ].join(" ")}>
                            <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                                <path strokeLinecap="round" strokeLinejoin="round" d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span className="text-sm font-medium">
                                {uploading ? "Uploading…" : "Choose Image"}
                            </span>
                        </div>
                        <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={handleImageUpload}
                            disabled={uploading}
                        />
                    </label>
                </div>
            )}

            {/* ── Ambiance (animated luxury backgrounds) ───────────────── */}
            {tab === "ambiance" && (
                <AmbiancePicker value={bg} onChange={emit} />
            )}
        </div>
    );
}

/* ═══════════════════════════════════════════════════════════════════════════
   AmbiancePicker — palette grid + animation selector
   ═══════════════════════════════════════════════════════════════════════════ */
function AmbiancePicker({ value, onChange }) {
    const activePalette = value.mode === "animated" ? value.palette : null;
    const activeAnimation = value.mode === "animated" ? value.animation : "aurora";

    const selectPalette = (key) => {
        onChange({ mode: "animated", palette: key, animation: activeAnimation ?? "aurora" });
    };
    const selectAnimation = (key) => {
        if (!activePalette) return;
        onChange({ mode: "animated", palette: activePalette, animation: key });
    };

    return (
        <div className="space-y-4">
            {/* Palette grid */}
            <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Color</p>
                <div className="grid grid-cols-5 gap-2">
                    {Object.entries(PALETTES).map(([key, pal]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => selectPalette(key)}
                            className={[
                                "group relative h-12 rounded-lg border-2 transition-all hover:scale-105",
                                activePalette === key
                                    ? "border-blue-500 ring-2 ring-blue-500/50"
                                    : "border-neutral-600 hover:border-neutral-400",
                            ].join(" ")}
                            style={{ background: `linear-gradient(135deg, ${pal.stops[0]}, ${pal.stops[1]})` }}
                            title={pal.name}
                        >
                            <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[10px] text-neutral-400 opacity-0 group-hover:opacity-100 whitespace-nowrap pointer-events-none">
                                {pal.name}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Animation selector */}
            <div>
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400 mb-2">Animation</p>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(ANIMATIONS).map(([key, anim]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => selectAnimation(key)}
                            disabled={!activePalette}
                            className={[
                                "px-3 py-1.5 rounded-full text-xs font-semibold transition-all border",
                                !activePalette
                                    ? "border-neutral-700 text-neutral-600 cursor-not-allowed"
                                    : activeAnimation === key
                                        ? "bg-blue-600 border-blue-500 text-white"
                                        : "border-neutral-600 text-neutral-300 hover:border-neutral-400 hover:text-white",
                            ].join(" ")}
                        >
                            {anim.name}
                        </button>
                    ))}
                </div>
            </div>

            {/* Live preview swatch */}
            {activePalette && activeAnimation && (
                <div className="relative h-20 rounded-lg overflow-hidden border border-neutral-600">
                    <AmbiancePreview palette={activePalette} animation={activeAnimation} />
                    <span className="absolute bottom-2 left-3 text-[11px] font-semibold text-white/60 drop-shadow">
                        {PALETTES[activePalette]?.name} · {ANIMATIONS[activeAnimation]?.name}
                    </span>
                </div>
            )}
        </div>
    );
}

/* Tiny inline preview for the ambiance swatch */
function AmbiancePreview({ palette, animation }) {
    const pal = PALETTES[palette];
    const anim = ANIMATIONS[animation];
    if (!pal || !anim) return null;
    const isRadial = animation === "pulse" || animation === "radiance";
    const gradient = isRadial
        ? `radial-gradient(ellipse at 50% 50%, ${pal.stops[0]}, ${pal.stops[1]}, ${pal.stops[2]}, ${pal.stops[3]})`
        : `linear-gradient(135deg, ${pal.stops[0]}, ${pal.stops[1]}, ${pal.stops[2]}, ${pal.stops[3]}, ${pal.stops[0]})`;

    return (
        <>
            <style dangerouslySetInnerHTML={{ __html: PREVIEW_KEYFRAMES }} />
            <div
                style={{
                    position: "absolute",
                    inset: 0,
                    background: gradient,
                    backgroundSize: isRadial ? "150% 150%" : "300% 300%",
                    animation: anim.css,
                }}
            />
        </>
    );
}

const PREVIEW_KEYFRAMES = `
@keyframes bg-aurora   { 0%{background-position:0% 50%}50%{background-position:100% 50%}100%{background-position:0% 50%} }
@keyframes bg-pulse    { 0%,100%{opacity:.55;transform:scale(1)}50%{opacity:.85;transform:scale(1.05)} }
@keyframes bg-shimmer  { 0%{background-position:-200% 0}100%{background-position:200% 0} }
@keyframes bg-drift    { 0%{background-position:0% 0%}50%{background-position:100% 100%}100%{background-position:0% 0%} }
@keyframes bg-radiance { 0%,100%{transform:scale(1);opacity:.6}50%{transform:scale(1.3);opacity:.9} }
`;