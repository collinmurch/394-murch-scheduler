import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getAuth, GoogleAuthProvider, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth'
import { getDatabase, onValue, ref, set } from 'firebase/database'

// Must manually add file firebase auth file to avoid git committing it
const firebaseConfig = require('./.firebase.env.json')

const firebase = initializeApp(firebaseConfig)
const database = getDatabase(firebase)

export const signInWithGoogle = () => {
    signInWithPopup(getAuth(firebase), new GoogleAuthProvider())
}

const firebaseSignOut = () => signOut(getAuth(firebase))
export { firebaseSignOut as signOut }

export const useUserState = () => {
    const [user, setUser] = useState()
  
    useEffect(() => {
        onIdTokenChanged(getAuth(firebase), setUser);
    }, [])
  
    return [user]
}

export const useData = (path, transform) => {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
  
    useEffect(() => {
        const dbRef = ref(database, path);
        const devMode = !process.env.NODE_ENV || process.env.NODE_ENV === 'development'
        if (devMode) { console.log(`loading ${path}`) }
        
        return onValue(dbRef, (snapshot) => {
            const val = snapshot.val()
            if (devMode) console.log(val)

            setData(transform ? transform(val) : val)
            setLoading(false);
            setError(null);
        }, (error) => {
            setData(null)
            setLoading(false)
            setError(error)
        })
    }, [path, transform]);
  
    return [data, loading, error];
}

export const setData = (path, value) => (
    set(ref(database, path), value)
)