<template>
    <div>
        <a-card :bordered="false">
            <a-form layout="inline" :form='form' class='text-right marginB10'>
                <a-form-item>
                    <a-button type="primary" @click='add'>新增</a-button>
                </a-form-item>
            </a-form>
            <a-table :columns="columns" :dataSource="tableData" :rowKey="(record,index) => index" :pagination="false" :loading="loading">
                <template slot="operation" slot-scope="text, record, index">
                    <div class="editable-row-operations">
                        <a @click="() => edit(record)">修改</a>
                        <a-popconfirm title="确定删除?" @confirm="() => deleteItem(record)" :key="index">
                            <a>删除</a>
                        </a-popconfirm>
                    </div>
                </template>
            </a-table>
            <a-pagination class='pull-right marginT15' v-model="current" :pageSize='10' :total="total" size="small"/>
        </a-card>
        <a-drawer :destroyOnClose="true" :title="applyTitle" @close="onClose" :visible="visible" width="1350px">
            <addDrawer :okBtn='okBtn' @onClose='onClose'></addDrawer>
        </a-drawer>
    </div>
</template>

<script>
import addDrawer from '@/views/table/AddDrawer.vue'
export default {
    data(){
        return{
            form:this.$form.createForm(this),
            columns:[//表格表头
                {
                    title: "页面名",
                    dataIndex: "name",
                },{
                    title: "页面编码",
                    dataIndex: "code",
                },{
                    title: "页面类型",
                    dataIndex: "type",
                },{
                    title: "备注",
                    dataIndex: "memo",
                }, {
                    title: "操作",
                    dataIndex: "operation",
                    width: "120",
                    scopedSlots: {customRender: "operation"}
                }
            ],
            tableData:[],//表格数据
            applyTitle:'',//新增、修改标题
            visible:false,//新增、修改弹窗可见
            okBtn:0,//判断新增、修改
            loading:false,
            current:1,
            total:0,
            editId:'',
        }
    },
    components:{
        addDrawer:addDrawer
    },
    created(){
        this.getTableData()//获取表格数据
    },
    methods:{
        //添加
        add() {
            this.applyTitle='新增页面模板'
            this.okBtn=0;
            this.visible=true;
        },
        //编辑
        edit(datas) {
            this.applyTitle='修改页面模板'
            this.okBtn=1;
            this.visible=true;
            this.editId=datas.id;
        },
        //删除项
        deleteItem(datas) {
            this.$axios.post('/fline/coolbar/remove',this.$qs.stringify({
                "id":datas.id,
            })).then(res=>{
                if (res.data.code == 200) {
                    this.$message.success(res.data.returnMessage);
                }
                this.getTableData();
            }).catch (err=>{
                console.log(err)
            })
        },
        getTableData(){
            this.loading = true
            this.$axios.get(`/fline/coolbar/findAll`).then((data) => {
                this.loading = false
                if (data.data.code==200) {
                    this.tableData=data.data.data?data.data.data:[];
                    this.total=data.data.data?data.data.data.length:0;
                }
            });
        },
        onClose(){
            this.visible=false;
            this.getTableData()
        }
    }
}
</script>

<style>

</style>