<style scoped>
    .elAvatar{
        width:30px;
    }
</style>

<template>
    <el-avatar
        v-if="props.prop_imgUrl"
        shape="circle"
        :size="props.prop_size"
        :key="props.prop_imgUrl"
        :src="props.prop_imgUrl"
    >
    </el-avatar>

</template>

<script setup>
    import { reactive, toRefs, ref, onBeforeMount } from 'vue'
    let props = defineProps(['prop_imgUrl', 'prop_size'])
</script>