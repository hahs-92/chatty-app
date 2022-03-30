import {NavLink} from 'react-router-dom'
//helpers
import {logout } from '../helpers/auth'
//styles
import style from '../styles/components/Nav.module.css'
//assets
import logoutIcon from '../assets/logout.png'

export const Nav = () => {

    const handleOnClick = async() => {
        try {
            logout()
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <section className={ style.Nav_Wrapper }>
            <header className={ style.Header }>
                <h1>Chatty</h1>
            </header>

            <nav className={ style.Nav }>
                <ul>
                    <li>
                        <NavLink
                            to="/"
                            className={ ({isActive}) => isActive ? style.active : "" }
                        >Home</NavLink>
                    </li>
                    <li>
                        <NavLink
                            to="/chat"
                            className={ ({isActive}) => isActive ? style.active : "" }
                        >Chat</NavLink>
                    </li>
                    <li onClick={ handleOnClick}>
                        <img
                            src={ logoutIcon }
                            alt="Logout"
                            title='logout'
                        />
                    </li>
                </ul>
            </nav>
        </section>
  )
}
