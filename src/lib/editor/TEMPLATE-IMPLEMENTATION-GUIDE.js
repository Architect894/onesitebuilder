/**
 * TEMPLATE IMPLEMENTATION GUIDE
 * 
 * This file demonstrates the best practices for implementing
 * the universal editing system in templates.
 * 
 * Key principles:
 * 1. Every editable element has data-edit-type and data-edit-field
 * 2. Elements provide visual feedback (hover states, cursor changes)
 * 3. Default values prevent empty states in editor
 * 4. Background edits use hidden elements
 * 5. Arrays use data-edit-group for batch editing
 */

"use client";

import { editableProps, getEditableClassName } from "@/lib/editor/editable-helpers";
import FadeIn from "@/components/ui/FadeIn";
import { motion } from "framer-motion";

/**
 * EXAMPLE: Hero Section with Multiple Editable Elements
 */
export function HeroSectionExample({
    content,
    sectionStyle,
    branding,
    isEditor = false,
}) {
    const heroAccent = sectionStyle.hero?.accentColor ?? branding.primaryColor;
    const heroText = content.hero?.textColor ?? "#ffffff";
    const heroBg = sectionStyle.hero?.bg ?? "#000000";

    return (
        <section
            className="relative py-32 border-b border-white/10"
            style={{ backgroundColor: heroBg }}
        >
            {/* ─── BACKGROUND EDITING ─────────────────────────────────────── */}
            {/* Hidden element for editing section background */}
            {isEditor && (
                <div
                    {...editableProps('background', 'content.sectionStyle.hero.bg', 'Hero Background')}
                    style={{ display: 'none' }}
                />
            )}

            {/* ─── ACCENT LINE ──────────────────────────────────────────── */}
            <div
                className="absolute left-0 top-0 bottom-0 w-1"
                style={{ backgroundColor: heroAccent }}
            />

            <div className="mx-auto max-w-7xl px-6">
                {/* ─── EYEBROW TEXT ─────────────────────────────────────── */}
                <FadeIn>
                    <p
                        {...editableProps('text', 'content.hero.eyebrow', 'Eyebrow')}
                        className={getEditableClassName('text', 'text-xs uppercase tracking-[0.4em] mb-4 font-semibold')}
                        style={{ color: heroAccent }}
                    >
                        {content.hero?.eyebrow ?? 'Add your eyebrow text'}
                    </p>
                </FadeIn>

                {/* ─── HEADLINE ─────────────────────────────────────────── */}
                <FadeIn delay={0.1}>
                    <h1
                        {...editableProps('text', 'content.hero.headline', 'Headline')}
                        className={getEditableClassName('text', 'text-6xl md:text-7xl font-bold leading-tight mb-6')}
                        style={{ color: heroText }}
                    >
                        {content.hero?.headline ?? 'Your Headline Here'}
                    </h1>
                </FadeIn>

                {/* ─── SUBHEADLINE ──────────────────────────────────────── */}
                <FadeIn delay={0.2}>
                    <p
                        {...editableProps('textarea', 'content.hero.subheadline', 'Subheadline')}
                        className={getEditableClassName('text', 'text-lg leading-relaxed mb-10 max-w-lg')}
                        style={{ color: 'rgba(255,255,255,0.75)' }}
                    >
                        {content.hero?.subheadline ?? 'Add your subheadline text here'}
                    </p>
                </FadeIn>

                {/* ─── CTA BUTTON ───────────────────────────────────────── */}
                <FadeIn delay={0.3}>
                    <motion.a
                        href={isEditor ? "#" : content.cta?.href}
                        onClick={(e) => { if (isEditor) e.preventDefault(); }}
                        whileHover={{ scale: 1.06, x: 4 }}
                        className={getEditableClassName('text', 'inline-block px-8 py-3 bg-blue-600 text-white rounded font-semibold')}
                        {...editableProps('text', 'content.cta.label', 'Button Text')}
                    >
                        {content.cta?.label ?? 'Get Started'}
                    </motion.a>
                </FadeIn>
            </div>
        </section>
    );
}

/**
 * EXAMPLE: Services List Section
 */
