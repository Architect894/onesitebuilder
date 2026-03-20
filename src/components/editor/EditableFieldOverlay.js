'use client';

import { useState, useEffect, useRef, useCallback, Fragment } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { getNestedValue } from '@/lib/utils/get-nested-value';

const COLOR_TYPES = new Set([
    'color', 'textColor', 'bgColor', 'sectionColor',
    'buttonColor', 'ambientColor',
]);
const TEXT_TYPES = new Set(['text', 'textarea', 'url']);

const SWATCHES = [
    '#000000', '#ffffff', '#1a1a1a', '#0a0a0a',
    '#d4a574', '#f1c886', '#9c8762', '#c6a16e',
    '#ef4444', '#3b82f6', '#22c55e', '#eab308',
];

function nodeIcon(type) {
    if (type === 'textColor' || type === 'buttonColor') return 'T▐';
    if (COLOR_TYPES.has(type)) return '⬤';
    if (type === 'image') return '▣';
    if (type === 'array' || type === 'list') return '≡';
    if (type === 'background') return '◈';
    return '✎';
}

// ── Inline color panel (for the text color chip inside GhostTextEditor) ───────
function InlineColorPanel({ fieldId, value, onChange, onClose, anchorTop, anchorLeft, useFixed }) {
    const ref = useRef(null);
    return (
        <motion.div
            ref={ref}
            className={`${useFixed ? 'fixed z-[9999]' : 'absolute z-[60]'} bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl p-3`}
            style={{ top: anchorTop, left: useFixed ? anchorLeft : Math.max(8, anchorLeft - 180), width: 224 }}
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onMouseDown={(e) => e.preventDefault()}
        >
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-medium">Text Color</p>
            <div className="flex items-center gap-2 mb-3">
                <div
                    className="relative w-9 h-9 rounded-lg border border-neutral-600 flex-shrink-0 overflow-hidden cursor-pointer"
                    style={{ backgroundColor: value ?? '#ffffff' }}
                >
                    <input
                        type="color"
                        value={value ?? '#ffffff'}
                        onChange={(e) => onChange(fieldId, e.target.value)}
                        onMouseDown={(e) => e.stopPropagation()}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                </div>
                <input
                    type="text"
                    value={value ?? '#ffffff'}
                    onChange={(e) => {
                        if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value))
                            onChange(fieldId, e.target.value);
                    }}
                    className="flex-1 px-2 py-1.5 text-xs bg-neutral-800 border border-neutral-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 transition"
                    maxLength={7}
                    onMouseDown={(e) => e.stopPropagation()}
                    spellCheck={false}
                />
            </div>
            <div className="grid grid-cols-6 gap-1.5">
                {SWATCHES.map((c) => (
                    <button
                        key={c}
                        type="button"
                        onMouseDown={(e) => e.preventDefault()}
                        onClick={() => onChange(fieldId, c)}
                        className={`w-7 h-7 rounded-md border-2 transition-transform hover:scale-110 ${
                            value === c
                                ? 'border-blue-400 ring-1 ring-blue-400/50'
                                : 'border-neutral-700 hover:border-neutral-500'
                        }`}
                        style={{ backgroundColor: c }}
                        title={c}
                    />
                ))}
            </div>
            <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={onClose}
                className="mt-3 w-full text-[11px] text-neutral-500 hover:text-neutral-200 transition py-1"
            >
                Done
            </button>
        </motion.div>
    );
}

