<style lang="scss">
    * {
        font-family: Avenir, Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        padding: 0;
        box-sizing: border-box;
    }

    .view{
        display: flex;
        justify-content: center;
        max-height: 100%;
        background-color: rgb(188, 218, 55);

        &.login {
            align-items: center;
            .login-form {
                display: block;
                width: 100%;
                padding: 15px;
                
                .form-inner {
                    display: block;
                    background-color: #FFF;
                    padding: 50px 15px;
                    border-radius: 16px;
                    box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.2);
                    h1 {
                        color: #AAA;
                        font-size: 28px;
                        margin-bottom: 30px;
                    }
                    label {
                        display: block;
                        margin-bottom: 5px;
                        color: #AAA;
                        font-size: 16px;
                        transition: 0.4s;
                    }
                    input[type="text"] {
                        appearance: none;
                        border: none;
                        outline: none;
                        background: none;
                        display: block;
                        width: 100%;
                        padding: 10px 15px;
                        border-radius: 8px;
                        margin-bottom: 15px;
                        
                        color: #333;
                        font-size: 18px;
                        box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
                        background-color: #F3F3F3;
                        transition: 0.4s;
                        &::placeholder {
                            color: #888;
                            transition: 0.4s;
                        }
                    }
                    input[type="submit"] {
                        appearance: none;
                        border: none;
                        outline: none;
                        background: none;
                        display: block;
                        width: 100%;
                        padding: 10px 15px;
                        background-color: #ea526f;
                        border-radius: 8px;
                        color: #FFF;
                        font-size: 18px;
                        font-weight: 700;
                    }
                    &:focus-within {
                        label {
                            color: #ea526f;
                        }
                        input[type="text"] {
                            background-color: #FFF;
                            box-shadow: 0 0 6px rgba(0, 0, 0, 0.2);
                            &::placeholder {
                                color: #666;
                            }
                        }
                    }
                }
            }
        }

        &.chat{
            flex-direction: column;

            header{
                position: relative;
                display: block;
                width:100%;
                padding: 50px 30px 10px 10px;
                
                .logout {
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    appearance: none;
                    // border: none;
                    // outline: none;
                    // background: none;
                    color:rgb(45, 27, 201);
                    font-size: 18px;
                    margin-bottom: 10px;
                    text-align: right;
                }

                h1 {
                    color: rgb(59, 33, 211);
                }
            }

            .chat-bar {
                margin: 0;
                padding: 0;
                width: 200px;
                background-color: #ce3f3f;
                position: fixed;
                height: 100%;
                overflow: auto;
                border-radius: 24px 24px 24px 24px;

                .chat-bar-user-btn{
                    line-height: 50px;
                    text-align: center;
                    color: white;
                    background-color: deepskyblue;
                    margin: 10px;
                    border-radius: 25px;

                    .status{
                        width:10px;
                        height:10px;
                        border-radius: 25px;
                        display: inline-block;
                    }

                    .online{
                        background-color: greenyellow;
                    }

                    .offline{
                        background-color: red;
                    }
                }
            }

            .chat-box{
                border-radius: 24px 24px 0px 0px;
                background-color: darkorange;
                box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
                flex:1 1 100%;
                padding: 30px;
                margin-left: 200px;
                max-height: 610px;
                min-height: 610px;

                .message{
                    display: flex;
                    margin-bottom: 15px;

                    .message-inner{
                        .username{
                            color:cornflowerblue;
                            font-size: 16px;
                            margin-bottom: 5px;
                            padding-left: 15px;
                            padding-right: 15px ;
                        }

                        .content{
                            display: inline-block;
                            padding: 10px 20px;
                            background-color: darkturquoise;
                            border-radius: 999px;
                            color: lightcoral;
                            font-size: 18px;
                            line-height: 1.2em;
                            text-align: left;
                        }
                    }

                    &.current-user{
                        margin: 30px;
                        justify-content: flex-end;
                        text-align: right;

                        .message-inner{
                            max-width: 75%;

                            .content{
                                color: cornsilk;
                                font-weight: 600;
                                background-color: brown;
                            }

                            .time{
                                    color:#888;
                                    font-size: 10px;
                                    background-color: darkorange;
                                }
                        }
                    }
                }
            }
        }

        footer {
			position: sticky;
			bottom: 0px;
			background-color: #FFF;
			padding: 30px;
			box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
            margin-left: 200px;

			form {
				display: flex;
				input[type="text"] {
					flex: 1 1 100%;
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					width: 100%;
					padding: 10px 15px;
					border-radius: 8px 0px 0px 8px;
					
					color: #333;
					font-size: 18px;
					box-shadow: 0px 0px 0px rgba(0, 0, 0, 0);
					background-color: #F3F3F3;
					transition: 0.4s;
					&::placeholder {
						color: #888;
						transition: 0.4s;
					}
				}
				
				input[type="submit"] {
					appearance: none;
					border: none;
					outline: none;
					background: none;
					display: block;
					padding: 10px 15px;
					border-radius: 0px 8px 8px 0px;
					background-color: #ea526f;
					color: #FFF;
					font-size: 18px;
					font-weight: 700;
				}
			}
        }

    }
</style>

<template>
    <div>
        <div class="view chat">
            <header>
                <div>
                    <el-button class="logout" type="warning"  @click="Logout">
                        <userAvatar :prop_imgUrl="circleUrl" :prop_size="20"></userAvatar>
                        登出
                    </el-button>
                </div>
                <h1>歡迎, {{ data.authUserName }}</h1>
            </header>
            <div>
                <div class="chat-bar">
                    <div >
                        <div v-for="user in data.allUsers" :key="user.userUid" >
                            <div class="chat-bar-user-btn" v-if="user.userUid != data.authUserUid" @click="SwitchOtherUserUid(user.userUid)">
                                {{ user.userName }}
                                <div class="status" :class="(user.online ? 'online' : 'offline')"></div>
                            </div>
                        </div>
                    </div>
                </div>
                <chatBroad v-if="data.roomExist === true" :prop_authUserUid="data.authUserUid" :prop_authOtherUid="data.authOtherUid">
                </chatBroad>
                <el-empty v-else description="請選擇聊天室" style="min-height:720px"/>
            </div>
        </div>
    </div>
</template>

<script setup>
    import { reactive, onMounted, onBeforeMount, ref } from 'vue'
    import { getAuth, signOut } from "firebase/auth";
    import { auth, getUserList, switchOnlineStatus } from '../configs/firebase';
    import { useRouter } from "vue-router";
    //已使用直接引用component
    // import chatBroad from '../components/chat-Broad.vue';
    // import userAvatar from '../components/userAvatar.vue'

    let circleUrl = ref("https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png")

    let data = reactive({
        authUserUid:"",
        authUserName:"",
        authOtherUid:"",
        roomExist:false,
        userName: "",
        messages: [],
        allUsers: [],
    })

    let user = auth.currentUser;

    const SwitchOtherUserUid = ( OtherUid ) => {
        data.authOtherUid = OtherUid;
        if(data.authOtherUid != ""){
            data.roomExist= true;
        }
    }

    onBeforeMount(() => {
        if (user != null) {
            data.authUserName = user.displayName;
            data.authUserUid = user.uid;
        }
    })

    onMounted(() => {
        getUserList().then(response => {
            data.allUsers = response;
        });
        console.log("allUsers", data.allUsers);
    })

    const router = useRouter()

    const Logout = () => {
        switchOnlineStatus();
        console.log("switchOnlineStatus")
        signOut(auth).then(() => {
            router.push("/");
        })
    }
</script>