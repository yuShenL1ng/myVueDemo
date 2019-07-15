<template>
	<el-dialog :title="!xiaoshouFrom.id ? '新增' : '修改'" :visible.sync="visible">
		<el-form :model="xiaoshouFrom" enctype="multipart/form-data">
			<el-form-item label="订单名称" :label-width="formLabelWidth">
				<el-input v-model="xiaoshouFrom.name" autocomplete="off"></el-input>
			</el-form-item>
			<el-form-item label="订单状态" :label-width="formLabelWidth">
				<el-select v-model="xiaoshouFrom.region" filterable placeholder="请选择订单状态" value-key="id">
					<el-option v-for="item in xiaoshouFrom.options" :key="item.id" :label="item.label" :value="item"></el-option>
				</el-select>
			</el-form-item>
			<el-form-item label="文件上传" :label-width="formLabelWidth">
				<el-upload class="upload-demo" ref="upload" :auto-upload="false" :action="uploadUrl()" :data="uploadParam"
				 :on-preview="handlePreview" :on-remove="handleRemove" :before-remove="beforeRemove" :on-success="uploadSuccess"
				 :on-error="uploadError" multiple :limit="3" :on-exceed="handleExceed" :file-list="xiaoshouFrom.fileList">
					<el-button size="small" type="primary">点击上传</el-button>
					<div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
				</el-upload>
			</el-form-item>
		</el-form>
		<div slot="footer" class="dialog-footer">
			<el-button @click="visible = false">取 消</el-button>
			<el-button type="primary" @click="add()">提 交</el-button>
		</div>
	</el-dialog>
</template>
<script>
	export default {
		data() {
			return {
				xiaoshouFrom: {
					name: '',
					options: [{
							id: 0,
							label: '待分配'
						},
						{
							id: 1,
							label: '执行中'
						},
						{
							id: 2,
							label: '已完成'
						},
						{
							id: 3,
							label: '停用'
						},
						{
							id: 4,
							label: '已变更'
						}
					],
					id: 0,
					fileList: []
				},
				formLabelWidth: '120px',
				visible: false
			};
		},
		computed: {
			uploadParam: function() {
				let params = {
					'id': this.xiaoshouFrom.id,
					'name':this.xiaoshouFrom.name
				}
				return params
			}
		},
		methods: {
			init(row) {
				this.visible = true
				if (row) {
					this.xiaoshouFrom.id = row.id;
					this.xiaoshouFrom.name = row.dName;
					this.form.region.id = row.dType
				} else {
					this.xiaoshouFrom.id = 0
				}
			},
			add() {
				this.$refs.upload.submit();
				this.$http({
					url: this.$http.adornUrl(`/SalesorderDemo/${!this.xiaoshouFrom.id ? 'add.action' : 'update.action'}`),
					method: 'post',
					data: this.$http.adornData({
						'id': this.xiaoshouFrom.id || undefined,
						'dName': this.xiaoshouFrom.name,
						'dType': this.xiaoshouFrom.region.id,
					})
				}).then(({
					data
				}) => {
					if (data > 0) {
						this.$refs.upload.clearFiles()
						this.$notify({
							title: '成功',
							message: '合同信息修改成功',
							type: 'success'
						});
						this.xiaoshouFrom.name = ''
						this.xiaoshouFrom.region = ''
						this.visible = false;
						this.$emit('refreshDataList')
					} else {
						alert('操作失败')
					}
				})
			},
			handleRemove(file, fileList) {
				console.log(file, fileList);
			},
			handlePreview(file) {
				console.log(file);
			},
			handleExceed(files, fileList) {
				this.$message.warning(`当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`);
			},
			beforeRemove(file, fileList) {
				return this.$confirm(`确定移除 ${ file.name }？`);
			},
			uploadSuccess(response, file, fileList) {
				if (response.code == 'success') {
					this.$notify({
						title: '成功',
						message: '文件上传成功',
						type: 'success'
					});
				} else {
					this.$notify({
						title: '文件上传失败2',
						message: response,
						type: 'error'
					});
				}
			},
			uploadError(err, file, fileList) {
				this.$notify({
					title: '文件上传失败',
					message: err,
					type: 'error'
				});
			},
			uploadUrl: function() {
				return this.$http.adornUrl('SalesorderDemo/upload.action');
			}
		},
	}
</script>

<style>

</style>