// ── Ghost text editor ─────────────────────────────────────────────────────────
// Transparent absolute input sitting exactly over the template text element.
// The element re-renders live; the ghost shows only the blinking caret.
function GhostTextEditor({ node, value, onChange, onClose }) {
    const ref = useRef(null);
    const isMultiline = node.type === 'textarea' || node.height > 80;
    const [styles, setStyles] = useState(null);

    useEffect(() => {
        const el = node.element;
        if (!el) return;
        const cs = window.getComputedStyle(el);
        setStyles({
            fontSize: cs.fontSize,
            fontWeight: cs.fontWeight,
            fontFamily: cs.fontFamily,
            letterSpacing: cs.letterSpacing,
            lineHeight: cs.lineHeight,
            textAlign: cs.textAlign,
            textTransform: cs.textTransform,
            paddingTop: cs.paddingTop,
            paddingBottom: cs.paddingBottom,
            paddingLeft: cs.paddingLeft,
            paddingRight: cs.paddingRight,
        });
    }, [node.element]);

    useEffect(() => {
        if (!styles || !ref.current) return;
        ref.current.focus();
        const len = String(value ?? '').length;
        try { ref.current.setSelectionRange(len, len); } catch (_) {}
    }, [styles]);

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') { e.preventDefault(); onClose(); }
        if (e.key === 'Enter' && !isMultiline) { e.preventDefault(); onClose(); }
    };

    const handleBlur = (e) => {
        // Don't close if focus moved to the sidebar panel
        if (e.relatedTarget?.closest('[data-editor-sidebar]')) return;
        onClose();
    };

    if (!styles) return null;

    const sharedStyle = {
        position: 'absolute',
        top: node.top,
        left: node.left,
        width: node.width,
        height: isMultiline ? node.height : undefined,
        minHeight: isMultiline ? node.height : undefined,
        zIndex: 50,
        background: 'transparent',
        border: 'none',
        outline: 'none',
        resize: 'none',
        color: 'transparent',
        WebkitTextFillColor: 'transparent',
        caretColor: '#60a5fa',
        boxSizing: 'border-box',
        ...styles,
    };

    return (
        <>
            {isMultiline ? (
                <textarea
                    ref={ref}
                    value={value ?? ''}
                    onChange={(e) => onChange(node.id, e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    style={sharedStyle}
                    spellCheck={false}
                />
            ) : (
                <input
                    ref={ref}
                    type="text"
                    value={value ?? ''}
                    onChange={(e) => onChange(node.id, e.target.value)}
                    onBlur={handleBlur}
                    onKeyDown={handleKeyDown}
                    style={sharedStyle}
                    spellCheck={false}
                />
            )}


        </>
    );
}

// ── Floating color picker ─────────────────────────────────────────────────────
function FloatingColorPanel({ node, value, onChange, onClose }) {
    const ref = useRef(null);

    useEffect(() => {
        function away(e) {
            if (ref.current && !ref.current.contains(e.target)) onClose();
        }
        const id = setTimeout(() => document.addEventListener('mousedown', away), 60);
        return () => { clearTimeout(id); document.removeEventListener('mousedown', away); };
    }, [onClose]);

    const dotX = Math.max(4, node.left + node.width - 26);
    const left = Math.max(8, dotX - 180);
    const top = node.top + 8 + 28;

    return (
        <motion.div
            ref={ref}
            className="absolute z-50 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl p-3"
            style={{ top, left, width: 224 }}
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-medium">
                {node.label}
            </p>
            <div className="flex items-center gap-2 mb-3">
                <div
                    className="relative w-9 h-9 rounded-lg border border-neutral-600 flex-shrink-0 overflow-hidden cursor-pointer"
                    style={{ backgroundColor: value ?? '#000000' }}
                >
                    <input
                        type="color"
                        value={value ?? '#000000'}
                        onChange={(e) => onChange(node.id, e.target.value)}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                </div>
                <input
                    type="text"
                    value={value ?? '#000000'}
                    onChange={(e) => {
                        if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value))
                            onChange(node.id, e.target.value);
                    }}
                    className="flex-1 px-2 py-1.5 text-xs bg-neutral-800 border border-neutral-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 transition"
                    maxLength={7}
                    spellCheck={false}
                />
            </div>
            <div className="grid grid-cols-6 gap-1.5">
                {SWATCHES.map((c) => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => onChange(node.id, c)}
                        className={`w-7 h-7 rounded-md border-2 transition-transform hover:scale-110 ${
                            value === c
                                ? 'border-blue-400 ring-1 ring-blue-400/50'
                                : 'border-neutral-700 hover:border-neutral-500'
                        }`}
                        style={{ backgroundColor: c }}
                        title={c}
                    />
                ))}
            </div>
            <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full text-[11px] text-neutral-500 hover:text-neutral-200 transition py-1"
            >
                Done
            </button>
        </motion.div>
    );
}

