import "./globals.css";
import Link from "next/link";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <nav className="flex gap-6 border-b px-8 py-4">
          <Link href="/">Home</Link>
          <Link href="/app">Dashboard</Link>
          <Link href="/sites/luxe">Demo Site</Link>
          <Link href="/admin">Admin</Link>
        </nav>

        {children}
      </body>
    </html>
  );
}