export default {
    name: "Luxe Minimal",
    description: "Ultra-clean, whitespace-driven template for simple, elegant presentation",
    sections: [
        {
            id: "hero",
            label: "Hero Section",
            fields: [
                { id: "headline", label: "Headline", type: "text", placeholder: "Enter headline" },
                { id: "subheadline", label: "Subheadline", type: "text", placeholder: "Enter subheadline" },
            ],
        },
        {
            id: "about",
            label: "About Section",
            fields: [
                { id: "title", label: "Title", type: "text", placeholder: "About heading" },
                { id: "body", label: "Description", type: "textarea", placeholder: "About text" },
            ],
        },
        {
            id: "services",
            label: "Services",
            fields: [
                { id: "items", label: "Services List", type: "array", placeholder: "Add service" },
            ],
        },
        {
            id: "gallery",
            label: "Gallery",
            fields: [
                { id: "images", label: "Images", type: "array", placeholder: "Add image URL" },
            ],
        },
        {
            id: "cta",
            label: "Call to Action",
            fields: [
                { id: "label", label: "Button Text", type: "text", placeholder: "Get Started" },
                { id: "href", label: "Button Link", type: "text", placeholder: "https://..." },
            ],
        },
        {
            id: "contact",
            label: "Contact",
            fields: [
                { id: "email", label: "Email", type: "email", placeholder: "contact@example.com" },
                { id: "phone", label: "Phone", type: "text", placeholder: "+1 (555) 123-4567" },
            ],
        },
        {
            id: "social",
            label: "Social Media",
            fields: [
                { id: "instagram", label: "Instagram URL", type: "text", placeholder: "https://instagram.com/..." },
                { id: "twitter", label: "Twitter URL", type: "text", placeholder: "https://twitter.com/..." },
                { id: "facebook", label: "Facebook URL", type: "text", placeholder: "https://facebook.com/..." },
            ],
        },
        {
            id: "branding",
            label: "Branding",
            fields: [
                {
                    id: "primaryColor",
                    label: "Primary Color",
                    type: "color",
                    default: "#000000",
                },
                {
                    id: "neutralColor",
                    label: "Text Color",
                    type: "color",
                    default: "#000000",
                },
            ],
        },
        {
            id: "footer",
            label: "Footer",
            fields: [
                { id: "copyright", label: "Copyright Text", type: "text", placeholder: "© 2026" },
            ],
        },
    ],
};
