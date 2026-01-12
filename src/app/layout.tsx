import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "CanxJS - Ultra-fast Backend Framework for Bun",
    template: "%s | CanxJS",
  },
  description: "Ultra-fast async-first MVC backend framework for Bun. Build modern APIs with 250,000+ requests/sec performance, elegant syntax, and type-safe code.",
  keywords: ["canxjs", "bun", "backend", "framework", "typescript", "api", "mvc", "async", "fast", "nodejs alternative"],
  authors: [{ name: "CanxJS Team", url: "http://docs-canxjs.netlify.app" }],
  creator: "CanxJS Team",
  publisher: "CanxJS",
  metadataBase: new URL("http://docs-canxjs.netlify.app"),
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "http://docs-canxjs.netlify.app",
    siteName: "CanxJS",
    title: "CanxJS - Ultra-fast Backend Framework for Bun",
    description: "Ultra-fast async-first MVC backend framework for Bun. Build modern APIs with 250,000+ requests/sec performance.",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "CanxJS - Backend Framework for Bun",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "CanxJS - Ultra-fast Backend Framework for Bun",
    description: "Ultra-fast async-first MVC backend framework for Bun. 250,000+ req/sec performance.",
    images: ["/og-image.png"],
    creator: "@canxjs",
  },
  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon-16x16.png",
    apple: "/apple-touch-icon.png",
  },
  manifest: "/site.webmanifest",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "SoftwareApplication",
              "name": "CanxJS",
              "applicationCategory": "DeveloperApplication",
              "operatingSystem": "Cross-platform",
              "description": "Ultra-fast async-first MVC backend framework for Bun",
              "url": "http://docs-canxjs.netlify.app",
              "author": {
                "@type": "Organization",
                "name": "CanxJS Team"
              },
              "offers": {
                "@type": "Offer",
                "price": "0",
                "priceCurrency": "USD"
              }
            }),
          }}
        />
      </head>
      <body className={`${poppins.variable} font-sans antialiased`}>
        <Navbar />
        <main className="min-h-screen pt-16">
          {children}
        </main>
        <Footer />
      </body>
    </html>
  );
}

