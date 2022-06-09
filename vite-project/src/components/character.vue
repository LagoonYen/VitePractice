<template>
  <div>

    <div style="background-color: aquamarine;">
      <div v-show='HP < 0'> Game Over</div> 
      <div v-show='HP === 10'>Success</div>

      <div>CharacterName :{{character}}</div>
      <div>血量 :{{initHP}}</div>
      <div>現在血量: {{HP}}</div>
      <div>下一擊 : {{step}}</div>
      
      <button @click="goForward">攻擊</button>
      <button @click="goDie">一次-10</button>
    </div>

    <div style="background-color:beige">
      <div>messenger :{{messenger}}</div>
      <div>content :{{content}}</div>

      <div>{{count}}</div>
      <button @click="updateCount">+1</button>
    </div>
  </div>
</template>

<script>
  import { ref, computed, onUpdated, inject  } from 'vue'
  export default{
    setup(){
      const character = 'YEEEE' 
      const initHP = ref(1)
      const step = ref(0)
      const HP = computed(()=> initHP.value += step.value)//computed 參數為一個getter 函式

      const goForward = ()=> step.value ++
      
      const goDie = ()=> step.value = step.value - 10
      
      onUpdated(()=>{
        console.log(HP.value)// computed會回傳一個ref物件，所以讀取內部值時需要加上.value
      })

      const messenger= inject('figure') 
      const content = inject('message')

      const count = inject('count') //因為被 readonly保護了，所以只可讀，不可直接修改他
      const updateCount  = inject('setCount')

      return {
        character,    //將資料傳出去給模板使用
        HP,
        step,
        initHP,
        messenger,
        content,
        count,
        updateCount,
        goForward,
        goDie,
      }
    }
  }
</script>
