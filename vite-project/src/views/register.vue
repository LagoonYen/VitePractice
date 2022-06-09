<template>
    <div>
        <h1>註冊</h1>
        <div>
            <el-input v-model="email" placeholder="信箱" />
        </div>
        <div>
            <el-input v-model="password" placeholder="密碼" type="password" show-password/>
        </div>
        <div>
            <button @click="register">Submit</button>
            <button @click="signInWithGoogle">利用google註冊</button>
        </div>
    </div>
</template>

<script setup>
    import { ref } from "vue";
    import { getAuth, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth"
    import { useRouter } from 'vue-router'

    const email = ref("");
    const password = ref("");
    const router = useRouter();
    
    const register = () => {
        createUserWithEmailAndPassword(getAuth(), email.value, password.value)
        .then((data) => {
            console.log("註冊成功");
            router.push("/chatroom")
        })
        .catch((error) => {
            console.log(error.code)
            alert(error.message)
        })
    }
    
    const signInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        signInWithPopup(getAuth(), provider)
        .then((result) => {
            console.log(result.user);
            router.push("/chatroom")
        })
        .catch((error) => {
            console.log(error.code)
        })
    }
</script>