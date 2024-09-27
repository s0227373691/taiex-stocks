import React from 'react'

interface NavProps {
    children: React.ReactNode
}

const Nav = (props: NavProps) => {
    return (
        <nav className="bg-white border-gray-200 dark:bg-gray-900">
            <div className="max-w-screen-xl flex flex-wrap items-center justify-between mx-auto p-4">
                {props.children}
            </div>
        </nav>
    )
}

export default Nav
