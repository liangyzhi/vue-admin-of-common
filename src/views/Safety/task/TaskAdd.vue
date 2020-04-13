<template>
    <div>
        <a-drawer title="新增数据" :width="600" @close="onClose" :visible='visible' :bodyStyle="{paddingBottom: '80px'}">
           <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
               <a-form-item label="状态" v-if='false'>
                   <a-select v-decorator="[
                    'classExamination.type',
                    { rules: [{ required: true, message: '请选择状态!' }] },
                  ]"
                       placeholder="请选择状态!">
                       <a-select-option :value="1">启用</a-select-option>
                       <a-select-option :value="2">禁用</a-select-option>
                   </a-select>
               </a-form-item>
               <a-form-item label="名称">
                   <a-input placeholder="请输入名称!" v-decorator="['name', { rules: [{ required: true, message: '请输入名称!' }] }]" />
               </a-form-item>
               <a-form-item label="编码">
                   <a-input placeholder="请输入编码" v-decorator="['code', { rules: [{ required: true, message: '请输入编码!' }] }]" />
               </a-form-item>
               <a-form-item label="文件名">
                   <a-input placeholder="请输入文件名!" v-decorator="['fieldsName', { rules: [{ required: true, message: '请输入文件名!' }] }]" />
               </a-form-item>
               <a-form-item label="规则">
                   <a-input placeholder="请输入规则!" v-decorator="['rules', { rules: [{ required: true, message: '请输入规则!' }] }]" />
               </a-form-item>
               <a-form-item label="desensitizationRule">
                   <a-input placeholder="请输入desensitizationRule!" v-decorator="['desensitizationRule', { rules: [{ required: true, message: '请输入desensitizationRule!' }] }]" />
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
                        this.$axios.post('/fline/desensitizationTemplate/create', values)
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
