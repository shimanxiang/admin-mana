
import "core-js/stable";
import "regenerator-runtime/runtime";

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import md5 from 'js-md5'
import menus from './config/menu/index'


//引入elementUi
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

//引入echarts主模块（基础模块）
import ECharts from 'vue-echarts/components/ECharts.vue'
// 引入需要的echarts如表
import 'echarts/lib/chart/bar'
import 'echarts/lib/chart/line'
import 'echarts/lib/chart/pie'
//引入中国地图
import 'echarts/map/js/china';
// 引入需要的 echarts的交互组件
import 'echarts/lib/component/tooltip'
import 'echarts/lib/component/legend'
import 'echarts/lib/component/title'
import 'echarts/lib/component/visualMap'
import 'echarts/lib/component/toolbox'
Vue.component('chart', ECharts);

Vue.config.productionTip = false;

let notChildren = menus.filter(val => !val["children"]);
let commonChildren = menus.filter(val => val["children"]);
let hasChildren = [];
commonChildren.map(item => {
  hasChildren = [...hasChildren, ...item['children']]
})

Vue.prototype.$mainRouter = [...hasChildren, ...notChildren];
Vue.prototype.$menus = menus;
Vue.prototype.$md5 = md5;

Vue.use(ElementUI)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')