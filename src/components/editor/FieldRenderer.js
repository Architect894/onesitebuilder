"use client";

export default function FieldRenderer({ field, value, onChange, onFocusField }) {
    const baseInputClasses =
        "mt-2 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition focus:border-neutral-500";

    function handleFocus() {
        onFocusField?.(field);
    }

    const isText = field.type === "text" || field.type === "url";
    const isTextarea = field.type === "textarea";

    // Treat any of these as a color input (lets you add schema types later without changing UI)
    const isColor =
        field.type === "color" ||
        field.type === "sectionColor" ||
        field.type === "bgColor";

    const swatches = [
        "#000000",
        "#0b0b0b",
        "#111111",
        "#1a1a1a",
        "#ffffff",
        "#f5f5f5",
        "#3a3a41", // gunmetal-ish
        "#4a4a52", // gunmetal medium
        "#5a5a62", // gunmetal light
    ];

    return (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
            <label className="block">
                <p className="text-sm font-medium text-white">{field.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
                    {field.type}
                </p>

                {isText ? (
                    <input
                        type={field.type === "url" ? "url" : "text"}
                        value={value ?? ""}
                        onChange={(e) => onChange(field.id, e.target.value)}
                        onFocus={handleFocus}
                        className={baseInputClasses}
                    />
                ) : null}

                {isTextarea ? (
                    <textarea
                        value={value ?? ""}
                        onChange={(e) => onChange(field.id, e.target.value)}
                        onFocus={handleFocus}
                        className={`${baseInputClasses} min-h-[120px] resize-y`}
                    />
                ) : null}

                {isColor ? (
                    <div className="mt-3">
                        <div className="flex items-center gap-3">
                            <input
                                type="color"
                                value={value ?? "#000000"}
                                onChange={(e) => onChange(field.id, e.target.value)}
                                onFocus={handleFocus}
                                className="h-12 w-16 cursor-pointer rounded-lg border border-neutral-700 bg-transparent"
                            />
                            <div className="text-sm text-neutral-400">{value ?? "#000000"}</div>

                            {/* Preview chip */}
                            <div
                                className="ml-auto h-10 w-10 rounded-xl border border-neutral-700"
                                style={{ backgroundColor: value ?? "#000000" }}
                            />
                        </div>

                        {/* Quick swatches */}
                        <div className="mt-3 flex flex-wrap gap-2">
                            {swatches.map((c) => (
                                <button
                                    key={c}
                                    type="button"
                                    onClick={() => onChange(field.id, c)}
                                    onFocus={handleFocus}
                                    className="h-8 w-8 rounded-lg border border-neutral-700 transition hover:scale-[1.03]"
                                    style={{ backgroundColor: c }}
                                    aria-label={`Set color ${c}`}
                                    title={c}
                                />
                            ))}
                        </div>
                    </div>
                ) : null}

                <p className="mt-3 text-xs text-neutral-600">{field.id}</p>
            </label>
        </div>
    );
}