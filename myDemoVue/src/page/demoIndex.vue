<template>
	<div>
		<el-container style="height: 100%; border: 1px solid #eee">
			<el-aside style="background-color: rgb(238, 241, 246)">
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
						<el-submenu index="">
							<template slot="title">我的工作台</template>
							<el-menu-item index="/demoIndex/websocketDemo">聊天室</el-menu-item>
							<el-menu-item index="/demoIndex/ehcarDemo">echar图</el-menu-item>
							<el-menu-item index="/demoIndex/mapPlanning">地图展示</el-menu-item>
							<el-submenu index="2-4">
								<template slot="title">信息管理</template>
								<el-menu-item index="/demoIndex/xiaoShou">销售管理</el-menu-item>
								<el-menu-item index="" @click='goUserInfo'>个人信息</el-menu-item>
								<el-menu-item index="">选项3</el-menu-item>
							</el-submenu>
						</el-submenu>
						<el-menu-item index="" disabled>消息中心</el-menu-item>
						<el-menu-item index="" @click="outLogin">退出登陆</el-menu-item>
						<el-menu-item style="float: right;" index="">
							<el-popover placement="right" width="400" trigger="hover">
								<el-calendar>
									<template slot="dateCell" slot-scope="{date, data}">
										<p :class="data.isSelected ? 'is-selected' : ''">
											{{ data.day.split('-').slice(1).join('-') }} {{ data.isSelected ? '✔️' : ''}}
										</p>
									</template>
								</el-calendar>
								<el-button slot="reference">签到</el-button>
							</el-popover>
						</el-menu-item>
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
		<live2d class="live2dBox" v-if="islive2d" :width="modelWidth " :height="modelheight" :modelPath="modelPath" ref="l2dMange"></live2d>
		<div class="tools-panel"></div>
	</div>
</template>

<script>
	import custom from 'live2d-vue/src/custom';
	export default {
		data() {
			return {
				headerCss: {
					'color': '#333',
					'line-height': '60px',
					'text-align': 'right',
					'font-size': '12px'
				},
				//dateValue: new Date(),
				modelheight: 350,
				modelWidth: 200,
				modelPath: 'http://192.168.1.7:8182/static/live2d-widget-model-shizuku/assets/shizuku.model.json',
				customDialogue: custom,
				islive2d: true,
				isDialogue: false
			};
		},
		mounted() {
			this.systemInfo()
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
			goUserInfo() {
				this.$router.push({
					path: '/register',
					name: 'register',
					params: {
						name: sessionStorage.getItem("name")
					}
				})
			},
			headerMenuBackgroundColor: function() {
				return this.$store.state.headerMenuBackgroundColor;
			},
			systemInfo() {
				if (localStorage.getItem('headerMenuBackgroundColor') != null && localStorage.getItem('headerMenuBackgroundColor') !=
					'') {
					this.$store.dispatch('actionSystemInfoUpdate', localStorage.getItem('headerMenuBackgroundColor'))
				}
			}
		}
	}
</script>

<style>
	.el-aside {
		color: #333;
	}

	.tools-panel {
		position: fixed;
		right: 0;
		bottom: 0;
		max-width: 32px;
	}

	.live2d-panel {
		position: fixed;
		right: 0;
		bottom: 0;
	}

	.live2dBox {
		position: fixed !important;
		bottom: 0;
		right: 0;
	}
</style>
