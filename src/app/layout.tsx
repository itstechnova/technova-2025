import type { Metadata } from "next";
import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

const poppinsFont = Poppins({
  weight: ["500", "600", "700"],
  subsets: ["latin"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "TechNova 2025",
  description: "made with love by the TechNova team",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${poppinsFont.variable} ${geistSans.variable} ${geistMono.variable} antialiased`}
      >
		{/* MLH Trust Badge */}
        <a
          id="mlh-trust-badge"
          href="https://mlh.io/na?utm_source=na-hackathon&utm_medium=TrustBadge&utm_campaign=2026-season&utm_content=white"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "block",
            maxWidth: "120px",
            minWidth: "80px",
            position: "absolute", // change to "absolute" since you want it to scroll with the page
            right: "70px",
            top: "0",
            width: "10%",
            zIndex: 10000,
          }}
        >
          <img
            src="https://s3.amazonaws.com/logged-assets/trust-badge/2026/mlh-trust-badge-2026-white.svg"
            alt="Major League Hacking 2026 Hackathon Season"
            style={{ width: "100%" }}
          />
        </a>
		<Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
