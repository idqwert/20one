import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'


import 'lib-flexible/flexible'

import {
  Button,
  NavBar,
  Form,
  Field,
  Popup,
  Toast,
  Tabbar,
  TabbarItem,
  Search,
  Swipe,
  SwipeItem,
  Stepper,
  GoodsAction,
  GoodsActionIcon,
  GoodsActionButton,
  Empty,
  SwipeCell,
  Checkbox,
  SubmitBar,
  List,
  Lazyload,
  Grid, 
  GridItem,
  Icon,
  Sku,
  CheckboxGroup,
  Card,
  Tag,
  AddressList,
  AddressEdit,
  Area,
  Switch,
  Cell, 
  CellGroup,
  Tab, 
  Tabs,
  Dialog

} from 'vant'

//注册Button组件
Vue
  .use(Button)
  .use(NavBar)
  .use(Form)
  .use(Field)
  .use(Popup)
  .use(Toast)
  .use(Tabbar)
  .use(TabbarItem)
  .use(Search)
  .use(Swipe)
  .use(SwipeItem)
  .use(Stepper)
  .use(GoodsAction)
  .use(GoodsActionIcon)
  .use(GoodsActionButton)
  .use(Empty)
  .use(SwipeCell)
  .use(Checkbox)
  .use(SubmitBar)
  .use(List)
  .use(Lazyload)
  .use(Grid)
  .use(GridItem)
  .use(VueAxios,axios)
  .use(Icon)
  .use(Sku)
  .use(CheckboxGroup)
  .use(Card)
  .use(Tag)
  .use(AddressList)
  .use(AddressEdit)
  .use(Area)
  .use(Switch)
  .use(Cell)
  .use(CellGroup)
  .use(Tab)
  .use(Tabs)
  .use(Dialog)

  axios.interceptors.request.use(config => {

    //处理post请求参数, 进行参数序列化
    if (config.method == 'post') {
  
      //序列化post请求参数
      let paramsString = '';
      for (let key in config.data) {
        paramsString += `${key}=${config.data[key]}&`;
      }
  
      //重新赋值config.data
      config.data = paramsString.slice(0, -1);
  
      // 
  
    }
  
    //必须返回config
    return config;
  })

Vue.config.productionTip = false

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
