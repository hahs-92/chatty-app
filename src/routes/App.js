import { useState } from 'react';
import { useEffect } from 'react';
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
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


function App() {
  const [ isAuth, setIsAuth] = useState(false)


  // useEffect(() => {
  //   auth().onAuthStateChanged((user) => {
  //     if (user) {
  //       setIsAuth(true)
  //     } else {
  //       setIsAuth(false)
  //     }
  //   })
  // },[])

  return (
    <BrowserRouter>
      <Routes>
      <Route path="/signin" element={<Login isAuth={isAuth} setIsAuth={setIsAuth}/>}/>
      <Route path="/signup" element={<Signup />}/>
      <Route element={ <PrivateRoutes isAuth={isAuth} />}>
        <Route path="/" element={ <Home />}/>
        <Route path="/chat" element={ <Chat />}/>
        <Route path="/" element={ <Home />}/>
      </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
