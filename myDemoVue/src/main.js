// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App'
import router from './router'
import websocket from 'vue-native-websocket'
import httpRequest from '@/utils/httpRequest'
import ECharts from 'vue-echarts/components/ECharts'
import VueAMap from 'vue-amap';
import store from './store/index'
import live2d from 'live2d-vue'
import 'echarts'
Vue.prototype.$http = httpRequest // ajax请求方法
Vue.config.productionTip = false
Vue.use(ElementUI);
Vue.use(VueAMap);
Vue.use(live2d);
Vue.component('chart', ECharts)
Vue.prototype.$websocket = websocket

VueAMap.initAMapApiLoader({
  key: '8e96479ad5e1ed233a708d79db6d34c6',
  plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor'],
  // 默认高德 sdk 版本为 1.4.4
  v: '1.4.4'
});
new Vue({
	el: '#app',
	router,
	store,
	components: {
		App
	},
	template: '<App/>'
})
