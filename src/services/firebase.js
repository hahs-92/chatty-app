
import { initializeApp } from "firebase/app";
import { getAuth} from 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyACdMf8TjUK-Mn9nao-x70Flrb-tbOQ3ic",
  authDomain: "chatty-442b1.firebaseapp.com",
  projectId: "chatty-442b1",
  storageBucket: "chatty-442b1.appspot.com",
  messagingSenderId: "854995389340",
  appId: "1:854995389340:web:f5aeb47efee5e659541659"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig)


export const auth = getAuth(app)
//export const db = app.database()

// export const auth = firebase.auth
// export const db = firebase.database()
