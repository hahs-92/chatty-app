import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//helpers
import { signin } from '../helpers/auth'

export const Login = ({isAuth, setIsAuth}) => {
  const [ info, setInfo ] = useState({ email: "", password:""})
  const [ error, setError ] = useState(null)
  const navigate = useNavigate()

  const handleOnChange = (e) => {
    setInfo({
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = async(e) => {
    e.preventDefault()
    setError(null)

    try {
      await signin(info.email, info.password)
      //usar setIsAuth
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    if(isAuth) navigate("/")
  },[isAuth, setIsAuth])

  return (
    <section>
      <form autoComplete='off' onSubmit={handleOnSubmit}>
        <h1>
          Login to
          <Link to="/">Chatty</Link>
        </h1>
        <p>Fill in the form below to login to your account.</p>

        <div>
          <input
            placeholder="Email"
            name="email"
            type="email"
            onChange={handleOnChange}
            value={info.email}
          />
        </div>

        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={handleOnChange}
            value={info.password}
            type="password"
          />
        </div>

        <div>
          {error && <p>{error}</p>}
          <input type="submit" value="Sing In"/>
        </div>

        <hr />

        <p>
          Don't have an account? <Link to="/signup">Sign up</Link>
        </p>
      </form>
    </section>
  )
}
