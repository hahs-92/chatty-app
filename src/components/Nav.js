import {NavLink} from 'react-router-dom'

export const Nav = () => {
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
            </ul>
        </nav>
      </section>
  )
}
