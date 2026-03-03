"use client";

export default function FieldRenderer({ field, value, onChange, onFocusField }) {
    const baseInputClasses =
        "mt-2 w-full rounded-xl border border-neutral-700 bg-neutral-950 px-4 py-3 text-sm text-white outline-none transition focus:border-neutral-500";

    function handleFocus() {
        onFocusField?.(field);
    }

    return (
        <div className="rounded-2xl border border-neutral-800 bg-neutral-950 p-5">
            <label className="block">
                <p className="text-sm font-medium text-white">{field.label}</p>
                <p className="mt-1 text-xs uppercase tracking-[0.2em] text-neutral-500">
                    {field.type}
                </p>

                {field.type === "text" || field.type === "url" ? (
                    <input
                        type={field.type === "url" ? "url" : "text"}
                        value={value ?? ""}
                        onChange={(e) => onChange(field.id, e.target.value)}
                        onFocus={handleFocus}
                        className={baseInputClasses}
                    />
                ) : null}

                {field.type === "textarea" ? (
                    <textarea
                        value={value ?? ""}
                        onChange={(e) => onChange(field.id, e.target.value)}
                        onFocus={handleFocus}
                        className={`${baseInputClasses} min-h-[120px] resize-y`}
                    />
                ) : null}

                {field.type === "color" ? (
                    <div className="mt-3 flex items-center gap-3">
                        <input
                            type="color"
                            value={value ?? "#000000"}
                            onChange={(e) => onChange(field.id, e.target.value)}
                            onFocus={handleFocus}
                            className="h-12 w-16 cursor-pointer rounded-lg border border-neutral-700 bg-transparent"
                        />
                        <div className="text-sm text-neutral-400">{value ?? "#000000"}</div>
                    </div>
                ) : null}

                <p className="mt-3 text-xs text-neutral-600">{field.id}</p>
            </label>
        </div>
    );
}