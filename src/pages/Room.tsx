import { FormEvent, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom'

import { Button } from '../Components/Button'
import { RoomCode } from '../Components/RoomCode'

import { useAuth } from '../Hooks/useAuth';
import { database } from '../services/firebase';

import Logo from '../assets/images/logo.svg'
import '../styles/room.scss';

type RoomParams = {
  id: string
}

type FirebaseQuestions = Record<string, {
  content: string,
  author: {
    name: string,
    avatar: string
  },
  isHighlighted: boolean,
  isAnswered: boolean
}>

type Question = {
  id: string,
  content: string,
  author: {
    name: string,
    avatar: string
  },
  isHighlighted: boolean,
  isAnswered: boolean
}

export function Room() {

  const params = useParams<RoomParams>();
  const roomId = params.id;
  const { user } = useAuth()

  const [newQuestion, setNewQuestion] = useState('');
  const [questions, setQuestions] = useState<Question[]>([])
  const [title, setTitle] = useState('')

  useEffect(() => {
    const roomRef = database.ref(`rooms/${roomId}`)

    roomRef.on(`value`, room => {
      const databaseRoom = room.val();
      const firebaseQuestions: FirebaseQuestions = databaseRoom.question ?? {}

      const parsedQuestions = Object.entries(firebaseQuestions).map(([key, value]) => {
        return {
          id: key,
          content: value.content,
          author: value.author,
          isHighlighted: value.isAnswered,
          isAnswered: value.isAnswered
        }
      })

      setTitle(databaseRoom.title)
      setQuestions(parsedQuestions)

    })

  }, [roomId])

  async function handleNewQuestion(e: FormEvent) {
    e.preventDefault()

    if (newQuestion.trim() === '') {
      return;
    }

    if (!user) {
      throw new Error('You must be logged in')
    }

    const question = {
      content: newQuestion,
      author: {
        name: user.name,
        avatar: user.avatar
      },
      isHighlighted: false,
      isAnswered: false
    }

    await database.ref(`rooms/${roomId}/questions`).push(question)

    setNewQuestion('')
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={Logo} alt="logo let me ask" />
          <RoomCode code={roomId} />
        </div>
      </header>

      <main className="content">
        <div className="room-title">
          <h1>Room {title}</h1>
          {questions.length > 0 && <span>{questions.length} questions</span>}
        </div>

        <form onSubmit={handleNewQuestion}>
          <textarea
            placeholder="What is the your question?"
            value={newQuestion}
            onChange={text => setNewQuestion(text.target.value)}
          />

          <div className="form-footer">
            {!user
              ? <span>For send the question, <button>Sign in</button></span>
              : (
                <div className="user-info">
                  <img src={user.avatar} alt={user.name} />
                  <span>{user.name}</span>
                </div>
              )
            }
            <Button type="submit" disabled={!user}>Send question</Button>
          </div>
        </form>
        
      </main>
    </div>
  )
}