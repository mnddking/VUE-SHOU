import Vue from 'vue'


import MintUI from 'mint-ui'
Vue.use(MintUI)
import 'mint-ui/lib/style.css'


// 1.1 导入路由的包
import VueRouter from 'vue-router'
// 1.2 安装路由
Vue.use(VueRouter)

// 导入 MUI 的样式
import './lib/mui/css/mui.min.css'
import './lib/mui/css/icons-extra.css'
//导入登录页面样式
import './lib/denglu/commons.css' 
import './lib/denglu/denglv.css'

//引入路由配置项
import router from './router.js'

import axios from 'axios'
Vue.prototype.$axios = axios
Vue.config.productionTip=false

import moment from 'moment'
// 定义全局的过滤器
Vue.filter('dateFormat', function (dataStr, pattern = "YYYY-MM-DD HH:mm:ss") {
  return moment(dataStr).format(pattern)
})

axios.defaults.baseURL="http://localhost:3000"


//共享数据
import Vuex from 'vuex'
Vue.use(Vuex)

var car = JSON.parse(localStorage.getItem('car') || '[]')

var store = new Vuex.Store({
    state: {
        car: car
    },
    mutations: { // this.$store.commit('方法的名称', '按需传递唯一的参数')
        addToCar(state, goodsinfo) {
            // 点击加入购物车，把商品信息，保存到 store 中的 car 上
            // 分析：
            // 1. 如果购物车中，之前就已经有这个对应的商品了，那么，只需要更新数量
            // 2. 如果没有，则直接把 商品数据，push 到 car 中即可

            // 假设 在购物车中，没有找到对应的商品
            var flag = false
                //.some不能使用esle
                //.some() 方法用于检测数组中的元素是否满足指定条件（函数提供）
            state.car.some(item => {
                if (item.id == goodsinfo.id) {
                    item.count += parseInt(goodsinfo.count)
                    flag = true
                    return true
                }
            })

            // 如果最终，循环完毕，得到的 flag 还是 false，则把商品数据直接 push 到 购物车中
            if (!flag) {
                state.car.push(goodsinfo)
            }
            localStorage.setItem('car', JSON.stringify(state.car));
        },
        updateGoodsSelected(state, info) {
        state.car.some(item => {
            if (item.id == info.id) {
            item.selected = info.selected
            }
        })    
        // 把最新的 所有购物车商品的状态保存到 store 中去
        localStorage.setItem('car', JSON.stringify(state.car))
        },
        updateGoodsInfo(state, goodsinfo) {
            // 修改购物车中商品的数量值
            // 分析： 
            state.car.some(item => {
              if (item.id == goodsinfo.id) {
                item.count = parseInt(goodsinfo.count)
                return true
              }
            })
            // 当修改完商品的数量，把最新的购物车数据，保存到 本地存储中
            localStorage.setItem('car', JSON.stringify(state.car))
        }
    },
    getters: { // this.$store.getters.***
        // 相当于 计算属性，也相当于 filters
        getAllCount(state) {
            var c = 0;
            state.car.forEach(item => {
                c += item.count
            })
            return c
        },   
        getGoodsCount(state) {
            var o = {}
            state.car.forEach(item => {
                o[item.id] = item.count
            })
            return o
        },    
        getGoodsSelected(state) {
            var o = {}
            state.car.forEach(item => {
              o[item.id] = item.selected
            })
            return o
          },
        getGoodsCountAndAmount(state) {
            var o = {
              count: 0, // 勾选的数量
              amount: 0 // 勾选的总价
            }
            state.car.forEach(item => {
              if (item.selected) {
                o.count += item.count
                o.amount += item.price * item.count
              }
            })
            return o
          }
    }
})




import app from './App.vue'
var vm = new Vue({
    el: '#app',
    render: c => c(app),
    router,
    store
})