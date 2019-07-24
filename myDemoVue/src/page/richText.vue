<template>
	<el-main>
		<el-form :model="richText">
			<el-form-item label="标题">
				<el-input v-model="richText.title" autocomplete="off"></el-input>
			</el-form-item>
			<quill-editor v-model="richText.content" ref="myQuillEditor" :options="richText.editorOption" @blur="onEditorBlur($event)"
			 @focus="onEditorFocus($event)" @change="onEditorChange($event)">
			</quill-editor>
			<!-- 		<div v-html="richText.str" class="ql-editor">
		        {{richText.str}}
		 </div> -->
			<el-button type="primary" @click="back()">返 回</el-button>
			<el-button type="primary" @click="add()">提 交</el-button>
		</el-form>
	</el-main>
</template>

<script>
	export default {
		data() {
			return {
				richText: {
					content: ``,
					str: '',
					editorOption: {}
				}
			}
		},
		methods: {
			onEditorReady(editor) { // 准备编辑器

			},
			onEditorBlur() {}, // 失去焦点事件
			onEditorFocus() {}, // 获得焦点事件
			onEditorChange() {
				this.richText.str = this.escapeStringHTML(this.richText.content)
			}, // 内容改变事件
			// 转码
			escapeStringHTML(str) {
				str = str.replace(/&lt;/g, '<');
				str = str.replace(/&gt;/g, '>');
				return str;
			},
			back() {
				this.$router.go(-1); //返回上一层,
			},
			add() {
				this.$http({
					url: this.$http.adornUrl('richTextList/add.action'),
					method: 'post',
					data: this.$http.adornData({
						'title': this.richText.title,
						'html': this.richText.str,
						'user': sessionStorage.getItem("name")
					})
				}).then(({
					data
				}) => {
					if (data > 0) {
						this.$notify({
							title: '成功',
							message: '信息操作成功',
							type: 'success'
						});
						this.richText.title = '';
						this.richText.content = '';
					} else {
						alert('操作失败')
					}
				})
			}
		},
		computed: {
			editor() {
				return this.$refs.myQuillEditor.quill;
			},
		},
		mounted() {
			let content = ''; // 请求后台返回的内容字符串
			this.richText.str = this.escapeStringHTML(content);
		}
	}
</script>

<style>
</style>
