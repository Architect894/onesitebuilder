import AnimatedNav from "@/components/layout/AnimatedNav";
import { getCurrentSession } from "@/lib/auth/guards";

export default async function MarketingLayout({ children }) {
    const session = await getCurrentSession();

    return (
        <>
            <AnimatedNav user={session} />
            {children}
        </>
    );
}
