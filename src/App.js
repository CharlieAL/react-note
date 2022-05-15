import './App.css'
import { useState, useEffect } from 'react'
import Notes from './Notes'

import { getALL, create as createNote ,setToken} from './service/notes/note'
import loginService from './service/login'

export default function App() {
  const [notes, setNotes] = useState([])
  const [newNota, setNewNota] = useState('')
  const [messagesError, setMessagesError] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  useEffect(() => {
    getALL().then((notes) => {
      setNotes(notes)
    })
  }, [])

  useEffect(() => {
    const loggedNoteUser = window.localStorage.getItem('loggedNoteUser')
    if (loggedNoteUser) {
      const user = JSON.parse(loggedNoteUser)
      setUser(user)
      setToken(user.token)
    }
  },[])

  const handleChange = (event) => {
    setNewNota(event.target.value)
  }

  const addNote = (event) => {
    event.preventDefault()
    const noteToAddToState = {
      content: newNota,
      important: true
    }


    createNote(noteToAddToState)
      .then((newNote) => {
        setNotes(notes.concat(newNote))
        setNewNota('')
      })
      .catch((err) => console.error(err))

    // setNotes((prevNotes) => prevNotes.concat(noteToAddToState))
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })

      window.localStorage.setItem(
         'loggedNoteUser',JSON.stringify(user)
      )

      setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
    } catch (error) {
      setMessagesError('wrong username or password')
      setTimeout(() => {
        setMessagesError(null)
      }, 4000);
    }
  }

  const renderMessage =  () => (
    <div>
      <p>{messagesError}</p>
    </div>
  )

  const renderLoginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        <input
          type='text'
          value={username}
          name='username'
          placeholder='Username'
          onChange={({ target }) => setUsername(target.value)}
        />
      </div>
      <div>
        <input
          type='password'
          value={password}
          name='password'
          placeholder='Password'
          onChange={({ target }) => setPassword(target.value)}
        />
      </div>

      <button>Login</button>
    </form>
  )

  const renderCreateNote = () => (
    <form onSubmit={addNote}>
      <input type='text' onChange={handleChange} value={newNota} />
      <button>Submit</button>
    </form>
  )

  return (
    <>
      <h1>Notes</h1>
      {
        messagesError
          ? renderMessage()
          : false
      }
      {
        user
          ? renderCreateNote()
          : renderLoginForm()
      }
      <ol>
        {notes.map(({id,content}) => (
          <Notes key={id} content={content} />
        ))}
      </ol>
    </>
  )
}
