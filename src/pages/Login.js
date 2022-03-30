import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, GithubAuthProvider } from  'firebase/auth'
//helpers
import { signin, signInWithGoogle, signInWithGitHub } from '../helpers/auth'

export const Login = ({isAuth, setIsAuth}) => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ error, setError ] = useState(null)
  const [ warn, setWarn ] = useState(null)
  const navigate = useNavigate()


  const handleOnSubmit = async(e) => {
    e.preventDefault()

    if(password.length < 6) {
      setWarn("password must have at least 6 characters")
      return false
    }
    setError(null)
    setWarn(null)

    try {
      const userCredential =  await signin(email, password)
      //console.log(userCredential.user)
    } catch (error) {
      setError(error.message)
    }
  }

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
          { warn && <span>{warn}</span>}

          <p>Or</p>
          <button onClick={googleSignIn} type="button">
            Sign in with Google
          </button>
          <button onClick={gitHubSignIn} type="button">
            Sign in with GitHub
          </button>
        </div>

        <hr />

        <p>
          Don't have an account? <Link to="/signUp">Sign up</Link>
        </p>
      </form>
    </section>
  )
}
