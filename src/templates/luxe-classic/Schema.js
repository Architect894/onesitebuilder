const luxeClassicSchema = {
    key: "luxe-classic",
    name: "Luxe Classic",
    style: "classic",
    industries: ["wedding-planner", "event-venue", "wedding-dj", "catering"],
    tags: ["classic", "elegant", "serif", "premium", "centered"],
    description: "Elegant, serif-driven template for upscale event and hospitality businesses",
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
                    default: "transparent",
                },
                {
                    id: "content.hero.buttonTextColor",
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
                    id: "content.hero.subheadlineColor",
                    label: "Subheadline Color",
                    type: "textColor",
                    default: "#f5f0e860",
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
                    default: "Our Legacy",
                },
            ],
        },
        {
            id: "services",
            label: "Services Section",
            fields: [
                {
                    id: "content.sectionStyle.services.bg",
                    label: "Services Background",
                    type: "background",
                    default: "#0d0b0a",
                },
                {
                    id: "content.servicesSection.eyebrow",
                    label: "Services Eyebrow",
                    type: "text",
                    maxLength: 40,
                    default: "Expertise",
                },
                {
                    id: "content.servicesSection.eyebrowColor",
                    label: "Eyebrow Color",
                    type: "textColor",
                    default: "#c9a96e",
                },
                {
                    id: "content.servicesSection.heading",
                    label: "Services Heading",
                    type: "text",
                    maxLength: 60,
                    default: "Specializations",
                },
                {
                    id: "content.servicesSection.headingColor",
                    label: "Heading Color",
                    type: "textColor",
                    default: "#f5f0e8",
                },
                {
                    id: "content.servicesSection.textColor",
                    label: "Service Text Color",
                    type: "textColor",
                    default: "#f5f0e8",
                },
                {
                    id: "content.servicesSection.numberColor",
                    label: "Service Number Color",
                    type: "textColor",
                    default: "#c9a96e",
                },
                {
                    id: "content.services",
                    label: "Services List",
                    type: "array",
                    itemType: "text",
                    maxItems: 8,
                },
            ],
        },
        {
            id: "portfolio",
            label: "Portfolio Section",
            fields: [
                {
                    id: "content.sectionStyle.gallery.bg",
                    label: "Portfolio Background",
                    type: "background",
                    default: "#0a0a0a",
                },
                {
                    id: "content.portfolio.eyebrow",
                    label: "Portfolio Eyebrow",
                    type: "text",
                    maxLength: 40,
                    default: "Portfolio",
                },
                {
                    id: "content.portfolio.heading",
                    label: "Portfolio Heading",
                    type: "text",
                    maxLength: 60,
                    default: "Featured Works",
                },
                {
                    id: "content.portfolio.headingColor",
                    label: "Heading Color",
                    type: "textColor",
                    default: "#f5f0e8",
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
            id: "credentials",
            label: "Awards & Credentials",
            fields: [
                {
                    id: "content.credentials.heading",
                    label: "Section Heading",
                    type: "text",
                    maxLength: 60,
                    default: "Awards & Recognition",
                },
                {
                    id: "content.credentials.items",
                    label: "Credential Items",
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
                    default: "Let's Create Together",
                },
                {
                    id: "content.cta.headingColor",
                    label: "CTA Heading Color",
                    type: "textColor",
                    default: "#f5f0e8",
                },
                {
                    id: "content.cta.body",
                    label: "CTA Subtext",
                    type: "textarea",
                    maxLength: 160,
                    default: "We'd love to discuss your vision",
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
                    default: "Timeless elegance and exceptional craftsmanship",
                },
                {
                    id: "content.footer.textColor",
                    label: "Footer Text Color",
                    type: "textColor",
                    default: "#f5f0e8",
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

export default luxeClassicSchema;
