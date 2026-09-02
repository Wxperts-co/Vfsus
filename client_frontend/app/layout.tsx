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

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const settings = await getGlobalSettings();

  return (
    <html lang="en">
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