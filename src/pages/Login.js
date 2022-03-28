import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
//helpers
import { signin } from '../helpers/auth'

export const Login = ({isAuth, setIsAuth}) => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ error, setError ] = useState(null)
  const navigate = useNavigate()


  const handleOnSubmit = async(e) => {
    e.preventDefault()
    setError(null)

    try {
      const userCredential =  await signin(email, password)
      console.log(userCredential.user)
      //setIsAuth(true)

    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    if(isAuth) navigate("/")
  },[isAuth])

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
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        <div>
          <input
            placeholder="Password"
            name="password"
            onChange={ (e) => setPassword(e.target.value)}
            value={password}
            type="password"
          />
        </div>

        <div>
          {error && <p>{error}</p>}
          <input type="submit" value="Sing In"/>
        </div>

        <hr />

        <p>
          Don't have an account? <Link to="/signUp">Sign up</Link>
        </p>
      </form>
    </section>
  )
}
