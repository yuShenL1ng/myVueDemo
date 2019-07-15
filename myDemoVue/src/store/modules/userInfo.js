export default {
	state: {
		userId: localStorage.getItem('id'),
		userName: localStorage.getItem('username'),
		token: localStorage.getItem('token'),
		email: ''
	},
	mutations: {
		setUserId(state, id) {
			state.userId = id
			localStorage.setItem('id', id)
		},
		setUserName(state, name) {
			state.userName = name
			localStorage.setItem("username", name)
		},
		setToken(state, token) {
			state.token = token
			localStorage.setItem('token', token)
		},
		setEmail(state, email) {
			state.email = email
		}
	},
	actions: {
		// 登录
		handleLogin({
			commit
		}, {
			userName,
			password
		}) {
			commit('setUserId', userinfo.id)
			commit('setUserName', userinfo.username)
			commit('setToken', userinfo.token)
			commit('setEmail', userinfo.email)
		},
		// 退出登录
		handleLogOut() {
			localStorage.removeItem("id")
			localStorage.removeItem("username")
			localStorage.removeItem("token")
		}
	}
}
