<template>
	<el-main>
		<el-button type="primary" @click="back()">返 回</el-button>
		<h2>标题:</h2>{{title}}
		<h2>内容:</h2>
		<div ref='divText' v-html="html"></div>
		创建人:{{user}}创建时间{{date}}
	</el-main>
</template>

<script>
	export default {
		data() {
			return {
				id:0,
				title:'',
				html:'',
				user:'',
				date:''
			};
		},
		mounted() {
			debugger
			this.id = this.$route.params.id
			this.getBulletinInfo(this.id)
		},
		methods: {
			getBulletinInfo(id){
				this.$http({
					url: this.$http.adornUrl('richTextList/getRichTextList.action'),
					method: 'post',
					data: this.$http.adornData({
						id:id
					})
				}).then(({
					data
				}) => {
					if (data != '') {
						debugger
						this.title = data[0].title;
						this.html = data[0].html;
						this.user = data[0].user;
						this.date = data[0].date;
					}
				})
			},
			back() {
				this.$router.go(-1); //返回上一层,
			}
		}
	}
</script>

<style>
</style>
