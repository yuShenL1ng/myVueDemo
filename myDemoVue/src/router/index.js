import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/page/index'
import UserCenter from '@/page/userCenter'
import UserInfo from '@/page/userInfo'
import text from '@/page/text'
import demoIndex from '@/page/demoIndex'
import heTongList from '@/page/heTongList'
import xiaoShou from '@/page/xiaoShou'
import websocketDemo from '@/page/websocketDemo'
import ehcarDemo from '@/page/ehcarDemo'
import mapPlanning from '@/page/mapPlanning'
import toEmil from '@/page/toEmil'
import register from '@/page/register'
import systemSettings from '@/page/systemSettings'
Vue.use(Router)

export default new Router({
	routes: [/* {
			path: '/',
			name: 'index',
			component: Index
		}, */
		{
			path: '/',
			name: 'userInfo',
			component: UserInfo
		},
		{
			path: '/userCenter',
			name: 'userCenter',
			component: UserCenter
		},
		{
			path: '/register/:name',
			name: 'register',
			component: register
		},
		{
			path: '/demoIndex',
			name: 'demoIndex',
			component: demoIndex,
			children: [{
				path: 'heTongList',
				name: 'heTongList',
				component: heTongList
			},{
				path: 'xiaoShou',
				name: 'xiaoShou',
				component: xiaoShou
			},{
				path: 'websocketDemo',
				name: 'websocketDemo',
				component: websocketDemo
			},{
				path: 'ehcarDemo',
				name: 'ehcarDemo',
				component: ehcarDemo
			},{
				path: 'mapPlanning',
				name: 'mapPlanning',
				component: mapPlanning
			},{
				path: 'toEmil',
				name: 'toEmil',
				component: toEmil
			},{
				path: 'systemSettings',
				name: 'systemSettings',
				component: systemSettings
			}],
		}
	]
})
