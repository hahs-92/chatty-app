import { useEffect, useState } from 'react'
import { ref, onValue, set } from 'firebase/database'
//services firebase
import {  auth, db } from '../services/firebase'
//styles
import style from '../styles/pages/Chats.module.css'

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
      setReadError(e.message)
    }
  }

  const handleOnChange = (e) => {
    setContent(e.target.value)
  }


  const handleSubmit = (e) => {
    e.preventDefault()

    if(!content) {
      return
    }
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


  return (
    <main className={ style.Chats }>
      <div className={ style.Chats_Wrapper }>
        <form className={ style.Form } onSubmit={handleSubmit}>
          <input
            type="text"
            name='content'
            value={content}
            onChange={handleOnChange}
          />
          {
            writeError && <span>{writeError}</span>
          }
          <input className={ style.Form_Button } type="submit" value="Send" />
        </form>

        <section className={ style.User }>
          Login as: <strong>{user.email}</strong>
        </section>

        <section className={ style.Content }>
          { readError && <span>{readError.message}</span>}
          { !readError && !chats && <span>Write your first chat!</span>}
          {
            chats && Object.values(chats).map(chat => (
              <p key={chat.timestamp}>
                { chat.content }
              </p>
            ))
          }
        </section>
      </div>
    </main>
  )
}
