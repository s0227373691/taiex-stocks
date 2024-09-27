import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ReactQueryProvider } from './react-query-provider'
import NavBar from '@/components/navbar'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Taiex stocks',
    description: 'Financial data analysis website',
}

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en" className="dark">
            <body className={`bg-white dark:bg-gray-900 ${inter.className}`}>
                <ReactQueryProvider>
                    <NavBar />
                    <main>{children}</main>
                </ReactQueryProvider>
            </body>
        </html>
    )
}
