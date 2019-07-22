<template>
	<div>
		<el-container style="height: 100%; border: 1px solid #eee">
			<el-aside  style="background-color: rgb(238, 241, 246)">
				<el-menu :default-openeds="['1', '2']" default-active="this.$route.path" router>
					<el-submenu index="1">
						<template slot="title"><i class="el-icon-message"></i>导航一</template>
						<el-menu-item-group>
							<template slot="title">管理模块</template>
							<el-menu-item index="">
								<!-- <el-link type="primary" href="../#/demoIndex/heTongList">合同管理</el-link> -->
								<template slot="title">合同管理</template>
							</el-menu-item>
							<el-menu-item index="/demoIndex/xiaoShou">销售管理</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="交互聊天">
							<el-menu-item index="/demoIndex/websocketDemo">聊天室</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="1-4">
							<template slot="title">图表展示</template>
							<el-menu-item index="/demoIndex/ehcarDemo">echar图</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu index="2">
						<template slot="title"><i class="el-icon-menu"></i>导航二</template>
						<el-menu-item-group>
							<template slot="title">地图</template>
							<el-menu-item index="/demoIndex/mapPlanning">地图展示</el-menu-item>
							<el-menu-item index="/demoIndex/toEmil">群发邮件</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="分组2">
							<el-menu-item index="">{{$store.state.count}}</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="2-4">
							<template slot="title">系统设置</template>
							<el-menu-item index="/demoIndex/systemSettings">界面设置</el-menu-item>
						</el-submenu>
					</el-submenu>
					<el-submenu index="3">
						<template slot="title"><i class="el-icon-setting"></i>导航三</template>
						<el-menu-item-group>
							<template slot="title">分组一</template>
							<el-menu-item index="">选项1</el-menu-item>
							<el-menu-item index="">选项2</el-menu-item>
						</el-menu-item-group>
						<el-menu-item-group title="分组2">
							<el-menu-item index="">选项3</el-menu-item>
						</el-menu-item-group>
						<el-submenu index="3-4">
							<template slot="title">选项4</template>
							<el-menu-item index="">选项4-1</el-menu-item>
						</el-submenu>
					</el-submenu>
				</el-menu>
			</el-aside>

			<el-container>
				<el-header :style="headerCss">
					<el-menu :default-active="this.$route.path" router class="el-menu-demo" mode="horizontal" @select="handleSelect"
					 :background-color="headerMenuBackgroundColor()" text-color="#fff" active-text-color="#ffd04b">
						<el-menu-item index="">处理中心</el-menu-item>
						<el-submenu index="2">
							<template slot="title">我的工作台</template>
							<el-menu-item index="/demoIndex/websocketDemo">聊天室</el-menu-item>
							<el-menu-item index="/demoIndex/ehcarDemo">echar图</el-menu-item>
							<el-menu-item index="/demoIndex/mapPlanning">地图展示</el-link>
							</el-menu-item>
							<el-submenu index="2-4">
								<template slot="title">信息管理</template>
								<el-menu-item index="/demoIndex/xiaoShou">销售管理</el-menu-item>
								<el-menu-item index="" @click='goUserInfo'>个人信息</el-menu-item>
								<el-menu-item index="">选项3</el-menu-item>
							</el-submenu>
						</el-submenu>
						<el-menu-item index="" disabled>消息中心</el-menu-item>
						<el-menu-item index="" @click="outLogin">退出登陆</el-menu-item>
					</el-menu>
				</el-header>
				<!-- <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[2, 3]" :default-checked-keys="[5]"
				 :props="defaultProps">
				</el-tree> -->
				<router-view></router-view>
			</el-container>
		</el-container>
		<div class="live2d-panel"></div>
		<dialogue v-if="isDialogue" :customDialogue="customDialogue" ref="dialogue"></dialogue>
		<live2d class="live2dBox" v-if="islive2d" :width ="modelWidth " :height="modelheight" :modelPath="modelPath" ref="l2dMange"></live2d>
		<div class="tools-panel"></div>
	</div>
