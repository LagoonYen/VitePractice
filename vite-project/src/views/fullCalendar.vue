<style scoped>
    .demo-date-picker {
        display: flex;
        width: 100%;
        padding: 0;
        flex-wrap: wrap;
    }
    .demo-date-picker .block {
        /* padding: 30px 0; */
        text-align: center;
        border-right: solid 1px var(--el-border-color);
        /* flex: 1; */
    }
    .demo-date-picker .block:last-child {
        border-right: none;
    }
    .demo-date-picker .demonstration {
        display: block;
        color: var(--el-text-color-secondary);
        font-size: 18px;
        margin-bottom: 10px;
    }
</style>

<template>
    <div style="display:flex;padding-top:5px">
        <FullCalendar style="width:75%" :options="calendarOptions" />
        <div style="width:25%;height:auto;border:2px solid;border-radius: 25px;margin: 15px;padding: 15px;">
            <h3>操作面板</h3>
            <div>
                <el-form :model="form" label-width="20%">
                    <el-form-item label="活動名稱">
                        <el-input v-model="form.title" />
                    </el-form-item>
                    <el-form-item label="活動主題">
                        <el-cascader v-model="form.mainSub" :options="mainSubOptions" @change="handleChange" />
                    </el-form-item>
                    <el-form-item label="時間選擇" class="demonstration"> 
                        <div class="demo-date-picker">
                            <div class="block">
                                <el-date-picker
                                    style="width:auto;"
                                    v-model="form.date"
                                    type="datetimerange"
                                    range-separator = "到"
                                    start-placeholder = "開始日期"
                                    end-placeholder = "結束日期"
                                    :default-time="defaultTime2"
                                    editable:false
                                />
                            </div>
                        </div>
                    </el-form-item>
                </el-form>

            </div>
            <el-button type="primary" @click="onSubmit">新增</el-button>
            <el-button type="danger" @click="onClean">清空</el-button>
        </div>
    </div>
</template>

<script setup>
    import { ref, reactive } from 'vue'
    import '@fullcalendar/core/vdom' // solves problem with Vite

    import FullCalendar from '@fullcalendar/vue3/src/FullCalendar'

    //請 npm i @fullcalendar/daygrid
    import dayGridPlugin from '@fullcalendar/daygrid'

    //請 npm i @fullcalendar/timegrid
    import timeGridPlugin from '@fullcalendar/timegrid'

    import { Calendar } from '@fullcalendar/core';

    //請 npm i @fullcalendar/interaction ES6建構系統 是否可以拖動和調整大小
    import interactionPlugin, { Draggable } from '@fullcalendar/interaction'

    import dayjs from 'dayjs'

    const handleDateClick = (arg) => {
        arg.dayEl.style.color = "red"
        alert('date click! ' + arg.dateStr)
        console.log("click")
    }

    const handleEventClick = (arg) =>{
        arg.el.style.borderColor = "red"
    }

    let calendarOptions = ref({
        plugins: [ dayGridPlugin, timeGridPlugin, interactionPlugin ],
        
        //時間區段
        timeZone: 'UTC',
        
        // 本身高度也可以用% 去抓父元素大小
        height: 800,

        //最大最小顯示時間段
        slotMinTime: '08:00',
        slotMaxTime: '24:00',

        // 一開始主視覺
        initialView: 'dayGridMonth',

        //自訂按鈕component
        customButtons: {
            myCustomButton: {
                text: "自訂",
                click: function(){
                    alert("店家資訊")
                }
            }
        },

        //標題左中右
        headerToolbar: {
            left: "dayGridMonth,timeGridWeek,myCustomButton",
            center:"title",
            right: "prev,next today"
            // 空白鍵表示空白顯示 ,表示中線顯示
        },

        dateClick: handleDateClick,
        dayMaxEventRows: true,
        views: {
            timeGrid: {
                dayMaxEventRows: 2
            }
        },
        editable: true,
        events: [
            { title: '寶可夢日A', mainSub:"Pokemon", start: '2022-06-07 15:00:00', end: '2022-06-09 01:00:00' },
            { title: '寶可夢日B', mainSub:"Pokemon", start: '2022-06-08 15:00:00', end: '2022-06-09 01:00:00', color: "blue" },
            { title: '寶可夢日C', mainSub:"Pokemon", start: '2022-06-08 13:00:00', end: '2022-06-08 16:00:00', color: "orange" },
            { title: '寶可夢日D', mainSub:"Pokemon", start: '2022-06-08', end: '2022-06-11'},
            { title: '寶可夢道館日', mainSub:"Pokemon", start: '2022-06-30 12:00', end:'2022-06-30 14:00' },
            { title: '寶可夢日E', mainSub:"Pokemon", date: '2022-06-30' },
        ],
        businessHours:  [
            {
                daysOfWeek: [ 1, 2, 3, 4, 5, 6, 7 ], // Monday - Thursday
                startTime: '15:00', // a start time (10am in this example)
                endTime: '21:00', // an end time (6pm in this example)
            },
            {
                daysOfWeek: [ 6, 0 ], // Monday - Thursday
                startTime: '10:00', // a start time (10am in this example)
                endTime: '23:00', // an end time (6pm in this example)
            }
        ], 
        eventColor:"#378006",
        eventClick: handleEventClick,
        selectable: true,
        nowIndicator: true,
        
    })

    //右側操作面板
    // const value1 = ref('')
    const form = reactive({
        title: '',
        date: '',
        mainSub: '',
    })

    const defaultTime2 = ref([
        new Date(2022, 6, 8, 13, 0, 0),
        new Date(2000, 6, 8, 18, 0, 0),
    ])

    const mainSubOptions = ref([
        {
            value: 'Pokemon',
            label: '寶可夢',
        },
        {
            value: 'YuGiOu',
            label: '遊戲王',
        },
        {
            value: 'WeiβSchwarz',
            label: 'WS',
        },
    ])

    const handleChange = () => {
        console.log("切換選項", form.mainSub)
    }

    const onSubmit = () => {
        console.log('submit!', form)
        if(form.title == '' || form.date == '' || form.mainSub == ''){
            alert("資料不齊")
            return;
        }
        calendarOptions.value.events.push({
            "title":form.title,
            "start":dayjs(form.date[0]).format('YYYY-MM-DD HH:mm:ss'),
            "end":dayjs(form.date[1]).format('YYYY-MM-DD HH:mm:ss'),
            "mainSub":form.mainSub
        })
        onClean();
    }

    const onClean = () => {
        form.title =''
        form.date = ''
        form.mainSub = ''
    }
</script>