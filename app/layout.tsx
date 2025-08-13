import type React from "react"
import type { Metadata, Viewport } from "next"
import { Inter, Poppins } from "next/font/google"
import "./globals.css"
import { AuthProvider } from "@/lib/auth-context"
import { OnboardingProvider } from "@/lib/onboarding-context"
import { ErrorBoundary } from "@/components/error-boundary"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
  preload: true,
})

const poppins = Poppins({
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  preload: true,
})

export const metadata: Metadata = {
  title: {
    default: "X-hunt - Adventure Booking Platform",
    template: "%s | X-hunt",
  },
  description:
    "Discover and book amazing adventure experiences around the world. From hiking and climbing to water sports and cultural tours. Join thousands of adventurers exploring the world safely.",
  generator: "X-hunt Platform",
  keywords: [
    "adventure booking",
    "outdoor experiences",
    "hiking tours",
    "climbing adventures",
    "water sports",
    "cultural tours",
    "travel experiences",
    "adventure travel",
    "outdoor activities",
    "experience marketplace",
  ],
  authors: [{ name: "X-hunt Team" }],
  creator: "X-hunt",
  publisher: "X-hunt",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL("https://x-hunt.vercel.app"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://x-hunt.vercel.app",
    title: "X-hunt - Adventure Booking Platform",
    description: "Discover and book amazing adventure experiences around the world.",
    siteName: "X-hunt",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "X-hunt Adventure Booking Platform",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "X-hunt - Adventure Booking Platform",
    description: "Discover and book amazing adventure experiences around the world.",
    images: ["/og-image.png"],
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
}

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#3B82F6" },
    { media: "(prefers-color-scheme: dark)", color: "#1E40AF" },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="dns-prefetch" href="https://fonts.googleapis.com" />
        <meta name="format-detection" content="telephone=no" />
        <style>{`
html {
  font-family: ${inter.style.fontFamily};
  --font-sans: ${inter.variable};
  --font-heading: ${poppins.variable};
}
        `}</style>
      </head>
      <body className={`${inter.variable} ${poppins.variable} antialiased`}>
        <ErrorBoundary>
          <AuthProvider>
            <OnboardingProvider>{children}</OnboardingProvider>
          </AuthProvider>
        </ErrorBoundary>
      </body>
    </html>
  )
}
