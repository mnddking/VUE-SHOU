<template>
    <div>
        <swiper :lunbotuList="lunbotuList" :isfull="false"></swiper>

        <!-- 商品购买区域 -->
        <div class="mui-card">
        <div class="mui-card-header">{{goodsinfo.title}}</div>
        <div class="mui-card-content">
            <div class="mui-card-content-inner">
            <p class="price">
                市场价：<del>￥{{goodsinfo.maximum_price}}</del>&nbsp;&nbsp;销售价：<span class="now_price">￥{{goodsinfo.price}}</span>
            </p>
            <contact :max="goodsinfo.Quantity" @getcount="getSelectedCount"></contact>
            <p>
                <mt-button type="primary" size="small">立即购买</mt-button>
                <mt-button type="danger" size="small"  @click="addToShopCar">加入购物车</mt-button>
            </p>
            </div>
        </div>
        </div>

        <!-- 商品参数区域 -->
        <div class="mui-card">
            <div class="mui-card-header">商品参数</div>
            <div class="mui-card-content">
                <div class="mui-card-content-inner">
                    <p>商品货号：{{goodsinfo.Numbering}}</p>
                    <p>库存情况：{{goodsinfo.Quantity}}件</p>
                    <p>上架时间：{{goodsinfo.time | dateFormat}}</p>
                </div>
            </div>
            <div class="mui-card-footer">
                <mt-button type="primary" size="large" plain style="margin-right:10px;">图文介绍</mt-button>
                <mt-button type="danger" size="large" plain>商品评论</mt-button>
            </div>
        </div>
    </div>
</template>

<script>
import swiper from "../child/lunbotu.vue";
import contact from "../child/contact.vue";

export default {
  data() {
    return {
      id: this.$route.params.id, // 将路由参数对象中的 id 挂载到 data , 方便后期调用
      lunbotuList: [],
      goodsinfo: {}, // 获取到的商品的信息
      Quantity: 1 // 保存用户选中的商品数量， 默认，认为用户买1个
    };
  },
  created() {
    this.getLunbotu();
    this.getGoodsInfo();
  },
  methods: {
    getGoodsInfo() {
      this.$axios.get("/photos/" + this.id).then(result => {
        this.goodsinfo=result.data
      })
    },
    getLunbotu(){
         this.$axios.get("/lunboPhono").then(result => {
        this.lunbotuList=result.data
      })
    },
    getSelectedCount(count) {
        // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
        this.Quantity = count;
    },
    addToShopCar(){
        // { id:商品的id, count: 要购买的数量, price: 商品的单价，selected: false  }
        // 拼接出一个，要保存到 store 中 car 数组里的 商品信息对象
        var goodsinfo = {
            id: this.id, //商品ID
            count: this.Quantity, //商品数量
            price: this.goodsinfo.price, //商品价格
            selected: true //商品是否被选中，默认是选择状态
        };
        // 调用 store 中的 mutations 来将商品加入购物车
        this.$store.commit("addToCar", goodsinfo);
    }
    }
    ,
    components: {
        swiper,
        contact 
     }
    
}
</script>


<style lang="scss" scoped>
.goodsinfo-container {
  background-color: #eee;
  overflow: hidden;

  .now_price {
    color: red;
    font-size: 16px;
    font-weight: bold;
  }
  .mui-card-footer {
    display: block;
    button {
      margin: 15px 0;
    }
  }

  .ball {
    width: 15px;
    height: 15px;
    border-radius: 50%;
    background-color: red;
    position: absolute;
    z-index: 99;
    top: 390px;
    left: 146px;
  }
}
</style>