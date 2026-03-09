import Link from "next/link";
import sites from "@/data/mock/sites.json";

export default function DashboardHome() {
    return (
        <div className="space-y-10">

            {/* Header */}
            <div>
                <h1 className="text-3xl font-semibold">Your Sites</h1>
                <p className="text-sm text-neutral-400 mt-2">
                    Manage and edit your website templates.
                </p>
            </div>

            <Link
                href="/app/new-site"
                className="inline-flex items-center rounded-full bg-white px-6 py-3 text-sm font-medium text-black hover:scale-[1.05] transition"
            >
                Choose A New Template
            </Link>

            {/* Grid */}
            <div className="grid gap-8 md:grid-cols-2 xl:grid-cols-3">

                {sites.map((site) => (
                    <div
                        key={site.id}
                        className="group overflow-hidden rounded-2xl border border-white/10 bg-neutral-900 transition hover:border-white/20 hover:bg-neutral-800"
                    >

                        {/* Live Preview */}
                        <div className="relative h-[200px] w-full overflow-hidden border-b border-white/10 bg-black">

                            <iframe
                                src={`/sites/${site.subdomain}`}
                                className="pointer-events-none scale-[0.35] origin-top-left w-[285%] h-[285%]"
                            />

                        </div>

                        {/* Card Content */}
                        <div className="p-6">

                            <h2 className="text-lg font-medium">
                                {site.name}
                            </h2>

                            <p className="text-sm text-neutral-400 mt-1">
                                Template: {site.templateKey}
                            </p>

                            {/* Actions */}
                            <div className="mt-6 flex gap-3">

                                <Link
                                    href={`/app/sites/${site.id}`}
                                    className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition hover:scale-[1.05]"
                                >
                                    Edit
                                </Link>

                                <Link
                                    href={`/sites/${site.subdomain}`}
                                    className="rounded-full border border-white/20 px-6 py-2 text-sm font-medium text-white transition hover:bg-white/10"
                                >
                                    View
                                </Link>

                            </div>

                        </div>

                    </div>
                ))}

            </div>

        </div>
    );
}