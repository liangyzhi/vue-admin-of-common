<template>
    <div>
        <a-modal title="修改数据分类" v-model="visible" @cancel='handleCancel' @ok="handleOk" :bodyStyle='{maxHeight: "400px",overflow:"auto"}'>
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                <a-form-item v-for='item in editFormData' :key='item.decorator' :label="item.label">
                    <a-input v-if='item.type=="input"' :placeholder="item.message" v-decorator="[`${item.decorator}`, { rules: [{ required: item.required, message: `${item.message}` }] }]" />
                    <a-select v-else-if='item.type=="select"&&item.children' v-decorator="[`${item.decorator}`, { rules: [{ required: item.required, message: `${item.message}` }] }, ]"
                        :placeholder="item.message">
                        <a-select-option v-for='item in item.children' :key='item.value' :value="item.value">{{item.text}}</a-select-option>
                    </a-select>
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
                visible: false,
                editDecoratorList:[]
            }
        },
        props: {
            editVisible: {
                type: Boolean,
                default: false
            },
            editData: {
                type: Object,
            },
            editFormData: {
                type: Array,
            },
            editSelectOption: {
                type: Array,
            },
            editSubmitApi: {
                type: String,
            }
        },
        watch: {
            editVisible(newValue, oldValue) {
                return newValue ? this.visible = newValue : this.visible = oldValue
            },
            editData(newValue, oldValue) {
                return this.setFormValues(newValue, this.editDecoratorList)
            }
        },
        created() {
            this.getDecoratorList()
        },
        methods: {
            // 获取DecoratorList
            getDecoratorList() {
                 this.editFormData.forEach(item => this.editDecoratorList.push(item.decorator))
            },
            // 提交
            handleOk() {
                this.form.validateFields((err, values) => {
                    if (!err) {
                        values.id = this.editData.id
                        this.$axios.post(this.editSubmitApi, values)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.info(res.data.msg)
                                }
                            })
                            .finally(() => {
                                this.$emit('change')
                                this.visible = false
                            })
                    }
                })
            },
            // 取消
            handleCancel() {
                this.visible = false
            },
            // 填充
            setFormValues({ ...user}, fieldsArray) {
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
