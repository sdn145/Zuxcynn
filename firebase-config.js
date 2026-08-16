import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

import {
  getFirestore,
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

import {
  getAuth,
  signInAnonymously
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

const firebaseConfig = {
  apiKey: "AIzaSyCLKvbfsNBCK-GNy_38lMLtSxr4qJgYprc",
  authDomain: "zuxcyn-store-d26f6.firebaseapp.com",
  projectId: "zuxcyn-store-d26f6",
  storageBucket: "zuxcyn-store-d26f6.firebasestorage.app",
  messagingSenderId: "1068040066027",
  appId: "1:1068040066027:web:72f4e992ff5cf29819bfae",
  measurementId: "G-J109C49YC5"
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

export {
  collection,
  getDocs,
  addDoc,
  doc,
  getDoc,
  updateDoc,
  deleteDoc,
  serverTimestamp,
  query,
  orderBy
};

export async function initFirebase() {
  if (!auth.currentUser) {
    await signInAnonymously(auth);
  }
}