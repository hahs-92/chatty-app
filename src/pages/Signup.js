import { useState } from 'react'
import { Link } from 'react-router-dom'
//helpers
import { signup } from '../helpers/auth'

export const Signup = () => {
  const [ info, setInfo ] = useState({ email: "", password:""})
  const [ error, setError ] = useState(null)

  const handleOnChange = (e) => {
    setInfo({
      [e.target.name]: e.target.value
    })
  }

  const handleOnSubmit = async(e) => {
    e.preventDefault()
    setError(null)

    try {
      await signup(info.email, info.password)
    } catch (error) {
      setError(error.message)
    }
  }

  return (
    <section>
      <form onSubmit={handleOnSubmit}>
        <h1>Sign Up to
          <Link to="/" >Chatty</Link>
        </h1>
        <p>Fill in the form below to create an account.</p>
        <div>
          <input
            type="email"
            placeholder='Email'
            name='email'
            value={info.email}
            onChange={handleOnChange}
          />
          <input
            type="password"
            placeholder='Password'
            name='password'
            value={info.password}
            onChange={handleOnChange}
          />
        </div>

        <div>
          { error && <p>error</p> }
          <input type="submit" value="Sign Up" />
        </div>
        <hr />
        <p>Already have an account?
          <Link to="/login">Login</Link>
        </p>
      </form>
    </section>
  )
}
