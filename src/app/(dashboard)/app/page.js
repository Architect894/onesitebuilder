import Link from "next/link";

export default function DashboardPage() {
    return (
        <main className="p-10">
            <h1 className="text-3xl font-semibold">Dashboard</h1>

            <div className="mt-6 space-y-4">
                <Link
                    href="/app/sites/site_001"
                    className="block rounded-lg bg-black px-6 py-3 text-white w-fit"
                >
                    Edit Site 001
                </Link>

                <Link
                    href="/"
                    className="block rounded-lg border px-6 py-3 w-fit"
                >
                    Back to Marketing
                </Link>
            </div>
        </main>
    );
}