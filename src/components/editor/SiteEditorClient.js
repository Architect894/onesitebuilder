"use client";

import { useMemo, useRef, useState } from "react";
import FieldRenderer from "@/components/editor/FieldRenderer";
import { getNestedValue } from "@/lib/utils/get-nested-value";
import { setNestedValue } from "@/lib/utils/set-nested-value";
import { mapSiteToTemplateProps } from "@/features/sites/mappers/map-site-to-template-props";
import { templateRegistry } from "@/features/templates/registry";
import { updateSiteDraft } from "@/features/sites/services/update-site-draft";

export default function SiteEditorClient({ site, schema, templateKey }) {
    const [draftSite, setDraftSite] = useState(site);
    const [savedSite, setSavedSite] = useState(site);
    const [isSaving, setIsSaving] = useState(false);
    const [saveMessage, setSaveMessage] = useState("");
    const previewScrollRef = useRef(null);

    function handleFieldChange(path, value) {
        setSaveMessage("");
        setDraftSite((current) => setNestedValue(current, path, value));
    }

    function handleFieldFocus(field) {
        const targetSection = field.previewSection;
        if (!targetSection || !previewScrollRef.current) return;

        const target = previewScrollRef.current.querySelector(
            `[data-preview-section="${targetSection}"]`
        );

        if (!target) return;

        target.scrollIntoView({
            behavior: "smooth",
            block: "start",
        });
    }

    const hasUnsavedChanges =
        JSON.stringify(draftSite) !== JSON.stringify(savedSite);

    async function handleSaveDraft() {
        try {
            setIsSaving(true);
            setSaveMessage("");

            const result = await updateSiteDraft(draftSite.id, draftSite);

            if (result.success) {
                setSavedSite(draftSite);
                setSaveMessage("Draft saved.");
            } else {
                setSaveMessage("Save failed.");
            }
        } catch (error) {
            console.error(error);
            setSaveMessage("Something went wrong.");
        } finally {
            setIsSaving(false);
        }
    }

    function handleResetChanges() {
        setDraftSite(savedSite);
        setSaveMessage("Changes reset.");
    }

    const previewProps = useMemo(() => {
        return mapSiteToTemplateProps(draftSite);
    }, [draftSite]);

    const templateEntry = templateRegistry[templateKey];
    const TemplateComponent = templateEntry?.component;

    return (
        <main className="min-h-screen bg-neutral-950 text-white">
            <div className="border-b border-neutral-800 bg-neutral-950/95 backdrop-blur">
                <div className="mx-auto flex max-w-[1600px] items-center justify-between gap-6 px-6 py-5">
                    <div>
                        <p className="text-sm uppercase tracking-[0.2em] text-neutral-400">
                            Site Editor
                        </p>
                        <h1 className="mt-2 text-3xl font-semibold">{draftSite.name}</h1>
                        <p className="mt-2 text-sm text-neutral-400">
                            Template: {schema.name} ({schema.key})
                        </p>
                    </div>

                    <div className="flex items-center gap-3">
                        <div className="text-sm text-neutral-400">
                            {hasUnsavedChanges ? "Unsaved changes" : "All changes saved"}
                        </div>

                        <button
                            type="button"
                            onClick={handleResetChanges}
                            disabled={!hasUnsavedChanges || isSaving}
                            className="rounded-full border border-neutral-700 px-4 py-2 text-sm text-white disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            Reset
                        </button>

                        <button
                            type="button"
                            onClick={handleSaveDraft}
                            disabled={!hasUnsavedChanges || isSaving}
                            className="rounded-full bg-white px-5 py-2 text-sm font-medium text-black disabled:cursor-not-allowed disabled:opacity-40"
                        >
                            {isSaving ? "Saving..." : "Save Draft"}
                        </button>
                    </div>
                </div>

                {saveMessage ? (
                    <div className="mx-auto max-w-[1600px] px-6 pb-4 text-sm text-neutral-400">
                        {saveMessage}
                    </div>
                ) : null}
            </div>

            <div className="mx-auto max-w-[1600px] px-6 py-10">
                <div className="grid gap-10 xl:grid-cols-[420px_minmax(0,1fr)] xl:items-start">
                    <section className="rounded-3xl border border-neutral-800 bg-neutral-900 p-8">
                        <h2 className="text-2xl font-semibold">Editor</h2>

                        <div className="mt-8 space-y-8">
                            {schema.sections.map((section) => (
                                <div key={section.id}>
                                    <div className="mb-4">
                                        <h3 className="text-lg font-medium text-white">
                                            {section.label}
                                        </h3>
                                    </div>

                                    <div className="space-y-5">
                                        {section.fields.map((field) => (
                                            <FieldRenderer
                                                key={field.id}
                                                field={field}
                                                value={getNestedValue(draftSite, field.id)}
                                                onChange={handleFieldChange}
                                                onFocusField={handleFieldFocus}
                                            />
                                        ))}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </section>

                    <section className="xl:sticky xl:top-6">
                        <div className="rounded-3xl border border-neutral-800 bg-neutral-900 p-4">
                            <div className="mb-4 flex items-center justify-between px-4 pt-2">
                                <h2 className="text-2xl font-semibold">Live Preview</h2>
                                <p className="text-sm text-neutral-400">Draft</p>
                            </div>

                            <div className="overflow-hidden rounded-2xl bg-neutral-800 p-3">
                                <div className="mx-auto max-w-[1400px] overflow-hidden rounded-[28px] border border-neutral-300 bg-white shadow-2xl">
                                    <div className="flex items-center gap-2 border-b border-neutral-200 bg-neutral-100 px-4 py-3">
                                        <span className="h-3 w-3 rounded-full bg-neutral-300" />
                                        <span className="h-3 w-3 rounded-full bg-neutral-300" />
                                        <span className="h-3 w-3 rounded-full bg-neutral-300" />
                                    </div>

                                    <div ref={previewScrollRef} className="h-[75vh] overflow-y-auto">
                                        {TemplateComponent ? (
                                            <TemplateComponent {...previewProps} />
                                        ) : (
                                            <div className="p-8 text-black">Template not found.</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </div>
            </div>
        </main>
    );
}