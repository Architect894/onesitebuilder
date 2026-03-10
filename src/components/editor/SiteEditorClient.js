"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import FieldRenderer from "@/components/editor/FieldRenderer";
import { getNestedValue } from "@/lib/utils/get-nested-value";
import { setNestedValue } from "@/lib/utils/set-nested-value";
import { mapSiteToTemplateProps } from "@/features/sites/mappers/map-site-to-template-props";
import { templateRegistry } from "@/features/templates/registry";
import { updateSiteDraft } from "@/features/sites/services/update-site-draft";

export default function SiteEditorClient({ site, schema, templateKey }) {
    const [draftSite, setDraftSite] = useState(site);
    const [savedSite, setSavedSite] = useState(site);
    const [activeSection, setActiveSection] = useState(null);
    const [isSaving, setIsSaving] = useState(false);

    function handleFieldChange(path, value) {
        setDraftSite((current) => setNestedValue(current, path, value));
    }

    const previewProps = useMemo(() => {
        return mapSiteToTemplateProps(draftSite);
    }, [draftSite]);

    const templateEntry = templateRegistry[templateKey];
    
    // Dynamically load template without SSR to avoid Framer Motion hydration mismatches
    const DynamicTemplate = useMemo(() => {
        if (!templateEntry?.component) return null;
        return dynamic(() => Promise.resolve(templateEntry.component), { ssr: false });
    }, [templateEntry]);

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

    function handlePreviewClick(e) {
        const editableField = e.target.closest("[data-editable-field]");
        if (editableField) {
            const fieldId = editableField.getAttribute("data-editable-field");
            const section = editableField.closest("[data-preview-section]");
            if (section && fieldId) {
                const sectionId = section.getAttribute("data-preview-section");
                setActiveSection(sectionId);
                setTimeout(() => {
                    const input = document.querySelector(`[data-field-input="${fieldId}"]`);
                    input?.focus();
                }, 0);
            }
            return;
        }

        const section = e.target.closest("[data-preview-section]");
        if (!section) return;

        const id = section.getAttribute("data-preview-section");
        if (!id) return;

        setActiveSection(id);
    }

    return (
        <main className="flex h-screen flex-col bg-neutral-950 text-white">
            {/* TOP BAR */}
            <div className="flex items-center justify-between border-b border-neutral-800 bg-neutral-900 px-6 py-4">
                <div className="flex items-center gap-4">
                    <div>
                        <h1 className="text-lg font-semibold">{draftSite.name}</h1>
                        <p className="text-xs text-neutral-500">{schema.name}</p>
                    </div>
                </div>

                <div className="flex items-center gap-3">
                    <button
                        onClick={() => setDraftSite(savedSite)}
                        disabled={!hasUnsavedChanges}
                        className="px-4 py-2 text-sm rounded border border-neutral-700 hover:border-neutral-500 transition disabled:opacity-30"
                    >
                        Cancel
                    </button>
                    <button
                        onClick={handleSaveDraft}
                        disabled={!hasUnsavedChanges || isSaving}
                        className="px-6 py-2 text-sm rounded bg-blue-600 hover:bg-blue-700 font-medium transition disabled:opacity-30"
                    >
                        {isSaving ? "Saving..." : "Publish"}
                    </button>
                </div>
            </div>

            {/* MAIN EDITOR GRID */}
            <div className="flex flex-1 overflow-hidden">
                {/* LEFT SIDEBAR - Sections */}
                <aside className="w-56 border-r border-neutral-800 bg-neutral-900 flex flex-col overflow-hidden">
                    <div className="p-4 border-b border-neutral-800">
                        <h2 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                            Sections
                        </h2>
                    </div>

                    <div className="flex-1 overflow-y-auto space-y-1 p-2">
                        {schema.sections.map((section) => (
                            <button
                                key={section.id}
                                onClick={() => setActiveSection(section.id)}
                                className={`w-full rounded-lg px-3 py-2.5 text-left text-sm transition ${
                                    activeSection === section.id
                                        ? "bg-blue-600 text-white"
                                        : "text-neutral-300 hover:bg-neutral-800"
                                }`}
                            >
                                <div className="font-medium">{section.label}</div>
                                <div className="text-xs text-neutral-500 mt-0.5">
                                    Click to edit
                                </div>
                            </button>
                        ))}
                    </div>
                </aside>

                {/* CENTER - LIVE PREVIEW */}
                <section className="flex-1 bg-neutral-800 flex items-center justify-center overflow-auto p-8">
                    <div className="w-full max-w-4xl h-full bg-black rounded-lg overflow-hidden border border-neutral-700 shadow-2xl">
                        {/* Browser chrome */}
                        <div className="flex gap-2 border-b border-neutral-700 bg-neutral-900 px-4 py-3">
                            <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                            <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                            <span className="h-2.5 w-2.5 rounded-full bg-neutral-700" />
                        </div>

                        {/* Preview content */}
                        <div
                            className="w-full h-full overflow-y-auto [&_[data-preview-section]]:cursor-pointer"
                            onClick={handlePreviewClick}
                        >
                            {DynamicTemplate ? (
                                <DynamicTemplate {...previewProps} isEditor />
                            ) : (
                                <div className="p-8 text-neutral-400">
                                    Template not found
                                </div>
                            )}
                        </div>
                    </div>
                </section>

                {/* RIGHT SIDEBAR - Properties */}
                <aside className="w-80 border-l border-neutral-800 bg-neutral-900 flex flex-col overflow-hidden">
                    {activeSection && activeSectionSchema ? (
                        <>
                            <div className="p-4 border-b border-neutral-800">
                                <h2 className="text-sm font-semibold">{activeSectionSchema.label}</h2>
                                <p className="text-xs text-neutral-500 mt-1">
                                    Customize this section
                                </p>
                            </div>

                            <div className="flex-1 overflow-y-auto p-4 space-y-6">
                                {/* Colors Section */}
                                <div className="space-y-3">
                                    <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                                        Colors
                                    </h3>
                                    <div className="grid grid-cols-1 gap-3">
                                        {activeSectionSchema.fields
                                            .filter(
                                                (f) =>
                                                    f.type === "color" ||
                                                    f.type === "sectionColor" ||
                                                    f.type === "bgColor"
                                            )
                                            .map((field) => (
                                                <FieldRenderer
                                                    key={field.id}
                                                    field={field}
                                                    value={getNestedValue(draftSite, field.id)}
                                                    onChange={handleFieldChange}
                                                />
                                            ))}
                                    </div>
                                </div>

                                {/* Content Section */}
                                {activeSectionSchema.fields.filter(
                                    (f) =>
                                        f.type !== "color" &&
                                        f.type !== "sectionColor" &&
                                        f.type !== "bgColor"
                                ).length > 0 && (
                                    <div className="space-y-3">
                                        <h3 className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
                                            Content
                                        </h3>
                                        <div className="space-y-3">
                                            {activeSectionSchema.fields
                                                .filter(
                                                    (f) =>
                                                        f.type !== "color" &&
                                                        f.type !== "sectionColor" &&
                                                        f.type !== "bgColor"
                                                )
                                                .map((field) => (
                                                    <FieldRenderer
                                                        key={field.id}
                                                        field={field}
                                                        value={getNestedValue(draftSite, field.id)}
                                                        onChange={handleFieldChange}
                                                        fieldInputAttr={`data-field-input="${field.id}"`}
                                                    />
                                                ))}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </>
                    ) : (
                        <div className="flex items-center justify-center h-full">
                            <div className="text-center px-6">
                                <p className="text-neutral-400 text-sm">
                                    👈 Select a section to start editing
                                </p>
                            </div>
                        </div>
                    )}
                </aside>
            </div>
        </main>
    );
}