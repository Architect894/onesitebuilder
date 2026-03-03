import "./globals.css";

export const metadata = {
  title: "OnePageSite",
  description: "SaaS template builder foundation",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}