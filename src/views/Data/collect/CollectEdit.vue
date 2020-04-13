<template>
    <a-modal title='修改弹框' v-model='visible' @ok='handleOk' @cancel='handleCancel' :bodyStyle='{maxHeight:"400px",overflow:"auto"}'>
        <a-form :form="form" :label-col="{ span: 7 }" :wrapper-col="{ span: 17 }">
            <a-form-item label="状态">
                <a-select v-decorator="[
                 'dbType',
                 { rules: [{ required: true, message: '请选择状态!' }] },
               ]"
                    placeholder="请选择状态!">
                    <a-select-option :value="0">启用</a-select-option>
                    <a-select-option :value="1">禁用</a-select-option>
                </a-select>
            </a-form-item>
            <a-form-item label="名称">
                <a-input placeholder="请输入名称!" v-decorator="['name', { rules: [{ required: true, message: '请输入名称!' }] }]" />
            </a-form-item>
            <a-form-item label="创建者">
                <a-input placeholder="请输入创建者" v-decorator="['creator', { rules: [{ required: true, message: '请输入创建者!' }] }]" />
            </a-form-item>
            <a-form-item label="用户名">
                <a-input placeholder="请输入用户名!" v-decorator="['username', { rules: [{ required: true, message: '请输入用户名!' }] }]" />
            </a-form-item>
            <a-form-item label="链接">
                <a-input placeholder="请输入链接!" v-decorator="['dbUrl', { rules: [{ required: true, message: '请输入链接!' }] }]" />
            </a-form-item>
        </a-form>
    </a-modal>
</template>

<script>
    export default {
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this),
                visible: false,
                FormIdList:['name','dbType','creator','username','dbUrl']
            }
        },
        props: {
            editVisible: {
                type: Boolean,
                default: false
            },
            editData: {
                type: Object,
            }
        },
        watch: {
            editVisible(newValue, oldValue) {
                return newValue ? this.visible = newValue : this.visible = oldValue
            },
            editData(newValue, oldValue) {
                return this.setFormValues(newValue,this.FormIdList)
            }
        },
        methods: {
            handleOk() {
                this.form.validateFields((err, values) => {
                     if (!err) {
                         values.id= this.editData.id
                         this.$axios.post('/fline/desensitizationTemplate/update',values)
                         .then(res => {
                             if(res.data.code == 200) {
                                 this.$message.info(res.data.msg)
                             }
                         })
                         .finally(() => {
                             this.$emit('change')
                              this.visible = false
                         } )
                     }
                })
            },
            handleCancel() {
                this.visible = false
            },
            // 填充
            setFormValues ({...user},fieldsArray) {
              const fields = fieldsArray
              Object.keys(user).forEach((key) => {
                if (fields.indexOf(key) !== -1) {
                  this.form.getFieldDecorator(key)
                  let obj = {}
                  obj[key] = user[key]
                  this.form.setFieldsValue(obj)
                }
              })
            },
        },
    }
</script>

<style>
</style>
