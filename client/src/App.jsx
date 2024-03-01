
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import { Toaster } from 'react-hot-toast'
import useAuth from './hooks/useAuth';


function App() {

  const { user} = useAuth();

  return (

    <div className='flex items-center justify-center h-screen bg-zinc-800'>
      <Toaster />
      <Routes>
        <Route path='/' element={user ? <Navigate to= '/home'/> : <Login />} />
        <Route path='/register' element={user ? <Navigate to= '/home'/> : <Register />} />
        <Route path='/home' element={user ? <Home /> : <Navigate to= '/'/> } />

        {/* <Route path = '/chat' element = {<Chat /> } /> */}


      </Routes>


    </div>


  )
}

export default App;
