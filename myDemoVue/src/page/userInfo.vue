<template>
	<el-form :model="dataForm" :rules='rules' ref='dataForm' label-position="left" label-width="0px" class="demo-ruleForm login-container">
		<h3 class="title">登陆界面</h3>
		<el-form-item prop="userName">
			<el-input type="text" v-model="dataForm.userName" auto-complete="off" placeholder="请输入账号"></el-input>
		</el-form-item>
		<el-form-item prop="password">
			<el-input type="password" v-model="dataForm.password" auto-complete="off" placeholder="请输入密码"></el-input>
		</el-form-item>
		<el-checkbox v-model="checked" checked class="remember">记住密码</el-checkbox>
		<el-form-item style="width:100%;">
			<el-button type="primary" class="loginBtn" @click="dataFormSubmit('dataForm')">登录
			</el-button>
			<el-link type="primary" href="../#/register">没有账号?点击注册</el-link>
		</el-form-item>
	</el-form>
</template>

<script>
	export default {
		data() {
			return {
				dataForm: {
					userName: '',
					password: '',
					uuid: '',
				},
				rules: {
					userName: [{
						required: true,
						message: '帐号不能为空',
						trigger: 'blur'
					}],
					password: [{
						required: true,
						message: '密码不能为空',
						trigger: 'blur'
					}]
				},
				checked: true
			}
		},
		methods: {
			dataFormSubmit(formName) {
				this.$refs[formName].validate((valid) => {
					if (valid) {
						this.$http({
							url: this.$http.adornUrl('login/login.action'),
							method: 'post',
							data: this.$http.adornData({
								'username': this.dataForm.userName,
								'password': this.dataForm.password,
								'uuid': this.dataForm.uuid
							})
						}).then(({
							data
						}) => {
							if (data != '') {
								// this.$cookie.set('token', data.token)
								sessionStorage.setItem("name", this.dataForm.userName);
								this.$router.replace({
									name: 'demoIndex'
								})
							} else {
								alert('账号或者密码错误')
							}
						})
					}else{
						return false;
					}
				})
			}
		}
	}
</script>

<style>
	.login-container {
		-webkit-border-radius: 5px;
		border-radius: 5px;
		-moz-border-radius: 5px;
		background-clip: padding-box;
		margin: 180px auto;
		width: 350px;
		padding: 35px 35px 15px 35px;
		border: 1px solid #eaeaea;
		background: #2d3a4b;
		color: #fff;
	}

	.title {
		margin: 0px auto 40px auto;
		text-align: center;
	}

	.remember {
		margin: 0px 0px 35px 0px;
	}

	.loginBtn {
		width: 100%;
		font-size: 20px;
		letter-spacing: 10px;
	}

	.el-col {}
</style>
