<template>
	<el-main>
		<el-button @click="addOrUpdateHandle()">新增订单</el-button>
		<el-button @click="getContractInfoDemoList()">查询订单</el-button>
		<el-button @click="updateCaiDan()">修改列表名称</el-button>
		<el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" highlight-current-row>
			<el-table-column type="index" width="50">
			</el-table-column>
			<el-table-column label="操作" width="150">
				<template slot-scope="scope">
					<el-button type="primary" icon="el-icon-edit" circle @click="addOrUpdateHandle(scope.$index, scope.row)"></el-button>
					<el-button type="danger" icon="el-icon-delete" circle @click="handleDelete(scope.$index, scope.row)"></el-button>
				</template>
			</el-table-column>
			<el-table-column label="订单名称" width="180">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.dName }}</span>
				</template>
			</el-table-column>
			<el-table-column label="订单状态" width="180">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.dType }}</span>
				</template>
			</el-table-column>
			<el-table-column label="创建时间" width="180">
				<template slot-scope="scope">
					<span style="margin-left: 10px">{{ scope.row.dDate }}</span>
				</template>
			</el-table-column>
		</el-table>

		<div class="block" style="margin-top:15px;">
			<el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
			 :page-sizes="[5,10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
			</el-pagination>
		</div>
		<add-update ref="AddOrUpdate" @refreshDataList="getDataList()"></add-update>
	</el-main>
</template>

<script>
	import AddOrUpdate from '@/components/xiaoShouAddOrUpdate'
	export default {
		data() {
			return {
				tableData: [],
				currentPage: 1, // 当前页码
				pageSize: 5 // 每页的数据条数
			};
		},
		mounted() {
			this.getDataList()
		},
		components: {
			'add-update': AddOrUpdate
		},
		methods: {
			addOrUpdateHandle(index, row) {
				this.$nextTick(() => {
					this.$refs.AddOrUpdate.init(row)
				})
			},
			handleSizeChange(val) {
				this.currentPage = 1;
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				this.currentPage = val;
			},
			getDataList() {
				this.$http({
					url: this.$http.adornUrl('SalesorderDemo/getSalesorderDemoList.action'),
					method: 'post',
					data: this.$http.adornData({})
				}).then(({
					data
				}) => {
					if (data != '') {
						this.tableData = data
					}
				})
			},
			updateCaiDan() {
				this.$store.dispatch('actionsAddCount')
			},
			handleDelete(index, row) {
				this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
					confirmButtonText: '确定',
					cancelButtonText: '取消',
					type: 'warning'
				}).then(() => {
					this.$http({
						url: this.$http.adornUrl('SalesorderDemo/delete.action'),
						method: 'post',
						data: this.$http.adornData({
							id: row.id
						})
					}).then(({
						data
					}) => {
						if (data > 0) {
							this.$notify({
								title: '成功',
								message: '信息删除成功',
								type: 'success'
							});
							this.tableData.splice(index, 1)
						} else {
							this.$notify({
								title: '失败',
								message: '信息删除失败',
								type: 'success'
							});
						}
					})
				}).catch(() => {
					this.$message({
						type: 'info',
						message: '已取消删除'
					});
				});
			}
		},
	}
</script>

<style>

</style>
