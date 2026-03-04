import FadeIn from "@/components/ui/FadeIn";

export default function LuxePhotoTemplate({
    site,
    branding,
    content,
    links,
}) {
    return (
        <main className="bg-black text-white">

            {/* HERO */}
            <section
                data-preview-section="hero"
                className="relative overflow-hidden border-b border-white/10 py-48"
            >
                {/* Soft radial glow */}
                <div
                    className="pointer-events-none absolute inset-0"
                    style={{
                        background: `radial-gradient(circle at 25% 40%, ${branding.primaryColor}22, transparent 65%)`,
                    }}
                />

                <div className="mx-auto max-w-6xl px-6">

                    <div className="grid md:grid-cols-2 gap-20 items-center">

                        {/* LEFT — LOGO (dominant, calm) */}
                        <FadeIn delay={0.05}>
                            <div className="flex justify-center md:justify-start">
                                <img
                                    src={content.hero.logo}
                                    alt={site.name}
                                    className="w-56 md:w-72 lg:w-80 object-contain opacity-95"
                                />
                            </div>
                        </FadeIn>

                        {/* RIGHT — TEXT (lighter visual weight) */}
                        <div className="max-w-xl">

                            <FadeIn delay={0.15}>
                                <p
                                    className="text-xs uppercase tracking-[0.35em] text-neutral-500"
                                    style={{ color: branding.accentColor }}
                                >
                                    {content.hero.eyebrow}
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.25}>
                                <h1 className="mt-8 text-4xl md:text-5xl font-semibold tracking-tight leading-[1.15]">
                                    {content.hero.headline}
                                </h1>
                            </FadeIn>

                            <FadeIn delay={0.35}>
                                <p className="mt-8 text-base md:text-lg text-neutral-400 leading-relaxed">
                                    {content.hero.subheadline}
                                </p>
                            </FadeIn>

                            <FadeIn delay={0.45}>
                                <div className="mt-8">
                                    <a
                                        href={content.cta.href}
                                        className="group relative inline-flex items-center justify-center overflow-hidden rounded-full px-10 py-4 text-sm font-medium transition-colors duration-500"
                                        style={{
                                            backgroundColor: branding.primaryColor,
                                            color: "white",
                                        }}
                                    >

                                        {/* Continuous Sheen */}
                                        <span className="pointer-events-none absolute inset-0 overflow-hidden rounded-full">
                                            <span className="sheen absolute top-0 h-full w-1/3 bg-gradient-to-r from-transparent via-white/15 to-transparent" />
                                        </span>

                                        {/* Center Burst Layer */}
                                        <span
                                            className="absolute inset-0 flex items-center justify-center pointer-events-none"
                                        >
                                            <span
                                                className="absolute h-0 w-0 rounded-full bg-white/20 opacity-0 transition-all duration-500 ease-[cubic-bezier(.22,1,.36,1)] group-hover:h-[300%] group-hover:w-[300%] group-hover:opacity-100"
                                            />
                                        </span>

                                        {/* Text */}
                                        <span className="relative z-10">
                                            {content.cta.label}
                                        </span>

                                    </a>
                                </div>
                            </FadeIn>

                        </div>

                    </div>

                </div>
            </section>

            {/* ABOUT */}
            <section
                data-preview-section="about"
                className="relative border-b border-white/10 py-28 bg-gradient-to-b from-neutral-950 to-black"
            >
                <div className="mx-auto grid max-w-6xl gap-16 px-6 md:grid-cols-2">

                    <FadeIn>
                        <div>
                            <h2 className="text-3xl font-semibold tracking-tight">
                                {content.about.title}
                            </h2>
                            <p className="mt-6 text-lg leading-relaxed text-neutral-400">
                                {content.about.body}
                            </p>
                        </div>
                    </FadeIn>

                    <FadeIn delay={0.1}>
                        <div className="rounded-3xl border border-white/10 bg-neutral-900 p-10"
                            style={{
                                backgroundColor: branding.neutralColor,
                                color: "white",
                            }}>
                            <p className="text-md uppercase tracking-[0.25em] text-white">
                                Services
                            </p>

                            <ul className="mt-8 space-y-4 text-lg"
                            >
                                {content.services.map((service) => (
                                    <li
                                        key={service}
                                        className="border-b border-white/5 pb-4"
                                    >
                                        {service}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </FadeIn>
                </div>
            </section>

            {/* GALLERY */}
            <section
                data-preview-section="gallery"
                className="relative border-b border-white/10 py-28 bg-gradient-to-b from-black to-neutral-950"
            >
                <div className="mx-auto max-w-6xl px-6">

                    <FadeIn>
                        <div className="mb-14">
                            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">
                                Gallery
                            </p>
                            <h2 className="mt-4 text-4xl font-semibold tracking-tight">
                                Recent moments
                            </h2>
                        </div>
                    </FadeIn>

                    <div className="grid gap-8 md:grid-cols-3">
                        {content.gallery.map((image) => (
                            <div
                                key={image.id}
                                className="group relative overflow-hidden rounded-3xl border border-white/10 bg-neutral-900 transition-all duration-500 hover:-translate-y-1 hover:shadow-2xl"
                            >
                                <img
                                    src={image.url}
                                    alt={site.name}
                                    className="h-[340px] w-full object-cover transition-transform duration-700 ease-[cubic-bezier(.22,1,.36,1)] group-hover:scale-105"
                                />
                            </div>
                        ))}
                    </div>
                </div>
            </section>

            {/* FOOTER */}
            <footer className="py-16 bg-black">
                <div className="mx-auto flex max-w-6xl flex-col gap-6 px-6 text-sm text-neutral-500 md:flex-row md:items-center md:justify-between">
                    <p>{site.name}</p>
                    <div className="flex gap-6">
                        <a href={links.instagram} className="hover:text-white transition-colors">
                            Instagram
                        </a>
                        <a href={links.facebook} className="hover:text-white transition-colors">
                            Facebook
                        </a>
                        <a href={links.tiktok} className="hover:text-white transition-colors">
                            TikTok
                        </a>
                    </div>
                </div>
            </footer>

        </main>
    );
}