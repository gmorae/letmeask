import React, { FormEvent, useState } from 'react'
import { Link, useHistory } from 'react-router-dom';

import { Button } from '../Components/Button';

import { database } from '../services/firebase';
import { useAuth } from '../Hooks/useAuth';

import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';

import '../styles/auth.scss';

export function NewRoom() {

  const [nameRoom, setNameRoom] = useState('');
  const { user } = useAuth()
  const history = useHistory()

  async function handleNewRoom(e: FormEvent) {
    e.preventDefault();

    if (nameRoom.trim() === '') {
      return;
    }

    const roomRef = await database.ref('rooms')

    const firebaseRoom = await roomRef.push({
      title: nameRoom,
      authorId: user?.id
    })

    history.push(`/rooms/${firebaseRoom.key}`)

  }

  return (
    <div id="page-auth">
      <aside>
        <img src={illustration} alt="Illustration symbolizing questions and answers" />
        <strong>Create Live Q&amp;A rooms</strong>
        <p>Ask your audience's questions in real-time</p>
      </aside>
      <main>
        <div className="main-content">
          <img src={logo} alt="Logo let me ask" />
          <h2>Create new room</h2>
          <form onSubmit={handleNewRoom}>
            <input
              type="text"
              placeholder="Name room"
              value={nameRoom}
              onChange={input => setNameRoom(input.target.value)}
            />
            <Button type="submit">
              Create new room
            </Button>
          </form>
          <p>
            Want to join an existing room? <Link to="/">click here</Link>
          </p>
        </div>
      </main>
    </div>
  )
}