const luxeModernSchema = {
    key: "luxe-modern",
    name: "Luxe Modern",
    sections: [
        {
            id: "hero",
            label: "Hero Section",
            fields: [
                {
                    id: "content.sectionStyle.hero.bg",
                    label: "Background Ambient",
                    type: "ambientColor",
                    default: "#000000",
                },
                {
                    id: "content.sectionStyle.hero.accentColor",
                    label: "Accent Light Color",
                    type: "color",
                    default: "#d4a574",
                },
                {
                    id: "content.cta.color",
                    label: "Button Background",
                    type: "buttonColor",
                    default: "#d4a574",
                },
                {
                    id: "content.cta.textColor",
                    label: "Button Text Color",
                    type: "textColor",
                    default: "#ffffff",
                },
                {
                    id: "content.hero.textColor",
                    label: "Text Color",
                    type: "textColor",
                    default: "#ffffff",
                },
                {
                    id: "content.hero.eyebrow",
                    label: "Hero Eyebrow",
                    type: "text",
                    maxLength: 50,
                },
                {
                    id: "content.hero.headline",
                    label: "Hero Headline",
                    type: "text",
                    maxLength: 80,
                },
                {
                    id: "content.hero.subheadline",
                    label: "Hero Subheadline",
                    type: "textarea",
                    maxLength: 180,
                },
                {
                    id: "content.cta.label",
                    label: "CTA Button Label",
                    type: "text",
                    maxLength: 24,
                },
                {
                    id: "content.cta.href",
                    label: "CTA Button Link",
                    type: "url",
                },
            ],
        },
        {
            id: "about",
            label: "About Section",
            fields: [
                {
                    id: "content.sectionStyle.about.bg",
                    label: "Background Ambient",
                    type: "ambientColor",
                    default: "#1a1a1a",
                },
                {
                    id: "content.sectionStyle.about.accentColor",
                    label: "Accent Light Color",
                    type: "color",
                    default: "#d4a574",
                },
                {
                    id: "content.about.headingColor",
                    label: "Heading Color",
                    type: "textColor",
                    default: "#ffffff",
                },
                {
                    id: "content.about.bodyColor",
                    label: "Body Text Color",
                    type: "textColor",
                    default: "#d4d4d4",
                },
                {
                    id: "content.about.title",
                    label: "About Title",
                    type: "text",
                    maxLength: 80,
                },
                {
                    id: "content.about.body",
                    label: "About Body",
                    type: "textarea",
                    maxLength: 240,
                },
            ],
        },
        {
            id: "gallery",
            label: "Gallery Section",
            fields: [
                {
                    id: "content.sectionStyle.gallery.bg",
                    label: "Background Ambient",
                    type: "ambientColor",
                    default: "#000000",
                },
                {
                    id: "content.sectionStyle.gallery.accentColor",
                    label: "Accent Light Color",
                    type: "color",
                    default: "#d4a574",
                },
            ],
        },
        {
            id: "branding",
            label: "Branding Colors",
            fields: [
                {
                    id: "branding.primary",
                    label: "Primary Color",
                    type: "color",
                    default: "#d4a574",
                },
                {
                    id: "branding.secondary",
                    label: "Secondary Color",
                    type: "color",
                    default: "#f1c886",
                },
                {
                    id: "branding.accent",
                    label: "Accent Color",
                    type: "color",
                    default: "#9c8762",
                },
            ],
        },
        {
            id: "contact",
            label: "Contact Information",
            fields: [
                {
                    id: "content.contact.phone",
                    label: "Phone Number",
                    type: "text",
                },
                {
                    id: "content.contact.email",
                    label: "Email Address",
                    type: "text",
                },
                {
                    id: "content.contact.location",
                    label: "Location/Service Area",
                    type: "text",
                    maxLength: 100,
                },
            ],
        },
        {
            id: "social",
            label: "Social Links",
            fields: [
                {
                    id: "content.social.instagram",
                    label: "Instagram URL",
                    type: "url",
                },
                {
                    id: "content.social.tiktok",
                    label: "TikTok URL",
                    type: "url",
                },
                {
                    id: "content.social.facebook",
                    label: "Facebook URL",
                    type: "url",
                },
                {
                    id: "content.social.youtube",
                    label: "YouTube URL",
                    type: "url",
                },
            ],
        },
    ],
};

export default luxeModernSchema;