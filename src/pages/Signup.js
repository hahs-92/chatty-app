import { useState } from 'react'
import { Link } from 'react-router-dom'
import { GoogleAuthProvider } from  'firebase/auth'
//helpers
import { signup, signInWithGoogle, provider} from '../helpers/auth'

export const Signup = ({setIsAuth}) => {
  const [ email, setEmail ] = useState("")
  const [ password, setPassword ] = useState("")
  const [ error, setError ] = useState(null)
  const [ user, setUser ] = useState()


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

  const googleSignIn = async() => {
    try {
      const result = await signInWithGoogle()
      const credential = GoogleAuthProvider.credentialFromResult(result)
      const token = credential.accessToken
      console.log(result.user)

      //lo redirigido maunalmete
      setIsAuth(true)

    } catch (error) {
          // Handle Errors here.
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
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

          <p>Or</p>
          <button onClick={googleSignIn} type="button">
            Sign up with Google
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
