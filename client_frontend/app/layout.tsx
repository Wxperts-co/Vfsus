// app/layout.tsx
import type { Metadata } from 'next'
import { Bebas_Neue, Barlow } from 'next/font/google'
import './globals.css'
import Navbar from '@/components/common-components/navbar'  
import Footer from '@/components/common-components/footer'

const bebasNeue = Bebas_Neue({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-bebas',
})

const barlow = Barlow({
  weight: ['300', '400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-barlow',
})

export const metadata: Metadata = {
  title: 'Virginia Surveillance Force',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={`${bebasNeue.variable} ${barlow.variable}`}>
        <Navbar />
        <main className="min-h-screen">
          {children}
        </main>
        <Footer/>
      </body>
    </html>
  )
}