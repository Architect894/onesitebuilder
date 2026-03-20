import Link from "next/link";
import { requireUser } from "@/lib/auth/guards";
import LogoutButton from "@/components/LogoutButton";

export default async function DashboardLayout({ children }) {
    const { user } = await requireUser();

    return (
        <div
            className="min-h-screen text-white"
            style={{
                background: `
                    radial-gradient(circle at top left, rgba(58, 48, 88, 0.08), transparent 35%),
                    radial-gradient(circle at bottom right, rgba(58, 48, 88, 0.06), transparent 40%),
                    linear-gradient(135deg, #0a0810 0%, #140f1e 50%, #1e1830 100%)`
            }}
        >
            {/* Dashboard header */}
            <div className="sticky top-0 z-40 border-b border-blush-300/15 bg-midnight-950/80 backdrop-blur-xl">
                <div className="mx-auto max-w-7xl px-4 sm:px-6 py-4 flex justify-between items-center">
                    {/* Brand */}
                    <Link href="/" className="flex items-center gap-3 group">
                        <img
                            src="/SimplePeekTransparentWhite.png"
                            alt="SimplePeek"
                            className="h-8 w-auto opacity-90 group-hover:opacity-100 transition"
                        />
                    </Link>

                    {/* User + actions */}
                    <div className="flex items-center gap-5">
                        {user && (
                            <div className="text-right hidden sm:block">
                                <div className="text-sm font-medium text-gray-100">{user.name || user.email}</div>
                                {user.name && (
                                    <div className="text-xs text-blush-400/50">{user.email}</div>
                                )}
                            </div>
                        )}
                        <div className="w-px h-6 bg-blush-300/20 hidden sm:block" />
                        <LogoutButton />
                    </div>
                </div>
            </div>

            <div className="mx-auto max-w-7xl px-4 sm:px-6 py-6 sm:py-10">
                {children}
            </div>

        </div>
    );
}