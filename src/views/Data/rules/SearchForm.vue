<template>
    <div class="rulesContainer">
        <a-form :form="form" :label-col="{ span: 6 }" :wrapper-col="{ span: 18 }" layout='inline'>
            <a-row :gutter='30'>
                <a-col :span="6">
                    <a-form-item label="关键词">
                        <a-input placeholder="请输入关键词!" v-decorator="['keyword', { rules: [{ required: false, message: '请输入关键词!' }] }]" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="名称">
                        <a-input placeholder="请输入名称!" v-decorator="['name', { rules: [{ required: false, message: '请输入名称!' }] }]" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="编码">
                        <a-input placeholder="请输入编码" v-decorator="['code', { rules: [{ required: false, message: '请输入编码!' }] }]" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="链接">
                        <a-input placeholder="请输入链接!" v-decorator="['dbUrl', { rules: [{ required: false, message: '请输入链接!' }] }]" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="用户名">
                        <a-input placeholder="请输入用户名!" v-decorator="['username', { rules: [{ required: false, message: '请输入用户名!' }] }]" />
                    </a-form-item>
                </a-col>
                <a-col :span="6">
                    <a-form-item label="状态">
                        <a-select style='width: 100%;' v-decorator="[ 'dbType', {rules: [{ required: false, message: '请选择状态!' }] },]"
                            placeholder="请选择状态!">
                            <a-select-option :value="0">禁用</a-select-option>
                            <a-select-option :value="1">启用</a-select-option>
                        </a-select>
                    </a-form-item>
                </a-col>
            </a-row>
        </a-form>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                form: this.$form.createForm(this),
            }
        },
    }
</script>

<style>
    .rulesContainer .ant-row .ant-form-item {
        width: 100%;
    }
</style>
