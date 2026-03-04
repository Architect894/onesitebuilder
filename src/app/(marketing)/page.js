export default function MarketingPage() {
    return (
        <main className="bg-black text-white">

            {/* HERO */}
            <section className="relative overflow-hidden py-36 bg-gradient-to-b from-black to-neutral-950">
                <div className="mx-auto max-w-6xl px-6 text-center">

                    <h1 className="text-5xl sm:text-7xl font-semibold tracking-[-0.02em] leading-tight">
                        A website so clear,
                        <span className="block text-neutral-400">
                            your client understands you instantly.
                        </span>
                    </h1>

                    <p className="mt-8 max-w-2xl mx-auto text-lg text-neutral-400 leading-relaxed">
                        OneSite creates beautiful one‑page websites designed for service businesses.
                        No clutter. No complexity. Just clarity and conversion.
                    </p>

                    <div className="mt-12 flex justify-center gap-6">
                        <a
                            href="/signup"
                            className="rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition hover:scale-[1.05]"
                        >
                            Start Free Trial
                        </a>

                        <a
                            href="#how-it-works"
                            className="rounded-full border border-white/20 px-8 py-4 text-sm font-medium text-white transition hover:bg-white/10"
                        >
                            See How It Works
                        </a>
                    </div>

                </div>
            </section>


            {/* POSITIONING SECTION */}
            <section className="py-28 border-b border-white/10 bg-black">
                <div className="mx-auto max-w-4xl px-6 text-center">

                    <h2 className="text-3xl font-semibold">
                        This isn’t Wix.
                    </h2>

                    <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
                        You don’t need 15 pages. You don’t need dropdown menus.
                        You need a clear message, strong visuals, and a single call to action.
                    </p>

                    <p className="mt-6 text-lg text-neutral-400 leading-relaxed">
                        One page. Structured. Focused. Designed to convert.
                    </p>

                </div>
            </section>


            {/* WHO IT'S FOR */}
            <section className="py-28 border-b border-white/10 bg-neutral-950">
                <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-3 gap-12 text-center">

                    <div>
                        <h3 className="text-xl font-semibold">Photo Booth Rentals</h3>
                        <p className="mt-4 text-neutral-400">
                            Show packages. Show gallery. Get booked.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold">Event Services</h3>
                        <p className="mt-4 text-neutral-400">
                            Make your offer crystal clear in seconds.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-xl font-semibold">Local Businesses</h3>
                        <p className="mt-4 text-neutral-400">
                            Stop overcomplicating your website.
                        </p>
                    </div>

                </div>
            </section>


            {/* HOW IT WORKS */}
            <section id="how-it-works" className="py-28 border-b border-white/10 bg-black">
                <div className="mx-auto max-w-6xl px-6 text-center">

                    <h2 className="text-3xl font-semibold">
                        Launch in minutes.
                    </h2>

                    <div className="mt-16 grid md:grid-cols-3 gap-12">

                        <div>
                            <div className="text-4xl font-semibold text-neutral-500">01</div>
                            <h3 className="mt-4 text-xl font-semibold">Choose a template</h3>
                            <p className="mt-4 text-neutral-400">
                                Professionally designed layouts built for conversion.
                            </p>
                        </div>

                        <div>
                            <div className="text-4xl font-semibold text-neutral-500">02</div>
                            <h3 className="mt-4 text-xl font-semibold">Customize your content</h3>
                            <p className="mt-4 text-neutral-400">
                                Edit text, colors, and images in seconds.
                            </p>
                        </div>

                        <div>
                            <div className="text-4xl font-semibold text-neutral-500">03</div>
                            <h3 className="mt-4 text-xl font-semibold">Publish & get booked</h3>
                            <p className="mt-4 text-neutral-400">
                                Your site goes live instantly.
                            </p>
                        </div>

                    </div>

                </div>
            </section>


            {/* PRICING */}
            <section className="py-28 bg-neutral-950 text-center">
                <div className="mx-auto max-w-3xl px-6">

                    <h2 className="text-3xl font-semibold">
                        Simple pricing.
                    </h2>

                    <p className="mt-6 text-neutral-400">
                        One flat monthly rate. Hosting included.
                    </p>

                    <div className="mt-12 text-6xl font-semibold">
                        $19<span className="text-xl text-neutral-400">/month</span>
                    </div>

                    <div className="mt-10">
                        <a
                            href="/signup"
                            className="rounded-full bg-white px-10 py-4 text-sm font-medium text-black transition hover:scale-[1.05]"
                        >
                            Start Free Trial
                        </a>
                    </div>

                </div>
            </section>


            {/* FINAL CTA */}
            <section className="py-28 bg-black text-center">
                <div className="mx-auto max-w-3xl px-6">

                    <h2 className="text-4xl font-semibold">
                        Build once. Convert forever.
                    </h2>

                    <p className="mt-6 text-neutral-400">
                        Stop building websites. Start building clarity.
                    </p>

                    <div className="mt-10">
                        <a
                            href="/signup"
                            className="rounded-full bg-white px-8 py-4 text-sm font-medium text-black transition hover:scale-[1.05]"
                        >
                            Get Started
                        </a>
                    </div>

                </div>
            </section>

        </main>
    );
}