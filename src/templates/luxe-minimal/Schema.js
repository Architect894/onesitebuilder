const luxeMinimalSchema = {
    key: "luxe-minimal",
    name: "Luxe Minimal",
    style: "minimal",
    industries: ["wedding-photographer", "wedding-planner", "catering"],
    tags: ["minimal", "clean", "light", "whitespace", "modern"],
    description: "Ultra-clean, whitespace-driven template for simple, elegant presentation",
    sections: [
        {
            id: "hero",
            label: "Hero Section",
            fields: [
                {
                    id: "content.sectionStyle.hero.bg",
                    label: "Hero Background",
                    type: "background",
                    default: "#ffffff",
                },
                {
                    id: "content.hero.headline",
                    label: "Headline",
                    type: "text",
                    maxLength: 80,
                },
                {
                    id: "content.hero.textColor",
                    label: "Headline Color",
                    type: "textColor",
                    default: "#111111",
                },
                {
                    id: "content.hero.subheadlineColor",
                    label: "Subheadline Color",
                    type: "textColor",
                    default: "#666666",
                },
                {
                    id: "content.hero.subheadline",
                    label: "Subheadline",
                    type: "textarea",
                    maxLength: 180,
                },
                {
                    id: "content.hero.buttonLabel",
                    label: "Button Text",
                    type: "text",
                    maxLength: 24,
                },
                {
                    id: "content.hero.buttonHref",
                    label: "Button Link",
                    type: "url",
                },
                {
                    id: "content.hero.buttonTextColor",
                    label: "Button Text Color",
                    type: "textColor",
                    default: "#1a1a1a",
                },
            ],
        },
        {
            id: "about",
            label: "About Section",
            fields: [
                {
                    id: "content.sectionStyle.about.bg",
                    label: "About Background",
                    type: "background",
                    default: "#ffffff",
                },
                {
                    id: "content.about.title",
                    label: "About Title",
                    type: "text",
                    maxLength: 80,
                },
                {
                    id: "content.about.headingColor",
                    label: "Heading Color",
                    type: "textColor",
                    default: "#111111",
                },
                {
                    id: "content.about.bodyColor",
                    label: "Body Text Color",
                    type: "textColor",
                    default: "#666666",
                },
                {
                    id: "content.about.eyebrowColor",
                    label: "Eyebrow Color",
                    type: "textColor",
                    default: "#1a1a1a",
                },
                {
                    id: "content.about.body",
                    label: "About Description",
                    type: "textarea",
                    maxLength: 300,
                },
            ],
        },
        {
            id: "featured",
            label: "Featured Image",
            fields: [
                {
                    id: "content.sectionStyle.featured.bg",
                    label: "Featured Background",
                    type: "background",
                    default: "#ffffff",
                },
                {
                    id: "content.featured.caption",
                    label: "Image Caption",
                    type: "text",
                    maxLength: 60,
                    default: "Featured work",
                },
            ],
        },
        {
            id: "services",
            label: "Services",
            fields: [
                {
                    id: "content.sectionStyle.services.bg",
                    label: "Services Background",
                    type: "background",
                    default: "#ffffff",
                },
                {
                    id: "content.servicesSection.heading",
                    label: "Services Heading",
                    type: "text",
                    maxLength: 40,
                    default: "Services",
                },
                {
                    id: "content.servicesSection.headingColor",
                    label: "Heading Color",
                    type: "textColor",
                    default: "#111111",
                },
                {
                    id: "content.servicesSection.textColor",
                    label: "Service Text Color",
                    type: "textColor",
                    default: "#111111",
                },
                {
                    id: "content.servicesSection.numberColor",
                    label: "Service Number Color",
                    type: "textColor",
                    default: "#1a1a1a",
                },
                {
                    id: "content.services",
                    label: "Service List",
                    type: "array",
                    itemType: "text",
                    maxItems: 8,
                },
            ],
        },
        {
            id: "gallery",
            label: "Gallery",
            fields: [
                {
                    id: "content.gallerySection.heading",
                    label: "Gallery Heading",
                    type: "text",
                    maxLength: 40,
                    default: "Work",
                },
                {
                    id: "content.gallerySection.headingColor",
                    label: "Heading Color",
                    type: "textColor",
                    default: "#111111",
                },
                {
                    id: "content.sectionStyle.gallery.bg",
                    label: "Gallery Background",
                    type: "background",
                    default: "#ffffff",
                },
                {
                    id: "content.gallery",
                    label: "Gallery Images",
                    type: "array",
                    itemType: "image",
                    description: "4+ images recommended for the grid layout",
                },
            ],
        },
        {
            id: "cta",
            label: "Call to Action",
            fields: [
                {
                    id: "content.sectionStyle.cta.bg",
                    label: "CTA Background",
                    type: "background",
                    default: "#ffffff",
                },
                {
                    id: "content.cta.heading",
                    label: "CTA Heading",
                    type: "text",
                    maxLength: 60,
                    default: "Ready to start?",
                },
                {
                    id: "content.cta.headingColor",
                    label: "CTA Heading Color",
                    type: "textColor",
                    default: "#111111",
                },
                {
                    id: "content.cta.eyebrowColor",
                    label: "CTA Eyebrow Color",
                    type: "textColor",
                    default: "#1a1a1a",
                },
                {
                    id: "content.cta.label",
                    label: "CTA Button Text",
                    type: "text",
                    maxLength: 24,
                },
                {
                    id: "content.cta.href",
                    label: "CTA Button Link",
                    type: "url",
                },
                {
                    id: "content.cta.buttonTextColor",
                    label: "CTA Button Text Color",
                    type: "textColor",
                    default: "#1a1a1a",
                },
            ],
        },
        {
            id: "footer",
            label: "Footer",
            fields: [
                {
                    id: "content.sectionStyle.footer.bg",
                    label: "Footer Background",
                    type: "background",
                    default: "#ffffff",
                },
                {
                    id: "content.footer.textColor",
                    label: "Footer Text Color",
                    type: "textColor",
                    default: "#111111",
                },
            ],
        },
        {
            id: "contact",
            label: "Contact Information",
            fields: [
                {
                    id: "content.contact.email",
                    label: "Email Address",
                    type: "text",
                },
                {
                    id: "content.contact.phone",
                    label: "Phone Number",
                    type: "text",
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
                    id: "content.social.twitter",
                    label: "Twitter / X URL",
                    type: "url",
                },
            ],
        },
        {
            id: "branding",
            label: "Branding",
            fields: [
                {
                    id: "branding.primaryColor",
                    label: "Accent Color",
                    type: "color",
                    default: "#000000",
                },
                {
                    id: "branding.neutralColor",
                    label: "Text Color",
                    type: "color",
                    default: "#000000",
                },
            ],
        },
    ],
};

export default luxeMinimalSchema;
