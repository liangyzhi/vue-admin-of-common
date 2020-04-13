<template>
    <div>
        <a-drawer title="新增数据" :width="600" @close="onClose" :visible='visible' :bodyStyle="{paddingBottom: '80px'}">
           <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
               <a-form-item label="状态">
                   <a-select v-decorator="[
                    'dbType',
                    { rules: [{ required: true, message: '请选择状态!' }] },
                  ]"
                       placeholder="请选择状态!">
                       <a-select-option :value="0">禁用</a-select-option>
                       <a-select-option :value="1">启用</a-select-option>
                   </a-select>
               </a-form-item>
               <a-form-item label="名称">
                   <a-input placeholder="请输入名称!" v-decorator="['name', { rules: [{ required: true, message: '请输入名称!' }] }]" />
               </a-form-item>
               <a-form-item label="编码">
                   <a-input placeholder="请输入编码" v-decorator="['code', { rules: [{ required: true, message: '请输入编码!' }] }]" />
               </a-form-item>
               <a-form-item label="链接">
                   <a-input placeholder="请输入链接!" v-decorator="['dbUrl', { rules: [{ required: true, message: '请输入链接!' }] }]" />
               </a-form-item>
               <a-form-item label="用户名">
                   <a-input placeholder="请输入用户名!" v-decorator="['username', { rules: [{ required: true, message: '请输入用户名!' }] }]" />
               </a-form-item>
               <a-form-item label="密码">
                   <a-input placeholder="请输入密码!" v-decorator="['password', { rules: [{ required: true, message: '请输入密码!' }] }]" />
               </a-form-item>
               <a-form-item label="创建者">
                   <a-input placeholder="请输入创建者!" v-decorator="['creator', { rules: [{ required: true, message: '请输入创建者!' }] }]" />
               </a-form-item>
               <a-form-item label="memo">
                   <a-input placeholder="请输入memo!" v-decorator="['memo', { rules: [{ required: true, message: '请输入memo!' }] }]" />
               </a-form-item>
           </a-form>
            <div :style="{
                  position: 'absolute',
                  right: 0,
                  bottom: 0,
                  width: '100%',
                  borderTop: '1px solid #e9e9e9',
                  padding: '10px 16px',
                  background: '#fff',
                  textAlign: 'right',
                  zIndex: 1,
                }">
                <a-button :style="{marginRight: '8px'}" @click="onClose">
                    取消
                </a-button>
                <a-button @click="onSubmit" type="primary">提交</a-button>
            </div>
        </a-drawer>
    </div>
</template>
<script>
    export default {
        data() {
            return {
                form: this.$form.createForm(this),
                visible:false
            };
        },
        props: {
            addVisible: {
                type: Boolean,
                default: false
            },
        },
        watch: {
            addVisible(newValue, oldValue) {
                return newValue ? this.visible = newValue : this.visible = oldValue
            }
        },
        methods: {
            onClose() {
                this.visible = false
            },
            onSubmit() {
                this.visible = false
                this.form.validateFields((err, values) => {
                    if (!err) {
                        this.$axios.post('/fline/dataSource/create', values)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.info(res.data.msg)
                                }
                            })
                            .finally(() => {
                                this.$emit('change');this.visible = false
                            })
                    }
                })
            },
        },
    };
</script>
