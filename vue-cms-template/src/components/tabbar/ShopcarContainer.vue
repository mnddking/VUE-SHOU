<template>
    <div class="goodsinfo-container">
        <ul class="mui-table-view">
            <li class="mui-table-view-cell mui-media" v-for="item in goodslist" :key="item.id">
                <div class='checkbox'>
                    <mt-switch 
                        v-model="$store.getters.getGoodsSelected[item.id]"
                        @change="selectedChanged(item.id, $store.getters.getGoodsSelected[item.id])">
                    </mt-switch>
                </div>
                <div class="leftRight">
                    <a href="javascript:;" class="lset">
                        <img class="mui-media-object mui-pull-left" :src="'/src/images/phono/'+item.id+'.jpg'">
                        <div class="mui-media-body">
                            <p>{{item.title}}</p>
                            <p class='mui-ellipsis'>{{item.price}}元</p>
                        </div>
                    </a>
                    <numbox :initcount="$store.getters.getGoodsCount[item.id]" :goodsid="item.id">
                    </numbox >
                </div>
            </li>
        </ul>


    
    <!-- 商品结算部分 -->
    <div class="Commodity_settlement">
        <div class='checkbox right_input'>
            <p class="select_all">总件数:{{ $store.getters.getGoodsCountAndAmount.count }}件</p>
        </div>
        <div class="position">
            <p> ￥{{ $store.getters.getGoodsCountAndAmount.amount }}元</p>
        </div>
    </div>
</div>

</template>

<script>
import numbox from "../child/shopcar_numbox.vue";

export default {
  data() {
    return {
        goodslist: [],
        Quantity:1,
        checkboxList:[],
        checked: false,
        allProductTotal:null
    };
  },
  created() {
    this.getGoodsList();
  },
  methods: {
    getSelectedCount(count) {
        // 当子组件把 选中的数量传递给父组件的时候，把选中的值保存到 data 上
        this.Quantity = count;
    },
    getGoodsList() {
        // 1. 获取到 store 中所有的商品的Id，然后拼接出一个 用逗号分隔的 字符串
        var idArr = [];
        //forEach() 方法用于调用数组的每个元素，并将元素传递给回调函数。
        this.$store.state.car.forEach(item => idArr.push(item.id));
        // 如果 购物车中没有商品，则直接返回，不需要请求数据接口，否则会报错
        if (idArr.length <= 0) {
            return;
        }
        // 获取购物车商品列表
    
        var daan ="";
        for(var c= 0; c<idArr.length;c++){
              daan += "id="+idArr[c]+"&";
        }
        this.$axios.get("/photos?"+daan).then(result => {
            this.goodslist=result.data;
        });
    },
    selectedChanged(id, val) {
      // 每当点击开关，把最新的 快关状态，同步到 store 中
      console.log(id + " --- " + val);
      this.$store.commit("updateGoodsSelected", { id, selected: val });
    }
  },
  components: {
    numbox
  }
};
</script>

<style lang="scss" scoped>
    .mui-numbox{
        margin-left: 20px;
    }

    .mui-table-view{
        .mui-table-view-cell{
            display: flex;
            justify-content:flex-start;
            .leftRight{
                width: 100%;
                display: flex;
                justify-content:space-between;
                a{
                    margin-left: 10px;
                }
                // 去掉点击的灰色背景
                a.mui-active {
                    background-color: #fff;
                }
            }
        }
    }

    .Commodity_settlement{
        position:fixed;
        bottom: 0;
        padding: 10px 11px 50px 11px;
        height: 50px;
        display: flex;
        justify-content:space-between;
        width: 100%;
        height: 120px;
        border-top: 1px solid #ccc;
        background-color: #fff;
        .position{
            padding-right: 20px;
            p{
                margin-top: 10px;
            }
        }
        .right_input{
            .select_all{
                margin: 10px 0 10px 30px;
            }
        }
    }


    // //勾选框样式
    // .checkbox {
    //         position: relative;
    //         z-index: 9999;
    //         display: inline-block;
    //     }
    // .checkbox input[type='checkbox'] {
    //         position: absolute;
    //         left: 0;
    //         top: 0;
    //         width: 20px;
    //         height: 20px;
    //         opacity: 0;
    //     }
    // .checkbox label {
    //         position: absolute;
    //         left: 30px;
    //         top: 0;
    //         height: 20px;
    //         line-height: 20px;
    //     }
    // .checkbox label:before {
    //     content: '';
    //     position: absolute;
    //     left: -30px;
    //     top: 10px;
    //     width: 20px;
    //     height: 20px;
    //     border: 1px solid #ddd;
    //     border-radius: 50%;
    //     transition: all 0.3s ease;
    //     -webkit-transition: all 0.3s ease;
    //     -moz-transition: all 0.3s ease;
    // }

    // .checkbox label:after {
    //     content: '';
    //     position: absolute;
    //     left: -22px;
    //     top: 13px;
    //     width: 6px;
    //     height: 12px;
    //     border: 0;
    //     border-right: 1px solid #fff;
    //     border-bottom: 1px solid #fff;
    //     background: #fff;
    //     transform: rotate(45deg);
    //     -webkit-transform: rotate(45deg);
    //     -moz-transform: rotate(45deg);
    //     -ms-transform: rotate(45deg);
    //     transition: all 0.3s ease;
    //     -webkit-transition: all 0.3s ease;
    //     -moz-transition: all 0.3s ease;
    // }

    // .checkbox input[type='checkbox']:checked + label:before {
    //     background: #4cd764;
    //     border-color: #4cd764;
    // }
    // .checkbox input[type='checkbox']:checked + label:after {
    //     background: #4cd764;
    // }

</style>
