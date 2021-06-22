import React, { createContext, ReactNode, useEffect, useState } from 'react';

import { auth, firebase } from '../services/firebase';

type AuthContextTypes = {
  user: Object | undefined,
  signInWithGoogle: () => Promise<void>
}

type User = {
  id: string,
  name: string,
  avatar: string
}

type AuthContextProviderProps = {
  children: ReactNode
}

export const AuthContext = createContext({} as AuthContextTypes)

export function AuthContextProvider(props: AuthContextProviderProps) {

  const [user, setUser] = useState<User>()

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => validateUser(user))

    return () => {
      unsubscribe()
    }
  }, [])

  async function signInWithGoogle() {
    const provider = new firebase.auth.GoogleAuthProvider()
    const response = await auth.signInWithPopup(provider)
    validateUser(response.user)
  }

  function validateUser(user: any) {
    if (user) {
      const { displayName, photoURL, uid } = user

      if (!displayName || !photoURL) {
        throw new Error('Missing information from Google Account.')
      }

      setUser({
        id: uid,
        name: displayName,
        avatar: photoURL
      })
    }
  }

  return (
    <AuthContext.Provider value={{ user, signInWithGoogle }}>
      { props.children }
    </AuthContext.Provider>
  )
}

