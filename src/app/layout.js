import "./globals.css";
import PageTransition from "@/components/ui/PageTransition";
import NoiseOverlay from "@/components/ui/NoiseOverlay";
import { Poppins } from "next/font/google";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export default async function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${poppins.className} bg-gradient-to-br from-gray-800 via-gray-850 to-gray-800 text-gray-100 antialiased overflow-x-hidden`}>

        <NoiseOverlay />

        <PageTransition>
          {children}
        </PageTransition>

      </body>
    </html>
  );
}