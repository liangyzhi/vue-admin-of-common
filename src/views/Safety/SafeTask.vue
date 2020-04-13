<template>
    <div>
        <a-tabs defaultActiveKey="1" @change="callback">
            <a-tab-pane tab="脱敏规则" key="1">脱敏规则</a-tab-pane>
            <a-tab-pane tab="脱敏模板" key="2" forceRender>脱敏模板</a-tab-pane>
            <a-tab-pane tab="脱敏处理" key="3">
                <a-row>
                    <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" layout='inline'>
                        <a-form-item label="关键词">
                            <a-input placeholder="请输入关键词!" v-decorator="['keyword', { rules: [{ required: false, message: '请输入关键词!' }] }]" />
                        </a-form-item>
                        <a-form-item label="名称">
                            <a-input placeholder="请输入名称!" v-decorator="['name', { rules: [{ required: false, message: '请输入名称!' }] }]" />
                        </a-form-item>
                        <a-form-item label="编码">
                            <a-input placeholder="请输入编码" v-decorator="['code', { rules: [{ required: false, message: '请输入编码!' }] }]" />
                        </a-form-item>
                        <div class='buttonGroup'>
                            <a-button type="primary" class='marginR15' @click='add'>新增</a-button>
                            <a-button type="danger" class='marginR15' @click='deleteRows'>删除</a-button>
                            <a-button type="primary" class='marginR15' @click='getTask'>搜索</a-button>
                            <a-button type="danger" @click='clear'>重置</a-button>
                        </div>
                    </a-form>
                </a-row>
                <div class='marginTB20'>
                    <a-table ref="TableInfo" @change="handleTableChange" :columns="columns" :dataSource="taskList"
                        :pagination="pagination" :rowSelection="rowSelection" :rowKey="record => record.code">
                        <span slot="action" slot-scope="text, record">
                            <a @click="showView(text)">查看</a>
                            <a-divider type="vertical" />
                            <a-popover placement="bottom">
                                <template slot="content">
                                    <p>原数据:42348398393984239842</p>
                                    <p>脱敏后:3247832****3372847</p>
                                </template>
                                <a @click="">预览</a>
                            </a-popover>
                            <a-divider type="vertical" />
                            <a @click="showEdit(text)">修改</a>
                            <a-divider type="vertical" />
                        </span>
                    </a-table>
                </div>
            </a-tab-pane>
            <a-tab-pane tab="数据脱敏日志" key="4">数据脱敏日志</a-tab-pane>
        </a-tabs>
        <!-- 查看 -->
        <viewComponent :viewVisible='viewVisible' :viewData='viewData' @change='viewChange'></viewComponent>
        <!-- 修改 -->
        <editComponent :editVisible='editVisible' :editData='editData' @change='editChange'></editComponent>
        <!-- 新增 -->
        <addComponent :addVisible='addVisible' @change='addChange'></addComponent>
    </div>
</template>
<script>
    import viewComponent from './task/TaskView.vue'
    import editComponent from './task/TaskEdit.vue'
    import addComponent from './task/TaskAdd.vue'
    const columns = [{
            title: 'name',
            dataIndex: 'name',
            key: 'name',
        },
        {
            title: '任务编码',
            dataIndex: 'code',
            key: 'code',
        },
        {
            title: '文件名',
            dataIndex: 'fieldsName',
            key: 'fieldsName',
        },
        {
            title: '数据源',
            dataIndex: 'source',
            key: 'source',
        },
        {
            title: 'desensitizationRule',
            dataIndex: 'desensitizationRule',
            key: 'desensitizationRule',
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
            viewComponent,
            editComponent,
            addComponent,
        },
        data() {
            return {
                paginationInfo: null,
                pagination: {
                    pageSizeOptions: ['10', '20', '30', '40', '100'],
                    defaultCurrent: 1,
                    defaultPageSize: 10,
                    showQuickJumper: true,
                    showSizeChanger: true,
                    showTotal: (total, range) => `显示 ${range[0]} ~ ${range[1]} 条记录，共 ${total} 条记录`
                },
                form: this.$form.createForm(this),
                data: [],
                columns,
                taskList: [],
                // 查看
                viewVisible:false,
                viewData:{},
                // 修改
                editVisible:false,
                editData:{},
                // 新增
                addVisible:false,
            };
        },
        created() {
            this.getTask()
        },
        methods: {
            callback(key) {

            },
            handleTableChange(pagination, filters, sorter) {
                this.paginationInfo = pagination
            },
            dateChange(time, timeStr) {
                this.timeString = timeStr
            },
            // 增加
            showAdd(item) {

            },
            // 删除
            deleteRows() {
                if (!this.selectedRowKeys.length > 0) {
                    return this.$message.error('请选择要删除的数据!')
                }
                this.$axios.delete(`fline/desensitizationTemplate/remove`, {
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
            // 重置
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
            // 分页查询
            getTask() {
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
                    this.$axios.get('fline/desensitizationTemplate/page', {
                            params: values
                        })
                        .then(res => {
                            this.taskList.push(res.data)
                            // if (res.data.code == 200) {
                            //     const pagination = { ...this.pagination
                            //     }
                            //     pagination.total = res.data.data.count
                            //     this.pagination = pagination
                            //     this.data = res.data.data.items
                            // }
                        })
                        .catch(err => console.log(err))
                });
            },

            // 查看
            showView(text) {
                this.viewVisible = !this.viewVisible
                this.viewData = text
            },
            viewChange(params) {
            },
            // 修改
            showEdit(text) {
                this.editVisible = !this.editVisible
                this.editData = text
            },
            editChange(params) {},
            // 新增
            add() {
                this.addVisible = !this.addVisible
            },
            addChange() {this.getTask()}
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
    };
</script>
