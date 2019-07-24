<template>
	<el-main>
			<el-button @click="addBulletinInfo()">新增公告</el-button>
			<el-table :data="tableData.slice((currentPage-1)*pageSize,currentPage*pageSize)" highlight-current-row>
				<el-table-column type="index" width="50">
				</el-table-column>
				<el-table-column label="公告标题" width="900">
					<template slot-scope="scope">
						<span style="margin-left: 10px">
							 <el-link type="primary" @click="getRichTextById(scope.row.id)">{{ scope.row.title }}</el-link>
						</span>
					</template>
				</el-table-column>
				<el-table-column label="创建人" width="180">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.user }}</span>
					</template>
				</el-table-column>
				<el-table-column label="创建时间" width="180">
					<template slot-scope="scope">
						<span style="margin-left: 10px">{{ scope.row.date }}</span>
					</template>
				</el-table-column>
			</el-table>
	
			<div class="block" style="margin-top:15px;">
				<el-pagination align='center' @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage"
				 :page-sizes="[5,10,20]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" :total="tableData.length">
				</el-pagination>
			</div>
		</el-main>
</template>

<script>
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
		methods: {
			addBulletinInfo(){
				this.$router.push({
					path: '/richText',
					name: 'richText'
				})
			},
			handleSizeChange(val) {
				this.currentPage = 1;
				this.pageSize = val;
			},
			handleCurrentChange(val) {
				this.currentPage = val;
			},
			getDataList(){
				this.$http({
					url: this.$http.adornUrl('richTextList/getRichTextList.action'),
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
			getRichTextById(val){
				this.$router.push({
					path: '/bulletinInfo',
					name: 'bulletinInfo',
					params: {
						id: val
					}
				})
			}
		},
	}
</script>

<style>
</style>
