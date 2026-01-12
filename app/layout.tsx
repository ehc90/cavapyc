import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

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
    default: "Príncipe y Centauro | Experiencias Enológicas de Alta Gama",
    template: "%s | Príncipe y Centauro"
  },
  description: "Descubre el arte del vino con Emiliano ('El Príncipe') y Fabián ('El Centauro'). Catas exclusivas, selección de vinos premium y crónicas de viajes sommelier. Uniendo la elegancia y la pasión.",
  keywords: ["Sommelier", "Vino", "Argentina", "Cata de Vinos", "Bodegas", "Lujo", "Viajes", "Blog de Vinos", "Club de Vinos", "Mendoza", "Experiencias", "Alta Gama"],
  authors: [{ name: "Emiliano", url: "https://cavapyc.vercel.app" }],
  creator: "Príncipe y Centauro",
  publisher: "Príncipe y Centauro",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Príncipe y Centauro | Experiencias Enológicas",
    description: "Donde la elegancia refinada se encuentra con el vigor apasionado. Únete a nuestro Club Privado y explora nuestra Bitácora.",
    url: 'https://cavapyc.vercel.app',
    siteName: 'Príncipe y Centauro',
    images: [
      {
        url: 'https://tpoeahzwujcghqsjanon.supabase.co/storage/v1/object/public/ImagenPyC/PrincipePyC.jpg',
        width: 1200,
        height: 630,
        alt: 'El Príncipe Sommelier',
      },
    ],
    locale: 'es_AR',
    type: 'website',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Príncipe y Centauro',
    description: 'Experiencias enológicas y crónicas de viaje.',
    images: ['https://tpoeahzwujcghqsjanon.supabase.co/storage/v1/object/public/ImagenPyC/PrincipePyC.jpg'],
  },
  icons: {
    icon: '/logo-hero.png',
    shortcut: '/logo-hero.png',
    apple: '/logo-hero.png',
  },
  manifest: '/manifest.json'
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="es">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        {children}
      </body>
    </html>
  );
}
