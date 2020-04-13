<template>
    <a-modal v-model='visible' @ok='handleOk' @cancel='handleCancel' :bodyStyle='{maxHeight:"400px",overflow:"auto"}'>
       <p>{{viewData.name}}</p>
       <p>{{viewData.fieldsName}}</p>
       <p>{{viewData.desensitizationRule}}</p>
       <p>{{viewData.rules}}</p>
       <p>{{viewData.code}}</p>
    </a-modal>
</template>

<script>
    export default {
        data() {
            return {
                visible:false
            }
        },
        props: {
            viewVisible: {
                type: Boolean,
                default: false
            },
            viewData:{
                type: Object,
            }
        },
       watch: {
           viewVisible(newValue, oldValue) {
               return newValue ? this.visible = newValue : this.visible = oldValue
           }
       },
        methods: {
            handleOk() {
                this.visible = false
                this.$emit('change',{name:'change'})
            },
            handleCancel() {
                this.visible = false
            }
        },
    }
</script>

<style>
</style>
