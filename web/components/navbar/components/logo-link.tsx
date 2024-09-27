import Link from 'next/link'
import React from 'react'
import Logo from './logo'

interface LogoLinkProps {
    children: React.ReactNode
    href: string
}

const LogoLink = (props: LogoLinkProps) => {
    return (
        <Link
            href={props.href}
            className="flex items-center space-x-3 rtl:space-x-reverse"
        >
            <Logo />
            <span className="self-center text-2xl font-semibold whitespace-nowrap text-gray-700 dark:text-white">
                {props.children}
            </span>
        </Link>
    )
}

export default LogoLink
