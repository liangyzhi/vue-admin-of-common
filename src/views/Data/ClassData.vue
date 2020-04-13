<template>
    <div class="commonFormContainer">
        <!-- 搜索表单 -->
        <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" layout='inline'>
            <a-row :gutter='30'>
                <a-col :span="6">
                    <a-form-item label="关键词">
                        <a-input placeholder="请输入关键词!" v-decorator="['keyword', { rules: [{ required: false, message: '请输入关键词!' }] }]" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="名称">
                        <a-input placeholder="请输入名称!" v-decorator="['name', { rules: [{ required: false, message: '请输入名称!' }] }]" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="编码">
                        <a-input placeholder="请输入编码" v-decorator="['code', { rules: [{ required: false, message: '请输入编码!' }] }]" />
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <div class='buttonGroup'>
            <a-button type="primary" class='marginR15' @click='showAdd'>新增</a-button>
            <a-button type="danger" class='marginR15' @click='deleteRows'>删除</a-button>
            <a-button type="primary" class='marginR15' @click='getCategory'>搜索</a-button>
            <a-button type="danger" @click='clear'>重置</a-button>
        </div>
        <div class='marginTB20'>
            <a-table ref="TableInfo" @change="handleTableChange" :columns="columns" :dataSource="data" :pagination="pagination"
                :rowSelection="rowSelection" :rowKey="record => record.id">
                <span slot="action" slot-scope="text, record">
                    <a @click="showEdit(text)">修改</a>
                    <a-divider type="vertical" />
                    <a @click="showRelevance(text)">关联单位</a>
                </span>
            </a-table>
        </div>
        <!-- 编辑 -->
        <class-edit :editVisible='editVisible' @editClose='editClose' @editSubmit='editSubmit' :editData='editData'>
        </class-edit>
        <!-- 关联单位 -->
        <class-relevance :relevanceVisible='relevanceVisible' @relevanceClose='relevanceClose' @relevanceSubmit='relevanceSubmit'
            :relevanceData='relevanceData'>
        </class-relevance>
        <!-- 增加 -->
        <class-add :addVisible='addVisible' @addClose='addClose' @addSubmit='addSubmit'>
        </class-add>
    </div>
</template>

<script>
    import ClassEdit from './class/ClassEdit.vue'
    import ClassRelevance from './class/ClassRelevance.vue'
    import ClassAdd from './class/ClassAdd.vue'
    const columns = [{
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: 'code编码',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: '描述',
            dataIndex: 'memo',
            key: 'memo',
        },
        {
            title: '操作',
            key: 'action',
            scopedSlots: {
                customRender: 'action'
            },
        },
    ];

    export default {
        components: {
            ClassEdit,
            ClassRelevance,
            ClassAdd
        },
        data() {
            return {
                timeString: '',
                paginationInfo: null,
                pagination: {
                    pageSizeOptions: ['10', '20', '30', '40', '100'],
                    defaultCurrent: 1,
                    defaultPageSize: 10,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
                },
                expand: false,
                form: this.$form.createForm(this),
                keyword: '',
                data: [],
                columns,
                selectedRowKeys: '',
                // 编辑
                editVisible: false,
                editData: {},
                // 关联
                relevanceVisible: false,
                relevanceData: {},
                // 增加
                addVisible: false
            };
        },
        created() {
            this.getCategory()
        },
        computed: {
            rowSelection() {
                const {
                    selectedRowKeys
                } = this;
                return {
                    onChange: (selectedRowKeys, selectedRows) => {
                        this.selectedRowKeys = selectedRowKeys
                        console.log(`selectedRowKeys: ${selectedRowKeys}`, 'selectedRows: ', selectedRows);
                    },
                    getCheckboxProps: record => ({
                        props: {
                            disabled: record.name === 'Disabled User', // Column configuration not to be checked
                            name: record.name,
                        },
                    }),
                };
            },
        },
        methods: {
            // 编辑
            showEdit(item) {
                this.editVisible = true
                this.editData = item
            },
            editClose() {
                this.editVisible = false
            },
            editSubmit() {
                this.getCategory()
                this.editVisible = false
            },
            // 绑定单位
            showRelevance(item) {
                this.relevanceVisible = true
                this.relevanceData = item
            },
            relevanceClose() {
                this.relevanceVisible = false
            },
            relevanceSubmit() {
                this.relevanceVisible = false
            },
            // 增加
            showAdd(item) {
                this.addVisible = true
            },
            addClose() {
                this.addVisible = false
            },
            addSubmit() {
                this.getCategory()
                this.addVisible = false
            },
            // 删除分类
            deleteRows() {
                if (!this.selectedRowKeys.length > 0) {
                    return this.$message.error('请选择要删除的数据!')
                }
                this.$axios.delete(`fline/dataLevel/remove`, {
                        data: {
                            id: this.selectedRowKeys
                        }
                    })
                    .then(res => {
                        if (res.data.code == 200) {
                            this.$message.info(res.data.msg)
                            this.getCategory()
                        } else {
                            this.$message.error(res.data.msg)
                        }
                    })
            },
            clear() {
                this.form.resetFields()
                // 重置分页
                this.$refs.TableInfo.pagination.current = this.pagination.defaultCurrent
                if (this.paginationInfo) {
                    this.paginationInfo.current = this.pagination.defaultCurrent
                    this.paginationInfo.pageSize = this.pagination.defaultPageSize
                }
                this.getCategory()
            },
            handleTableChange(pagination, filters, sorter) {
                this.paginationInfo = pagination
            },
            dateChange(time, timeStr) {
                this.timeString = timeStr
            },
            // 分页查询
            getCategory() {
                this.form.validateFields((error, values) => {
                    if (this.paginationInfo) {
                        // 如果分页信息不为空，则设置表格当前第几页，每页条数，并设置查询分页参数
                        this.$refs.TableInfo.pagination.current = this.paginationInfo.current
                        this.$refs.TableInfo.pagination.pageSize = this.paginationInfo.pageSize
                        values.pageSize = this.paginationInfo.pageSize
                        values.pageNum = this.paginationInfo.current
                    } else {
                        // 如果分页信息为空，则设置为默认值
                        values.pageSize = this.pagination.defaultPageSize
                        values.pageNum = this.pagination.defaultCurrent
                    }
                    values.createDate = this.timeString
                    this.$axios.get('fline/dataLevel/page', {
                            params: values
                        })
                        .then(res => {
                            if (res.data.code == 200) {
                                const pagination = { ...this.pagination
                                }
                                pagination.total = res.data.data.count
                                this.pagination = pagination
                                this.data = res.data.data.items
                            }
                        })
                        .catch(err => console.log(err))
                });
            },
        }
    }
</script>

<style scoped>
    .buttonGroup {
        text-align: right;
        margin-top: 20px;
    }
</style>
