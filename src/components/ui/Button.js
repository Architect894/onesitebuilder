"use client";

export default function Button({ children, href }) {
    return (
        <a
            href={href}
            className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black transition-all duration-300 hover:scale-[1.04] hover:shadow-lg active:scale-95"
        >
            {children}
        </a>
    );
}