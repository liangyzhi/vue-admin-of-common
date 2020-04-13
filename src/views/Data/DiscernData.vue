<template>
    <div>
       <a-row>
            <a-col :span="12">
                <a-input-search placeholder="请输入关键词" @search="onSearch" enterButton="搜索" style='width:50%' />
            </a-col>
            <a-col :span="12" class='textAlignR'>
                <a-button type="primary" class='marginR15'>搜索</a-button>
                <a-button>清空</a-button>
            </a-col>
        </a-row>
        <div class='marginTB20'>
            <a-table :columns="columns" :dataSource="data" :rowSelection="rowSelection">
                <a slot="name" slot-scope="text">{{text}}</a>
                <span slot="customTitle">
                    <a-icon type="smile-o" /> Name</span>
                <span slot="tags" slot-scope="tags">
                    <a-tag v-for="tag in tags" :color="tag==='loser' ? 'volcano' : (tag.length > 5 ? 'geekblue' : 'green')"
                        :key="tag">
                        {{tag.toUpperCase()}}
                    </a-tag>
                </span>
                <span slot="action" slot-scope="text, record">
                    <a>Delete</a>
                    <a-divider type="vertical" />
                    <a>Edit</a>
                </span>
            </a-table>
        </div>
    </div>
</template>

<script>
    const columns = [{
            dataIndex: 'name',
            key: 'name',
            slots: {
                title: 'customTitle'
            },
            scopedSlots: {
                customRender: 'name'
            },
        },
        {
            title: 'age',
            dataIndex: 'age',
            key: 'age',
        },
        {
            title: 'Address',
            dataIndex: 'address',
            key: 'address',
        },
        {
            title: 'Tags',
            key: 'tags',
            dataIndex: 'tags',
            scopedSlots: {
                customRender: 'tags'
            },
        },
        {
            title: 'Action',
            key: 'action',
            scopedSlots: {
                customRender: 'action'
            },
        },
    ];

    const data = [{
            key: '1',
            name: 'John Brown',
            age: 32,
            address: 'New York No. 1 Lake Park',
            tags: ['nice', 'developer'],
        },
        {
            key: '2',
            name: 'Jim Green',
            age: 42,
            address: 'London No. 1 Lake Park',
            tags: ['loser'],
        },
        {
            key: '3',
            name: 'Joe Black',
            age: 32,
            address: 'Sidney No. 1 Lake Park',
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
        computed: {
            rowSelection() {
                const {
                    selectedRowKeys
                } = this;
                return {
                    onChange: (selectedRowKeys, selectedRows) => {
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
            onSearch() {}
        }
    }
</script>

<style scoped>

</style>
