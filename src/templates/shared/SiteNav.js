"use client";

import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";

/**
 * Shared scroll-aware navigation for site templates.
 *
 * - Collapses to dots by default.
 * - Expands (with labels) whenever the active section changes (user scrolled).
 * - Collapses back to dots 5 seconds after the last scroll, unless hovered.
 * - Stays expanded for as long as the user hovers.
 */
export default function SiteNav({ sections, view, switchView, accent, theme = "dark" }) {
    const [expanded, setExpanded] = useState(false);
    const hoveredRef = useRef(false);
    const timerRef = useRef(null);

    const isDark = theme !== "light";
    const inactiveDot = isDark ? "rgba(255,255,255,0.22)" : "rgba(0,0,0,0.18)";
    const inactiveLabel = isDark ? "rgba(255,255,255,0.55)" : "rgba(0,0,0,0.45)";

    function scheduleCollapse() {
        clearTimeout(timerRef.current);
        timerRef.current = setTimeout(() => {
            if (!hoveredRef.current) setExpanded(false);
        }, 5000);
    }

    // Expand whenever the user scrolls to a new section
    useEffect(() => {
        setExpanded(true);
        scheduleCollapse();
    }, [view]); // eslint-disable-line react-hooks/exhaustive-deps

    // Cleanup timer on unmount
    useEffect(() => () => clearTimeout(timerRef.current), []);

    return (
        <nav
            className="absolute right-6 top-1/2 -translate-y-1/2 z-50 flex flex-col items-end gap-3"
            onMouseEnter={() => {
                hoveredRef.current = true;
                clearTimeout(timerRef.current);
                setExpanded(true);
            }}
            onMouseLeave={() => {
                hoveredRef.current = false;
                scheduleCollapse();
            }}
        >
            {sections.map((s, i) => {
                const active = s === view;
                return (
                    <button
                        key={s}
                        onClick={() => switchView(s)}
                        aria-label={`Go to ${s}`}
                        className="flex items-center gap-2.5 cursor-pointer"
                    >
                        {/* Label — slides in from right when expanded */}
                        <motion.span
                            initial={false}
                            animate={{
                                maxWidth: expanded ? 80 : 0,
                                opacity: expanded ? (active ? 1 : 0.5) : 0,
                                x: expanded ? 0 : 8,
                            }}
                            transition={{
                                duration: 0.42,
                                delay: expanded
                                    ? i * 0.045           // stagger in: top → bottom
                                    : (sections.length - 1 - i) * 0.025, // stagger out: bottom → top
                                ease: [0.16, 1, 0.3, 1],
                            }}
                            className="overflow-hidden whitespace-nowrap inline-block text-[9px] uppercase tracking-widest font-semibold leading-none"
                            style={{ color: active ? accent : inactiveLabel }}
                        >
                            {s}
                        </motion.span>

                        {/* Dot / active pill */}
                        <motion.span
                            animate={{
                                height: active ? 20 : 5,
                                backgroundColor: active ? accent : inactiveDot,
                            }}
                            transition={{ duration: 0.45, ease: [0.16, 1, 0.3, 1] }}
                            className="block rounded-full flex-shrink-0"
                            style={{ width: "5px" }}
                        />
                    </button>
                );
            })}
        </nav>
    );
}
