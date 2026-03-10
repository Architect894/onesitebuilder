"use client";

export default function FieldRenderer({ field, value, onChange, fieldInputAttr }) {
    const isText = field.type === "text" || field.type === "url";
    const isTextarea = field.type === "textarea";
    const isColor =
        field.type === "color" ||
        field.type === "sectionColor" ||
        field.type === "bgColor" ||
        field.type === "buttonColor" ||
        field.type === "textColor";
    
    const isAmbientColor = field.type === "ambientColor";

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
                        {...(fieldInputAttr ? { [fieldInputAttr.split("=")[0]]: fieldInputAttr.split("=")[1].replace(/"/g, "") } : {})}
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
            </label>
        </div>
    );
}