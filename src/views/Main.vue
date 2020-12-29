<template>
    <div class="main">
    
      <!-- 二级路由 -->
       <router-view />
      <!-- 底部标签栏 -->
        <van-tabbar route active-color="#ff852a">
          <van-tabbar-item v-for="(item,index) in bottomNav" 
          :key="index" 
          :to="item.path"
          :icon="item.icon">
            {{item.text}}
          </van-tabbar-item>
          
        </van-tabbar>


        

    </div>
</template>

<script>


    export default {
        name:'Main',
        data() {
            return {
              
              bottomNav:[
                {
                  path:"/Main/menu",
                  icon:"wap-home",
                  text:'首页'
                },
                {
                  path:"/Main/Car",
                  icon:"cart",
                  text:'购物车'
                },
                {
                  path:"/Main/List",
                  icon:"label",
                  text:'订单列表'
                },
                {
                  path:"/Main/My",
                  icon:"manager",
                  text:'我的淘宝'
                },
                {
                  path:"/Main/More",
                  icon:"bars",
                  text:'更多'
                },
              ],
                                                                               
            };
        },
        
        methods:{
          
        }
    }
</script>

<style lang="less" scoped>

</style>