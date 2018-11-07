import VueRouter from 'vue-router'

import HomeContainer from './components/tabbar/HomeContainer.vue'
import MemberContainer from './components/tabbar/MemberContainer.vue'
import ShopcarContainer from './components/tabbar/ShopcarContainer.vue'
import SearchContainer from './components/tabbar/SearchContainer.vue'
import NewsInfo from './components/news/NewsInfo.vue'
import GoodsList from './components/goods/GoodsList.vue'
import PhotoList from './components/photos/PhotoList.vue'
import contact_us from './components/contact_us/contact_us.vue'
import lianxi from './components/lianxi/lianxi.vue'
import video from './components/video/video.vue'
import GoodsInfo from './components/goods/GoodsInfo.vue'

// 3. 创建路由对象
var router = new VueRouter({
    routes: [ 
        // 配置路由规则
        {path:'/', redirect:'/home'},
        {path:'/home',component:HomeContainer},
        {path:'/member',component:MemberContainer},
        {path:'/shopcar',component:ShopcarContainer},
        {path:'/search',component:SearchContainer},
        {path:'/home/news_info',component:NewsInfo},
        {path:'/home/GoodsList',component:GoodsList},
        {path: '/home/photolist', component: PhotoList },
        {path:'/home/contact_us',component:contact_us},
        {path:'/home/lianxi',component:lianxi},
        {path:'/home/video',component:video},
        {path: '/home/goodsinfo/:id', component: GoodsInfo, name: 'goodsinfo' }
    ],
    linkActiveClass: 'mui-active' // 覆盖默认的路由高亮的类，默认的类叫做 router-link-active
})

// 把路由对象暴露出去
export default router