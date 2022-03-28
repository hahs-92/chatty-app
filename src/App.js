import {
  BrowserRouter,
  Routes,
  Route,
  Navigate
} from 'react-router-dom'
//firebase config
import { auth } from './services/firebase'
//styles
import './App.css';
//pages
import { Home } from './pages/Home'
import { Chat } from './pages/Chat'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { useState } from 'react';


function PrivateRoute({ component: Component, authenticated, ...rest}) {
  return (
    <Route
      { ...rest }
      render={ (props) => authenticated === true
        ? <Component { ...props } />
        : <Navigate replace to={{
          pathname: '/login', state: { from: props.location}
        }} />
      }
    />
  )
}

function PublicRoute({ component: Component, authenticated, ...rest}) {
  return (
    <Route
      { ...rest }
      render={(props) => authenticated === false
        ? <Component { ...props } />
        : <Navigate replace to='/chat'/>
      }
    />
  )
}

function App() {
  const [ authenticated, setAuthenticated] = useState(false)
  const [ loading, setLoading ] = useState(true)

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={ <Home />} />
        <PrivateRoute authenticated={ authenticated } element={ <Chat />} />
        <PublicRoute authenticated={ authenticated } element={ <Signup />} />
        <PublicRoute authenticated={ authenticated } element={ <Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App
