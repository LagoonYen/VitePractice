<template>
    <div>
        <div style="background-color:darkorange">
            <div>
                {{name}} <button @click="setName">切換暱稱</button>
            </div>
            <div>
                {{nameNew.initName}}
                <button @click="nameNew.setName">只能叫暱稱</button>
            </div>
            <div>
                {{nameNewPro.Name1}}
                <button @click="nameNewPro.setName">隱姓埋名Pro1</button>
            </div>
            <div>
                {{nameNewPro.Name2}}
                <button @click="nameNewPro.setFake">隱姓埋名Pro2</button>
            </div>
        </div>
        <div style="background-color:lightgoldenrodyellow">
            <div>
                <input :value="input">
                <button @click="copy(input)">點擊複製</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, reactive ,watch, watchEffect } from 'vue';
import { useClipboard } from '@vueuse/core';

export default({
    setup() {
        //name
        const name = ref('Yen') 

        const setName = () => {
            if(name.value != '大俠愛吃漢堡飽'){
                name.value = '大俠愛吃漢堡飽'
            }
            else{
                name.value = 'Yen'
            }
        }
        
        watch(name, (val, oldVal)=>{
            console.log(`newName:${val}, oldName: ${oldVal}`);
        })

        //nameNew
        const nameNew = reactive({
            initName : 'Yen2',
            setName: ()=> nameNew.initName = '大俠愛吃漢堡飽'
        }) 

        watch(()=> nameNew.initName,(val, oldVal)=>{
            console.log(`newName: ${val}, oldName:${oldVal}`);
        })

        //nameNewPro
        const nameNewPro = reactive({
            Name1 : 'YenYen',
            setName: ()=> nameNewPro.Name1 = '洛奇亞',
            Name2 : 'YenYenYen',
            setFake: ()=> nameNewPro.Name2 = '火球鼠',
        })

        watch([()=> nameNewPro.Name1,()=> nameNewPro.Name2],([val, valFake], [oldVal, oldValFake])=>{
            console.log(`newName: ${val}, oldName:${oldVal}`);
            console.log(`newName: ${valFake}, oldName:${oldValFake}`);
        })

        //watchEffect
        const stop = watchEffect(()=>{
            console.log("watchEffect", name.value)
            console.log("watchEffect2", nameNew.initName)
            console.log("watchEffect3", nameNewPro.Name1)
        })

        //vueUse Copy
        const input = ref('我是 Yen')
        const { 
            text, //複製的值
            isSupported, //瀏覽器有無支援
            copy, //方法
            copied 
        } = useClipboard() 


        return {
            name,
            nameNew,
            nameNewPro,
            input,
            text,
            copy,
            setName,
        }
    }
});
</script>