// ── Floating image editor ─────────────────────────────────────────────────────
function FloatingImagePanel({ node, value, onChange, onClose }) {
    const ref = useRef(null);
    const fileRef = useRef(null);
    const [tab, setTab] = useState('upload'); // 'upload' | 'search' | 'url'
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [urlInput, setUrlInput] = useState(value ?? '');
    const [preview, setPreview] = useState(value ?? null);

    useEffect(() => {
        function away(e) {
            if (ref.current && !ref.current.contains(e.target)) onClose();
        }
        const id = setTimeout(() => document.addEventListener('mousedown', away), 60);
        return () => { clearTimeout(id); document.removeEventListener('mousedown', away); };
    }, [onClose]);

    async function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) return;
        setUploading(true);
        setUploadError(null);
        try {
            const form = new FormData();
            form.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body: form });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error ?? 'Upload failed');
            setPreview(json.url);
            onChange(node.id, json.url);
        } catch (err) {
            setUploadError(err.message);
        } finally {
            setUploading(false);
        }
    }

    async function handleSearch(e) {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setSearching(true);
        setSearchError(null);
        setSearchResults([]);
        try {
            const res = await fetch(`/api/images/search?q=${encodeURIComponent(searchQuery)}`);
            const json = await res.json();
            if (!res.ok) throw new Error(json.error ?? 'Search failed');
            setSearchResults(json.images ?? []);
        } catch (err) {
            setSearchError(err.message);
        } finally {
            setSearching(false);
        }
    }

    function applyUrl(url) {
        setPreview(url);
        onChange(node.id, url);
    }

    const left = Math.max(8, node.left + 6);
    const top = node.top + 8 + 28;
    const TABS = [
        { id: 'upload', label: '↑ Upload' },
        { id: 'search', label: '⊕ Search' },
        { id: 'url',    label: '⊞ URL' },
    ];

    return (
        <motion.div
            ref={ref}
            className="absolute z-50 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl overflow-hidden"
            style={{ top, left, width: 300 }}
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onMouseDown={(e) => e.stopPropagation()}
        >
            {/* Header */}
            <div className="flex items-center justify-between px-3 pt-3 pb-2">
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    {node.label}
                </p>
                {preview && (
                    <div className="w-8 h-8 rounded-md overflow-hidden border border-neutral-700 flex-shrink-0">
                        <img src={preview} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>

            {/* Tabs */}
            <div className="flex border-b border-neutral-800 px-2">
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        className={`flex-1 py-1.5 text-[10px] font-mono uppercase tracking-widest transition ${
                            tab === t.id
                                ? 'text-white border-b-2 border-blue-500 -mb-px'
                                : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>

            {/* Tab content */}
            <div className="p-3">
                {/* ── Upload ── */}
                {tab === 'upload' && (
                    <>
                        <div
                            className={`relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed cursor-pointer transition py-6 ${
                                dragging
                                    ? 'border-blue-500 bg-blue-500/10'
                                    : 'border-neutral-700 hover:border-neutral-500 bg-neutral-800/50'
                            }`}
                            onClick={() => fileRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setDragging(false);
                                handleFile(e.dataTransfer.files[0]);
                            }}
                        >
                            <span className="text-2xl select-none">🖼️</span>
                            <span className="text-[11px] text-neutral-400 text-center leading-snug">
                                {uploading ? 'Uploading…' : 'Click or drag & drop an image'}
                            </span>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFile(e.target.files?.[0])}
                            />
                        </div>
                        {uploadError && (
                            <p className="mt-2 text-[10px] text-red-400">{uploadError}</p>
                        )}
                    </>
                )}

                {/* ── Search ── */}
                {tab === 'search' && (
                    <>
                        <form onSubmit={handleSearch} className="flex gap-1.5 mb-3">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Pixabay…"
                                className="flex-1 px-2 py-1.5 text-xs bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="px-3 py-1.5 text-[11px] bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                            >
                                Go
                            </button>
                        </form>
                        {searching && (
                            <p className="text-[11px] text-neutral-500 text-center py-4">Searching…</p>
                        )}
                        {searchError && (
                            <p className="text-[10px] text-red-400 mb-2">
                                {searchError === 'PIXABAY_API_KEY not set in environment'
                                    ? 'Add PIXABAY_API_KEY to .env.local (free at pixabay.com/api)'
                                    : searchError}
                            </p>
                        )}
                        {searchResults.length > 0 && (
                            <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto">
                                {searchResults.map((img) => (
                                    <button
                                        key={img.id}
                                        type="button"
                                        title={`Photo by ${img.photographer}`}
                                        onClick={() => applyUrl(img.full)}
                                        className="relative aspect-square rounded-md overflow-hidden border-2 transition hover:scale-105 border-transparent hover:border-blue-400"
                                    >
                                        <img
                                            src={img.thumb}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}

                {/* ── URL ── */}
                {tab === 'url' && (
                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => { setUrlInput(e.target.value); applyUrl(e.target.value); }}
                        placeholder="https://… image URL"
                        className="w-full px-2 py-1.5 text-xs bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                        autoFocus
                    />
                )}
            </div>

            <button
                type="button"
                onClick={onClose}
                className="w-full text-[11px] text-neutral-500 hover:text-neutral-200 transition py-2 border-t border-neutral-800"
            >
                Done
            </button>
        </motion.div>
    );
}

// ── Floating background editor ───────────────────────────────────────────────
function FloatingBackgroundPanel({ node, value, onChange, onClose }) {
    const ref = useRef(null);
    const [mode, setMode] = useState('color'); // 'color' | 'image' | 'gradient'

    useEffect(() => {
        function away(e) {
            if (ref.current && !ref.current.contains(e.target)) onClose();
        }
        const id = setTimeout(() => document.addEventListener('mousedown', away), 60);
        return () => { clearTimeout(id); document.removeEventListener('mousedown', away); };
    }, [onClose]);

    const dotX = Math.max(4, node.left + node.width - 26);
    const left = Math.max(8, dotX - 220);
    const top = node.top + 8 + 28;

    const ambientColors = [
        { name: 'Pure Black', value: '#000000' },
        { name: 'Deep Charcoal', value: '#0a0a0a' },
        { name: 'Midnight', value: '#0f0f1a' },
        { name: 'Dark Navy', value: '#0d1117' },
        { name: 'Deep Slate', value: '#1a1a2e' },
        { name: 'Dark Warm', value: '#1a1410' },
        { name: 'Deep Forest', value: '#0a1612' },
        { name: 'Dark Plum', value: '#15101a' },
    ];

    return (
        <motion.div
            ref={ref}
            className="absolute z-50 bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl p-3"
            style={{ top, left, width: 260 }}
            initial={{ opacity: 0, scale: 0.9, y: -4 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: -4 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3 font-medium">
                {node.label}
            </p>

            {/* Mode tabs */}
            <div className="flex gap-2 mb-3 border-b border-neutral-700">
                {['color', 'image', 'gradient'].map((m) => (
                    <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={`text-xs px-2 py-1 font-medium transition ${
                            mode === m
                                ? 'text-blue-400 border-b-2 border-blue-400'
                                : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                    >
                        {m[0].toUpperCase() + m.slice(1)}
                    </button>
                ))}
            </div>

            {mode === 'color' && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div
                            className="relative w-10 h-10 rounded-lg border border-neutral-600 flex-shrink-0 overflow-hidden cursor-pointer"
                            style={{ backgroundColor: value ?? '#000000' }}
                        >
                            <input
                                type="color"
                                value={value ?? '#000000'}
                                onChange={(e) => onChange(node.id, e.target.value)}
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            />
                        </div>
                        <input
                            type="text"
                            value={value ?? '#000000'}
                            onChange={(e) => {
                                if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value))
                                    onChange(node.id, e.target.value);
                            }}
                            className="flex-1 px-2 py-1.5 text-xs bg-neutral-800 border border-neutral-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 transition"
                            maxLength={7}
                        />
                    </div>
                    <div className="grid grid-cols-6 gap-1.5">
                        {ambientColors.map((c) => (
                            <button
                                key={c.value}
                                type="button"
                                onClick={() => onChange(node.id, c.value)}
                                className={`h-7 w-7 rounded-md border-2 transition-transform hover:scale-110 ${
                                    value === c.value
                                        ? 'border-blue-400 ring-1 ring-blue-400/50'
                                        : 'border-neutral-700 hover:border-neutral-500'
                                }`}
                                style={{ backgroundColor: c.value }}
                                title={c.name}
                            />
                        ))}
                    </div>
                </div>
            )}

            {mode === 'image' && (
                <div>
                    {value && (
                        <div className="mb-2 w-full h-24 rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700">
                            <img src={value} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <input
                        type="url"
                        defaultValue={value ?? ''}
                        onChange={(e) => onChange(node.id, e.target.value)}
                        placeholder="https://... image URL"
                        className="w-full px-2 py-1.5 text-xs bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                    />
                </div>
            )}

            {mode === 'gradient' && (
                <div className="text-xs text-neutral-400">
                    <p className="mb-2">Gradient support coming soon</p>
                </div>
            )}

            <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full text-[11px] text-neutral-500 hover:text-neutral-200 transition py-1"
            >
                Done
            </button>
        </motion.div>
    );
}

