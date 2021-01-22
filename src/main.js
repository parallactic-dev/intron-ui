import Vue from 'vue'
import App from './App.vue'
import DurationFormatter from '@/components/global/DurationFormatter.vue'

Vue.component('DurationFormatter', DurationFormatter )

Vue.config.productionTip = false

new Vue({
  render: h => h(App),
}).$mount('#app')
