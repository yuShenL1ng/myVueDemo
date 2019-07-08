<template>
	<el-main>
		<el-form :model="regusterForm" :rules="rules" ref="regusterForm" label-width="100px" class="demo-ruleForm">
			<el-form-item label="用户名" prop="username">
				<el-input v-model="regusterForm.username" @change='usernameChange($event)'></el-input>
			</el-form-item>
			<el-form-item label="密码" prop="password">
				<el-input type="password" v-model="regusterForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
			</el-form-item>
			<el-form-item label="出生年月" required>
				<el-col :span="11">
					<el-form-item prop="birthday">
						<el-date-picker v-model="regusterForm.birthday" type="date" placeholder="选择日期" format="yyyy 年 MM 月 dd 日" value-format="yyyy-MM-dd">
						</el-date-picker>
					</el-form-item>
				</el-col>
			</el-form-item>
			<el-form-item label="关联邮箱" prop="emil">
				<el-switch v-model="regusterForm.emil"></el-switch>
			</el-form-item>
			<el-form-item label="权限" prop="type">
				<el-checkbox-group v-model="regusterForm.rolecode">
					<el-checkbox label="0" name="type">总监</el-checkbox>
					<el-checkbox label="1" name="type">保洁</el-checkbox>
					<el-checkbox label="2" name="type">喽啰</el-checkbox>
					<el-checkbox label="3" name="type">游客</el-checkbox>
				</el-checkbox-group>
			</el-form-item>
			<el-form-item label="性别" prop="sex">
				<el-radio-group v-model="regusterForm.sex">
					<el-radio label="0">男</el-radio>
					<el-radio label="1">女</el-radio>
				</el-radio-group>
			</el-form-item>
			<el-form-item label="个人签名" prop="desc">
				<el-input type="textarea" v-model="regusterForm.desc"></el-input>
			</el-form-item>
			<el-form-item>
				<el-button type="primary" @click="submitForm('regusterForm')">立即创建</el-button>
				<el-button @click="resetForm('regusterForm')">重置</el-button>
			</el-form-item>
			<el-button><router-link to="/">返回首页</router-link></el-button>
		</el-form>
	</el-main>
</template>

<script>
	export default {
		data() {
			return {
				regusterForm: {
					username: '',
					password: '',
					birthday: '',
					emil: false,
					rolecode: [],
					sex: '',
					desc: ''
				},
				rules: {
					username: [{
							required: true,
							message: '请输入名称',
							trigger: 'blur'
						},
						{
							min: 3,
							max: 10,
							message: '长度在 3 到 10 个字符',
							trigger: 'blur'
						}
					],
					password: [{
						required: true,
						message: '请输入密码',
						trigger: 'blur'
					}],
					birthday: [{
						type: 'string',
						required: true,
						message: '请选择日期',
						trigger: 'change'
					}],
					rolecode: [{
						type: 'array',
						required: true,
						message: '请至少选择一个权限',
						trigger: 'change'
					}],
					sex: [{
						required: true,
						message: '请选择性别',
						trigger: 'change'
					}],
					desc: [{
						required: true,
						message: '请填写个人签名',
						trigger: 'blur'
					}]
				}
			};
		},
		methods: {
			submitForm(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http({
							url: this.$http.adornUrl('login/insertUserInfo.action'),
							method: 'post',
							data: this.$http.adornData({
								'username': this.regusterForm.username,
								'password': this.regusterForm.password,
								'rolecode': this.regusterForm.rolecode.join(','),
								'birthday': this.regusterForm.birthday,
								'sex': this.regusterForm.sex
							})
						}).then(({
							data
						}) => {
							if (data > 0) {
								// this.$cookie.set('token', data.token)
								this.$notify({
									title: '成功',
									message: '注册成功',
									type: 'success'
								});
								this.$router.replace({
									name: 'userInfo'
								})
							} else {
								alert('注册失败')
							}
						})
					} else {
						console.log('error submit!!');
						return false;
					}
				});
			},
			resetForm(formName) {
				this.$refs[formName].resetFields();
			},
			usernameChange(e){
				console.log(e);
				this.$http({
					url: this.$http.adornUrl('login/login.action'),
					method: 'post',
					data: this.$http.adornData({
						'username': e,
					})
				}).then(({
					data
				}) => {
					if (data.code != 'error') {
						this.regusterForm.username = ''
						this.$notify({
							title: '警告',
							message: '用户名重复',
							type: 'error'
						});
					} 
				})
			}
		}
	}
</script>

<style>
</style>
