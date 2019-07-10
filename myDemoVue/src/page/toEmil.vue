<template>
	<el-main>
		<div>
			<el-form :model="emilFrom">
				<el-form-item label="标题名称" :label-width="formLabelWidth">
					<el-input v-model="emilFrom.subject" autocomplete="off"></el-input>
				</el-form-item>
				<el-form-item label="邮件内容" :label-width="formLabelWidth">
					<el-input type="textarea" :rows="2" v-model="emilFrom.text" autocomplete="off"></el-input>
				</el-form-item>
				<!-- <el-form-item label="发送至" :label-width="formLabelWidth">
					<el-input v-model="emilFrom.userTo" autocomplete="off"></el-input>
				</el-form-item> -->
				<el-form-item label-width="formLabelWidth" v-for="(user, index) in emilFrom.userTo" :label="'发送至' + index" :key="user.key"
				 :prop="'userTo.' + index + '.value'" :rules="{
					required: true, message: '收件人不能为空', trigger: 'blur'
				}">
					<el-input v-model="user.value"></el-input>
					<el-button @click.prevent="removeDomain(user)">删除</el-button>
				</el-form-item>
				<el-button @click="addDomain">新增收件人</el-button>
			</el-form>
			<div slot="footer" class="dialog-footer">
				<el-button type="primary" @click="send()">提 交</el-button>
			</div>
		</div>
	</el-main>
</template>

<script>
	export default {
		data() {
			return {
				emilFrom: {
					subject: '',
					text: '',
					userTo: [{
						value: '',
						key: ''
					}],
					userFrom: '474296307@qq.com'
				},
				formLabelWidth: '120px'
			}
		},
		methods: {
			send() {
				debugger
				this.$http({
					url: this.$http.adornUrl('SendMailText/sendTxtMail.action'),
					method: 'post',
					data: this.$http.adornData({
						'subject': this.emilFrom.subject,
						'test': this.emilFrom.text,
						'userTo': this.emilFrom.userTo,
						'userFrom': this.emilFrom.userFrom
					})
				}).then(({
					data
				}) => {
					debugger
					if (data == 0) {
						alert('成功')
					} else {
						alert('失败')
					}
				})
			},
			removeDomain(item) {
				var index = this.emilFrom.userTo.indexOf(item)
				if (index !== -1) {
					this.emilFrom.userTo.splice(index, 1)
				}
			},
			addDomain() {
				this.emilFrom.userTo.push({
					value: '',
					key: Date.now()
				});
			}
		},
	}
</script>

<style>
</style>
