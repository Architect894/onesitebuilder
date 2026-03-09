"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import FieldRenderer from "@/components/editor/FieldRenderer";
import { getNestedValue } from "@/lib/utils/get-nested-value";
import { setNestedValue } from "@/lib/utils/set-nested-value";
import { mapSiteToTemplateProps } from "@/features/sites/mappers/map-site-to-template-props";
import { templateRegistry } from "@/features/templates/registry";
import { updateSiteDraft } from "@/features/sites/services/update-site-draft";

export default function SiteEditorClient({ site, schema, templateKey }) {
    const [draftSite, setDraftSite] = useState(site);
    const [savedSite, setSavedSite] = useState(site);
    const [activeSection, setActiveSection] = useState(schema.sections[0]?.id);
    const [isSaving, setIsSaving] = useState(false);
    const [viewport, setViewport] = useState("desktop");

    const previewRef = useRef(null);
    const controlsRef = useRef(null);

    function handleFieldChange(path, value) {
        setDraftSite((current) => setNestedValue(current, path, value));
    }

    const previewProps = useMemo(() => {
        return mapSiteToTemplateProps(draftSite);
    }, [draftSite]);

    const templateEntry = templateRegistry[templateKey];
    const TemplateComponent = templateEntry?.component;

    const hasUnsavedChanges =
        JSON.stringify(draftSite) !== JSON.stringify(savedSite);

    async function handleSaveDraft() {
        setIsSaving(true);

        const result = await updateSiteDraft(draftSite.id, draftSite);

        if (result.success) {
            setSavedSite(draftSite);
        }

        setIsSaving(false);
    }

    const activeSectionSchema = schema.sections.find(
        (s) => s.id === activeSection
    );

    const viewportWidths = {
        desktop: "w-[1400px]",
        tablet: "w-[768px]",
        mobile: "w-[390px]",
    };

    // Auto-scroll controls panel when switching sections
    useEffect(() => {
        controlsRef.current?.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    }, [activeSection]);

    function handlePreviewClick(e) {
        const section = e.target.closest("[data-preview-section]");
        if (!section) return;

        const id = section.getAttribute("data-preview-section");
        if (!id) return;

        setActiveSection(id);

        // Pulse highlight animation
        section.animate(
            [
                { boxShadow: "0 0 0 0 rgba(255,255,255,0)" },
                { boxShadow: "0 0 0 4px rgba(255,255,255,0.25)" },
                { boxShadow: "0 0 0 0 rgba(255,255,255,0)" },
            ],
            { duration: 650, easing: "ease-out" }
        );
    }

    return (
        <main className="flex h-screen flex-col bg-neutral-950 text-white">

            {/* TOP BAR */}

            <div className="flex items-center justify-between border-b border-neutral-800 px-6 py-4">

                <div>
                    <h1 className="text-lg font-semibold">{draftSite.name}</h1>
                    <p className="text-xs text-neutral-400">
                        Template: {schema.name}
                    </p>
                </div>

                {/* VIEWPORT CONTROLS */}

                <div className="flex items-center gap-2">

                    {["desktop", "tablet", "mobile"].map((v) => (
                        <button
                            key={v}
                            onClick={() => setViewport(v)}
                            className={`px-3 py-1 rounded text-sm transition ${viewport === v
                                    ? "bg-white text-black"
                                    : "bg-neutral-800 hover:bg-neutral-700"
                                }`}
                        >
                            {v.charAt(0).toUpperCase() + v.slice(1)}
                        </button>
                    ))}

                </div>

                {/* SAVE CONTROLS */}

                <div className="flex items-center gap-3">

                    <button
                        onClick={() => setDraftSite(savedSite)}
                        disabled={!hasUnsavedChanges}
                        className="rounded-full border border-neutral-700 px-4 py-2 text-sm disabled:opacity-40"
                    >
                        Reset
                    </button>

                    <button
                        onClick={handleSaveDraft}
                        disabled={!hasUnsavedChanges || isSaving}
                        className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black disabled:opacity-40"
                    >
                        {isSaving ? "Saving..." : "Save"}
                    </button>

                </div>
            </div>

            {/* MAIN EDITOR GRID */}

            <div className="grid flex-1 grid-cols-[240px_1fr_340px]">

                {/* LEFT SIDEBAR */}

                <aside className="border-r border-neutral-800 bg-neutral-900 p-4">

                    <h2 className="mb-4 text-sm font-semibold text-neutral-400">
                        Sections
                    </h2>

                    <div className="space-y-2">

                        {schema.sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition ${activeSection === section.id
                                        ? "bg-white text-black"
                                        : "hover:bg-neutral-800"
                                    }`}
                            >
                                {section.label}
                            </button>
                        ))}

                    </div>

                </aside>

                {/* CENTER PREVIEW */}

                <section className="flex items-center justify-center overflow-auto bg-neutral-800 p-10">

                    <div
                        className={`${viewportWidths[viewport]} max-w-[95vw] overflow-hidden rounded-[24px] border border-neutral-300 shadow-2xl transition-all`}
                    >

                        {/* Browser bar */}

                        <div className="flex gap-2 border-b border-neutral-200 bg-neutral-100 px-4 py-3">
                            <span className="h-3 w-3 rounded-full bg-neutral-300" />
                            <span className="h-3 w-3 rounded-full bg-neutral-300" />
                            <span className="h-3 w-3 rounded-full bg-neutral-300" />
                        </div>

                        {/* Live preview */}

                        <div
                            ref={previewRef}
                            className="h-[80vh] w-full overflow-y-auto [&_[data-preview-section]]:cursor-pointer"
                            onClick={handlePreviewClick}
                        >

                            {TemplateComponent ? (
                                <TemplateComponent {...previewProps} isEditor />
                            ) : (
                                <div className="p-8 text-black">
                                    Template not found
                                </div>
                            )}

                        </div>

                    </div>

                </section>

                {/* RIGHT SIDEBAR */}

                <aside
                    ref={controlsRef}
                    className="border-l border-neutral-800 bg-neutral-900 p-6 overflow-y-auto"
                >

                    <h2 className="text-lg font-semibold">
                        {activeSectionSchema?.label}
                    </h2>

                    <div className="mt-6 space-y-5">

                        {activeSectionSchema?.fields.map((field) => (
                            <FieldRenderer
                                key={field.id}
                                field={field}
                                value={getNestedValue(draftSite, field.id)}
                                onChange={handleFieldChange}
                            />
                        ))}

                    </div>

                </aside>

            </div>
        </main>
    );
}