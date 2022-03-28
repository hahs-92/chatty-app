import {NavLink} from 'react-router-dom'
//helpers
import {logout } from '../helpers/auth'

export const Nav = () => {

    const handleOnClick = async() => {
        try {
            logout()
        } catch (error) {
            console.error(error.message)
        }
    }

    return (
        <section>

            <header>

            </header>

            <nav>
                <ul>
                    <li>
                        <NavLink to="/">Home</NavLink>
                    </li>
                    <li>
                        <NavLink to="/chat">Chat</NavLink>
                    </li>
                    <li onClick={ handleOnClick}>
                        Logout
                    </li>
                </ul>
            </nav>
        </section>
  )
}
