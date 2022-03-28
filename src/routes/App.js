import { useState } from 'react';
import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
import { onAuthStateChanged} from 'firebase/auth'
//firebase config
import { auth } from '../services/firebase'
//styles
import '../App.css';
//pages
import { Home } from '../pages/Home'
import { Chat } from '../pages/Chat'
import { Login } from '../pages/Login'
import { Signup } from '../pages/Signup'

//components
import { PrivateRoutes } from '../components/PrivateRoutes'
import { Nav } from '../components/Nav'


function App() {
  const [ isAuth, setIsAuth] = useState(false)


  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      if (user) {
        setIsAuth(true)
      } else {
        setIsAuth(false)
      }
    })
  },[isAuth])


  return (
    <BrowserRouter>
      <Nav />
      <Routes>
      <Route path="/login" element={<Login isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
      <Route path="/signUp" element={<Signup />}/>
      <Route element={ <PrivateRoutes isAuth={isAuth} />}>
        <Route path="/" element={ <Home />}/>
        <Route path="/chat" element={ <Chat />}/>
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
