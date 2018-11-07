<template>
    <div class="homeDiv">
        <swiper :lunbotuList="lunbotuList" :isfull="true"></swiper>
        <ul class="mui-table-view mui-grid-view mui-grid-9">
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/news_info">
		                    <img src="src\images\icon\menu1.png">
		                    <div class="mui-media-body">新闻资讯</div></router-link></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/photolist">
		                    <img src="src\images\icon\menu2.png">
		                    <div class="mui-media-body">图片分享</div></router-link ></li>
	        <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/GoodsList">
		                    <img src="src\images\icon\menu3.png">
		                    <div class="mui-media-body">商品购买</div></router-link></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/contact_us">
		                    <img src="src\images\icon\menu4.png">
		                    <div class="mui-media-body">留言反馈</div></router-link></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/video">
		                    <img src="src\images\icon\menu5.png">
		                    <div class="mui-media-body">视频专区</div></router-link></li>
		    <li class="mui-table-view-cell mui-media mui-col-xs-4 mui-col-sm-3"><router-link to="/home/lianxi">
		                    <img src="src\images\icon\menu6.png">
		                    <div class="mui-media-body">联系我们</div></router-link></li>
		</ul> 
    </div>
</template>

<script>
import swiper from "../child/lunbotu.vue";

export default {
    data() {
        return {
            lunbotuList: [],
            widthSize:''
        }
    },
    created(){
            this.getLunbo();
        },
     methods: {
         getLunbo(){
            this.$axios.get("/lunbo").then(res=>{
                this.lunbotuList=res.data
            }).catch(error=>{
            })
         }
     },
    components: {
        swiper
     }
    }
</script>


<style lang="scss" scoped>
.homeDiv{
    .lunbo{
        height: 200px;
        background-color: red;
        img{
            height: 100%
        }
    }
    .mui-grid-view.mui-grid-9{
        background-color: #fff;
        .mui-table-view-cell{
        border: none;
        img{
            width: 60px;
            height: 60px;
        }
        }
    }
}

</style>