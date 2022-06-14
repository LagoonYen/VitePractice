import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import Components from 'unplugin-vue-components/vite' //引入  unplugin-vue-components
import Icons from 'unplugin-icons/vite'
import IconsResolver from 'unplugin-icons/resolver'
const { resolve } = require('path');

const path = require('path');


// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    Components({
      // 元件所在位置
      dirs: ["./src/components"],

      resolvers: IconsResolver({
        prefix: 'icon'  // 可以為 icon component加上前贅字來區分元件
      }),
    }),
    Icons({}),
    
  ],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, 'src'),
    },
  },
})