</template>

<script>
	import custom from 'live2d-vue/src/custom';
	export default {
		data() {
			return {
				headerCss:{
					'color':'#333',
					'line-height': '60px',
					'text-align': 'right',
					'font-size': '12px'
				},
				modelheight:300,
				modelWidth:200,
				modelPath: 'http://192.168.1.7:8182/static/live2d-widget-model-shizuku/assets/shizuku.model.json',
				customDialogue: custom,
				islive2d: true,
				isDialogue: false
			};
		},
		mounted(){
			this.systemInfo(),
			 setInterval(()=>{
			  fetch('https://api.imjad.cn/hitokoto/?cat=&charset=utf-8&length=28&encode=json')
			    .then(res => res.json())
			    .then(data => {
			      if(!this.isDialogue){
			        let tool = this.$refs.tool.filter(item => { return item.customDialogue })
			        if(tool && tool.length > 0)
			          tool[0].showMessage(data.hitokoto)
			      }else{
			        this.$refs.dialogue.showMessage(data.hitokoto)
			      }
			  })
			},30000)
		},
		methods: {
			handleSelect(key, keyPath) {
				console.log(key, keyPath);
			},
			outLogin() {
				sessionStorage.setItem("name", '');
				this.$router.replace({
					name: 'userInfo'
				})
			},
			goUserInfo(){
				this.$router.push({
                path:'/register',
                name: 'register',
                params: { 
                    name: sessionStorage.getItem("name")
                }
            })
			},
			headerMenuBackgroundColor: function() {
				return this.$store.state.headerMenuBackgroundColor;
			},
			systemInfo(){
				if(localStorage.getItem('headerMenuBackgroundColor') != null && localStorage.getItem('headerMenuBackgroundColor') != '' ){
					this.$store.dispatch('actionSystemInfoUpdate',localStorage.getItem('headerMenuBackgroundColor'))
				}
			},
			 toolsClick(item){
			  switch(item.tabMsg)
			  {
			    case 'home': 
			      window.open("https://github.com/LingHanChuJian/live2d-vue")
			      break
			    case 'change':
			      // this.$refs.l2dMange.initL2dMange('http://127.0.0.1:8000/media/static/live2d/Pio/model.json')
			      // this.modelPath = 'http://127.0.0.1:8000/media/static/live2d/Pio/model.json'
			      break
			    case 'save':
			      window.Live2D.captureName = `live2d-${Date.now()}.png` 
			      window.Live2D.captureFrame = true
			      break
			    case 'about': 
			      window.open("https://github.com/LingHanChuJian/live2d-vue")
			      break
			    case 'hide': 
			      this.islive2d = false
			      this.toolsDisplay('hide')
			      break
			    case 'show':
			      this.islive2d = true
			      this.toolsDisplay('show')
			      break
			  }
			},
			toolsDisplay(display){
			  for(let i=0,len=this.toolsData.length;i<len;i++){
			    let tabMsg =  this.toolsData[i].tabMsg
			    if(display === 'hide'){
			      if(tabMsg === 'home' || tabMsg === 'about')
			        continue
			      this.toolsData[i].show = false
			      if(tabMsg === 'hide'){
			        this.toolsData[i].show = true
			        this.toolsData[i].tabMsg = 'show'
			      }
			    }else{
			      this.toolsData[i].show = true
			      if(tabMsg === 'show')
			        this.toolsData[i].tabMsg = 'hide'
			    }
			  }
			}
		}
	}
</script>

<style>
	.el-aside {
		color: #333;
	}
	.tools-panel{
		position: fixed;
		left: 0;
		bottom: 0;
		max-width: 32px;
	}
	.live2d-panel{
	position: fixed;
	left: 0;
	bottom: 0;
	}
	.live2dBox{
		margin-top: -300px;
		float: right;
		z-index: 999;
	}
</style>
