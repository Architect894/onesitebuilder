import Link from "next/link";

export default function MarketingPage() {
    return (
        <main className="p-10">
            <h1 className="text-3xl font-bold">OneSite Builder</h1>

            <div className="mt-8 space-y-4">
                <Link
                    href="/app"
                    className="block rounded-lg bg-black px-6 py-3 text-white w-fit"
                >
                    Go to Dashboard
                </Link>

                <Link
                    href="/sites/luxe"
                    className="block rounded-lg border px-6 py-3 w-fit"
                >
                    View Public Demo Site
                </Link>

                <Link
                    href="/admin"
                    className="block rounded-lg border px-6 py-3 w-fit"
                >
                    Admin
                </Link>
            </div>
        </main>
    );
}