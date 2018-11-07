<template>
    <div>
        <mt-swipe :auto="4000" class="lunbo">
            <mt-swipe-item v-for="itme in lunbotuList" :key="itme.id"><img :src="'/src/images/lunbo/'+itme.name+'.jpg'" :class="{'full':isfull}"></mt-swipe-item>
        </mt-swipe>
    </div>
</template>

<script>
    export default {
        props: ["lunbotuList", "isfull"]
    };
</script>

<style  lang="scss">
    .mint-swipe {
    height: 200px;
    .mint-swipe-item {
        text-align: center;
        img {
        height: 100%;
        }
    }
    }
    .full {
    width: 100%;
    }
</style>


        