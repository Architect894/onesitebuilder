export default function LuxePhotoTemplate({
    site,
    branding,
    content,
    links,
}) {
    return (
        <main className="min-h-screen bg-white text-neutral-900">
            <section
                data-preview-section="hero"
                className="border-b border-neutral-200 px-6 py-24"
            >
                <div className="mx-auto max-w-6xl">
                    <p
                        className="text-sm uppercase tracking-[0.25em]"
                        style={{ color: branding.accentColor }}
                    >
                        {content.hero.eyebrow}
                    </p>

                    <h1 className="mt-6 max-w-4xl text-5xl font-semibold tracking-tight sm:text-7xl">
                        {content.hero.headline}
                    </h1>

                    <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
                        {content.hero.subheadline}
                    </p>

                    <div className="mt-10">
                        <a
                            href={content.cta.href}
                            className="inline-flex rounded-full px-6 py-3 text-sm font-medium text-white transition-transform duration-300 hover:scale-[1.02]"
                            style={{ backgroundColor: branding.primaryColor }}
                        >
                            {content.cta.label}
                        </a>
                    </div>
                </div>
            </section>

            <section data-preview-section="about" className="px-6 py-20">
                <div className="mx-auto grid max-w-6xl gap-12 md:grid-cols-2">
                    <div>
                        <h2 className="text-3xl font-semibold">{content.about.title}</h2>
                        <p className="mt-4 text-lg leading-8 text-neutral-600">
                            {content.about.body}
                        </p>
                    </div>

                    <div
                        className="rounded-3xl p-8"
                        style={{ background: branding.neutralColor }}
                    >
                        <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                            Services
                        </p>
                        <ul className="mt-6 space-y-4 text-lg">
                            {content.services.map((service) => (
                                <li key={service}>{service}</li>
                            ))}
                        </ul>
                    </div>
                </div>
            </section>

            <section data-preview-section="gallery" className="px-6 py-20">
                <div className="mx-auto max-w-6xl">
                    <div className="mb-8 flex items-end justify-between gap-6">
                        <div>
                            <p className="text-sm uppercase tracking-[0.2em] text-neutral-500">
                                Gallery
                            </p>
                            <h2 className="mt-3 text-3xl font-semibold">Recent moments</h2>
                        </div>

                        <div className="text-sm text-neutral-500">{site.name}</div>
                    </div>

                    <div className="grid gap-6 md:grid-cols-3">
                        {content.gallery.map((image) => (
                            <div key={image.id} className="overflow-hidden rounded-3xl">
                                <img
                                    src={image.url}
                                    alt={site.name}
                                    className="h-[320px] w-full object-cover"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            <footer className="border-t border-neutral-200 px-6 py-10">
                <div className="mx-auto flex max-w-6xl flex-col gap-4 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
                    <p>{site.name}</p>
                    <div className="flex gap-4">
                        <a href={links.instagram}>Instagram</a>
                        <a href={links.facebook}>Facebook</a>
                        <a href={links.tiktok}>TikTok</a>
                    </div>
                </div>
            </footer>
        </main>
    );
}