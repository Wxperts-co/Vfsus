import type { Metadata } from 'next'
import { Bebas_Neue, Barlow } from 'next/font/google'
import Script from 'next/script'
import './globals.css'
import NavigationWrapper from '@/components/common-components/navigation-wrapper'
import { getGlobalSettings } from '@/lib/settings-server'
import { SettingsProvider } from '@/components/common-components/SettingsProvider'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
  display: 'swap',
  fallback: ['Impact', 'Arial', 'sans-serif'],
  preload: true,
})

const barlow = Barlow({
  weight: ['400', '700'],
  subsets: ['latin'],
  variable: '--font-barlow',
  display: 'swap',
  fallback: ['system-ui', '-apple-system', 'sans-serif'],
  preload: true,
})

export const revalidate = 60;

export async function generateMetadata(): Promise<Metadata> {
  const settings = await getGlobalSettings();
  
  return {
    title: settings.seo.title,
    description: settings.seo.description,
    keywords: settings.seo.keywords,
    verification: {
      google: settings.seo.googleSiteVerification,
    },
  };
}

const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "LocalBusiness",
  "name": "Virginia Surveillance Force",
  "image": "https://www.vsfus.com/images/logo.png",
  "@id": "https://www.vsfus.com/#localbusiness",
  "url": "https://www.vsfus.com/",
  "telephone": "+1-800-786-0395",
  "priceRange": "$$",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "7544 Diplomat Dr #101",
    "addressLocality": "Manassas",
    "addressRegion": "VA",
    "postalCode": "20109",
    "addressCountry": "US"
  },
  "description": "Virginia Surveillance Force offers professional security services across Washington DC, Maryland, and Virginia. Get licensed armed and unarmed security guards—get a free quote today!.",
  "aggregateRating": {
    "@type": "AggregateRating",
    "ratingValue": "4.4",
    "reviewCount": "34"
  },
  "areaServed": [
    {
      "@type": "State",
      "name": "Virginia"
    },
    {
      "@type": "State",
      "name": "Maryland"
    },
    {
      "@type": "AdministrativeArea",
      "name": "Washington DC"
    }
  ],
  "hasOfferCatalog": {
    "@type": "OfferCatalog",
    "name": "Security & Protective Services",
    "itemListElement": [
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Concierge & Frontdesk"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Fire Watch"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Vehicle Patrol"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Armed & Unarmed Security"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Office & Corporate Security"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Malls, Retail Shopping Centers, Warehouses & Industrial Security"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hotel, Motel & Resorts Security"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Residential & Gated Communities Security"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Hospital & Health Care Facilities Security"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Schools, Colleges & Universities Security"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Government & Diplomat Facilities Security"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Alarm Response"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Bank Security & ATM Service"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Investigations & Intelligence"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "VIP Executive Protection & Body Guard Service"
        }
      },
      {
        "@type": "Offer",
        "itemOffered": {
          "@type": "Service",
          "name": "Medical & Legal Courier and Delivery"
        }
      }
    ]
  }
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getGlobalSettings();

  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(localBusinessSchema) }}
        />
      </head>
      <body className={`${bebasNeue.variable} ${barlow.variable}`}>
        {/* Google tag (gtag.js) */}
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-8VBD9DWJZ5"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-8VBD9DWJZ5');
          `}
        </Script>

        <SettingsProvider settings={settings}>
          <NavigationWrapper>
            {children}
          </NavigationWrapper>
        </SettingsProvider>
      </body>
    </html>
  )
}