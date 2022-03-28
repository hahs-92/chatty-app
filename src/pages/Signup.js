import { useState } from 'react'
import { Link } from 'react-router-dom'
//helpers
import { signup } from '../helpers/auth'

export const Signup = ({setIsAuth}) => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ error, setError ] = useState(null)


  const handleOnSubmit = async(e) => {
    e.preventDefault()
    setError(null)

    try {
      const userCredential = await signup(email,password)
      console.log(userCredential.user)
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
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder='Password'
            name='password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div>
          { error && <p>error</p> }
          <input type="submit" value="Sign Up" />
        </div>
        <hr />
        <p>Already have an account?
          <Link to="/logIn">Login</Link>
        </p>
      </form>
    </section>
  )
}
