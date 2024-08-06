import { Sidebar } from "@/components/ui/navigation/sidebar";
import { SessionProvider } from 'next-auth/react';
import { ThemeProvider } from "next-themes";
import { Inter } from "next/font/google";


import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-inter",
})


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} overflow-y-scroll scroll-auto antialiased selection:bg-indigo-100 selection:text-indigo-700 dark:bg-gray-950`}
        suppressHydrationWarning
      >
        <div className="mx-auto max-w-screen-2xl">
          <SessionProvider>
            <ThemeProvider defaultTheme="system" attribute="class">
              <Sidebar />
              <main className="lg:pl-72">{children}</main>
            </ThemeProvider>
          </SessionProvider>
        </div>
      </body>
    </html>
  )
}
