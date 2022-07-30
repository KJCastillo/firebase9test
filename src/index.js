import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";

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

//init services
const db = getFirestore();

//collection ref
const colRef = collection(db, "books");

//get collection data
getDocs(colRef)
.then((snapshot) => {
  let books = []
  snapshot.docs.forEach((doc) => {
    books.push({...doc.data(), id: doc.id})
  })
  console.log(books)
})
.catch(err => {
    console.log(err.message)
})