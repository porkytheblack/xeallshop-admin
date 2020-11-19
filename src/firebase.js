import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "AIzaSyBaJnsrCzkT08KoNnIOagCOey81sehfym8",
    authDomain: "xeallshop.firebaseapp.com",
    databaseURL: "https://xeallshop.firebaseio.com",
    projectId: "xeallshop",
    storageBucket: "xeallshop.appspot.com",
    messagingSenderId: "173019457649",
    appId: "1:173019457649:web:348a9fb99f4686117d13d0",
    measurementId: "G-ZWT9WDZKZL"
  });

  const db = firebase.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()
  const usersCollection = db.collection('xealUsers')
  const productsCollection = db.collection('xeallproducts')
  const licenceKeys = db.collection('licenceKeys')

  export{
    db,
    auth,
    usersCollection,
    productsCollection,
    storage,
    licenceKeys
  }
