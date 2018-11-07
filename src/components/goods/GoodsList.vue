<template> 
        <div class="goods-list">
            <div class="goods-item" v-for="itme in msg" :key="itme.id"  @click="goDetail(itme.id)">
                <img :src="'/src/images/phono/'+itme.id+'.jpg'" alt="">
                <h1 class="title">{{itme.title}}</h1>
                <p class="biaoyu">{{itme.Details}}</p>
                <div class="info">
                    <p class="price">
                    <span class="now">￥{{itme.price}}</span>
                    <span class="old">￥{{itme.maximum_price}}</span>
                    </p>
                </div>
            </div> 
        </div>
</template>

<script>
export default {
    name:'hellworld',
    data(){
        return{
            msg:[]
        }
    },
    created(){
        this.getphono();
    },
     methods: {
         getphono(){
            this.$axios.get("/photos").then(res=>{
                this.msg=res.data
            }).catch(error=>{
            })
         },
         goDetail(id){
             this.$router.push({ name: "goodsinfo", params: { id } });
         }
     }
}
</script>


<style lang="scss" scoped>
    
.goods-list {
  display: flex;
  flex-wrap: wrap;
  padding: 7px;
  justify-content: space-between;
 

  .goods-item {
    width: 49%;
    border: 1px solid #ccc;
    box-shadow: 0 0 8px #ccc;
    margin: 4px 0;
    padding: 2px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    min-height: 293px;
    img {
      width: 100%;
    }
    .title {
      font-size: 14px;
      padding: 0 5px;
    }

    .biaoyu{    
        margin-bottom: 0;
        font-size: 12px;
        padding: 0 5px;
    }
    .info {
      p {
        margin: 0;
        padding: 5px;
      }
      .price {
        .now {
          color: red;
          font-weight: bold;
          font-size: 16px;
        }
        .old {
          text-decoration: line-through;
          font-size: 12px;
          margin-left: 10px;
        }
      }
    }
  }
}
</style>