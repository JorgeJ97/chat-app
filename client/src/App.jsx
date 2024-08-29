
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import { Toaster } from 'react-hot-toast'
import useAuth from './hooks/useAuth';


function App() {

  const { user} = useAuth();

  return (

    <div>
      <Toaster />
      {/* <Routes>
        <Route path='/login' element={user ? <Navigate to= '/'/> : <Login />} />
        <Route path='/register' element={user ? <Navigate to= '/'/> : <Register />} />
        <Route path='/' element={user ? <Home /> : <Navigate to= '/login'/> } />
        <Route path='*' element={<Navigate to="/" />} />
      </Routes> */}
      <Routes>
        <Route path='/login' element={user ? <Navigate to= '/'/> : <Login />} />
        <Route path='/register' element={user ? <Navigate to= '/'/> : <Register />} />
        <Route path='/*' element={user ? <Home /> : <Navigate to= '/login'/> } />
      </Routes>


    </div>


  )
}

export default App;
