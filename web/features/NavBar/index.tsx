import NavbarContainer from './components/navbar-container'
import ThemeModeButton from './components/theme-mode-button'
import MobileButton from './components/mobile-button'
import LogoLink from './components/logo-link'
import Menu from './components/menu'
import { useId } from 'react'

const NavBar = () => {
    const id = useId()
    return (
        <NavbarContainer>
            <LogoLink href="/"> Taiex stocks</LogoLink>
            <MobileButton id={id} />
            <Menu id={id} />
            <ThemeModeButton />
        </NavbarContainer>
    )
}
export default NavBar
