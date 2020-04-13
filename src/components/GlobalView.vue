<template>
    <div>
        <a-modal title="修改数据分类" v-model="visible" @cancel='handleCancel' @ok="handleCancel" :bodyStyle='{maxHeight: "400px",overflow:"auto"}'>
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }" v-if='viewFormData'>
                <a-form-item v-for='item in viewFormData' :key='item.decorator' :label="item.label">
                    <a-input v-if='item.type=="input"' :placeholder="item.message" v-decorator="[`${item.decorator}`, { rules: [{ required: item.required, message: `${item.message}` }] }]" />
                    <a-select v-else-if='item.type=="select"&&item.children' v-decorator="[`${item.decorator}`, { rules: [{ required: item.required, message: `${item.message}` }] }, ]"
                        :placeholder="item.message">
                        <a-select-option v-for='item in item.children' :key='item.value' :value="item.value">{{item.text}}</a-select-option>
                    </a-select>
                </a-form-item>
            </a-form>
            <main>
                <slot :viewData='viewData'></slot>
            </main>
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
                viewDecoratorList:[]
            }
        },
        props: {
            viewVisible: {
                type: Boolean,
                default: false
            },
            viewData: {
                type: Object,
            },
            viewFormData: {
                type: Array,
            },
        },
        watch: {
            viewVisible(newValue, oldValue) {
                return newValue ? this.visible = newValue : this.visible = oldValue
            },
            viewData(newValue, oldValue) {
                return this.setFormValues(newValue, this.viewDecoratorList)
            }
        },
        created() {
            this.getDecoratorList()
        },
        methods: {
            // 获取DecoratorList
            getDecoratorList() {
                 this.viewFormData.forEach(item => this.viewDecoratorList.push(item.decorator))
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
