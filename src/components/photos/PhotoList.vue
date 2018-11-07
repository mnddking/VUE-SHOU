<template>
    <div id="slider" class="mui-slider">
		<div id="sliderSegmentedControl" class="mui-scroll-wrapper mui-slider-indicator mui-segmented-control mui-segmented-control-inverted">
				<div class="mui-scroll"  @tap="getID($event)">
					<a class="mui-control-item mui-active" href="#item1mobile">
							全部
						</a>
					<a class="mui-control-item" href="#item2mobile">
							热点
						</a>
					<a class="mui-control-item" href="#item3mobile">
							北京
						</a>
					<a class="mui-control-item" href="#item4mobile">
							社会
						</a>
					<a class="mui-control-item" href="#item5mobile">
							娱乐
						</a>
					<a class="mui-control-item" href="#item6mobile">
							科技
						</a>
				</div>
		</div>
        <div class="photo-list">
            <ul>
                <li v-for="item in Photo" :key="item.id" >
                    <img :src="'/src/images/news/'+item.id+'.jpg'">
                    <div>
                        <h4>{{item.title}}</h4>
                        <p>{{item.postId}}</p>
                    </div>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    
    // 1. 导入 mui 的js文件
    import mui from "../../lib/mui/js/mui.min.js";
      
    export default {
        mounted() {
            mui(".mui-scroll-wrapper").scroll({
            deceleration: 0.0005 
            });
        },
        name:'Photo',
        data(){
            return{ 
                Photo:[],
                ccc:"/comments"
                }
        },
        //这里写方法
        created(){
            this.getNews();
        },
        methods: {
            getNews(){
                this.$axios.get(this.ccc).then(res=>{
                    this.Photo=""
                    this.Photo=res.data
                    console.log(photo)
                }).catch(error=>{
                    console.log(error)
                });
            },
            getID(e){
               var sss= e.target.innerHTML;
               console.log(sss)
               if(sss.trim()==="全部"){
                   console.log("生效")
                    this.ccc="/comments"
                    this.getNews();
               }else{
                   this.ccc="/comments?name="+sss
                    console.log(this.ccc)
                    this.getNews();
               }
            }
        }
    }
</script>

<style lang="scss">
 * { touch-action: pan-y; } 
 image[lazy=loading] {
  width: 40px;
  height: 300px;
  margin: auto;
}
</style>