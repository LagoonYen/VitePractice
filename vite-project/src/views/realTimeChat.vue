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
        min-height: 100vh;
        background-color: aquamarine;

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
                    border: none;
                    outline: none;
                    background: none;
                    
                    color:orangered;
                    font-size: 18px;
                    margin-bottom: 10px;
                    text-align: right;
                }

                h1 {
                    color: rgb(59, 33, 211);
                }
            }

            .chat-box{
                border-radius: 24px 24px 0px 0px;
                background-color: darkorange;
                box-shadow: 0px 0px 12px rgba(100, 100, 100, 0.2);
                flex:1 1 100%;
                padding: 30px;
            
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
        <!-- <div class="view Login"> -->
        <div class="view Login" v-if="state.userName === '' || state.userName === null">
            <div class="login-form" @submit.prevent="Login">
                <div class="form-inner">
                    <h1>登入進firebase</h1>
                    <label for="username">使用者</label>
                    <input type="text" v-model="inputUserName" placeholder="請輸入姓名">
                    <input type="submit" @click="Login">
                </div>
            </div>
        </div>

        

        <!-- <div class="view chat"> -->
        <div class="view chat" v-else>
            <header>
                <button class="logout" @click="Logout">登出</button>
                <h1>歡迎, {{ state.userName }}</h1>
            </header>
            <section class="chat-box">
                <div
                    v-for="message in state.messages"
                    :key="message.userName"
                    :class="(message.userName == state.userName ? 'message current-user' : 'message')"
                    >
                    <div class="message-inner">
                        <div class="username">{{ message.userName }}</div>
                        <div class="content">{{ message.content }}</div>
                    </div>
                </div>
            </section>
            <footer>
                <form @submit.prevent="SendMessage">
                    <input type="text" v-model="inputMessage" placeholder="Write a message...">
                    <input type="submit" value="Send">
                </form>
            </footer>
        </div>
    </div>
</template>

<script setup>
    import { reactive, onMounted, ref } from 'vue'
    import { getDatabase, ref as ref_database, set, push, onValue } from "firebase/database";
    import { getAuth, onAuthStateChanged } from "firebase/auth";

    const inputUserName = ref("")
    const inputMessage = ref("")

    const state = reactive({
        userName: "",
        messages: []
    })

    const Login = () => {
        if( inputUserName.value != "" || inputUserName.value != null ){
            state.userName = inputUserName.value;
            inputUserName.value = "";
        }
    }

    const SendMessage = () => {
        console.log("test SendMessage")
        console.log(inputUserName.value, inputMessage.value)
        if( inputMessage.value === "" || inputMessage.value === null ){
            return;
        }

        const db = getDatabase();
        const messageRef = ref_database(db, 'messages');

        const newPostRef = push(messageRef);
        set(newPostRef, {
            userName: state.userName,
            content: inputMessage.value
        });

        inputMessage.value = "";
    }

    onMounted(() => {
        const db = getDatabase();
        const messageRef = ref_database(db, 'messages');

        onValue(messageRef, (snapshot) => {
            console.log("snapshot", snapshot.val())

            let messages = [];

            snapshot.forEach((childSnapshot) => {
                const childKey = childSnapshot.key;
                console.log("childSnapshot.val().userName, ", childSnapshot.val().userName,)
                messages.push({
                    userName: childSnapshot.val().userName,
                    content: childSnapshot.val().content
                })
            });

            state.messages = messages
            console.log("state.messages", messages, state.messages)
        });
    })

    const Logout = () => {
        state.userName = "";
    }
</script>