// firebase-config.js

import {
  initializeApp
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-app.js";

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
  orderBy,
  where
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-firestore.js";

import {
  getAuth,
  signInAnonymously,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.14.1/firebase-auth.js";

/*
====================================================
 FIREBASE CONFIG
====================================================

PENTING:
Ganti SEMUA nilai di bawah dengan config Firebase
punyamu yang asli.

Ambil dari:

Firebase Console
→ Project Settings
→ General
→ Your apps
→ Web app
→ Firebase SDK snippet
→ Config
*/

const firebaseConfig = {
  apiKey: "MASUKKAN_API_KEY_FIREBASE_KAMU",
  authDomain: "PROJECT_ID_KAMU.firebaseapp.com",
  projectId: "PROJECT_ID_KAMU",
  storageBucket: "PROJECT_ID_KAMU.firebasestorage.app",
  messagingSenderId: "MESSAGING_SENDER_ID_KAMU",
  appId: "APP_ID_KAMU"
};

// ===============================
// INITIALIZE FIREBASE
// ===============================

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
export const auth = getAuth(app);

// ===============================
// FIRESTORE EXPORTS
// ===============================

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
  orderBy,
  where
};

// ===============================
// LOGIN ANONYMOUS
// ===============================

export async function initFirebase() {
  try {
    if (auth.currentUser) {
      return auth.currentUser;
    }

    const result = await signInAnonymously(auth);

    console.log(
      "Firebase berhasil terhubung:",
      result.user.uid
    );

    return result.user;

  } catch (error) {

    console.error(
      "Firebase Auth Error:",
      error
    );

    throw error;
  }
}

// ===============================
// TUNGGU AUTH SIAP
// ===============================

export function waitForFirebaseAuth() {
  return new Promise((resolve, reject) => {

    const unsubscribe = onAuthStateChanged(
      auth,
      (user) => {

        unsubscribe();

        if (user) {
          resolve(user);
        } else {
          reject(
            new Error(
              "Firebase Authentication belum aktif."
            )
          );
        }

      },
      (error) => {

        unsubscribe();
        reject(error);

      }
    );

  });
}

// ===============================
// CEK STATUS FIREBASE
// ===============================

export async function checkFirebase() {

  try {

    await initFirebase();

    return {
      success: true,
      message: "Firebase terhubung"
    };

  } catch (error) {

    return {
      success: false,
      message: error?.message || "Firebase gagal terhubung"
    };

  }

}