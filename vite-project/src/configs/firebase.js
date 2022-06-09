import { initializeApp } from 'firebase/app'
import { getFirestore }  from 'firebase/firestore'
import { getDatabase } from 'firebase/database'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
    apiKey: "AIzaSyDhnYTzJ-OmeUv1M5g1NR2QM3tCYiDXGXk",
    authDomain: "vite-chat-test.firebaseapp.com",
    databaseURL: "https://vite-chat-test-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "vite-chat-test",
    storageBucket: "vite-chat-test.appspot.com",
    messagingSenderId: "1087759353908",
    appId: "1:1087759353908:web:887e37b824073cb571a261",
    measurementId: "G-RY082JR41D"
};

initializeApp(firebaseConfig)

// 一般資料庫
export const fireStoreDb = getFirestore();
// 實時資料庫
export const realtimeDb = getDatabase();
// 使用者資料
export const auth = getAuth();