<template>
    <div>
        <div style="background-color:cornflowerblue;">
            <div> Wow！{{name}}</div>

            <div>setCount.count : {{setCount.count}}</div>
            <button @click="setCount.plus"> +1 </button>
            <div>
                <input ref="inputDom"/>
            </div>

            <div v-for ="(num, index) in nums"  :key="num" :ref="(el)=>{ divs[index] = el }">{{num}}</div>

            <div class="wrap">
                <div class="container">
                    <h3>使用 toRef 測試</h3>
                    <div>
                        {{userName}}
                    </div>
                    <div>
                        <input type="text" v-model="userName">
                    </div>
                </div>
            </div>
        </div>

        <div style="background-color:cornflowerblue;">
            <table>
                <tr v-for="item in newsData" v-bind:key="item">
                    <td>{{item.Id}}</td>
                    <td>{{item.Name}}</td>
                    <td>{{item.UpdateAdmin}}</td>
                    <td>{{item.UpdateTime}}</td>
                </tr>
            </table>
        </div>
    </div>
</template>


<script>
import { onBeforeMount, onBeforeUpdate, onUpdated, onMounted, onUnmounted, ref, reactive, toRef, toRefs } from 'vue'

export default {
    props: {
        name: String //ReadOnly
    },
    setup(props){
        const name = ref('Yen');
        
        const setCount = reactive({
            count : 1,
            plus : ()=> setCount.count ++
        }); 

        const inputDom = ref(null); //變數需與模板ref的 名稱一樣

        const nums = reactive([1,2,3])
        const divs = ref([]); 

        const userInfo = reactive({
            name:'Winnie',
            age: 24
        })

        const newsData = ref([]);

        const userName = toRef(userInfo, 'name') //將響應物件裡的屬性抽離出來 使用

        console.log(props.name) //undefined

        const api = "https://localhost:7291/api/Backend/GetCards"

        const fetchData = async () => await fetch(api)
            .then(res => res.json())
            .then(data => newsData.value = data)
    
        
        onMounted(() => {  // 使用的方式改為函數式的方式來使用
            console.log('mounted!')

            //DOM元素將在初始渲染之後分配給ref
            console.log(inputDom.value)
        })
        onUpdated(() => {
            console.log('updated!')

            console.log('toRef:',userName.value)  
            console.log('元物件:',userInfo.name) // 元物件內的name
        })
        onBeforeUpdate(()=>{
            divs.value = [] 
        })
        onUnmounted(() => {
            console.log('unmounted!')
        })
        onBeforeMount(() => {
            
        })
        
        console.log(name) // 回傳一個RefImpl 物件
        console.log(name.value) // Jennifer Lopez

        return { name, setCount, inputDom, nums, divs, userName, newsData }
    }
}
</script>
