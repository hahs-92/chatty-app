import { useEffect, useState } from 'react'
import { ref, onValue, set } from 'firebase/database'
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
        setChats(data)
      })

    } catch(e) {
      console.log(e)
      setReadError(e.message)
    }
  }

  const handleOnChange = (e) => {
    setContent(e.target.value)
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    setWriteError(null)

    try {
      set(ref(db, 'chats/' + Date.now()), {
        content: content,
        timestamp: Date.now(),
        uid: user.uid
      })

      setContent("")
    } catch (e) {
      setWriteError(e.message)
    }
  }

  useEffect(() => {
    getChats()
  },[])

  console.log("chats: ", Object.values(chats))

  return (
    <main>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name='content'
          value={content}
          onChange={handleOnChange}
        />
        {
          writeError && <span>{writeError}</span>
        }
        <input type="submit" value="Send" />
      </form>

      <section>
        Login in as: <strong>{user.email}</strong>
      </section>

      <section>
        {
          chats && Object.values(chats).map(chat => (
            <p key={chat.timestamp}>
              { chat.content }
            </p>
          ))
        }
      </section>
    </main>
  )
}
