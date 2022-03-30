import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, GithubAuthProvider } from  'firebase/auth'
//helpers
import { signup , signInWithGitHub, signInWithGoogle} from '../helpers/auth'

export const Signup = ({isAuth, setIsAuth}) => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ error, setError ] = useState(null)
  const [ warn, setWarn ] = useState(null)

  const navigate = useNavigate()


  const googleSignIn = async() => {
    try {
      const result = await signInWithGoogle()
      const credential = GoogleAuthProvider.credentialFromResult(result)
      //const token = credential.accessToken

      //lo redirigido maunalmete
      setIsAuth(true)

    } catch (error) {
          setError(error.message)
    }
  }

  const gitHubSignIn = async() => {
    try {
      const result = await signInWithGitHub()
      const credential = GithubAuthProvider.credentialFromResult(result)
      //const token = credential.accessToken
      console.log(result.user)

      //lo redirigido maunalmete
      setIsAuth(true)

    } catch (error) {
          setError(error.message)
    }
  }


  const handleOnSubmit = async(e) => {
    e.preventDefault()

    if(password.length < 6) {
      setWarn("password must have at least 6 characters")
      return false
    }
    setError(null)

    try {
      const userCredential = await signup(email,password)
      console.log(userCredential.user)
      //
      setIsAuth(true)
      navigate("/")
    } catch (error) {
      setError(error.message)
    }
  }

  useEffect(() => {
    if(isAuth) navigate("/")
  },[isAuth])


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
          { warn && <span>{warn}</span>}

          <p>Or</p>
          <button onClick={googleSignIn} type="button">
            Sign up with Google
          </button>
          <button onClick={gitHubSignIn} type="button">
            Sign  up with GitHub
          </button>
        </div>
        <hr />
        <p>Already have an account?
          <Link to="/logIn">Login</Link>
        </p>
      </form>
    </section>
  )
}
