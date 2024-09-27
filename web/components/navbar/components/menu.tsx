import Link from 'next/link'
import React from 'react'

interface MenuProps {
    id: string
}

const Menu = (props: MenuProps) => {
    const MenuData = [
        { href: '/', text: 'Home', ariaCurrent: 'page' },
        { href: '/product/2330', text: 'Products' },
        // { href: '/explore', text: 'Explore' },
        { href: '/investment-strategies', text: 'Investment Strategies' },
        { href: '/sync', text: 'Sync' },
    ]
    return (
        <Container id={props.id}>
            <MenuItems data={MenuData} />
        </Container>
    )
}

export default Menu

interface ContainerProps {
    id: string
    children: React.ReactNode
}

function Container(props: ContainerProps) {
    return (
        <div className="hidden w-full md:block md:w-auto" id={props.id}>
            {props.children}
        </div>
    )
}

interface MenuItemsProps {
    data: any[]
}

function MenuItems(props: MenuItemsProps) {
    return (
        <ul className="font-medium flex flex-col p-4 md:p-0 mt-4 border border-gray-100 rounded-lg bg-gray-50 md:flex-row md:space-x-8 rtl:space-x-reverse md:mt-0 md:border-0 md:bg-white dark:bg-gray-800 md:dark:bg-gray-900 dark:border-gray-700">
            {props.data.map((item) => (
                <MenuItem key={item.href} {...item} />
            ))}
        </ul>
    )
}

interface MenuItemProps {
    children: React.ReactNode
    href: string
    text: string
    ariaCurrent?:
        | boolean
        | 'page'
        | 'time'
        | 'false'
        | 'true'
        | 'step'
        | 'location'
        | 'date'
        | undefined
}

function MenuItem(props: MenuItemProps) {
    return (
        <li>
            <Link
                href={props.href}
                className="block py-2 px-3 text-white bg-blue-700 rounded md:bg-transparent md:text-blue-700 md:p-0 dark:text-white md:dark:text-blue-500"
                aria-current={props.ariaCurrent}
            >
                {props.text}
            </Link>
        </li>
    )
}
