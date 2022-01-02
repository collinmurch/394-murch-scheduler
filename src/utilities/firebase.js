import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'
import { getDatabase, onValue, ref } from 'firebase/database'

const firebaseConfig = {
    apiKey: process.env.API_KEY || "",
    authDomain: process.env.AUTH_DOMAIN || "",
    databaseURL: process.env.DATABASE_URL || "",
    projectId: process.env.PROJECT_ID || "",
    storageBucket: process.env.STORAGE_BUCKET || "",
    messagingSenderId: process.env.MESSAGING_ID || "",
    appId: process.env.APP_ID || "",
    measurementId: process.env.MEASUREMENT_ID || ""
}

const firebase = initializeApp(firebaseConfig)
const database = getDatabase(firebase)

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