import type React from "react"
import "./globals.css"
import { Montserrat, Playfair_Display } from "next/font/google"

// Load Montserrat font
const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["300", "400", "500"],
  variable: "--font-montserrat",
})

// Load Playfair Display font
const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "700"],
  style: ["normal", "italic"],
  variable: "--font-playfair",
})

export const metadata = {
  title: "AirTalk - KU's Offline-First Chat Platform",
  description: "Connect with peers across campus, even when the internet is down.",
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={`${montserrat.variable} ${playfair.variable} font-sans`}>{children}</body>
    </html>
  )
}