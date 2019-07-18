<template>
	<el-main>
		<el-form :model="systemInfo">
			<el-form-item label="顶部导航栏颜色">
				<el-color-picker v-model="systemInfo.color" :change="colorUpdate()">
				</el-color-picker>
			</el-form-item>
		</el-form>
	</el-main>
</template>

<script>
	export default {
		data() {
			return {
				systemInfo: {
					color: this.$store.state.headerMenuBackgroundColor
				}
			}
		},
		methods:{
			colorUpdate(){
				localStorage.setItem('headerMenuBackgroundColor', this.systemInfo.color);
				this.$store.dispatch('actionSystemInfoUpdate',this.systemInfo.color)
			}
		}
	}
</script>

<style>
</style>
