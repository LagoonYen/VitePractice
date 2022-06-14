<style>
    .timelineItemClass{
        /* margin-top:20px; */
    }
</style>

<template>
    <div>
        <el-timeline>
            <el-timeline-item
                v-for="(activity, index) in activities"
                :key="index"
                :timestamp="activity.timestamp"
                >
                {{ activity.content }}
            </el-timeline-item>
        </el-timeline>

        <el-timeline>
            <el-timeline-item class="timelineItemClass" v-for="(activity, index) in activities" :key="index" :timestamp="activity.timestamp" placement="top">
                <el-card>
                    <img v-if="activity.image" class="item__image" :src="activity.image" alt="" style="height:300px"/>
                    <h4>{{ activity.word }}</h4>
                    <p>{{ activity.content }}</p>
                    <p>Tom committed {{ activity.timestamp }}</p>
                </el-card>
            </el-timeline-item>
            <el-timeline-item class="timelineItemClass" timestamp="2022-04-01" placement="top">
                Start Point
            </el-timeline-item>
        </el-timeline>
    </div>
</template>

<script setup>
    import imageA from '../assets/1.jpg'
    import imageB from '../assets/2.jpg'
    import imageC from '../assets/3.jpg'
    import imageD from '../assets/4.jpg'
    import imageE from '../assets/5.jpg'
    import imageF from '../assets/6.jpg'

    const activities = [
        {
            content: 'Present Day',
            word:'Update Github template',
            image:imageA,
            timestamp: '2018-04-15',
        },
        {
            content: 'Approved',
            word:'Update Github template',
            image:imageB,
            timestamp: '2018-04-13',
        },
        {
            content: 'Success',
            word:'Update Github template',
            image:imageC,
            timestamp: '2018-04-11',
        },
        {
            content: 'Success',
            word:'Update Github template',
            
            timestamp: '2018-04-10',
        },
    ]
</script>