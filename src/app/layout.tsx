import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import GoogleTagManager from "@/components/GoogleTagManager";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Physiogen - Sports Physiotherapy & Rehabilitation Science | Lahore, Pakistan",
    template: "%s | Physiogen - Sports Physiotherapy Specialists"
  },
  description: "Leading sports physiotherapy clinic in Lahore, Pakistan. Expert sports injury rehabilitation, athletic performance optimization, and return-to-play protocols. 15+ years of clinical excellence with 98% treatment efficacy. Book consultation: +92 313 7818887",
  keywords: [
    "sports physiotherapy Lahore",
    "sports injury rehabilitation",
    "athletic performance optimization",
    "return-to-play assessment",
    "sports medicine Lahore",
    "sports physical therapy",
    "ACL reconstruction recovery",
    "rotator cuff rehabilitation",
    "tennis elbow treatment",
    "hamstring injury",
    "physiotherapy Lahore",
    "rehabilitation science Pakistan",
    "neurological rehabilitation",
    "women's health physiotherapy",
    "evidence-based treatment",
    "Bahria Town physiotherapy",
    "sports physiotherapist Pakistan"
  ],
  robots: {
    index: true,
    follow: true
  },
  alternates: {
    canonical: "https://physiogen.fit"
  },
  openGraph: {
    title: "Physiogen - Sports Physiotherapy & Rehabilitation Specialists",
    description: "Leading sports physiotherapy clinic in Lahore, Pakistan. Specialized sports injury rehabilitation by certified specialists with advanced techniques for athletes at all levels.",
    url: "https://physiogen.fit",
    siteName: "Physiogen",
    locale: "en_US",
    type: "website",
    images: [{
      url: "https://physiogen.fit/clinic-image.jpg",
      width: 1200,
      height: 630,
      alt: "Physiogen Sports Physiotherapy & Rehabilitation Specialists"
    }]
  },
  twitter: {
    card: "summary_large_image",
    title: "Physiogen - Sports Physiotherapy Specialists",
    description: "Leading sports physiotherapy clinic in Lahore with certified specialists for sports injury rehabilitation and athletic performance optimization.",
    images: ["https://physiogen.fit/clinic-image.jpg"],
    creator: "@physiogen"
  },
  authors: [{ name: "Dr. Muhammad Mubarak Janjua, Sports Physiotherapy Specialist" }],
  creator: "Dr. Muhammad Mubarak Janjua",
  publisher: "Physiogen Clinical Sciences",
  formatDetection: {
    telephone: true,
    email: true,
    address: true
  }
};

// Organization structured data
const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "MedicalOrganization",
  "name": "Physiogen",
  "url": "https://physiogen.fit",
  "logo": "https://physiogen.fit/logo.png",
  "description": "Leading sports physiotherapy clinic in Lahore, providing specialized sports injury assessment, rehabilitation, and athletic performance optimization services.",
  "sameAs": [
    "https://www.facebook.com/physiogen",
    "https://www.instagram.com/physiogen_fit",
    "https://www.linkedin.com/company/physiogen"
  ],
  "contactPoint": {
    "@type": "ContactPoint",
    "telephone": "+92-313-7818887",
    "contactType": "customer service",
    "availableLanguage": ["English", "Urdu"]
  },
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "35, Iqbal, Block Commercial FF Bahria Town",
    "addressLocality": "Lahore",
    "addressRegion": "Punjab",
    "addressCountry": "Pakistan",
    "postalCode": "54000"
  },
  "geo": {
    "@type": "GeoCoordinates",
    "latitude": 31.363881,
    "longitude": 74.183399
  },
  "openingHoursSpecification": {
    "@type": "OpeningHoursSpecification",
    "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"],
    "opens": "09:00",
    "closes": "18:00"
  },
  "medicalSpecialty": [
    "Sports Physiotherapy",
    "Sports Medicine",
    "Physiotherapy",
    "Neurological Rehabilitation",
    "Women's Health"
  ],
  "founder": {
    "@type": "Person",
    "name": "Dr. Muhammad Mubarak Janjua",
    "jobTitle": "Founder & CEO, Sports Physiotherapy Specialist",
    "description": "PT, MSSPT - HCPC (UK) Licensed | Bronze Medalist | Certified Sports Physiotherapist",
    "knowsAbout": ["Sports Physiotherapy", "Sports Injury Rehabilitation", "Athletic Performance Optimization"]
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
      <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <meta name="theme-color" content="#000000" />
        <meta name="msapplication-TileColor" content="#000000" />
        
        {/* Preconnect to important domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
        
        {/* Organization Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
      </head>
      <body>
        <GoogleTagManager gtmId="GTM-XXXXXXX" />
        {children}
      </body>
    </html>
  );
}