export function ServicesSectionExample({ content, isEditor = false }) {
    return (
        <section className="py-20 bg-neutral-900">
            <div className="mx-auto max-w-5xl px-6">
                {/* ─── SECTION HEADER ───────────────────────────────────── */}
                <div className="mb-16">
                    <p
                        {...editableProps('text', 'content.servicesSection.eyebrow', 'Section Eyebrow')}
                        className={getEditableClassName('text', 'text-sm uppercase tracking-widest text-blue-400 mb-3')}
                    >
                        {content.servicesSection?.eyebrow ?? 'Our Services'}
                    </p>
                    <h2
                        {...editableProps('text', 'content.servicesSection.heading', 'Section Heading')}
                        className={getEditableClassName('text', 'text-4xl font-bold text-white')}
                    >
                        {content.servicesSection?.heading ?? 'What We Offer'}
                    </h2>
                </div>

                {/* ─── SERVICES LIST ────────────────────────────────────── */}
                <div
                    {
                        /* For lists, use a container with data-edit-type="list" */
                        ...editableProps('list', 'content.services', 'Services List')
                    }
                    className="grid md:grid-cols-3 gap-6"
                >
                    {content.services?.map((service, idx) => (
                        <div
                            key={idx}
                            data-edit-group="services"
                            className="p-6 border border-neutral-700 rounded-lg hover:border-blue-500 transition"
                        >
                            {/* Icons, images, etc. */}
                            <h3
                                {...editableProps('text', `content.services[${idx}].title`, 'Service Title')}
                                className={getEditableClassName('text', 'text-xl font-semibold text-white mb-3')}
                            >
                                {service.title ?? 'Service title'}
                            </h3>
                            <p
                                {...editableProps('textarea', `content.services[${idx}].description`, 'Service Description')}
                                className={getEditableClassName('text', 'text-neutral-300')}
                            >
                                {service.description ?? 'Service description'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * EXAMPLE: Gallery/Portfolio Section with Images
 */
export function GallerySectionExample({ content, sectionStyle, isEditor = false }) {
    return (
        <section
            className="py-20"
            style={{ backgroundColor: sectionStyle.gallery?.bg ?? '#000000' }}
        >
            {/* Background editor */}
            {isEditor && (
                <div
                    {...editableProps('background', 'content.sectionStyle.gallery.bg', 'Gallery Background')}
                    style={{ display: 'none' }}
                />
            )}

            <div className="mx-auto max-w-6xl px-6">
                {/* Section title */}
                <h2
                    {...editableProps('text', 'content.gallerySection.heading', 'Gallery Heading')}
                    className={getEditableClassName('text', 'text-4xl font-bold text-white text-center mb-12')}
                >
                    {content.gallerySection?.heading ?? 'Gallery'}
                </h2>

                {/* Gallery grid */}
                <div className="grid md:grid-cols-3 gap-6">
                    {content.gallery?.map((item, idx) => (
                        <div
                            key={idx}
                            data-edit-group="gallery"
                            className="overflow-hidden rounded-lg"
                        >
                            <img
                                {...editableProps('image', `content.gallery[${idx}].image`, 'Gallery Image')}
                                src={item.image ?? '/placeholder.jpg'}
                                alt={item.title}
                                className={getEditableClassName('image', 'w-full h-48 object-cover')}
                            />
                            <p
                                {...editableProps('text', `content.gallery[${idx}].title`, 'Image Title')}
                                className={getEditableClassName('text', 'p-4 text-white font-semibold')}
                            >
                                {item.title ?? 'Image title'}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}

/**
 * EXAMPLE: Section with Color-Editable Text
 */
export function AboutSectionExample({
    content,
    sectionStyle,
    isEditor = false,
}) {
    const aboutHeadingColor = content.about?.headingColor ?? '#ffffff';
    const aboutBodyColor = content.about?.bodyColor ?? '#d4d4d4';

    return (
        <section
            className="py-20"
            style={{ backgroundColor: sectionStyle.about?.bg ?? '#1a1a1a' }}
        >
            {isEditor && (
                <div
                    {...editableProps('background', 'content.sectionStyle.about.bg', 'About Background')}
                    style={{ display: 'none' }}
                />
            )}

            <div className="mx-auto max-w-3xl px-6">
                {/* ─── HEADING WITH COLOR EDITING ──────────────────────── */}
                <h2
                    {...editableProps('text', 'content.about.heading', 'Heading')}
                    className={getEditableClassName('text', 'text-3xl font-bold mb-6')}
                    style={{ color: aboutHeadingColor }}
                >
                    {content.about?.heading ?? 'About Us'}
                </h2>

                {/* Color editor for heading */}
                {isEditor && (
                    <div
                        {...editableProps('color', 'content.about.headingColor', 'Heading Color')}
                        style={{ display: 'none' }}
                    />
                )}

                {/* ─── BODY TEXT WITH COLOR EDITING ────────────────────── */}
                <p
                    {...editableProps('textarea', 'content.about.body', 'Body Text')}
                    className={getEditableClassName('text', 'mb-6 leading-relaxed')}
                    style={{ color: aboutBodyColor }}
                >
                    {content.about?.body ?? 'Add your content here'}
                </p>

                {/* Color editor for body text */}
                {isEditor && (
                    <div
                        {...editableProps('color', 'content.about.bodyColor', 'Body Text Color')}
                        style={{ display: 'none' }}
                    />
                )}
            </div>
        </section>
    );
}

/**
 * KEY PATTERNS TO FOLLOW:
 * 
 * 1. TEXT ELEMENTS
 *    - Use data-edit-type="text" for single-line editable content
 *    - Add cursor-text and hover:opacity-80 for visual feedback
 *    - Always provide a default value
 * 
 * 2. MULTI-LINE TEXT
 *    - Use data-edit-type="textarea" for paragraphs/descriptions
 *    - Support markdown or rich text formatting if needed
 *    - Default to empty string, show placeholder in editor
 * 
 * 3. COLORS
 *    - Use data-edit-type="color" for text/accent colors
 *    - Create hidden divs for colors that don't have visible elements
 *    - Example: background colors, accent colors not displayed as text
 * 
 * 4. BACKGROUNDS
 *    - Use data-edit-type="background" for section backgrounds
 *    - Create hidden element with display: none
 *    - Apply backgroundColor or backgroundImage to section
 * 
 * 5. IMAGES
 *    - Use data-edit-type="image" on img elements
 *    - Provide fallback/placeholder images
 *    - Use cursor-pointer to indicate editability
 * 
 * 6. LISTS/ARRAYS
 *    - Use data-edit-type="list" on container
 *    - Add data-edit-group="field-name" to list items
 *    - Use array indices in data-edit-field: content.services[0].title
 * 
 * 7. EDITOR MODE
 *    - Check isEditor prop to conditionally render edit controls
 *    - Add placeholder text when fields are empty
 *    - Disable default link behaviors in editor mode
 * 
 * 8. ACCESSIBILITY
 *    - Maintain semantic HTML (h1, h2, p, etc.)
 *    - Use proper ARIA attributes
 *    - Ensure keyboard navigation works
 */
