"use client";

import { useMemo, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import dynamic from "next/dynamic";
import Link from "next/link";
import FieldRenderer from "@/components/editor/FieldRenderer";
import EditableFieldOverlay from "@/components/editor/EditableFieldOverlay";
import { getNestedValue } from "@/lib/utils/get-nested-value";
import { setNestedValue } from "@/lib/utils/set-nested-value";
import { mapSiteToTemplateProps } from "@/features/sites/mappers/map-site-to-template-props";
import { templateRegistry } from "@/features/templates/registry";
import { getBgColor } from "@/templates/shared/SectionBackground";
import { updateSiteDraft } from "@/features/sites/services/update-site-draft";

export default function SiteEditorClient({ site, schema, templateKey }) {
    const [draftSite, setDraftSite] = useState(site);
    const [savedSite, setSavedSite] = useState(site);
    const [activeSection, setActiveSection] = useState(null);
    const [activeField, setActiveField] = useState(null);
    const [editorPanel, setEditorPanel] = useState(schema.sections[0]?.id ?? null);
    const [isSaving, setIsSaving] = useState(false);
    const [isPublishing, setIsPublishing] = useState(false);
    const [isPreviewHovered, setIsPreviewHovered] = useState(false);
    const previewContainerRef = useRef(null);

    function handleFieldChange(path, value) {
        setDraftSite((current) => setNestedValue(current, path, value));
    }

    function handleFieldSelect(fieldId) {
        setActiveField(fieldId);
        if (!fieldId) return;
        const section = schema.sections.find((s) =>
            s.fields.some((f) => f.id === fieldId)
        );
        if (section) {
            setActiveSection(section.id);
            setEditorPanel(section.id);
        }
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

    const [saveError, setSaveError] = useState(null);
    const hasUnsavedChanges =
        JSON.stringify(draftSite) !== JSON.stringify(savedSite);

    async function handleSaveDraft() {
        setIsSaving(true);
        setSaveError(null);
        try {
            const result = await updateSiteDraft(draftSite.id, draftSite);
            if (result.site) {
                setSavedSite(draftSite);
            }
        } catch (err) {
            setSaveError(err.message ?? 'Failed to save.');
        } finally {
            setIsSaving(false);
        }
    }

    async function handlePublish() {
        setIsPublishing(true);
        setSaveError(null);
        try {
            // Save draft first if there are unsaved changes
            const siteToPublish = hasUnsavedChanges ? draftSite : savedSite;
            const saveResult = await updateSiteDraft(siteToPublish.id, siteToPublish);
            if (saveResult.site) setSavedSite(siteToPublish);

            // Then flip status to published
            const res = await fetch(`/api/sites/${siteToPublish.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "published" }),
            });
            if (!res.ok) throw new Error("Failed to publish");
            const { site: updated } = await res.json();
            setDraftSite((d) => ({ ...d, status: updated.status }));
            setSavedSite((s) => ({ ...s, status: updated.status }));
        } catch (err) {
            setSaveError(err.message ?? "Failed to publish.");
        } finally {
            setIsPublishing(false);
        }
    }

    async function handleUnpublish() {
        setIsPublishing(true);
        setSaveError(null);
        try {
            const res = await fetch(`/api/sites/${draftSite.id}`, {
                method: "PATCH",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ status: "draft" }),
            });
            if (!res.ok) throw new Error("Failed to unpublish");
            const { site: updated } = await res.json();
            setDraftSite((d) => ({ ...d, status: updated.status }));
            setSavedSite((s) => ({ ...s, status: updated.status }));
        } catch (err) {
            setSaveError(err.message ?? "Failed to unpublish.");
        } finally {
            setIsPublishing(false);
        }
    }

    const allFields = schema.sections.flatMap((s) => s.fields || []);
    const activeFieldDef = allFields.find((f) => f.id === activeField);
    // Current section shown in the sidebar
    const currentSectionSchema = schema.sections.find((s) => s.id === editorPanel) ?? schema.sections[0];

    function handlePreviewClick(e) {
        // Try new format first: data-edit-type + data-edit-field
        let editableEl = e.target.closest('[data-edit-type][data-edit-field]');
        if (!editableEl) {
            // Fall back to old format: data-edit-node or data-editable-field
            editableEl = e.target.closest('[data-edit-node], [data-editable-field]');
        }
        if (!editableEl) return;
        
        // Get field identifier based on format
        const fieldId =
            editableEl.getAttribute('data-edit-field') ||
            editableEl.getAttribute('data-edit-node') ||
            editableEl.getAttribute('data-editable-field');
        if (fieldId) handleFieldSelect(fieldId);
    }

    return (
        <main className="flex h-screen flex-col bg-neutral-950 text-white">
            {/* TOP BAR */}
            <div className="border-b border-neutral-800 bg-neutral-900 px-4 lg:px-6">
                <div className="flex items-center justify-between py-3 gap-2">

                    {/* Left: back + site name */}
                    <div className="flex items-center gap-2 sm:gap-4 min-w-0">
                        <Link
                            href="/app"
                            className="flex items-center gap-1 sm:gap-1.5 text-sm text-neutral-400 hover:text-white transition flex-shrink-0"
                        >
                            <svg className="w-4 h-4 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
                            <span className="hidden sm:inline">Dashboard</span>
                        </Link>
                        <span className="text-neutral-700 hidden sm:block">|</span>
                        <div className="min-w-0">
                            <h1 className="text-sm sm:text-base lg:text-lg font-semibold leading-tight truncate">{draftSite.name}</h1>
                            <p className="text-xs text-neutral-500 hidden sm:block">{schema.name}</p>
                        </div>
                    </div>

                    {/* Right: actions */}
                    <div className="flex items-center gap-1.5 sm:gap-2 flex-shrink-0">
                        {/* View Live — large screens only */}
                        <a
                            href={`/sites/${draftSite.subdomain}`}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="hidden lg:flex items-center gap-1.5 px-3 py-2 text-sm rounded border border-neutral-700 hover:border-neutral-500 text-neutral-300 hover:text-white transition"
                        >
                            View Live
                            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
                        </a>
                        {/* Discard — large screens only */}
                        <button
                            onClick={() => setDraftSite(savedSite)}
                            disabled={!hasUnsavedChanges}
                            className="hidden lg:block px-3 py-2 text-sm rounded border border-neutral-700 hover:border-neutral-500 transition disabled:opacity-30"
                        >
                            Discard
                        </button>
                        {/* Save Draft */}
                        <button
                            onClick={handleSaveDraft}
                            disabled={!hasUnsavedChanges || isSaving}
                            className="px-3 sm:px-4 py-2 text-sm rounded border border-neutral-600 hover:border-neutral-400 font-medium transition disabled:opacity-30"
                        >
                            <span className="hidden sm:inline">{isSaving ? "Saving…" : "Save Draft"}</span>
                            <span className="sm:hidden">{isSaving ? "…" : "Save"}</span>
                        </button>
                        {/* Publish / Unpublish */}
                        {draftSite.status === "published" ? (
                            <button
                                onClick={handleUnpublish}
                                disabled={isPublishing}
                                className="px-3 sm:px-5 py-2 text-sm rounded bg-neutral-700 hover:bg-neutral-600 font-medium transition disabled:opacity-50"
                            >
                                <span className="hidden sm:inline">{isPublishing ? "Updating…" : "Unpublish"}</span>
                                <span className="sm:hidden">{isPublishing ? "…" : "Unp."}</span>
                            </button>
                        ) : (
                            <button
                                onClick={handlePublish}
                                disabled={isPublishing}
                                className="px-3 sm:px-5 py-2 text-sm rounded bg-emerald-600 hover:bg-emerald-700 font-medium transition disabled:opacity-50"
                            >
                                <span className="hidden sm:inline">{isPublishing ? "Publishing…" : "Publish"}</span>
                                <span className="sm:hidden">{isPublishing ? "…" : "Pub."}</span>
                            </button>
                        )}
                    </div>
                </div>
                {/* Error row */}
                {saveError && (
                    <div className="pb-2 text-xs text-red-400 truncate" title={saveError}>
                        {saveError}
                    </div>
                )}
            </div>

            {/* MAIN CONTENT */}
            <div className="flex flex-1 overflow-hidden gap-2 md:gap-3 p-2 md:p-4 bg-neutral-900 relative">
                {/* Preview */}
                <section className="flex-1 flex items-center justify-center min-w-0">
                    <div className="w-full h-full bg-black rounded-lg overflow-hidden border border-neutral-700 shadow-2xl flex flex-col relative">
                        {/* Browser chrome */}
                        <div className="flex items-center gap-2 border-b border-neutral-700 bg-neutral-800 px-4 py-2.5 flex-shrink-0">
                            <span className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
                            <span className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
                            <span className="h-2.5 w-2.5 rounded-full bg-neutral-600" />
                        </div>

                        {/* Panel section tabs */}
                        <div className="flex border-b border-neutral-700 flex-shrink-0 overflow-x-auto" style={{ backgroundColor: "#161616" }}>
                            {schema.sections.map((s) => (
                                <button
                                    key={s.id}
                                    onClick={() => setEditorPanel(s.id)}
                                    className={`px-3 py-2 text-[10px] font-medium tracking-widest uppercase whitespace-nowrap transition-colors border-b-2 -mb-px ${
                                        editorPanel === s.id
                                            ? "text-white border-blue-400"
                                            : "text-neutral-500 hover:text-neutral-300 border-transparent"
                                    }`}
                                >
                                    {s.label.replace(/ Section$/i, "")}
                                </button>
                            ))}
                        </div>

                        {/* Preview content */}
                        <div
                            ref={previewContainerRef}
                            className="flex-1 min-h-0 overflow-hidden relative"
                            onClick={handlePreviewClick}
                            onMouseEnter={() => setIsPreviewHovered(true)}
                            onMouseLeave={() => setIsPreviewHovered(false)}
                        >
                            {DynamicTemplate ? (
                                <DynamicTemplate {...previewProps} isEditor editorPanel={editorPanel} onEditorPanelChange={setEditorPanel} />
                            ) : (
                                <div className="p-8 text-neutral-400">
                                    Template not found
                                </div>
                            )}

                            {/* Highlight outline + ghost text only */}
                            <EditableFieldOverlay
                                previewContainerRef={previewContainerRef}
                                onFieldSelect={handleFieldSelect}
                                activeField={activeField}
                                schema={schema}
                                isPreviewHovered={isPreviewHovered}
                                siteData={draftSite}
                                onFieldChange={handleFieldChange}
                            />
                        </div>
                    </div>
                </section>

                {/* Right sidebar — always visible, shows fields for current section */}
                <aside data-editor-sidebar className="hidden md:flex w-72 lg:w-80 bg-neutral-800 rounded-lg border border-neutral-700 flex-col overflow-hidden flex-shrink-0">
                    <div className="border-b border-neutral-700 bg-neutral-900/80 px-4 py-3 flex-shrink-0">
                        <h2 className="text-xs font-bold text-neutral-400 uppercase tracking-widest">
                            {currentSectionSchema?.label ?? "Fields"}
                        </h2>
                    </div>
                    <div className="flex-1 overflow-y-auto">
                        {currentSectionSchema?.fields?.map((field) => {
                            const isFieldActive = activeField === field.id;
                            const val = getNestedValue(draftSite, field.id);
                            const isColor = ['color','textColor','bgColor','sectionColor','buttonColor','ambientColor'].includes(field.type);
                            const isImage = field.type === 'image';
                            const isBackground = field.type === 'background';

                            return (
                                <div key={field.id}>
                                    {/* Field row — click to select */}
                                    <button
                                        type="button"
                                        onClick={() => handleFieldSelect(isFieldActive ? null : field.id)}
                                        className={`w-full text-left px-4 py-3 flex items-center gap-3 transition-colors border-l-2 ${
                                            isFieldActive
                                                ? 'bg-blue-500/10 border-blue-400 text-white'
                                                : 'border-transparent text-neutral-300 hover:bg-neutral-700/50 hover:text-white'
                                        }`}
                                    >
                                        {/* Value preview */}
                                        {isColor && (
                                            <span
                                                className="w-5 h-5 rounded border border-neutral-600 flex-shrink-0"
                                                style={{ backgroundColor: val ?? '#000000' }}
                                            />
                                        )}
                                        {isImage && val && (
                                            <span className="w-5 h-5 rounded border border-neutral-600 flex-shrink-0 overflow-hidden">
                                                <img src={val} alt="" className="w-full h-full object-cover" />
                                            </span>
                                        )}
                                        {isImage && !val && (
                                            <span className="w-5 h-5 rounded border border-neutral-600 flex-shrink-0 bg-neutral-700 flex items-center justify-center text-[8px] text-neutral-500">▣</span>
                                        )}
                                        {isBackground && (
                                            <span
                                                className="w-5 h-5 rounded border border-neutral-600 flex-shrink-0"
                                                style={{ backgroundColor: getBgColor(val, '#000000') }}
                                            />
                                        )}
                                        {!isColor && !isImage && !isBackground && (
                                            <span className="text-[10px] text-neutral-500 w-5 text-center flex-shrink-0">✎</span>
                                        )}
                                        <div className="flex-1 min-w-0">
                                            <span className="text-[12px] font-medium block truncate">{field.label}</span>
                                            {!isColor && !isImage && !isBackground && val && (
                                                <span className="text-[10px] text-neutral-500 block truncate">{String(val).slice(0, 40)}</span>
                                            )}
                                        </div>
                                        <svg className={`w-3.5 h-3.5 flex-shrink-0 transition-transform ${isFieldActive ? 'rotate-90 text-blue-400' : 'text-neutral-600'}`} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
                                    </button>

                                    {/* Expanded editor — shows when field is active */}
                                    <AnimatePresence>
                                        {isFieldActive && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.15 }}
                                                className="overflow-hidden border-b border-neutral-700/50"
                                            >
                                                <div
                                                    className="px-4 py-3"
                                                    style={{ backgroundColor: 'rgba(20,20,20,0.5)' }}
                                                    onClick={(e) => e.stopPropagation()}
                                                    onMouseDown={(e) => e.stopPropagation()}
                                                >
                                                    <FieldRenderer
                                                        field={field}
                                                        value={val}
                                                        onChange={handleFieldChange}
                                                    />
                                                </div>
                                            </motion.div>
                                        )}
                                    </AnimatePresence>
                                </div>
                            );
                        })}
                    </div>
                </aside>

                {/* Mobile: bottom sheet when a field is active */}
                <AnimatePresence>
                    {activeField && activeFieldDef && (
                        <>
                            <motion.div
                                key="backdrop"
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                className="md:hidden fixed inset-0 bg-black/50 z-40"
                                onClick={() => setActiveField(null)}
                            />
                            <motion.div
                                key="sheet"
                                initial={{ y: "100%" }}
                                animate={{ y: 0 }}
                                exit={{ y: "100%" }}
                                transition={{ type: "spring", damping: 30, stiffness: 300 }}
                                className="md:hidden fixed bottom-0 left-0 right-0 z-50 bg-neutral-800 rounded-t-2xl border-t border-neutral-700 flex flex-col overflow-hidden"
                                style={{ maxHeight: "60vh" }}
                            >
                                <div className="flex items-center justify-between border-b border-neutral-700 bg-neutral-900 px-4 py-3 rounded-t-2xl flex-shrink-0">
                                    <h2 className="text-sm font-semibold text-white">
                                        {activeFieldDef?.label ?? activeField}
                                    </h2>
                                    <button
                                        onClick={() => setActiveField(null)}
                                        className="text-xs text-neutral-400 hover:text-neutral-200 border border-neutral-700 px-3 py-1 rounded-lg transition"
                                    >
                                        Done
                                    </button>
                                </div>
                                <div className="flex-1 overflow-y-auto p-4 space-y-4">
                                    <FieldRenderer
                                        field={activeFieldDef}
                                        value={getNestedValue(draftSite, activeFieldDef.id)}
                                        onChange={handleFieldChange}
                                    />
                                </div>
                            </motion.div>
                        </>
                    )}
                </AnimatePresence>
            </div>
        </main>
    );
}
