import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from 'firebase/auth'
import { auth } from '../services/firebase'


export const signup = async(email, password) => {
   return await createUserWithEmailAndPassword(auth, email, password)
}


export const signin = async(email, password) => {
    return await signInWithEmailAndPassword(auth, email, password)
 }

export function signInWithGoogle() {
    const provider = new auth.GoogleAuthProvider();
    return auth().signInWithPopup(provider);
}
