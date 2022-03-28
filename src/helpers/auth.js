import {
    createUserWithEmailAndPassword,
    signInWithEmailAndPassword,
    signInWithPopup,
    GoogleAuthProvider,
    signOut
} from 'firebase/auth'
import { auth } from '../services/firebase'

export const provider = new GoogleAuthProvider()

export const signup = async(email, password) => {
   return await createUserWithEmailAndPassword(auth, email, password)
}


export const signin = async(email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
}

export const signInWithGoogle = async() => {
    return await signInWithPopup(auth, provider)
}


export const logout = async() => {
    return await signOut(auth)
}

