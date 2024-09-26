import Link from 'next/link'
import React from 'react'

interface MenuProps {
    id: string
}

const Menu = (props: MenuProps) => {
    const linksData = [
        { href: '/', text: 'Home', isAriaCurrent: true },
        { href: '/product/2330', text: 'Products', isAriaCurrent: false },
        // {href:"/explore", text:"Explore", isAriaCurrent: false},
        { href: '/sync', text: 'Sync', isAriaCurrent: false },
    ]
    return (
        <Container id={props.id}>
            <MenuItems data={linksData} />
        </Container>
    )
}

export default Menu

interface ContainerProps {
    children: React.ReactNode
    id: string
}

function Container(props: ContainerProps) {
    return (
        <div id={props.id} className="hidden w-full md:block md:w-auto">
            <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
                {props.children}
            </ul>
        </div>
    )
}

interface MenuItemsProps {
    data: any[]
}

function MenuItems(props: MenuItemsProps) {
    return (
        <>
            {props.data.map((link) => (
                <MenuItem key={link.href} {...link} />
            ))}
        </>
    )
}

interface MenuItemProps {
    href: string
    text: string
    isAriaCurrent: boolean
}

function MenuItem(props: MenuItemProps) {
    return (
        <li>
            <Link
                href={props.href}
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current={props.isAriaCurrent && 'page'}
            >
                {props.text}
            </Link>
        </li>
    )
}
