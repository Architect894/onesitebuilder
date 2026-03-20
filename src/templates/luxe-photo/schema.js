const luxePhotoSchema = {
    key: "luxe-photo",
    name: "Luxe Photo",
    style: "photo",
    industries: ["photo-booth", "wedding-photographer", "videographer"],
    tags: ["photo", "gallery", "full-screen", "masonry", "dark", "luxury"],
    description: "Photography-focused template with full-screen hero, masonry gallery, and modern design",
    sections: [
        {
            id: "hero",
            label: "Hero Section",
            fields: [
                {
                    id: "content.hero.logo",
                    label: "Logo",
                    type: "image",
                },
                {
                    id: "content.sectionStyle.hero.bg",
                    label: "Hero Background",
                    type: "background",
                    default: "#000000",
                },
                {
                    id: "content.sectionStyle.hero.accentColor",
                    label: "Accent Color",
                    type: "color",
                    default: "#d4a574",
                },
                {
                    id: "content.hero.textColor",
                    label: "Text Color",
                    type: "textColor",
                    default: "#ffffff",
                },
                {
                    id: "content.hero.eyebrow",
                    label: "Eyebrow Text",
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
                    id: "content.hero.subheadlineColor",
                    label: "Subheadline Color",
                    type: "textColor",
                    default: "#ffffff70",
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
                    id: "content.hero.buttonColor",
                    label: "Button Background",
                    type: "buttonColor",
                    default: "#d4a574",
                },
                {
                    id: "content.hero.buttonTextColor",
                    label: "Button Text Color",
                    type: "textColor",
                    default: "#000000",
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
                    default: "#0a0a0a",
                },
                {
                    id: "content.about.title",
                    label: "Section Title",
                    type: "text",
                    maxLength: 80,
                },
                {
                    id: "content.about.body",
                    label: "Description",
                    type: "textarea",
                    maxLength: 300,
                },
                {
                    id: "content.about.eyebrow",
                    label: "About Eyebrow",
                    type: "text",
                    maxLength: 40,
                    default: "Our Story",
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
                    default: "#0a0a0a",
                },
                {
                    id: "content.servicesSection.eyebrow",
                    label: "Services Eyebrow",
                    type: "text",
                    maxLength: 40,
                    default: "What We Offer",
                },
                {
                    id: "content.servicesSection.eyebrowColor",
                    label: "Eyebrow Color",
                    type: "textColor",
                    default: "#d4a574",
                },
                {
                    id: "content.servicesSection.heading",
                    label: "Services Heading",
                    type: "text",
                    maxLength: 60,
                    default: "Our Services",
                },
                {
                    id: "content.servicesSection.headingColor",
                    label: "Heading Color",
                    type: "textColor",
                    default: "#ffffff",
                },
                {
                    id: "content.servicesSection.textColor",
                    label: "Service Text Color",
                    type: "textColor",
                    default: "#ffffff",
                },
                {
                    id: "content.servicesSection.numberColor",
                    label: "Service Number Color",
                    type: "textColor",
                    default: "#d4a574",
                },
                {
                    id: "content.services",
                    label: "Service List",
                    type: "array",
                    itemType: "text",
                    maxItems: 6,
                },
            ],
        },
        {
            id: "gallery",
            label: "Gallery Section",
            fields: [
                {
                    id: "content.sectionStyle.gallery.bg",
                    label: "Gallery Background",
                    type: "background",
                    default: "#000000",
                },
                {
                    id: "content.gallerySection.title",
                    label: "Gallery Title",
                    type: "text",
                    default: "Featured Work",
                },
                {
                    id: "content.gallerySection.eyebrow",
                    label: "Gallery Eyebrow",
                    type: "text",
                    maxLength: 40,
                    default: "Portfolio",
                },
                {
                    id: "content.gallerySection.headingColor",
                    label: "Heading Color",
                    type: "textColor",
                    default: "#ffffff",
                },
                {
                    id: "content.gallery",
                    label: "Gallery Images",
                    type: "array",
                    itemType: "image",
                    description: "Upload 6+ images for best masonry layout",
                },
            ],
        },
        {
            id: "stats",
            label: "Stats Section",
            fields: [
                {
                    id: "content.sectionStyle.stats.bg",
                    label: "Stats Background",
                    type: "background",
                    default: "#5d8a8a",
                },
                {
                    id: "content.stats",
                    label: "Statistics",
                    type: "array",
                    itemType: "object",
                    maxItems: 3,
                },
            ],
        },
        {
            id: "cta",
            label: "Call to Action",
            fields: [
                {
                    id: "content.cta.eyebrow",
                    label: "Eyebrow Text",
                    type: "text",
                    maxLength: 60,
                    default: "READY TO WORK TOGETHER?",
                },
                {
                    id: "content.cta.heading",
                    label: "Heading",
                    type: "text",
                    maxLength: 80,
                    default: "Let's Create Something Amazing",
                },
                {
                    id: "content.cta.headingColor",
                    label: "Heading Color",
                    type: "textColor",
                    default: "#ffffff",
                },
                {
                    id: "content.sectionStyle.cta.bg",
                    label: "CTA Background",
                    type: "background",
                    default: "#111111",
                },
                {
                    id: "content.cta.label",
                    label: "Button Text",
                    type: "text",
                    maxLength: 24,
                },
                {
                    id: "content.cta.href",
                    label: "Button Link",
                    type: "url",
                },
                {
                    id: "content.cta.color",
                    label: "Button Background Color",
                    type: "color",
                    default: "#d4a574",
                },
                {
                    id: "content.cta.textColor",
                    label: "Button Text Color",
                    type: "textColor",
                    default: "#ffffff",
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
        {
            id: "branding",
            label: "Branding Colors",
            fields: [
                {
                    id: "branding.primaryColor",
                    label: "Primary Color",
                    type: "color",
                    default: "#d4a574",
                },
                {
                    id: "branding.accentColor",
                    label: "Secondary Color",
                    type: "color",
                    default: "#c6a16e",
                },
                {
                    id: "branding.neutralColor",
                    label: "Neutral Color",
                    type: "color",
                    default: "#000000",
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
                    default: "#000000",
                },
                {
                    id: "content.footer.textColor",
                    label: "Footer Text Color",
                    type: "textColor",
                    default: "#ffffff",
                },
            ],
        },
    ],
};

export default luxePhotoSchema;