// ── Fixed-position color panel (renders outside preview) ─────────────────────
function FixedFloatingColorPanel({ node, value, onChange, onClose, anchorTop, anchorLeft }) {
    const ref = useRef(null);

    useEffect(() => {
        function away(e) {
            if (ref.current && !ref.current.contains(e.target)) onClose();
        }
        const id = setTimeout(() => document.addEventListener('mousedown', away), 60);
        return () => { clearTimeout(id); document.removeEventListener('mousedown', away); };
    }, [onClose]);

    return (
        <motion.div
            ref={ref}
            className="fixed z-[9999] bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl p-3"
            style={{ top: anchorTop, left: anchorLeft, width: 224 }}
            initial={{ opacity: 0, scale: 0.9, x: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-2 font-medium">
                {node.label}
            </p>
            <div className="flex items-center gap-2 mb-3">
                <div
                    className="relative w-9 h-9 rounded-lg border border-neutral-600 flex-shrink-0 overflow-hidden cursor-pointer"
                    style={{ backgroundColor: value ?? '#000000' }}
                >
                    <input
                        type="color"
                        value={value ?? '#000000'}
                        onChange={(e) => onChange(node.id, e.target.value)}
                        className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                    />
                </div>
                <input
                    type="text"
                    value={value ?? '#000000'}
                    onChange={(e) => {
                        if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value))
                            onChange(node.id, e.target.value);
                    }}
                    className="flex-1 px-2 py-1.5 text-xs bg-neutral-800 border border-neutral-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 transition"
                    maxLength={7}
                    spellCheck={false}
                />
            </div>
            <div className="grid grid-cols-6 gap-1.5">
                {SWATCHES.map((c) => (
                    <button
                        key={c}
                        type="button"
                        onClick={() => onChange(node.id, c)}
                        className={`w-7 h-7 rounded-md border-2 transition-transform hover:scale-110 ${
                            value === c
                                ? 'border-blue-400 ring-1 ring-blue-400/50'
                                : 'border-neutral-700 hover:border-neutral-500'
                        }`}
                        style={{ backgroundColor: c }}
                        title={c}
                    />
                ))}
            </div>
            <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full text-[11px] text-neutral-500 hover:text-neutral-200 transition py-1"
            >
                Done
            </button>
        </motion.div>
    );
}

