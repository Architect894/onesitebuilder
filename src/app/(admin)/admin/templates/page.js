import { requireAdmin } from "@/lib/auth/guards";
import { getCollection } from "@/lib/db";
import { serializeTemplate } from "@/lib/serializers/site";
import Link from "next/link";

export default async function AdminTemplatesPage() {
    const { error } = await requireAdmin();
    if (error) return <div className="p-8 text-red-400">Forbidden</div>;

    const templates = await getCollection("templates");
    const docs = await templates.find({}).sort({ createdAt: -1 }).toArray();
    const items = docs.map(serializeTemplate);

    return (
        <main className="p-8 text-white">
            <div className="flex items-center justify-between mb-6">
                <h1 className="text-2xl font-bold">Templates</h1>
                <Link href="/admin" className="text-sm text-neutral-400 hover:text-white transition">← Back</Link>
            </div>
            <div className="space-y-3">
                {items.map((t) => (
                    <div key={t.id} className="flex items-center justify-between bg-neutral-900 border border-neutral-700 rounded-lg px-4 py-3">
                        <div>
                            <p className="font-medium">{t.name}</p>
                            <p className="text-xs text-neutral-500">{t.key} · v{t.version} · {t.isActive ? "active" : "inactive"}</p>
                        </div>
                    </div>
                ))}
            </div>
        </main>
    );
}
