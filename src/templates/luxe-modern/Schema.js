const luxeModernSchema = {
    key: "luxe-modern",
    name: "Luxe Modern",
    style: "modern",
    industries: ["photo-booth", "wedding-dj", "event-venue", "party-rentals"],
    tags: ["modern", "bold", "dark", "split-layout", "accent"],
    description: "Clean, bold split-layout template for event and entertainment businesses",
    sections: [
        {
            id: "hero",
            label: "Hero Section",
            fields: [
                {
                    id: "content.sectionStyle.hero.bg",
                    label: "Hero Background",
                    type: "background",
                    default: "#000000",
                },
                {
                    id: "content.sectionStyle.hero.accentColor",
                    label: "Accent Light Color",
                    type: "color",
                    default: "#d4a574",
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
                    id: "content.hero.subheadlineColor",
                    label: "Subheadline Color",
                    type: "textColor",
                    default: "#ffffff55",
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
                {
                    id: "content.about.eyebrow",
                    label: "About Eyebrow",
                    type: "text",
                    maxLength: 40,
                    default: "OUR STORY",
                },
            ],
        },
        {
            id: "features",
            label: "Features Section",
            fields: [
                {
                    id: "content.sectionStyle.features.bg",
                    label: "Features Background",
                    type: "background",
                    default: "#0d0d0d",
                },
                {
                    id: "content.features.eyebrow",
                    label: "Features Eyebrow",
                    type: "text",
                    maxLength: 40,
                    default: "WHY CHOOSE US",
                },
                {
                    id: "content.features.eyebrowColor",
                    label: "Eyebrow Color",
                    type: "textColor",
                    default: "#d4a574",
                },
                {
                    id: "content.features.heading",
                    label: "Features Heading",
                    type: "text",
                    maxLength: 60,
                    default: "Key Features",
                },
                {
                    id: "content.features.headingColor",
                    label: "Heading Color",
                    type: "textColor",
                    default: "#ffffff",
                },
                {
                    id: "content.features.textColor",
                    label: "Service Text Color",
                    type: "textColor",
                    default: "#ffffff",
                },
                {
                    id: "content.features.numberColor",
                    label: "Service Number Color",
                    type: "textColor",
                    default: "#d4a574",
                },
                {
                    id: "content.services",
                    label: "Services / Features List",
                    type: "array",
                    itemType: "text",
                    maxItems: 6,
                },
            ],
        },
        {
            id: "portfolio",
            label: "Portfolio Section",
            fields: [
                {
                    id: "content.portfolio.eyebrow",
                    label: "Portfolio Eyebrow",
                    type: "text",
                    maxLength: 40,
                    default: "RECENT WORK",
                },
                {
                    id: "content.portfolio.heading",
                    label: "Portfolio Heading",
                    type: "text",
                    maxLength: 60,
                    default: "Our Portfolio",
                },
                {
                    id: "content.portfolio.headingColor",
                    label: "Heading Color",
                    type: "textColor",
                    default: "#ffffff",
                },
                {
                    id: "content.gallery",
                    label: "Portfolio Images",
                    type: "array",
                    itemType: "image",
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
                    default: "#0d0d0d",
                },
                {
                    id: "content.sectionStyle.stats.textColor",
                    label: "Stats Text Color",
                    type: "textColor",
                    default: "#ffffff",
                },
                {
                    id: "content.stats",
                    label: "Statistics",
                    type: "array",
                    itemType: "object",
                    maxItems: 4,
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
                    default: "#0a0a0a",
                },
                {
                    id: "content.cta.heading",
                    label: "CTA Heading",
                    type: "text",
                    maxLength: 60,
                    default: "Ready to Begin?",
                },
                {
                    id: "content.cta.headingColor",
                    label: "CTA Heading Color",
                    type: "textColor",
                    default: "#ffffff",
                },
                {
                    id: "content.cta.bodyColor",
                    label: "CTA Body Color",
                    type: "textColor",
                    default: "#999999",
                },
                {
                    id: "content.cta.body",
                    label: "CTA Subtext",
                    type: "textarea",
                    maxLength: 160,
                    default: "Let's create something amazing together",
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
                    id: "content.footer.description",
                    label: "Footer Description",
                    type: "textarea",
                    maxLength: 120,
                    default: "Modern solutions for modern problems",
                },
                {
                    id: "content.footer.textColor",
                    label: "Footer Text Color",
                    type: "textColor",
                    default: "#ffffff",
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
                    default: "#f1c886",
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