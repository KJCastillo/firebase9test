import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  onSnapshot,
  addDoc,
  deleteDoc,
  doc,
  query,
  where,
  orderBy,
  serverTimestamp,
  getDoc,
  updateDoc,
} from "firebase/firestore";

import { getAuth, createUserWithEmailAndPassword,
signOut, signInWithEmailAndPassword, onAuthStateChanged
} from "firebase/auth";

const firebaseConfig = {
  apiKey: "AIzaSyBk6MXZ_a-f7R-boYqtYftZUtKGysD9DXA",
  authDomain: "fir-9-test-b1371.firebaseapp.com",
  projectId: "fir-9-test-b1371",
  storageBucket: "fir-9-test-b1371.appspot.com",
  messagingSenderId: "866096570853",
  appId: "1:866096570853:web:cd208c1da411414b838f0c",
};

//init firebase app
initializeApp(firebaseConfig);

//init services - imported on top
const db = getFirestore();
const auth = getAuth();

//collection ref  imported on top
const colRef = collection(db, "books");

// queries
const q = query(colRef, orderBy("createdAt"));

//real time collection data - imported on top
const unsubCol = onSnapshot(q, (snapshot) => {
  let books = [];
  snapshot.docs.forEach((doc) => {
    books.push({ ...doc.data(), id: doc.id });
  });
  console.log(books);
});

//adding documents - imported on top
const addBookForm = document.querySelector(".add");
addBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  addDoc(colRef, {
    title: addBookForm.title.value,
    author: addBookForm.author.value,
    createdAt: serverTimestamp(),
  }).then(() => {
    addBookForm.reset();
  });
});

//deleting documents - imported on top
const deleteBookForm = document.querySelector(".delete");
deleteBookForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", deleteBookForm.id.value);

  deleteDoc(docRef).then(() => {
    deleteBookForm.reset();
  });
});

//get a single document
const docRef = doc(db, "books", "c4j0NKyfiTX2mJDWl5Ma");

const unsubDoc = onSnapshot(docRef, (doc) => {
  console.log(doc.data(), doc.id);
});

//updating a document
const updateForm = document.querySelector(".update");
updateForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const docRef = doc(db, "books", updateForm.id.value);

  updateDoc(docRef, {
    title: "updated title",
  }).then(() => {
    updateForm.reset();
  });
});

//signing users up
const signupForm = document.querySelector(".signup");
signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = signupForm.email.value;
  const password = signupForm.password.value;

  createUserWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    //console.log('user created:',cred.user)
    signupForm.reset()
  })
  .catch(err => {console.log(err.message)})
});


//logging in and out
const logoutButton = document.querySelector('.logout')
logoutButton.addEventListener('click', () => {
  signOut(auth)
  .then(() => {
   // console.log('user signed out')
  })
  .catch((err) => {
    console.log(err.message)
  })
})

const loginForm = document.querySelector('.login')
loginForm.addEventListener('submit', (e) => {
  e.preventDefault()

  const email = loginForm.email.value
  const password = loginForm.password.value
  
  signInWithEmailAndPassword(auth, email, password)
  .then((cred) => {
    //console.log('user logged in:', cred.user)
  })
  .catch((err) => {
    console.log(err.message)
  })
})

//subscribing to auth changes
//states all auth changes like sign in, out and new ones
const unsubAuth = onAuthStateChanged(auth, (user) => {
console.log('user status changed:', user)
})

//unsubscribing from changes (auth & db)
const unsubButton = document.querySelector('.unsub')
unsubButton.addEventListener('click', () => {
  console.log('unsubscribing')
  unsubCol()
  unsubDoc()
  unsubAuth()
})