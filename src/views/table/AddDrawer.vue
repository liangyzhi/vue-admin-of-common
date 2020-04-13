<template>
    <a-spin :spinning="spinning">
        <a-form :form='form'>
            <a-form-item label="主键" v-show="false">
                <a-input  placeholder="请输入" v-decorator="['id']"/>
            </a-form-item>
            <a-row>
                <a-col :span="12">
                    <a-form-item label="名称" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" >
                        <a-input  placeholder="请输入" v-decorator="['name',{rules: [{ required: true, message: '请输入' }]}]"/>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="编码" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" >
                        <a-input placeholder="请输入" v-decorator="['code',{rules: [{ required: true, message: '请输入' }]}]" />
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="是否启用" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" >
                        <a-radio-group v-decorator="['enable',{initialValue:true,rules: [{ required: true, message: '请输入' }]}]">
                            <a-radio :value="true">是</a-radio>
                            <a-radio :value="false">否</a-radio>
                        </a-radio-group>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="数据实体" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" >
                        <a-select v-decorator="['entityTypeId',{rules: [{ required: true, message: '请输入' }]}]">
                            <a-select-option v-for='item in entitytypeData' :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="12">
                    <a-form-item label="模板类型" :label-col="{ span: 6 }" :wrapper-col="{ span: 16 }" >
                        <a-select v-decorator="['entityTemplateType',{rules: [{ required: true, message: '请输入' }]}]">
                            <a-select-option v-for='item in entitytypeData' :key="item.id" :value="item.id">{{item.name}}</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
                <a-col :span="24">
                    <a-form-item label="备注" :label-col="{ span: 3 }" :wrapper-col="{ span: 20 }" >
                        <a-textarea placeholder="请输入" :rows="4" v-decorator="['memo']" ></a-textarea>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
        <div class="drawerBtnBox">
			<a-button style="{marginRight: '8px'}" @click="onClose">取消</a-button>
			<a-button @click="sunbmitForm" :disabled="submitDisabled" type="primary" >确认</a-button>
		</div>
    </a-spin>
</template>

<script>
export default {
    data(){
        return{
            spinning:false,
            form: this.$form.createForm(this),
            submitDisabled:false,
            entitytypeData:[],//实体下拉数据
        }
    },
    created(){
        this.form.resetFields();
        this.tableData=[];
        this.geteEntitytypeData();
    },
    props:{
        isTabsEnabled: {
            okBtn: Number,
            editId: Number
        }
    },
    methods:{
        onClose(){
            this.$emit('onClose')
        },
        //保存数据
        sunbmitForm(){
            var that=this;
            if(this.okBtn==0){
                var title='新增该页面模板'
            }else{
                var title='修改该页面模板'
            }
            if(that.tableData.length==0){
                this.$message.warning('请添加页面模板类字段！')
                return false;
            }
            that.form.validateFieldsAndScroll((err, values) => {
                if (!err){
                    this.$confirm({
                        title: '是否要'+title+'?',
                        content: '',
                        okText: '确定',
                        okType: 'primary',
                        cancelText: '取消',
                        onOk() {
                            var params=that.form.getFieldsValue();
                            that.$axios.post("/fline/entitytemplate/save",that.$qs.stringify( params)).then(res => {
                                if (res.data.code == 200) {
                                    that.$message.success(res.data.returnMessage);
                                }
                                that.onClose();
                            }).catch(err => {
                                that.submitDisabled = false
                                console.log(err);
                            });
                        }
                    })
                }
            })
        },
        //获取实体下拉数据
        geteEntitytypeData(){
            this.$axios.get(`/fline/entitytype/find`).then((data) => {
                if (data.data.code==200) {
                    this.entitytypeData=data.data.data;
                } 
            });
        },
    }
}
</script>

<style>

</style>