<style scoped>
    .el-carousel__item h3 {
        color: #475669;
        opacity: 0.75;
        line-height: 200px;
        margin: 0;
        text-align: center;
    }

    .el-carousel__item:nth-child(2n) {
        background-color: #99a9bf;
    }

    .el-carousel__item:nth-child(2n + 1) {
        background-color: #d3dce6;
    }

    .item {
        position: relative;
        height: 100%;
    }

    .item__content {
        position: absolute;
        bottom: 0;
        width: 100%;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        background: rgba(0, 0, 0, 0.5);
        color: #fff;
        padding: 3px;
    }

    .item__image {
        width: 100%;
        height: 100%;
        object-fit: cover;
    }
</style>

<template>
    <div>
        <el-carousel :interval="2000" type="card" height="200px">
            <el-carousel-item v-for="item in carouselNum" :key="item">
                <h3 style="text='2xl';justify:center">{{ item }}</h3>
            </el-carousel-item>
        </el-carousel>


        <el-carousel :interval="2000" type="card" height="300px">
            <el-carousel-item v-for="event in carouselImgList" :key="event">
                <div class="item">
                    <div class="item__content">{{ event.name }}</div>
                    <img class="item__image" :src="event.img" alt="" @click="goToWebsite(event.website)"/>
                </div>
            </el-carousel-item>
        </el-carousel>
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    import imageA from '../assets/1.jpg'
    import imageB from '../assets/2.jpg'
    import imageC from '../assets/3.jpg'
    import imageD from '../assets/4.jpg'
    import imageE from '../assets/5.jpg'
    import imageF from '../assets/6.jpg'


    let carouselNum = ref(6)

    let carouselImgList = ref([
        {
            name:"A",
            img:imageA,
            website:'https://tw.yahoo.com/'
        },
        {
            name:"B",
            img:imageB,
            website:'https://tw.yahoo.com/'
        },
        {
            name:"C",
            img:imageC,
            website:'https://tw.yahoo.com/'
        },
        {
            name:"D",
            img:imageD,
            website:'https://tw.yahoo.com/'
        },
        {
            name:"E",
            img:imageE,
            website:'https://tw.yahoo.com/'
        },
        {
            name:"F",
            img:imageF,
            website:'https://tw.yahoo.com/'
        },
    ])

    const goToWebsite = (website) => {
        window.open(website);
    }
</script>