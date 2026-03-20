/**
 * Reusable section renderers for the template factory.
 * 
 * These functions render each section type (hero, services, gallery, etc.)
 * with styling from a style preset. They're shared across all templates
 * created from different skeleton + style combinations.
 */

import { motion } from "framer-motion";
import SectionBackground, { getBgColor } from "@/templates/shared/SectionBackground";

export function renderHeroSection(content, branding, style, isEditor) {
    const ss = content.sectionStyle ?? {};
    const hero = content.hero ?? {};
    const accent = ss.hero?.accentColor ?? branding?.accentColor ?? style.heroDefaults.accentColor;
    const bg = getBgColor(ss.hero?.bg, style.heroDefaults.bg);
    const textColor = hero.textColor ?? style.heroDefaults.textColor;

    return (
        <div
            className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden ${style.spacing.sectionPadding}`}
            style={{ backgroundColor: bg }}
            data-preview-section="hero"
            data-edit-type="background"
            data-edit-field="content.sectionStyle.hero.bg"
            data-edit-label="Hero Background"
        >
            <SectionBackground value={ss.hero?.bg} />

            <div className="relative z-10 max-w-2xl w-full mx-auto text-center">
                {hero.logo && (
                    <img
                        src={hero.logo}
                        alt="Logo"
                        className="h-10 w-auto mx-auto mb-10 object-contain"
                        data-edit-type="image"
                        data-edit-field="content.hero.logo"
                        data-edit-label="Logo"
                    />
                )}

                {hero.eyebrow && (
                    <p
                        className="text-sm uppercase tracking-widest mb-6 font-semibold"
                        style={{ color: accent }}
                        data-edit-type="text"
                        data-edit-field="content.hero.eyebrow"
                        data-edit-label="Eyebrow"
                    >
                        {hero.eyebrow}
                    </p>
                )}

                <h1
                    className="font-bold tracking-wide leading-snug mb-6"
                    style={{ fontSize: "clamp(2.5rem, 5.5vw, 5.5rem)", color: textColor }}
                    data-edit-type="text"
                    data-edit-field="content.hero.headline"
                    data-edit-label="Headline"
                    data-edit-color-field="content.hero.textColor"
                >
                    {hero.headline}
                </h1>

                {hero.subheadline && (
                    <p
                        className="text-base leading-relaxed max-w-lg mx-auto mb-10"
                        style={{ color: `${textColor}CC` }}
                        data-edit-type="textarea"
                        data-edit-field="content.hero.subheadline"
                        data-edit-label="Subheadline"
                    >
                        {hero.subheadline}
                    </p>
                )}
            </div>
        </div>
    );
}

export function renderServicesSection(content, branding, style, isEditor) {
    const ss = content.sectionStyle ?? {};
    const services = content.services ?? [];
    const servicesSection = content.servicesSection ?? {};
    const accent = ss.services?.accentColor ?? branding?.accentColor ?? style.servicesDefaults.accentColor;
    const bg = getBgColor(ss.services?.bg, style.servicesDefaults.bg);
    const textColor = style.servicesDefaults.textColor;

    return (
        <div
            className={`relative w-full h-full flex flex-col items-center justify-center overflow-auto ${style.spacing.sectionPadding}`}
            style={{ backgroundColor: bg }}
            data-preview-section="services"
            data-edit-type="background"
            data-edit-field="content.sectionStyle.services.bg"
            data-edit-label="Services Background"
        >
            <SectionBackground value={ss.services?.bg} />

            <div className="relative z-10 max-w-4xl w-full mx-auto">
                {servicesSection.title && (
                    <h2
                        className="text-4xl font-bold mb-16 text-center"
                        style={{ color: textColor }}
                        data-edit-type="text"
                        data-edit-field="content.servicesSection.title"
                        data-edit-label="Services Title"
                    >
                        {servicesSection.title}
                    </h2>
                )}

                <div className={`grid md:grid-cols-3 gap-12`}>
                    {services.map((service, idx) => (
                        <div
                            key={idx}
                            className="flex flex-col items-center text-center"
                            data-edit-type="list"
                            data-edit-field="content.services"
                            data-edit-label="Services"
                        >
                            {service.icon && (
                                <div
                                    className="w-16 h-16 rounded-full mb-6 flex items-center justify-center text-2xl"
                                    style={{ backgroundColor: `${accent}20` }}
                                >
                                    {service.icon}
                                </div>
                            )}
                            <h3
                                className="font-bold mb-3"
                                style={{ color: textColor, fontSize: "1.25rem" }}
                                data-edit-type="text"
                                data-edit-field={`content.services[${idx}].title`}
                                data-edit-label="Service Title"
                            >
                                {service.title || service.name}
                            </h3>
                            <p
                                style={{ color: `${textColor}88` }}
                                className="text-sm leading-relaxed"
                                data-edit-type="textarea"
                                data-edit-field={`content.services[${idx}].description`}
                                data-edit-label="Service Description"
                            >
                                {service.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function renderGallerySection(content, branding, style, isEditor) {
    const ss = content.sectionStyle ?? {};
    const gallery = content.gallery ?? [];
    const bg = getBgColor(ss.gallery?.bg, style.galleryDefaults.bg);

    return (
        <div
            className={`relative w-full h-full flex flex-col items-center justify-center overflow-auto ${style.spacing.sectionPadding}`}
            style={{ backgroundColor: bg }}
            data-preview-section="gallery"
            data-edit-type="background"
            data-edit-field="content.sectionStyle.gallery.bg"
            data-edit-label="Gallery Background"
        >
            <SectionBackground value={ss.gallery?.bg} />

            <div className="relative z-10 max-w-6xl w-full mx-auto">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {gallery.map((img, idx) => (
                        <div
                            key={img.id || idx}
                            className="relative aspect-square overflow-hidden rounded-lg"
                            data-edit-type="image"
                            data-edit-field={`content.gallery[${idx}].url`}
                            data-edit-label="Gallery Image"
                        >
                            {img.url ? (
                                <img src={img.url} alt={`Gallery ${idx}`} className="w-full h-full object-cover" />
                            ) : (
                                <div className="w-full h-full bg-gray-300 flex items-center justify-center text-gray-500">
                                    Image {idx + 1}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export function renderAboutSection(content, branding, style, isEditor) {
    const ss = content.sectionStyle ?? {};
    const about = content.about ?? {};
    const bg = getBgColor(ss.about?.bg, style.aboutDefaults.bg);
    const textColor = style.aboutDefaults.textColor;

    return (
        <div
            className={`relative w-full h-full flex flex-col items-center justify-center overflow-auto ${style.spacing.sectionPadding}`}
            style={{ backgroundColor: bg }}
            data-preview-section="about"
            data-edit-type="background"
            data-edit-field="content.sectionStyle.about.bg"
            data-edit-label="About Background"
        >
            <SectionBackground value={ss.about?.bg} />

            <div className="relative z-10 max-w-3xl w-full mx-auto">
                {about.title && (
                    <h2
                        className="text-4xl font-bold mb-8"
                        style={{ color: textColor }}
                        data-edit-type="text"
                        data-edit-field="content.about.title"
                        data-edit-label="About Title"
                    >
                        {about.title}
                    </h2>
                )}
                {about.body && (
                    <p
                        className="text-lg leading-relaxed"
                        style={{ color: `${textColor}CC` }}
                        data-edit-type="textarea"
                        data-edit-field="content.about.body"
                        data-edit-label="About Body"
                    >
                        {about.body}
                    </p>
                )}
            </div>
        </div>
    );
}

export function renderCtaSection(content, branding, style, isEditor) {
    const ss = content.sectionStyle ?? {};
    const cta = content.cta ?? {};
    const accent = ss.cta?.accentColor ?? branding?.accentColor ?? style.ctaDefaults.accentColor;
    const bg = getBgColor(ss.cta?.bg, style.ctaDefaults.bg);
    const textColor = cta.textColor ?? style.ctaDefaults.textColor;

    return (
        <div
            className={`relative w-full h-full flex flex-col items-center justify-center overflow-hidden ${style.spacing.sectionPadding}`}
            style={{ backgroundColor: bg }}
            data-preview-section="cta"
            data-edit-type="background"
            data-edit-field="content.sectionStyle.cta.bg"
            data-edit-label="CTA Background"
        >
            <SectionBackground value={ss.cta?.bg} />

            <div className="relative z-10 max-w-2xl w-full mx-auto text-center">
                <h2
                    className="text-4xl font-bold mb-6"
                    style={{ color: textColor }}
                    data-edit-type="text"
                    data-edit-field="content.cta.label"
                    data-edit-label="CTA Heading"
                >
                    {cta.label || "Ready to get started?"}
                </h2>

                <p
                    className="text-lg mb-10"
                    style={{ color: `${textColor}AA` }}
                    data-edit-type="textarea"
                    data-edit-field="content.cta.description"
                    data-edit-label="CTA Description"
                >
                    {cta.description}
                </p>

                <a
                    href={isEditor ? undefined : (cta.href || "#")}
                    className={`inline-flex items-center gap-3 px-8 py-4 font-bold ${style.components.buttonStyle} ${style.components.buttonHover}`}
                    style={{ color: textColor, borderColor: accent }}
                    data-edit-type="text"
                    data-edit-field="content.cta.buttonText"
                    data-edit-label="CTA Button Text"
                >
                    {cta.buttonText || "Contact Us"}
                </a>
            </div>
        </div>
    );
}

/**
 * Map section IDs to renderer functions.
 */
export const SECTION_RENDERERS = {
    hero: renderHeroSection,
    services: renderServicesSection,
    gallery: renderGallerySection,
    about: renderAboutSection,
    cta: renderCtaSection,
};
