// Firebase App (the core Firebase SDK) is always required and must be listed first
import firebase from 'firebase/app'

// import 'firebase/analytics'
import 'firebase/database'

const firebaseConfig = {
  apiKey: 'AIzaSyCdjJc9wNncZZOeWWVJhVY0NY0bWKpSYCQ',
  authDomain: 'checkita-caad1.firebaseapp.com',
  databaseURL:
    'https://checkita-caad1-default-rtdb.europe-west1.firebasedatabase.app'
}

firebase.initializeApp(firebaseConfig)

export default {}
