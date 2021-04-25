import * as firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'
  // Your web app's Firebase configuration
  // For Firebase JS SDK v7.20.0 and later, measurementId is optional
  // Initialize Firebase
  firebase.initializeApp({
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
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
