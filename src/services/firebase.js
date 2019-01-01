import firebase from 'firebase/app'
import 'firebase/auth'

const config = {
  apiKey: 'AIzaSyC3WOe-fElLek_nbCndQpI3q7N_jkhqF4A',
  authDomain: 'ku-authen-demo.firebaseapp.com',
  databaseURL: 'https://ku-authen-demo.firebaseio.com',
  projectId: 'ku-authen-demo',
  storageBucket: 'ku-authen-demo.appspot.com',
  messagingSenderId: '926676058125'
}

if (!firebase.apps.length) {
  firebase.initializeApp(config)
}

export default firebase
