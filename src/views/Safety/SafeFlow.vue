<template>
    <a-tabs defaultActiveKey="1" @change="callback">
        <a-tab-pane tab="白名单" key="1">
            <a-form :form="form" :label-col="{ span: 0 }" :wrapper-col="{ span: 24 }" layout='inline'>
                <a-form-item>
                    <a-input placeholder="请输入用户名!" v-decorator="['username', { rules: [{ required: false, message: '请输入用户名!' }] }]" />
                </a-form-item>
            </a-form>
            <div class='buttonGroup marginB10'>
                <a-button type="primary" class='marginR15' @click=''>新增</a-button>
                <a-button type="danger" class='marginR15' @click=''>删除</a-button>
                <a-button type="primary" class='marginR15' @click=''>搜索</a-button>
                <a-button type="danger" @click=''>重置</a-button>
            </div>
            <a-table :columns="columns" :dataSource="data">
                <a slot="name" slot-scope="text">{{text}}</a>
            </a-table>
        </a-tab-pane>
        <a-tab-pane tab="数据流量采集" key="2" forceRender>
            <a-table :columns="columns" :dataSource="data">
                <a slot="name" slot-scope="text">{{text}}</a>
            </a-table>
        </a-tab-pane>
    </a-tabs>

</template>
<script>
    const columns = [{
            title: 'Name',
            dataIndex: 'name',
            key: 'name',
            scopedSlots: {
                customRender: 'name'
            },
        },
        {
            title: 'Age',
            dataIndex: 'age',
            key: 'age',
            width: 80,
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address 1',
            ellipsis: true,
        },
        {
            title: 'Long Column Long Column Long Column',
            dataIndex: 'address',
            key: 'address 2',
            ellipsis: true,
        },
        {
            title: 'Long Column Long Column',
            dataIndex: 'address',
            key: 'address 3',
            ellipsis: true,
        },
        {
            title: 'Long Column',
            dataIndex: 'address',
            key: 'address 4',
            ellipsis: true,
        },
    ];

    const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park, New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 2 Lake Park, London No. 2 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park, Sidney No. 1 Lake Park',
            tags: ['cool', 'teacher'],
        },
    ];

    export default {
        data() {
            return {
                data,
                columns,
            };
        },
        methods: {
            callback(key) {
                console.log(key);
            },
        },
    };
</script>
