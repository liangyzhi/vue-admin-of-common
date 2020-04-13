<template>
    <div>
        <a-drawer title="新增数据" :width="600" @close="onClose" :visible='visible' :bodyStyle="{paddingBottom: '80px'}">
            <a-form :form="form" :label-col="{ span: 5 }" :wrapper-col="{ span: 19 }">
                <a-form-item v-for='item in addFormData' :key='item.decorator' :label="item.label">
                    <a-input v-if='item.type=="input"' :placeholder="item.message" v-decorator="[`${item.decorator}`, { rules: [{ required: item.required, message: `${item.message}` }] }]" />
                    <a-select v-else-if='item.type=="select"&&item.children' v-decorator="[`${item.decorator}`, { rules: [{ required: item.required, message: `${item.message}` }] }, ]"
                        :placeholder="item.message">
                        <a-select-option v-for='item in item.children' :key='item.value' :value="item.value">{{item.text}}</a-select-option>
                    </a-select>
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
                formLayout: 'horizontal',
                form: this.$form.createForm(this),
                visible: false,
            };
        },
        props: {
            addVisible: {
                type: Boolean,
                default: false
            },
            addFormData: {
                type: Array,
            },
            addSubmitApi: {
                type: String,
            }
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
                        this.$axios.post(this.addSubmitApi, values)
                            .then(res => {
                                if (res.data.code == 200) {
                                    this.$message.info(res.data.msg)
                                }
                            })
                            .finally((res) => {
                                this.$emit('change', res);
                                this.visible = false
                            })
                    }
                })
            },
        },
    };
</script>
