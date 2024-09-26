import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ReactQueryProvider } from './react-query-provider'
import NavBar from '@/components/ui/navbar'

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
        <html lang="en">
            <body className={inter.className}>
                <ReactQueryProvider>
                    <NavBar />
                    <div className="flex w-full min-h-screen bg-white dark:bg-gray-900">
                        {children}
                    </div>
                </ReactQueryProvider>
            </body>
        </html>
    )
}
