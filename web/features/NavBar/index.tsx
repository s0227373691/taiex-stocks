import NavbarContainer from './components/navbar-container'
import ThemeModeButton from './components/theme-mode-button'
import MobileButton from './components/mobile-button'
import LogoLink from './components/logo-link'
import Menu from './components/menu'

const NavBar = () => {
    return (
        <NavbarContainer>
            <LogoLink href="/"> Taiex stocks</LogoLink>
            <MobileButton />
            <Menu />
            <ThemeModeButton />
        </NavbarContainer>
    )
}
export default NavBar
