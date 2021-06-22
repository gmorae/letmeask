import React from 'react'
import { useHistory } from 'react-router';

import { Button } from '../Components/Button';
import { useAuth } from '../Hooks/useAuth';

import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';
import googleIcon from '../assets/images/google-icon.svg';

import '../styles/auth.scss';

export function Home() {

  const history = useHistory()
  const { signInWithGoogle, user } = useAuth()

  async function handleCreateRoom() {
    if(!user) await signInWithGoogle()
    history.push('/rooms/new')
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
          <button onClick={handleCreateRoom} className="create-room">
            <img src={googleIcon} alt="Icon google white" />
            Create your room with Google
          </button>
          <div className="separator">or sign in a room</div>
          <form>
            <input
              type="text"
              placeholder="Enter room code"
            />
            <Button>
              Enter the room
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}