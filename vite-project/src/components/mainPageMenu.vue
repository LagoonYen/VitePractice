<style scoped>
    .sub_container {
    width: 100%;
    height: 82%;
    }
    .right_content {
        width: 100%;
        height: 100%;
        background: url("http://desk.fd.zol-img.com.cn/t_s1440x900c5/g5/M00/01/0E/ChMkJ1dM_meIOd3-AAmh9tDS1PQAASFOgJLbx0ACaIO795.jpg");
    }
    .menu {
        height: 100%;
    }
    .tabs {
        width: 100%;
        height: 100%;
    }

    .flex-grow {
        flex-grow: 1;
    }
</style>

<template>
            <el-menu
                :default-active="activeIndex"
                class="el-menu-demo"
                mode="horizontal"
                @select="handleSelect"
                background-color="#545c64"
                text-color="#fff"
                :ellipsis="false"
                router
                >
                <el-menu-item index="/">首頁</el-menu-item>
                <el-sub-menu index="1">
                    <template #title>開始練習</template>
                    <el-menu-item index="/practicePageA"><i class="el-icon-star-on"></i>練習A</el-menu-item>
                    <el-menu-item index="1-2"><i class="el-icon-star-on"></i>練習B</el-menu-item>
                    <el-menu-item index="1-3"><i class="el-icon-star-on"></i>練習C</el-menu-item>
                </el-sub-menu>
                
                <el-sub-menu index="2">
                    <template #title>聊天室</template>
                    <el-menu-item index="/realTimeChat"><i class="el-icon-star-on"></i>全頻聊天</el-menu-item>
                    <el-menu-item index="/realTimeChatEach"><i class="el-icon-star-on"></i>1 on 1聊天</el-menu-item>
                </el-sub-menu>

                <el-sub-menu index="3">
                    <template #title>UI套件</template>
                    <el-sub-menu index="3-1">
                        <template #title>Element</template>
                        <el-menu-item index="/elementCalendar">日曆</el-menu-item>

                    </el-sub-menu>
                    <el-sub-menu index="3-2">
                        <template #title>Vuetify</template>
                        <el-menu-item index="/vuetifyCalendar">日曆</el-menu-item>

                    </el-sub-menu>
                    <el-sub-menu index="3-3">
                        <template #title>FullCalendar</template>
                        <el-menu-item index="/fullCalendar">日曆</el-menu-item>

                    </el-sub-menu>
                </el-sub-menu>

                <div class="flex-grow" />
                <el-sub-menu index="99">
                    <template #title>登入/註冊</template>
                        <el-menu-item index="/register">註冊</el-menu-item>
                        <el-menu-item index="/signIn">登入</el-menu-item>
                </el-sub-menu>
                <el-menu-item v-if="isLoggedIn" @click="handSignOut" index="4">登出</el-menu-item>
                <!-- </div> -->
            </el-menu>
        
</template>

<script setup>
    import { onMounted, ref } from "vue";
    import { useRouter } from "vue-router";
    import { getAuth, onAuthStateChanged, signOut } from "firebase/auth"
    import { ref as ref_database, set } from "firebase/database"
    import { realtimeDb } from "../configs/firebase"

    let isLoggedIn = ref(false);
    const router = useRouter()

    let auth;

    const activeIndex = ref('/')
    const activeIndex2 = ref('/')

    const handleSelect = (key, keyPath) => {
        console.log(key, keyPath)
    }

    const handSignOut = () => {
        switchOnlineStatus();
        console.log("switchOnlineStatus")
        signOut(auth).then(() => {
            router.push("/");
        })
    }

    const switchOnlineStatus = () => {
        const userId = getAuth().currentUser.uid;
        const userName = getAuth().currentUser.displayName;
        set(ref_database(realtimeDb, 'users/' + userId), {
            userUid: userId,
            userName: userName,
            online: false
        });
    }

    onMounted(() => {
        auth = getAuth();
        onAuthStateChanged(auth, (user) => {
            if(user){
                isLoggedIn.value = true;
            }
            else{
                isLoggedIn.value = false;
            }
        })
    })
</script>
