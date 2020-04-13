<template>
    <div>
        <a-drawer title="新增数据" :width="420" @close="onClose" :visible='addVisible' :bodyStyle="{paddingBottom: '80px'}">
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
            };
        },
        props: {
            addVisible: {
                type: Boolean,
                default: false
            },
        },
        methods: {
            onClose() {
                this.$emit('addClose')
            },
            onSubmit() {
                this.form.validateFields((err, values) => {
                     if (!err) {
                         this.$axios.post('/fline/dataCategory/create',values)
                         .then(res => {
                             if(res.data.code == 200) {
                                 this.$message.info(res.data.msg)
                             }
                         })
                         .finally(() => this.$emit('addSubmit') )
                     }
                })

            },
        },
    };
</script>
