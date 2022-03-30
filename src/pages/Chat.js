import { useEffect, useState } from 'react'
import { ref, onValue } from 'firebase/database'
//services firebase
import {  auth, db } from '../services/firebase'

export const Chat = () => {

  const [user, setUser] =useState(auth.currentUser)
  const [chats, setChats] = useState([])
  const [content, setContent] = useState("")
  const [readError, setReadError] = useState(null)
  const [writeError, setWriteError] = useState(null)


  const getChats = () => {
    setReadError(null)
    try {
      const startCountRef = ref(db, 'chats')
      onValue(startCountRef, (snapshot) => {
        const data = snapshot.val()
        console.log("data:", data)
      })

    } catch(e) {
      console.log(e)
      setReadError(e.message)
    }
  }

  useEffect(() => {
    getChats()
  },[])

  return (
    <main>
      <section>
        {
          chats && chats.map(chat => (
            <p key={chat.timestamp}>
              { chat.content }
            </p>
          ))
        }
      </section>

      <section>
        Login in as: <strong>{user.email}</strong>
      </section>
    </main>
  )
}