// ── Fixed-position image panel (renders outside preview) ─────────────────────
function FixedFloatingImagePanel({ node, value, onChange, onClose, anchorTop, anchorLeft }) {
    const ref = useRef(null);
    const fileRef = useRef(null);
    const [tab, setTab] = useState('upload');
    const [uploading, setUploading] = useState(false);
    const [uploadError, setUploadError] = useState(null);
    const [dragging, setDragging] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [searchResults, setSearchResults] = useState([]);
    const [searching, setSearching] = useState(false);
    const [searchError, setSearchError] = useState(null);
    const [urlInput, setUrlInput] = useState(value ?? '');
    const [preview, setPreview] = useState(value ?? null);

    useEffect(() => {
        function away(e) {
            if (ref.current && !ref.current.contains(e.target)) onClose();
        }
        const id = setTimeout(() => document.addEventListener('mousedown', away), 60);
        return () => { clearTimeout(id); document.removeEventListener('mousedown', away); };
    }, [onClose]);

    async function handleFile(file) {
        if (!file || !file.type.startsWith('image/')) return;
        setUploading(true);
        setUploadError(null);
        try {
            const form = new FormData();
            form.append('file', file);
            const res = await fetch('/api/upload', { method: 'POST', body: form });
            const json = await res.json();
            if (!res.ok) throw new Error(json.error ?? 'Upload failed');
            setPreview(json.url);
            onChange(node.id, json.url);
        } catch (err) {
            setUploadError(err.message);
        } finally {
            setUploading(false);
        }
    }

    async function handleSearch(e) {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        setSearching(true);
        setSearchError(null);
        setSearchResults([]);
        try {
            const res = await fetch(`/api/images/search?q=${encodeURIComponent(searchQuery)}`);
            const json = await res.json();
            if (!res.ok) throw new Error(json.error ?? 'Search failed');
            setSearchResults(json.images ?? []);
        } catch (err) {
            setSearchError(err.message);
        } finally {
            setSearching(false);
        }
    }

    function applyUrl(url) {
        setPreview(url);
        onChange(node.id, url);
    }

    const TABS = [
        { id: 'upload', label: '↑ Upload' },
        { id: 'search', label: '⊕ Search' },
        { id: 'url',    label: '⊞ URL' },
    ];

    return (
        <motion.div
            ref={ref}
            className="fixed z-[9999] bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl overflow-hidden"
            style={{ top: anchorTop, left: anchorLeft, width: 300 }}
            initial={{ opacity: 0, scale: 0.9, x: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <div className="flex items-center justify-between px-3 pt-3 pb-2">
                <p className="text-[10px] uppercase tracking-widest text-neutral-500 font-medium">
                    {node.label}
                </p>
                {preview && (
                    <div className="w-8 h-8 rounded-md overflow-hidden border border-neutral-700 flex-shrink-0">
                        <img src={preview} alt="" className="w-full h-full object-cover" />
                    </div>
                )}
            </div>
            <div className="flex border-b border-neutral-800 px-2">
                {TABS.map((t) => (
                    <button
                        key={t.id}
                        type="button"
                        onClick={() => setTab(t.id)}
                        className={`flex-1 py-1.5 text-[10px] font-mono uppercase tracking-widest transition ${
                            tab === t.id
                                ? 'text-white border-b-2 border-blue-500 -mb-px'
                                : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                    >
                        {t.label}
                    </button>
                ))}
            </div>
            <div className="p-3">
                {tab === 'upload' && (
                    <>
                        <div
                            className={`relative flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed cursor-pointer transition py-6 ${
                                dragging
                                    ? 'border-blue-500 bg-blue-500/10'
                                    : 'border-neutral-700 hover:border-neutral-500 bg-neutral-800/50'
                            }`}
                            onClick={() => fileRef.current?.click()}
                            onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
                            onDragLeave={() => setDragging(false)}
                            onDrop={(e) => {
                                e.preventDefault();
                                setDragging(false);
                                handleFile(e.dataTransfer.files[0]);
                            }}
                        >
                            <span className="text-2xl select-none">🖼️</span>
                            <span className="text-[11px] text-neutral-400 text-center leading-snug">
                                {uploading ? 'Uploading…' : 'Click or drag & drop an image'}
                            </span>
                            <input
                                ref={fileRef}
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => handleFile(e.target.files?.[0])}
                            />
                        </div>
                        {uploadError && (
                            <p className="mt-2 text-[10px] text-red-400">{uploadError}</p>
                        )}
                    </>
                )}
                {tab === 'search' && (
                    <>
                        <form onSubmit={handleSearch} className="flex gap-1.5 mb-3">
                            <input
                                type="text"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                placeholder="Search Pixabay…"
                                className="flex-1 px-2 py-1.5 text-xs bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                                autoFocus
                            />
                            <button
                                type="submit"
                                className="px-3 py-1.5 text-[11px] bg-blue-600 hover:bg-blue-500 text-white rounded-lg transition"
                            >
                                Go
                            </button>
                        </form>
                        {searching && (
                            <p className="text-[11px] text-neutral-500 text-center py-4">Searching…</p>
                        )}
                        {searchError && (
                            <p className="text-[10px] text-red-400 mb-2">
                                {searchError === 'PIXABAY_API_KEY not set in environment'
                                    ? 'Add PIXABAY_API_KEY to .env.local (free at pixabay.com/api)'
                                    : searchError}
                            </p>
                        )}
                        {searchResults.length > 0 && (
                            <div className="grid grid-cols-3 gap-1.5 max-h-48 overflow-y-auto">
                                {searchResults.map((img) => (
                                    <button
                                        key={img.id}
                                        type="button"
                                        title={`Photo by ${img.photographer}`}
                                        onClick={() => applyUrl(img.full)}
                                        className="relative aspect-square rounded-md overflow-hidden border-2 transition hover:scale-105 border-transparent hover:border-blue-400"
                                    >
                                        <img
                                            src={img.thumb}
                                            alt=""
                                            className="w-full h-full object-cover"
                                        />
                                    </button>
                                ))}
                            </div>
                        )}
                    </>
                )}
                {tab === 'url' && (
                    <input
                        type="url"
                        value={urlInput}
                        onChange={(e) => { setUrlInput(e.target.value); applyUrl(e.target.value); }}
                        placeholder="https://… image URL"
                        className="w-full px-2 py-1.5 text-xs bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                        autoFocus
                    />
                )}
            </div>
            <button
                type="button"
                onClick={onClose}
                className="w-full text-[11px] text-neutral-500 hover:text-neutral-200 transition py-2 border-t border-neutral-800"
            >
                Done
            </button>
        </motion.div>
    );
}

// ── Fixed-position background panel (renders outside preview) ────────────────
function FixedFloatingBackgroundPanel({ node, value, onChange, onClose, anchorTop, anchorLeft }) {
    const ref = useRef(null);
    const [mode, setMode] = useState('color');

    useEffect(() => {
        function away(e) {
            if (ref.current && !ref.current.contains(e.target)) onClose();
        }
        const id = setTimeout(() => document.addEventListener('mousedown', away), 60);
        return () => { clearTimeout(id); document.removeEventListener('mousedown', away); };
    }, [onClose]);

    const ambientColors = [
        { name: 'Pure Black', value: '#000000' },
        { name: 'Deep Charcoal', value: '#0a0a0a' },
        { name: 'Midnight', value: '#0f0f1a' },
        { name: 'Dark Navy', value: '#0d1117' },
        { name: 'Deep Slate', value: '#1a1a2e' },
        { name: 'Dark Warm', value: '#1a1410' },
        { name: 'Deep Forest', value: '#0a1612' },
        { name: 'Dark Plum', value: '#15101a' },
    ];

    return (
        <motion.div
            ref={ref}
            className="fixed z-[9999] bg-neutral-900 border border-neutral-700 rounded-xl shadow-2xl p-3"
            style={{ top: anchorTop, left: anchorLeft, width: 260 }}
            initial={{ opacity: 0, scale: 0.9, x: -8 }}
            animate={{ opacity: 1, scale: 1, x: 0 }}
            exit={{ opacity: 0, scale: 0.9, x: -8 }}
            transition={{ type: 'spring', stiffness: 500, damping: 30 }}
            onMouseDown={(e) => e.stopPropagation()}
        >
            <p className="text-[10px] uppercase tracking-widest text-neutral-500 mb-3 font-medium">
                {node.label}
            </p>
            <div className="flex gap-2 mb-3 border-b border-neutral-700">
                {['color', 'image', 'gradient'].map((m) => (
                    <button
                        key={m}
                        type="button"
                        onClick={() => setMode(m)}
                        className={`text-xs px-2 py-1 font-medium transition ${
                            mode === m
                                ? 'text-blue-400 border-b-2 border-blue-400'
                                : 'text-neutral-500 hover:text-neutral-300'
                        }`}
                    >
                        {m[0].toUpperCase() + m.slice(1)}
                    </button>
                ))}
            </div>
            {mode === 'color' && (
                <div>
                    <div className="flex items-center gap-2 mb-3">
                        <div
                            className="relative w-10 h-10 rounded-lg border border-neutral-600 flex-shrink-0 overflow-hidden cursor-pointer"
                            style={{ backgroundColor: value ?? '#000000' }}
                        >
                            <input
                                type="color"
                                value={value ?? '#000000'}
                                onChange={(e) => onChange(node.id, e.target.value)}
                                className="absolute inset-0 opacity-0 w-full h-full cursor-pointer"
                            />
                        </div>
                        <input
                            type="text"
                            value={value ?? '#000000'}
                            onChange={(e) => {
                                if (/^#[0-9a-fA-F]{0,6}$/.test(e.target.value))
                                    onChange(node.id, e.target.value);
                            }}
                            className="flex-1 px-2 py-1.5 text-xs bg-neutral-800 border border-neutral-600 rounded-lg text-white font-mono focus:outline-none focus:border-blue-500 transition"
                            maxLength={7}
                        />
                    </div>
                    <div className="grid grid-cols-6 gap-1.5">
                        {ambientColors.map((c) => (
                            <button
                                key={c.value}
                                type="button"
                                onClick={() => onChange(node.id, c.value)}
                                className={`h-7 w-7 rounded-md border-2 transition-transform hover:scale-110 ${
                                    value === c.value
                                        ? 'border-blue-400 ring-1 ring-blue-400/50'
                                        : 'border-neutral-700 hover:border-neutral-500'
                                }`}
                                style={{ backgroundColor: c.value }}
                                title={c.name}
                            />
                        ))}
                    </div>
                </div>
            )}
            {mode === 'image' && (
                <div>
                    {value && (
                        <div className="mb-2 w-full h-24 rounded-lg overflow-hidden bg-neutral-800 border border-neutral-700">
                            <img src={value} alt="" className="w-full h-full object-cover" />
                        </div>
                    )}
                    <input
                        type="url"
                        defaultValue={value ?? ''}
                        onChange={(e) => onChange(node.id, e.target.value)}
                        placeholder="https://... image URL"
                        className="w-full px-2 py-1.5 text-xs bg-neutral-800 border border-neutral-600 rounded-lg text-white focus:outline-none focus:border-blue-500 transition"
                    />
                </div>
            )}
            {mode === 'gradient' && (
                <div className="text-xs text-neutral-400">
                    <p className="mb-2">Gradient support coming soon</p>
                </div>
            )}
            <button
                type="button"
                onClick={onClose}
                className="mt-3 w-full text-[11px] text-neutral-500 hover:text-neutral-200 transition py-1"
            >
                Done
            </button>
        </motion.div>
    );
}

// ── Main overlay ─────────────────────────────────────────────────────────────
export default function EditableFieldOverlay({
    previewContainerRef,
    onFieldSelect,
    activeField,
    schema,
    isPreviewHovered,
    siteData,
    onFieldChange,
}) {
    const [nodes, setNodes] = useState([]);
    const rafRef = useRef(null);
    const fieldMapRef = useRef({});
    // Keeps the last valid node so the ghost editor survives the element briefly
    // collapsing to 0-height when all text is deleted mid-edit.
    const lastKnownActiveNodeRef = useRef(null);

    // Build a flat { fieldId → field } lookup map from schema
    useEffect(() => {
        if (!schema?.sections) return;
        const map = {};
        schema.sections.forEach((section) => {
            (section.fields || []).forEach((field) => {
                map[field.id] = field;
            });
        });
        fieldMapRef.current = map;
    }, [schema]);

    const recalculate = useCallback(() => {
        const container = previewContainerRef?.current;
        if (!container) return;

        const cRect = container.getBoundingClientRect();
        const seen = new Set();
        const found = [];

        // Support both old format (data-edit-node) and new format (data-edit-type + data-edit-field)
        const allOld = [
            ...container.querySelectorAll('[data-edit-node]'),
            ...container.querySelectorAll('[data-editable-field]'),
        ];
        const allNew = container.querySelectorAll('[data-edit-type][data-edit-field]');

        // Process new format first
        for (const el of allNew) {
            const editType = el.getAttribute('data-edit-type');
            const editField = el.getAttribute('data-edit-field');
            const id = editField; // Use field path as ID

            if (!id || seen.has(id)) continue;
            seen.add(id);

            const cs = window.getComputedStyle(el);
            if (cs.display === 'none' || cs.visibility === 'hidden') continue;

            const r = el.getBoundingClientRect();
            if (r.width < 4 || r.height < 4) continue;

            const COLOR_TYPES_SET = new Set(['color','textColor','bgColor','sectionColor','buttonColor','ambientColor']);
            const fieldLabel = el.getAttribute('data-edit-label') || (COLOR_TYPES_SET.has(editType) ? 'color' : editField.split('.').pop());
            const colorField = el.getAttribute('data-edit-color-field') || null;
            found.push({
                id,
                label: fieldLabel,
                type: editType,
                colorField,
                element: el,
                top: r.top - cRect.top + container.scrollTop,
                left: r.left - cRect.left,
                width: r.width,
                height: r.height,
                // Viewport-relative for fixed-position labels
                viewportTop: r.top,
                viewportRight: cRect.right,
            });
        }

        // Process old format (backward compatibility)
        for (const el of allOld) {
            const id =
                el.getAttribute('data-edit-node') ||
                el.getAttribute('data-editable-field');
            if (!id || seen.has(id)) continue;
            seen.add(id);

            const cs = window.getComputedStyle(el);
            if (cs.display === 'none' || cs.visibility === 'hidden') continue;

            const r = el.getBoundingClientRect();
            if (r.width < 4 || r.height < 4) continue;

            const field = fieldMapRef.current[id];
            found.push({
                id,
                label: field?.label ?? id.split('.').pop(),
                type: field?.type ?? 'text',
                colorField: el.getAttribute('data-edit-color-field') || null,
                element: el,
                top: r.top - cRect.top + container.scrollTop,
                left: r.left - cRect.left,
                width: r.width,
                height: r.height,
                viewportTop: r.top,
                viewportRight: cRect.right,
            });
        }

        setNodes(found);
    }, [previewContainerRef]);

    useEffect(() => {
        const container = previewContainerRef?.current;
        if (!container) return;

        // Delay initial scans so template render + entry animations can settle
        const t1 = setTimeout(recalculate, 300);
        const t2 = setTimeout(recalculate, 1000);

        const schedule = () => {
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
            rafRef.current = requestAnimationFrame(recalculate);
        };

        // Watch for DOM changes (dynamic content, images loading)
        const mo = new MutationObserver(schedule);
        mo.observe(container, { childList: true, subtree: true });

        container.addEventListener('scroll', schedule, { passive: true });
        window.addEventListener('resize', schedule, { passive: true });

        return () => {
            clearTimeout(t1);
            clearTimeout(t2);
            mo.disconnect();
            container.removeEventListener('scroll', schedule);
            window.removeEventListener('resize', schedule);
            if (rafRef.current) cancelAnimationFrame(rafRef.current);
        };
    }, [previewContainerRef, recalculate]);

    const activeNode = nodes.find((n) => n.id === activeField) ?? null;
    // While a field is selected, use the last valid node if the live one vanished
    // (happens when text is fully deleted and the DOM element collapses to 0px).
    if (activeNode) lastKnownActiveNodeRef.current = activeNode;
    if (!activeField) lastKnownActiveNodeRef.current = null;
    const effectiveActiveNode = activeField ? (activeNode ?? lastKnownActiveNodeRef.current) : null;

    const fieldValue = effectiveActiveNode && siteData
        ? getNestedValue(siteData, effectiveActiveNode.id)
        : undefined;
    return (
        <>
            {/* ── Highlight outlines ── */}
            {nodes.map((node) => {
                const isActive = activeField === node.id;
                return (
                    <Fragment key={node.id}>
                        <AnimatePresence>
                            {isActive && (
                                <motion.div
                                    className="absolute pointer-events-none z-20"
                                    style={{
                                        top: node.top,
                                        left: node.left,
                                        width: node.width,
                                        height: node.height,
                                    }}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    exit={{ opacity: 0 }}
                                    transition={{ duration: 0.12 }}
                                >
                                    <div
                                        className="w-full h-full rounded-sm"
                                        style={{
                                            boxShadow: 'inset 0 0 0 2px rgba(59,130,246,0.85)',
                                            backgroundColor: 'rgba(59,130,246,0.06)',
                                        }}
                                    />
                                </motion.div>
                            )}
                        </AnimatePresence>
                    </Fragment>
                );
            })}

            {/* ── Inline ghost text editor (stays inside preview) ── */}
            <AnimatePresence>
                {effectiveActiveNode && onFieldChange && TEXT_TYPES.has(effectiveActiveNode.type) && (
                    <GhostTextEditor
                        key={effectiveActiveNode.id + '-text'}
                        node={effectiveActiveNode}
                        value={fieldValue}
                        onChange={onFieldChange}
                        onClose={() => onFieldSelect(null)}
                    />
                )}
            </AnimatePresence>
        </>
    );
}
