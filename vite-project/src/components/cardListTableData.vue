<template #default>
    <div style="background-color:crimson">
        <table>
            <tr v-for="item in newsData" v-bind:key="item">
                <td>{{item.Id}}</td>
                <td>{{item.Name}}</td>
                <td>{{item.UpdateAdmin}}</td>
                <td>{{item.UpdateTime}}</td>
            </tr>
        </table>
    </div>
</template>

<script>
import { onBeforeMount, onBeforeUpdate, onUpdated, onMounted, onUnmounted, ref, reactive, toRef, toRefs } from 'vue'

export default ({
    setup(){
        const newsData = ref([]);
        const api = "https://localhost:7291/api/Backend/GetCards"
        const fetchData = async () => await fetch(api)
            .then(res => res.json())
            .then(data => newsData.value = data)
            
        onBeforeMount(() => {
            fetchData()
        })
        return{ newsData }
    },
})
</script>
