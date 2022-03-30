import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { GoogleAuthProvider, GithubAuthProvider } from  'firebase/auth'
//helpers
import { signin, signInWithGoogle, signInWithGitHub } from '../helpers/auth'
//styles
import style from '../styles/pages/Login.module.css'

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
    <section className={ style.Login }>
      <div className={ style.Login_Wrapper }>
        <form className={ style.Form } autoComplete='off' onSubmit={handleOnSubmit}>
          <section className={ style.Form_Title }>
            <h2>Chatty</h2>
          </section>
            <input
              placeholder="Email"
              name="email"
              type="email"
              onChange={(e) => setEmail(e.target.value)}
              value={email}
            />

            <input
              placeholder="Password"
              name="password"
              onChange={ (e) => setPassword(e.target.value)}
              value={password}
              type="password"
            />

            {error && <p>{error}</p>}
            <input className={ style.Form_Button } type="submit" value="Sing In"/>
            { warn && <span>{warn}</span>}

            <section className={ style.Form_Options }>
              <span>Or</span>
                  <button className={ style.Google } onClick={googleSignIn} type="button">
                    Sign in with Google
                  </button>
                  <button className={ style.GitHub } onClick={gitHubSignIn} type="button">
                    Sign in with GitHub
                  </button>
            </section>
        </form>
        <hr />
        <p className={ style.SignupOption }>
          Don't have an account? <Link to="/signUp">Sign up</Link>
        </p>
      </div>
    </section>
  )
}
