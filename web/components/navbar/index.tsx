'use client'

import ThemeModeButton from './components/theme-button'
import MobileMenuButton from './components/mobile-menu-button'
import { useId } from 'react'
import Menu from './components/menu'
import LogoLink from './components/logo-link'
import Nav from './components/nav'

const NavBar = () => {
    const id = useId()
    return (
        <Nav>
            <LogoLink href="/">Taiex stocks</LogoLink>
            <MobileMenuButton id={id} />
            <Menu id={id} />
            <ThemeModeButton />
        </Nav>
    )
}

export default NavBar
