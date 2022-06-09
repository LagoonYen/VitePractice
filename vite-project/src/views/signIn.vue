<template>
    <div>
        <h1>登入帳號</h1>
        <el-input v-model="user.email" placeholder="信箱" />
        <el-input v-model="user.password" placeholder="密碼" type="password" show-password/>
        <div v-if="errMsg">
            {{ errMsg }}
            </div>
        <button @click="SignIn">Submit</button>
        <button @click="SignInWithGoogle">利用google登入</button>
        </div>
</template>


<script setup>
    import { ref, reactive } from "vue";
    import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
    import { useRouter } from 'vue-router'
    import { doc, setDoc } from "firebase/firestore";
    import { fireStoreDb, realtimeDb } from "../configs/firebase"
    import { ref as ref_database, set } from "firebase/database"

    const user = reactive({
        email:"",
        password:""
    })
    
    const errMsg = ref("");
    const router = useRouter();

    const SignIn = () => {
        signInWithEmailAndPassword(auth, user.email, user.password)
        .then((data) => {
            console.log(auth.currentUser)

            switchOnlineStatus();

            router.push("/realTimeChatEach")
        })
        .catch((error) => {
            console.log(error.code)
            switch(error.code){
                case "auth/invalid-email":
                    errMsg.value = "信箱不符合規格"
                    break;
                case "auth/user-not-found":
                    errMsg.value = "信箱未找到"
                    break;
                case "auth/wrong-password":
                    errMsg.value = "密碼錯誤"
                    break;
                default:
                    errMsg.value = "帳密錯誤"
                    break;
            }
        })
    }

    const SignInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            
            switchOnlineStatus();

            router.push("/realTimeChatEach")
        })
        .catch((error) => {
            console.log(error.code)
        })
    }

    const switchOnlineStatus = () => {
        //fireStoreDb Database
        const userId = getAuth().currentUser.uid;
        const userName = getAuth().currentUser.displayName;
        const userRef = doc(fireStoreDb, 'users', userId);
        setDoc(userRef, { online: true }, { merge: true });

        //realtime Database
        set(ref_database(realtimeDb, 'users/' + userId), {
            userUid: userId,
            userName: userName,
            online: true
        });
    }
</script>