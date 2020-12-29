<template>
    <div class="main">
      <!-- 顶部搜索栏 -->
        <van-search
          shape="round"
          background="#ff852a"
          placeholder="请输入搜索关键词"
          input-align="center"
        />

      <!-- 轮播图 -->
        <van-swipe class="my-swipe" :autoplay="3000" >
          <van-swipe-item  v-for="(item,index) in images" :key="index">
              <img 
                class="auto-img"
                :src="item"
              >
              
          </van-swipe-item>
          
        </van-swipe>
        <!-- <div class="banner">

        </div> -->

      <!-- 中间导航栏 -->
        <van-grid :column-num="5" square>
          <van-grid-item v-for="(item,index) in navmsg" :key="index" :icon="item.navimg" :text="item.text" />
        </van-grid>



      <!-- 下方的商品兰 -->
      <div class="box2 ">
        <div class="items" v-for="(item,index) in shoppMsg" :key="index" 
        @click="goDetail(item.num_iid)">
            <img :src="item.picurl">
            <div class="blacktext">{{item.title}}</div>
            <div class="price">
                <span class="money">¥ {{item.price}}</span>
                <span class="count">{{item.count}}人已经购买</span>
            </div>
        </div>
      </div>


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
import'../assets/less/menu.less'

    export default {
        name:'Main',
        data() {
            return {
              images: [
                require('../assets/img/b1.jpg'),
                require('../assets/img/b2.jpg'),
                require('../assets/img/b3.jpg'),
                require('../assets/img/b4.jpg'),
                require('../assets/img/b5.jpg'),
                require('../assets/img/b6.jpg'),
              ],
              navmsg:[
                {
                  navimg:require('../assets/img/1.png'),
                  text:'天猫新品'
                },
                {
                  navimg:require('../assets/img/2.png'),
                  text:'今日爆款'
                },
                {
                  navimg:require('../assets/img/3.png'),
                  text:'天猫国际'
                },
                {
                  navimg:require('../assets/img/4.png'),
                  text:'饿了么'
                },
                {
                  navimg:require('../assets/img/5.png'),
                  text:'天猫超市'
                },
                {
                  navimg:require('../assets/img/9.png'),
                  text:'充值中心'
                },
                {
                  navimg:require('../assets/img/10.png'),
                  text:'机票酒店'
                },
                {
                  navimg:require('../assets/img/11.png'),
                  text:'金币庄园'
                },
                {
                  navimg:require('../assets/img/12.png'),
                  text:'阿里拍卖'
                },
                {
                  navimg:require('../assets/img/13.png'),
                  text:'淘宝吃货'
                }
              ],
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
              shoppMsg:[
                
              ]                                                                  
            };
        },
        created(){
          this.getdata();
        },
        methods:{
          //获取数据
          getdata(){
            this.axios({
              method:'GET',
              url:'http://api.tbk.dingdanxia.com/tbk/item_info',
              params:{
                apikey:'oBe89v0siikk31FsKFDBz0vH1veefYVb',
                num_iids:'572096814881,551909182543,577920081310,604526851560,615774274526,605985818390'
              }
            }).then(result => {
              console.log('result ==>', result);

              let shoppitem = {title:'',price:'',count:'',picurl:'',num_iid:''};
              for(let i=0;i<result.data.data.length;i++){
                shoppitem = {};
                shoppitem.title = result.data.data[i].title;
                shoppitem.price = result.data.data[i].reserve_price;
                shoppitem.count = result.data.data[i].volume;
                shoppitem.picurl = result.data.data[i].pict_url;
                shoppitem.num_iid = result.data.data[i].num_iid;
                this.shoppMsg.push(shoppitem);
              }
            }).catch(err => {
              console.log('err ==>',err)
            })
          },

          //跳转到详情页
          goDetail(num_iid){
            this.$router.push({name:'Detail',params:{num_iid}})
          }
        }
    }
</script>

<style lang="less" scoped>

</style>