
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Home from './views/Home/Home';
import { Toaster } from 'react-hot-toast'


function App() {



  return (

    <div className='flex items-center justify-center h-screen bg-zinc-800'>
      <Toaster />
      <Routes>
        <Route path='/' element={<Login />} />
        <Route path='/register' element={<Register />} />
        <Route path='/home' element={<Home />} />

        {/* <Route path = '/chat' element = {<Chat /> } /> */}


      </Routes>


    </div>


  )
}

export default App;
