import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

import { ReactQueryProvider } from './react-query-provider'
import { NavBar } from '@/components/ui/ui'

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
                    <div className="flex">
                        <div className="flex w-full h-screen">{children}</div>
                    </div>
                </ReactQueryProvider>
            </body>
        </html>
    )
}
