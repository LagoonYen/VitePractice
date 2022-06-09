<style lang="scss">
    *{
        .chat-box{
            border-radius: 24px 24px 0px 0px;
            background-color: rgb(181, 224, 61);
            box-shadow: 0px 0px 12px rgba(23, 150, 182, 0.2);
            flex:1 1 100%;
            padding: 30px;
            margin-left: 200px;
            max-height: 630px;
            min-height: 630px;

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
                            color: rgb(39, 221, 85);
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

        footer {
            position: sticky;
			bottom: 0px;
			background-color: rgb(255, 255, 255);
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

        .infinite-list {
            height: 580px;
            width:auto;
            padding: 0;
            margin: 0;
            list-style:none;
        }

        .infinite-list .infinite-list-item {
            display: flex;
            align-items: center;
            // justify-content: center;
            height: auto;
            // background: var(--el-color-primary-light-9);
            margin: 10px;
            color: var(--el-color-primary);
        }
        .infinite-list .infinite-list-item + .list-item {
            margin-top: 5px;
        }
    }
</style>

<template>
    <div>
        <div class="chat-box">
            <ul class="infinite-list" style="overflow: auto">
                <li v-for="message in state.messages" :key="message.userName" class="infinite-list-item" :class="(message.userName == authUser.name ? 'message current-user' : 'message')">
                    <div class="message-inner">
                        <div style="display:flex">
                            <userAvatar :prop_imgUrl="circleUrl" :prop_size="25"></userAvatar>
                            <div class="username">{{ message.userName }}</div>
                        </div>
                        <div>
                            <div class="content">{{ message.content }}</div>
                        </div>
                    </div>
                </li>
            </ul>
        </div>
        <footer>
            <form @submit.prevent="SendMessage">
                <input type="text" v-model="inputMessage" placeholder="Write a message...">
                <input type="submit" value="Send">
            </form>
        </footer>
    </div>
</template>

<script setup>
    import { reactive, onMounted, onBeforeMount, ref, onBeforeUpdate } from 'vue'
    import { ref as ref_database, onValue } from "firebase/database";
    import { realtimeDb, auth } from '../configs/firebase';
    import userAvatar from './userAvatar.vue';

    let props = defineProps(['prop_authUserUid', 'prop_authOtherUid'])

    let prop_authUserUid = ref("")
    let prop_authOtherUid = ref("")

    let authUser = reactive({
        name:"",
        photoUrl:"",
    })

    let inputMessage = ref("")

    let chatRoomId = ref("")

    let state = reactive({
        messages: [],
    })

    let circleUrl = ref("https://cube.elemecdn.com/3/7c/3ea6beec64369c2642b92c6726f1epng.png")

    let user = auth.currentUser;

    onBeforeMount(() => {
        if (user !== null) {
            authUser.name = user.displayName
            authUser.photoUrl = user.photoURL
        }
    })


    onMounted(() => {
        //chat Realtime Database
        console.log("建立Chatroom", prop_authUserUid, prop_authOtherUid)
        chatRoomSwitch();
    });

    const chatRoomSwitch = () => {
        prop_authUserUid.value = props.prop_authUserUid;
        prop_authOtherUid.value = props.prop_authOtherUid;

        chatRoomId.value = 'chat/' + prop_authUserUid.value + '/' + prop_authOtherUid.value

        const messageRef = ref_database(realtimeDb, chatRoomId.value);

        onValue(messageRef, (snapshot) => { 
            console.log("messageRef", snapshot.val())
            let messages = [];
            
            snapshot.forEach((childSnapshot) => {
                console.log("childSnapshot", childSnapshot.val().userName, childSnapshot.val().content)
                messages.push({
                    userName: childSnapshot.val().userName,
                    photoUrl: childSnapshot.val().photoUrl,
                    content: childSnapshot.val().content,
                    time: childSnapshot.val().time
                })
            });
            state.messages = messages;
        });
    }

    onBeforeUpdate(() => {
        chatRoomSwitch();
    })
    
</script>