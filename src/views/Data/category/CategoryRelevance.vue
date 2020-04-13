<template>
    <div>
        <a-modal title="关联单位" v-model="show" @cancel='handleCancel' @ok="handleOk" :bodyStyle='{maxHeight: "400px",overflow:"auto"}'>
            <p>id:{{relevanceData.id}}</p>
           <!-- <a-tree checkable :treeData="treeData" :defaultExpandAll="true" @select="this.onSelect"
                @check="this.onCheck">
            </a-tree> -->
        </a-modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                treeData: [],
            }
        },
        props: {
            relevanceVisible: {
                type: Boolean,
                default: false
            },
            relevanceData: {
                type: Object,
            }
        },
        computed: {
            show: {
                get: function() {
                    return this.relevanceVisible
                },
                set: function() {

                }
            }
        },
        created() {
            this.getDepartment();
        },
        methods: {
            // 取消
            handleCancel() {
                this.$emit('relevanceClose')
            },
            // ok
            handleOk() {
                this.$emit('relevanceSubmit')
            },
            // tree select
            onSelect(selectedKeys, info) {
                console.log('selected', selectedKeys, info);
            },
            // tree check
            onCheck(checkedKeys, info) {
                console.log('onCheck', checkedKeys, info);
            },
            // 部门数据
            getDepartment() {
                this.$axios.get('/fline/department/tree', {})
                    .then(res => {
                        if (res.data.code == 200) {
                            this.treeData = res.data.data
                        }
                    })
                    .catch(err => console.log(err))
            },
        },
    }
</script>

<style scoped>

</style>
