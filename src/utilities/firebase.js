import { useState, useEffect } from 'react'
import { initializeApp } from 'firebase/app'

import { getDatabase, onValue, ref } from 'firebase/database'

const firebaseConfig = {
    apiKey: "AIzaSyBK17WGXejaGIc4zO0hW1wz-D7kreWJKUY",
    authDomain: "murch-scheduler.firebaseapp.com",
    databaseURL: "https://murch-scheduler-default-rtdb.firebaseio.com",
    projectId: "murch-scheduler",
    storageBucket: "murch-scheduler.appspot.com",
    messagingSenderId: "47106337420",
    appId: "1:47106337420:web:49d01305de5c550f21a9a9",
    measurementId: "G-NJ0JRXCFJG"
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