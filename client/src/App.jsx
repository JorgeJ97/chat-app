
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Register from './views/Register/Register';
import Login from './views/Login/Login';
import Chat from './views/Chat/Chat';


function App() {



  return (
    // <div className='p-4 h-screen flex items-center justify-center'>
      <Routes>
        <Route path='/register' element={<Register />} />
        <Route path='/' element={<Login />} />
        {/* <Route path = '/chat' element = {<Chat /> } /> */}
        

      </Routes>


    // </div>


  )
}

export default App;
