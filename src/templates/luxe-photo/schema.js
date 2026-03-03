const luxePhotoSchema = {
    key: "luxe-photo",
    name: "Luxe Photo",
    category: "photo-booth",
    sections: [
        {
            id: "hero",
            label: "Hero",
            previewSection: "hero",
            fields: [
                {
                    id: "content.hero.eyebrow",
                    label: "Hero Eyebrow",
                    type: "text",
                    maxLength: 50,
                    previewSection: "hero",
                },
                {
                    id: "content.hero.headline",
                    label: "Hero Headline",
                    type: "text",
                    maxLength: 80,
                    previewSection: "hero",
                },
                {
                    id: "content.hero.subheadline",
                    label: "Hero Subheadline",
                    type: "textarea",
                    maxLength: 180,
                    previewSection: "hero",
                },
            ],
        },
        {
            id: "about",
            label: "About",
            previewSection: "about",
            fields: [
                {
                    id: "content.about.title",
                    label: "About Title",
                    type: "text",
                    maxLength: 80,
                    previewSection: "about",
                },
                {
                    id: "content.about.body",
                    label: "About Body",
                    type: "textarea",
                    maxLength: 240,
                    previewSection: "about",
                },
            ],
        },
        {
            id: "cta",
            label: "Call To Action",
            previewSection: "hero",
            fields: [
                {
                    id: "content.cta.label",
                    label: "CTA Label",
                    type: "text",
                    maxLength: 24,
                    previewSection: "hero",
                },
                {
                    id: "content.cta.href",
                    label: "CTA Link",
                    type: "url",
                    previewSection: "hero",
                },
            ],
        },
        {
            id: "theme",
            label: "Theme",
            previewSection: "hero",
            fields: [
                {
                    id: "branding.primaryColor",
                    label: "Primary Color",
                    type: "color",
                    previewSection: "hero",
                },
                {
                    id: "branding.accentColor",
                    label: "Accent Color",
                    type: "color",
                    previewSection: "hero",
                },
                {
                    id: "branding.neutralColor",
                    label: "Neutral Background",
                    type: "color",
                    previewSection: "about",
                },
            ],
        },
    ],
};

export default luxePhotoSchema;