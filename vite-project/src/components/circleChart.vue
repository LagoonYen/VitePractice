<template>
    <div>
        <canvas id="barChart" width="400" height="150"></canvas>
        <div style="width:500px;height:500px">
            <canvas id="pieChart" width="400" height="150"></canvas>
        </div>
        <div style="width:800px;height:800px">
            <canvas id="polarAreaChart" width="400" height="150"></canvas>
        </div>
    </div>
</template>

<script setup>
    import Chart from 'chart.js/auto';
    import { ref, computed, onMounted } from 'vue'
    
    const props = defineProps(['pushProps'])

    onMounted(() => {
        const barctx = document.getElementById('barChart');
        const piectx = document.getElementById('pieChart');
        const pactx = document.getElementById('polarAreaChart');

        const data = {
            labels: props.pushProps.labels,
            datasets: [{
                label: '# of Votes',
                data: props.pushProps.data,
                backgroundColor: props.pushProps.backgroundColor,
                borderColor: props.pushProps.borderColor,
                borderWidth: 2
            }]
        }

        const barChart = new Chart(barctx, {
            type: 'bar',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: true
                    }
                }
            }
        });

        const pieChart = new Chart(piectx, {
            type: 'doughnut',
            data: data,
            
        });

        const polarAreaChart = new Chart(pactx, {
            type: 'polarArea',
            data: data,
            options: {
                scales: {
                    y: {
                        beginAtZero: false
                    }
                }
            }
        });
    })
</script>