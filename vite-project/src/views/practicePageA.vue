<template>
    <div>
        <!-- <img alt="Vue logo" src="@/assets/img/logo.png" /> -->

        <!-- <Suspense>
            <template #fallback>
                <Loading/>
                <h1>123456789123456789</h1>
            </template>
            <template #default>
                <CardListTableData></CardListTableData>
            </template>
        </Suspense> -->
        
        <CardListTable></CardListTable>
        <Character></Character>
        <Hero></Hero>
        
        <icon-ion-arrow-undo-circle/>
        <icon-carbon-accessibility/>
        <icon-mdi-account-box style="font-size: 2em; color: red"/>
    </div>
</template>

<script setup>
    import { ref, provide, readonly  } from 'vue';

    const count = ref(0);
    const setCount = ()=> {
        count.value++
    }
    
    //傳遞資料也可以是任何形式，如ref物件 、字串等
    provide('figure', "Yen"); 
    provide('message', "小明 你吃飽了嗎"); 
    
    provide('count', readonly(count)) // 使用readonly把保護起來，只能透過setCount來更動它。
    provide('setCount',setCount)
</script>