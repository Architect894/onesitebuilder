import { requireAdmin } from "@/lib/auth/guards";
import { getCollection } from "@/lib/db";
import { serializeUser } from "@/lib/serializers/site";
import Link from "next/link";

export default async function AdminTenantsPage() {
    const { error } = await requireAdmin();
    if (error) return <div className="p-8 text-red-400">Forbidden</div>;

    const users = await getCollection("users");
    const docs = await users.find({}, { projection: { passwordHash: 0 } }).sort({ createdAt: -1 }).toArray();
    const items = docs.map(serializeUser);

    return (
        <main className="p-8 text-white">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Tenants</h1>
                <Link href="/admin" className="text-sm text-neutral-400 hover:text-white transition">← Back</Link>
            </div>
            <div className="space-y-3">
                {items.map((u) => (
                    <div key={u.id} className="flex items-center justify-between bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3">
                        <div>
                            <p className="font-medium">{u.name || "(no name)"}</p>
                            <p className="text-xs text-neutral-500">{u.email} · {u.role}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
