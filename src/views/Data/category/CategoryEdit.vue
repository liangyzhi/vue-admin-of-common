<template>
    <div>
        <a-modal title="修改数据分类" v-model="show" @cancel='handleCancel' @ok="handleOk":bodyStyle='{maxHeight: "400px",overflow:"auto"}'>
           <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
               <a-form-item label="状态" v-if='false'>
                 <a-select
                   v-decorator="[
                     'classExamination.type',
                     { rules: [{ required: true, message: '请选择状态!' }] },
                   ]"
                   placeholder="请选择状态!"
                 >
                   <a-select-option :value="1">启用</a-select-option>
                   <a-select-option :value="2">禁用</a-select-option>
                 </a-select>
               </a-form-item>
               <a-form-item label="名称">
                 <a-input
                 placeholder="请输入名称!"
                   v-decorator="['name', { rules: [{ required: true, message: '请输入名称!' }] }]"
                 />
               </a-form-item>
               <a-form-item label="编码">
                 <a-input
                 placeholder="请输入编码"
                   v-decorator="['code', { rules: [{ required: true, message: '请输入编码!' }] }]"
                 />
               </a-form-item>
               <a-form-item label="描述">
                 <a-textarea
                 placeholder="请输入描述!"
                   v-decorator="['describe', { rules: [{ required: true, message: '请输入描述!' }] }]"
                 />
               </a-form-item>
             </a-form>
        </a-modal>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                formLayout: 'horizontal',
                form: this.$form.createForm(this),
            }
        },
        props: {
            editVisible: {
                type: Boolean,
                default: false
            },
            editData:{
                type: Object,
            }
        },
        computed: {
            show: {
                get: function() {
                    return this.editVisible
                },
                set: function() {

                }
            }
        },
        watch: {
            editData(newValue, oldValue) {
                return this.setFormValues(newValue)
            }
        },
        methods: {
            handleCancel() {
                this.$emit('editClose')
            },
            handleOk() {
                this.form.validateFields((err, values) => {
                     if (!err) {
                         values.id= this.editData.id
                         this.$axios.post('/fline/dataCategory/update',values)
                         .then(res => {
                             if(res.data.code == 200) {
                                 this.$message.info(res.data.msg)
                             }
                         })
                         .finally(() => this.$emit('editSubmit') )
                     }
                })
            },
            // 填充
            setFormValues ({...user}) {
              const fields = ['name', 'code', 'describe']
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

<style scoped>

</style>
