import Link from "next/link";
import sites from "@/data/mock/sites.json";

const site = sites[0];

export default function DashboardHome() {
    return (
        <div className="space-y-8">

            <h1 className="text-2xl font-semibold">Your Sites</h1>

            <div className="rounded-2xl border border-white/10 bg-neutral-900 p-6">
                <h2 className="text-lg font-medium">Site 001</h2>

                <div className="mt-4 flex gap-4">
                    <Link
                        href="/app/sites/site_001"
                        className="rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition hover:scale-[1.05]"
                    >
                        Edit Site
                    </Link>

                    <Link
                        href="/sites/luxe"
                        className="rounded-full border border-white/20 px-6 py-2 text-sm font-medium text-white hover:bg-white/10 transition"
                    >
                        View Live
                    </Link>
                </div>
            </div>

        </div>
    );
}