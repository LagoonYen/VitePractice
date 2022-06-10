import { initializeApp } from 'firebase/app'
import { getFirestore }  from 'firebase/firestore'
import { getDatabase, ref, onValue, set } from 'firebase/database'
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

const userRef = ref(realtimeDb, 'users');

//取得成員列表
export const getUserList = () => {
    return new Promise((resolve, reject) => {
        onValue(userRef, (snapshot) => {
            let users = [];
            snapshot.forEach((childSnapshot) => {
                console.log("childSnapshot.val(), ", childSnapshot.val().userName)
                users.push({
                    userName: childSnapshot.val().userName,
                    userUid: childSnapshot.val().userUid,
                    online: childSnapshot.val().online
                })
            })
            resolve(users);
        });
    });
};

//切換上下線狀態
export const switchOnlineStatus = () => {
    const userId = getAuth().currentUser.uid;
    const userName = getAuth().currentUser.displayName;
    set(ref(realtimeDb, 'users/' + userId), {
        userUid: userId,
        userName: userName,
        online: false
    });
}