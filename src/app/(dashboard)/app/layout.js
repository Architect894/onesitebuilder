import Link from "next/link";

export default function DashboardLayout({ children }) {
    return (
        <div className="min-h-screen bg-black text-white">

            <div className="border-b border-white/10 px-6 py-4 flex justify-between">
                <div className="font-semibold">Dashboard</div>
                <Link href="/" className="text-sm text-neutral-400 hover:text-white">
                    Back to Site
                </Link>
            </div>

            <div className="p-10">
                {children}
            </div>

        </div>
    );
}