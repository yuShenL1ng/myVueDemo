<template>
	<div class="amap-page-container" style="height: 100%;">
		<el-amap ref="map" vid="amapDemo" :amap-manager="amapManager" :center="center" :zoom="zoom" :plugin="plugin" :events="events"
		 class="amap-demo">
		</el-amap>

		<div class="toolbar">
			<button @click="getMap()">get map</button>
		</div>
	</div>
</template>

<script>
	import {
		amapManager
	} from 'vue-amap'
	export default {
		data: function() {
			return {
				amapManager, //地图管理对象
				zoom: 12,
				center: [123.427036, 41.764124],
				map: '',
				events: {
					init: (o) => {
						console.log(111111111111)
						console.log(o.getCenter()) //获取地图中心
						console.log(222222222222)
						console.log(this.$refs.map.$$getInstance()) //获取地图实例
						this.map = o;
					},
					'moveend': () => {},
					'zoomchange': () => {},
					'click': (e) => {
						this.map.getCity(result => {
							console.log(333333333333333)
							this.$notify({
								title: '位置信息',
								message: '此地点是' + result.city + result.district,
							});
						})
					}
				},
				plugin: ['ToolBar', {
					pName: 'MapType',
					defaultType: 0,
					events: {
						init(o) {
							console.log(44444444444)
							console.log(o);
						}
					}
				}]
			};
		},
		methods: {
			getMap() {
				// amap vue component
				console.log(amapManager._componentMap);
				// gaode map instance
				console.log(amapManager._map);
			}
		}
	};
</script>

<style>

</style>
