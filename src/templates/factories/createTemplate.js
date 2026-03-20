"use client";

/**
 * Factory function to create template components from skeleton + style.
 * 
 * This is the core of the scalable template architecture.
 * Pass a skeleton definition and style preset to get a complete, working template.
 * 
 * Usage:
 *   const MyTemplate = createTemplate(SKELETON_SHOWCASE, STYLE_LUXE_DARK);
 */

import { motion } from "framer-motion";
import { useEffect, useRef } from "react";
import SiteNav from "@/templates/shared/SiteNav";
import { useSiteScroll } from "@/templates/shared/useSiteScroll";
import { SCENE_FADE, getSceneAnimation } from "@/templates/shared/sceneTransition";
import { SECTION_RENDERERS } from "@/templates/shared/sectionRenderers";

export function createTemplate(skeletonDef, stylePreset) {
    if (!skeletonDef || !stylePreset) {
        throw new Error("createTemplate requires both skeleton definition and style preset");
    }

    const SECTIONS = skeletonDef.sections;
    const SCROLL_SECTIONS = new Set(skeletonDef.scrollSections || []);
    const FADE = SCENE_FADE;

    return function TemplateComponent({
        site,
        branding,
        content,
        links,
        isEditor = false,
        editorPanel = null,
        onEditorPanelChange = null,
    }) {
        const { view, switchView, containerRef, getScrollRef } = useSiteScroll(
            SECTIONS,
            { scrollSections: SCROLL_SECTIONS, isEditor }
        );

        const switchViewRef = useRef(switchView);
        switchViewRef.current = switchView;

        useEffect(() => {
            if (!isEditor || !editorPanel) return;
            switchViewRef.current(editorPanel);
        }, [editorPanel, isEditor]);

        function sa(id) {
            const anim = getSceneAnimation(SECTIONS, view, id);
            // Apply custom scale from style preset
            return {
                ...anim,
                scale:
                    id === view ? 1 : stylePreset.sceneScale || 1.02,
            };
        }

        const accent = branding?.accentColor ?? stylePreset.heroDefaults.accentColor;

        function renderSection(sectionId) {
            const renderer = SECTION_RENDERERS[sectionId];
            if (!renderer) {
                return <div>Unknown section: {sectionId}</div>;
            }
            return renderer(content, branding, stylePreset, isEditor);
        }

        /* ── EDITOR MODE ── */
        if (isEditor) {
            function nav(s) {
                switchView(s);
                onEditorPanelChange?.(s);
            }
            const idx = SECTIONS.indexOf(view);
            return (
                <main className="relative w-full h-full overflow-hidden" suppressHydrationWarning>
                    {renderSection(view)}

                    <div className="absolute bottom-5 left-1/2 -translate-x-1/2 z-[100] flex items-center gap-2 bg-black/75 backdrop-blur-md rounded-full px-3 py-2 border border-white/10 shadow-xl">
                        <button
                            onClick={() => idx > 0 && nav(SECTIONS[idx - 1])}
                            disabled={idx === 0}
                            className="w-5 h-5 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                        >
                            <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M15 19l-7-7 7-7"
                                />
                            </svg>
                        </button>
                        <div className="flex items-center gap-1.5">
                            {SECTIONS.map((s) => (
                                <button
                                    key={s}
                                    onClick={() => nav(s)}
                                    title={s}
                                    className={`rounded-full transition-all duration-200 ${
                                        s === view
                                            ? "w-4 h-1.5 bg-white"
                                            : "w-1.5 h-1.5 bg-white/30 hover:bg-white/60"
                                    }`}
                                />
                            ))}
                        </div>
                        <button
                            onClick={
                                () => idx < SECTIONS.length - 1 && nav(SECTIONS[idx + 1])
                            }
                            disabled={idx === SECTIONS.length - 1}
                            className="w-5 h-5 flex items-center justify-center text-white/50 hover:text-white disabled:opacity-20 transition-colors"
                        >
                            <svg
                                className="w-3 h-3"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2.5}
                                    d="M9 5l7 7-7 7"
                                />
                            </svg>
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
                        {renderSection(s)}
                    </motion.div>
                ))}
            </main>
        );
    };
}

/**
 * Metadata function to get template info (name, description, etc.)
 */
export function getTemplateMetadata(templateName, skeletonDef, stylePreset) {
    return {
        name: templateName,
        skeleton: skeletonDef.key,
        style: stylePreset.key,
        description: `${skeletonDef.description} Styled with ${stylePreset.description}`,
        skeleton_description: skeletonDef.description,
        style_description: stylePreset.description,
    };
}
