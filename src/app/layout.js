import "./globals.css";
import Link from "next/link";
import PageTransition from "@/components/ui/PageTransition";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-black text-white antialiased`}>

        <NoiseOverlay />

        <nav className="sticky top-0 z-50 border-b border-white/10 bg-black/70 backdrop-blur-xl">
          <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">

            <Link href="/" className="text-sm font-semibold tracking-wider">
              OneSite
            </Link>

            <div className="flex gap-6 text-sm text-neutral-400">
              <Link href="/" className="hover:text-white transition-colors">
                Home
              </Link>
              <Link href="/login" className="hover:text-white transition-colors">
                Log In
              </Link>
              <Link href="/signup" className="hover:text-white transition-colors">
                Sign Up
              </Link>
              <Link
                href="/app"className="hover:text-white transition-colors">
                Dashboard
              </Link>
            </div>

          </div>
        </nav>

        <PageTransition>
          {children}
        </PageTransition>

      </body>
    </html>
  );
}