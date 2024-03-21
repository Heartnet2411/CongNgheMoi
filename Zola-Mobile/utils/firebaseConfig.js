// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getAnalytics } from 'firebase/analytics'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyAATI1hJN2-HpaqWf-ZVjRfJm49FWIw6Yo',
    authDomain: 'zola-c23d4.firebaseapp.com',
    projectId: 'zola-c23d4',
    storageBucket: 'zola-c23d4.appspot.com',
    messagingSenderId: '938152194653',
    appId: '1:938152194653:web:eb4e1bac927061bfd413b4',
    measurementId: 'G-08MEPCG8S8',
}

// Initialize Firebase
const app = initializeApp(firebaseConfig)
const analytics = getAnalytics(app)
