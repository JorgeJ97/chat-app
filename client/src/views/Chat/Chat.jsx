// import { useState } from 'react'
// import {io} from 'socket.io-client'
// import { useEffect } from 'react'

// const socket = io('http://localhost:3000')

// const Chat = () => {
//     const [newMessage, setNewMessage] = useState('')
//     const [messages, setMessages] = useState([])
  
//     useEffect(() => {
//       // Listen chat_message from server
//       socket.on('chat_message', (data) => {
//         setMessages(messages => [...messages, data])
//       })
//       return () => {
//         socket.off('chat_message')
//       }
  
//     }, [])
  
  
//     const submitHandler = (event) =>{
//       event.preventDefault()
  
//       //Emit message to the server
//       socket.emit('chat_message', {
//         user: socket.id,
//         message: newMessage
//       })
    
//       setNewMessage('')
//     }
    
  
//     return (
//       <>
//       <div >
//         <form  onSubmit={(event) => submitHandler(event)}>
  
//           <ul>
//             {messages.map((data) => {
//               return (
//                 <li key={(data.user)}>{data.message}</li>
//               )
  
//             })}
//           </ul>
//           <input 
//           value={newMessage}
//           onChange={(event) => setNewMessage(event.target.value)}
//           type="textarea" 
//           placeholder='Message'
//           />
//           <button >Enviar</button>
//         </form>
//       </div>
      
//       </>
//     )

// }

// export default Chat;