<template>
    <div>
        <circle-chart :pushProps="props"></circle-chart>
    </div>
</template>

<script setup>
    import { reactive } from 'vue'

    let props = reactive({
        labels: ['帕路', '夢幻', '阿爾宙斯', '索羅亞克', '阿爾衝浪皮', '阿爾鋁鋼', '電貓火焰鳥'],
        data: [302, 283, 196, 154, 58, 75, 150],
        backgroundColor: [
            'rgba(255, 99, 132, 0.2)',
            'rgba(54, 162, 235, 0.2)',
            'rgba(255, 206, 86, 0.2)',
            'rgba(75, 192, 192, 0.2)',
            'rgba(153, 102, 255, 0.2)',
            'rgba(255, 159, 64, 0.2)',
            'rgba(255, 12, 64, 0.2)'
        ],
        borderColor: [
            'rgba(255, 99, 132, 1)',
            'rgba(54, 162, 235, 1)',
            'rgba(255, 206, 86, 1)',
            'rgba(75, 192, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
            'rgba(255, 12, 64, 1)'
        ],
    })

</script>