const luxeModernSchema = {
    key: "luxe-modern",
    name: "Luxe Modern",
    sections: [

        {
            id: "branding",
            label: "Branding",
            fields: [
                {
                    id: "branding.primaryColor",
                    label: "Primary Color",
                    type: "color",
                },
                {
                    id: "branding.accentColor",
                    label: "Accent Color",
                    type: "color",
                },
                {
                    id: "branding.neutralColor",
                    label: "Neutral Background",
                    type: "color",
                },
            ],
        },

        {
            id: "hero",
            label: "Hero Section",
            fields: [
                {
                    id: "content.hero.logo",
                    label: "Logo URL",
                    type: "text",
                    previewSection: "hero",
                },
                {
                    id: "content.hero.eyebrow",
                    label: "Eyebrow Text",
                    type: "text",
                    previewSection: "hero",
                },
                {
                    id: "content.hero.headline",
                    label: "Headline",
                    type: "text",
                    previewSection: "hero",
                },
                {
                    id: "content.hero.subheadline",
                    label: "Subheadline",
                    type: "textarea",
                    previewSection: "hero",
                },
            ],
        },

        {
            id: "about",
            label: "About Section",
            fields: [
                {
                    id: "content.about.title",
                    label: "Title",
                    type: "text",
                    previewSection: "about",
                },
                {
                    id: "content.about.body",
                    label: "Description",
                    type: "textarea",
                    previewSection: "about",
                },
            ],
        },

        {
            id: "cta",
            label: "Call To Action",
            fields: [
                {
                    id: "content.cta.label",
                    label: "Button Label",
                    type: "text",
                    previewSection: "hero",
                },
                {
                    id: "content.cta.href",
                    label: "Button Link",
                    type: "url",
                    previewSection: "hero",
                },
            ],
        },

        /* ADD THIS BLOCK */

        {
            id: "sectionStyle",
            label: "Section Backgrounds",
            fields: [
                {
                    id: "content.sectionStyle.hero.bg",
                    label: "Hero Background",
                    type: "color",
                    previewSection: "hero",
                },
                {
                    id: "content.sectionStyle.about.bg",
                    label: "About Background",
                    type: "color",
                    previewSection: "about",
                },
                {
                    id: "content.sectionStyle.gallery.bg",
                    label: "Gallery Background",
                    type: "color",
                    previewSection: "gallery",
                },
                {
                    id: "content.sectionStyle.footer.bg",
                    label: "Footer Background",
                    type: "color",
                    previewSection: "footer",
                },
            ],
        },

    ],
};

export default luxeModernSchema;