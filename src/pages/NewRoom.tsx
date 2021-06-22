import React from 'react'
import { Link } from 'react-router-dom';

import { Button } from '../Components/Button';

import illustration from '../assets/images/illustration.svg';
import logo from '../assets/images/logo.svg';

import '../styles/auth.scss';

export function NewRoom() {
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
          <form>
            <input
              type="text"
              placeholder="Name room"
            />
            <Button>
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