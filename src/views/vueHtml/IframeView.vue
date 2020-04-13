<template>
    <div>
        <iframe ref="iframe" :src='"/static"+src'
         frameborder="0"  name="showHere" scrolling=auto width='100%' height='800px'></iframe>
    </div>
</template>

<script>
export default {
    props:{
        src:'',
    },
    data(){
        return{
            // src:'/static/aic_catalog/catalogDetail/dbTable.html'
        }
    },
}
</script>

<style>

</style>