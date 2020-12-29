<template>
    <div class="detail"> 
      <!-- 返回恩牛 -->
      <div class="back" @click="back">
        <van-icon name="arrow-left" color="white" size="20" />
      </div>
      <div class="gocar" @click="goCar">
        <van-icon name="cart-o" color="white" size="20"/>
      </div>
        <!-- 商品轮播图 -->
        <van-swipe :autoplay="3000" class="van-s" @change="onChange">
          <van-swipe-item v-for="(image, index) in images" :key="index">
            <img v-lazy="image" />
          </van-swipe-item>
          <template #indicator>
            <div class="custom-indicator">
              {{ current + 1 }}/{{ilength}}
            </div>
          </template>
        </van-swipe>

        <!-- 价格，title栏 -->
        <div class="d-title">
          <div class="price">¥ {{price}}</div>
          <div class="title">{{title}}</div>
          <div class="t-msg">
            <div class="kuai">快递:快递包裹</div>
            <div class="sell">月销{{volume}}</div>
            <div class="city">{{provcity}}</div>
          </div>
        </div>

        <!-- 服务栏 -->
        <div class="serve" @click="showPopup">
        
          <span class="left">服务</span>
          <span class="right">7天无理由退货</span>
          <span class="icon">></span>

        </div>
        <van-popup
            v-model="showOne"
            round
            closeable
            close-icon="close"
            position="bottom"
            :style="{ height: '80%' }"
          >
          <div class="serve-msg">
            <div class="top">
              基础服务
            </div>
            <div class="ulli">
              <van-icon name="passed"  color="#ff6b28"/>
              <div class="li-msg">7天无理由</div>
            </div>
            <div class="little">
                满足7天无理由退换货申请的前提下，包邮商品需要买家
                承担退货邮费，非包邮商品需要买家承担发货和退货邮费。
            </div>
            
            <div class="top">
              其他
            </div>
              <div class="ulli">
                <van-icon name="passed"  color="#ff6b28"/>
                <div class="li-msg">蚂蚁花呗</div>
              </div>
              <div class="ulli">
                <van-icon name="passed"  color="#ff6b28"/>
                <div class="li-msg">信用卡支付</div>
              </div>
              <div class="ulli">
                <van-icon name="passed"  color="#ff6b28"/>
                <div class="li-msg">集分宝</div>
              </div>
            </div>
          
        </van-popup>

        <!-- 商品规格 -->
        <div class="vansku" @click="showd">
          <span class="cho">选择</span>
          <span class="skut">{{skuText}}</span>
          <span class="icon">></span>
        </div>
        <van-sku
          v-model="show"
          :sku="sku"
          :goods="goods"
          :goods-id="goodsId"
          :quota="quota"
          :quota-used="quotaUsed"
          :hide-stock="sku.hide_stock"
          @add-cart="onAddCartClicked"
          ref="getSku"
        >
          <template #sku-actions="props">
            <div class="van-sku-actions">
              <van-button square size="large" type="warning" @click="define" >
                加入购物车
              </van-button>
              <!-- 直接触发 sku 内部事件，通过内部事件执行 onBuyClicked 回调 -->
              <van-button
                square
                size="large"
                type="danger"
                @click="props.skuEventBus.$emit('sku:buy')"
              >
                立即购买
              </van-button>
            </div>
          </template>
        </van-sku>
        
        <!-- 商品参数 -->
        <div class="param" @click="showPopupTwo">
          <span class="p">参数</span>
          <span class="icon">></span>
        </div>
        <van-popup
            v-model="showTwo"
            round
            closeable
            close-icon="close"
            position="bottom"
            :style="{ height: '80%' }"
          >
          <div class="paramshow">
            <div class="title">基本参数</div>
            <div class="showitem" v-for="(item,index) in paramMsg" :key="index">
              <div class="item-title">{{item.title}}</div>
              <div class="item-con">{{item.con}}</div>
            </div>
          </div>
        </van-popup>

        <!-- 商品评价 -->
        <div class="evaluate">
          <div class="title">
            <div class="num">商品评价({{eAll}})</div>
            <div class="all">查看全部 ></div>
          </div>
          <div class="most">
            <div class="m-item"  v-for="(item,index) in most" :key="index">{{item.word}}({{item.count}})</div>
          </div>
          <div class="e-item"  v-for="(item,index) in eItem" :key="index">
            <div class="item-pic">
              <div class="pic">
                <img :src="item.pic">
              </div>
              <div class="name">{{item.name}}</div>
            </div>
            <div class="item-eva">{{item.con}}</div>
            <div class="item-msg">{{item.skuinfo}}</div>
          </div>
        </div>

        <!-- 店铺信息 -->
        <div class="shop">
          <div class="shop-icon">
            <div class="sicon">
              <img :src="shopicon">
            </div>
            <div class="iright">
              <div class="sname">{{shopname}}</div>
              <div class="lp">
                <img :src="shoptaoicon">
              </div> 
            </div>
          </div>
          <div class="slevel">
            <div class="level" v-for="(item,index) in sthree" :key="index">
              <span style="color:#555555">{{item.title}}</span>
              <span :style="{color: item.score > 4.8 ? '#ff0230' : '#00b78b'}"> {{item.score}}</span>
              <span :style="{color: item.score > 4.8 ? '#ff0230' : '#00b78b'}">{{item.levelText}}</span>
            </div>
          </div>
          <div class="ref">
            <div class="allshop">全部商品</div>
            <div class="toshop">进入店铺</div>
          </div>
        </div>

        <!-- 底部留白 -->
        <div class="bai"></div>
        
        <!-- 商品底部栏 -->
        <van-goods-action>
         <van-goods-action-icon icon="chat-o" text="客服" color="#07c160" />
         <van-goods-action-icon icon="cart-o" text="购物车" />
         <van-goods-action-icon icon="star" text="已收藏" color="#ff5000" />
         <van-goods-action-button type="warning" text="加入购物车" />
         <van-goods-action-button type="danger" text="立即购买" />
        </van-goods-action>
        
    </div>
</template>

<script>
import'../assets/less/Detail.less'

    export default {
        name:'Detail',
        data(){
            return{
              num_iid:'',
              current: 0,
              images:[],
              ilength:0,
              price:'',
              title:'',
              provcity:'',
              volume:'',
              
              showOne: false,
              showTwo:false,
              show:false,
              skuText:'',
              //商品规格数据
              sku: {
                // 所有sku规格类目与其值的从属关系，比如商品有颜色和尺码两大类规格，颜色下面又有红色和蓝色两个规格值。
                // 可以理解为一个商品可以有多个规格类目，一个规格类目下可以有多个规格值。
                tree: [],
                // 所有 sku 的组合列表，比如红色、M 码为一个 sku 组合，红色、S 码为另一个组合
                list: [],
                price: '', // 默认价格（单位元）
                stock_num: 0, // 商品总库存
                collection_id: 0, // 无规格商品 skuId 取 collection_id，否则取所选 sku 组合对应的 id
                none_sku: false, // 是否无规格商品
                messages: [
                  {
                    // 商品留言
                    datetime: '0', // 留言类型为 time 时，是否含日期。'1' 表示包含
                    multiple: '0', // 留言类型为 text 时，是否多行文本。'1' 表示多行
                    name: '留言', // 留言名称
                    type: 'text', // 留言类型，可选: id_no（身份证）, text, tel, date, time, email
                    required: '1', // 是否必填 '1' 表示必填
                    placeholder: '' // 可选值，占位文本
                  },
                      
                ],
                hide_stock: false // 是否隐藏剩余库存
              },
              goods:{
                picture: ''
              },
              goodsId:'',
              quota:0,
              quotaUsed:0,
              hideStock:false,
              //商品参数
              paramMsg:{
                title:'',
                con:''
              },
              //用户总评价数
              eAll:0,
              //用户评价most
              most:[],
              eItem:[],
              //店铺三项评分
              sthree:[],
              shopname:'',
              shopicon:'',
              shoptaoicon:'',
              //存储数据
              localitem:[],
            }
        },
        created(){
            //截取num-iid
            this.num_iid = this.$route.params.num_iid;
            // console.log(".num_iid ",this.num_iid);
            this.getDatas();
            this.getDatasItem();
        },
        methods:{
            onChange(index) {
              this.current = index;
            },
            showPopup() {
              this.showOne = true;
            },
            showPopupTwo() {
              this.showTwo = true;
            },
            showd() {
              this.show = true;
            },
            back() {
              this.$router.go(-1);
            },
            goCar(){
              this.$router.push({name:'Car'})
            },
            onAddCartClicked(){

            },
            define(){
              let that = this;
              this.localitem = that.$refs.getSku.getSkuData();
              // console.log(this.localitem);
              let index = JSON.parse(localStorage.getItem("newOn")||"[]");
              //先拿出本地缓存
              let allusermsg =JSON.parse(localStorage.getItem("allUserMsg")||"[]");
              let usermsg = allusermsg[index];
              // for(let i in usermsg.mycar){
              //   if(usermsg.mycar.length==0){
                   
              //   }else if(usermsg.mycar[i].goodsid == this.localitem.goodsId){
              //     Toast.fail('该商品已在购物车');
              //     return;
              //   }else{

              //   }
              // }
              //转义后再存新数据
              let info={goodsid:'',skuid:'',s1:'',s2:'',count:'',price:''}
              info.goodsid = this.localitem.goodsId;
              info.skuid = this.localitem.selectedSkuComb.id;
              info.s1 = this.localitem.selectedSkuComb.s1;
              info.s2 = this.localitem.selectedSkuComb.s2;
              info.count = this.localitem.selectedNum;
              info.price = this.localitem.selectedSkuComb.price;
              usermsg.mycar.push(info);
              console.log(usermsg)
              localStorage.setItem("allUserMsg", JSON.stringify(allusermsg));
            },
            //获取更加的详细单个商品数据
            getDatas(){
              this.axios({
                  method:'GET',
                  url:'http://api.tbk.dingdanxia.com/tbk/item_info',
                  params:{
                    apikey:'oBe89v0siikk31FsKFDBz0vH1veefYVb',
                    num_iids:this.num_iid
                  }
              }).then(result => {
                
                let pic = result.data.data[0].small_images.string;
                this.goods.picture = result.data.data[0].pict_url;
                this.ilength = pic.length;
                for(let i in pic){
                  this.images.push(pic[i]);
                }
                this.price = result.data.data[0].reserve_price;
                this.title = result.data.data[0].title;
                this.provcity = result.data.data[0].provcity;
                this.volume = result.data.data[0].volume;
              }).catch(err => {
                console.log('err ==>',err)
              })
            },
            //获取商品规格
            getDatasItem(){
            this.axios({
              method:'GET',
              url:'http://api.ds.dingdanxia.com/shop/good_info',
              params:{
                apikey:'oBe89v0siikk31FsKFDBz0vH1veefYVb',
                id:this.num_iid,
                info:'all'
              }
            }).then(result =>{
              // console.log('result ==>', result);
              this.skuText = result.data.data.data.item.skuText;
              this.goodsId = result.data.data.data.item.itemId;
              //获取sku数据中的tree
              let skutree={k:'',k_s:'',v:[],k_id:''};
              let skubase = result.data.data.data.skuBase.props
              let valueitem = {id:'',name:'',imgUrl: '', previewImgUrl:''};
              // console.log(skubase)
              for(let i in skubase){
                skutree={k:'',k_s:'',v:[],k_id:''};
                skutree.k = skubase[i].name;
                skutree.k_s = 's' + (Number(i)+1);
                skutree.k_id = skubase[i].pid;
                // console.log(skutree.k_s)
                for(let j in skubase[i].values){
                  valueitem = {id:'',name:'',imgUrl: '', previewImgUrl:''};
                  valueitem.id = skubase[i].values[j].vid
                  valueitem.name = skubase[i].values[j].name
                  valueitem.imgUrl = skubase[i].values[j].image
                  valueitem.previewImgUrl = skubase[i].values[j].image
                  skutree.v.push(valueitem)
                }
                this.sku.tree.push(skutree)
              }
              //获取sku数据中的list
              let skulist = {id:'',s1:'',s2:'',price:'',stock_num:''};
              let skuskus = result.data.data.data.skuBase.skus;
              let ppp = result.data.data.data.mockData;
              let getp = JSON.parse(ppp).skuCore.sku2info;
              let pitem = Object.entries(getp)
              // console.log("pitem ==>",pitem);
              // console.log(pitem[1][0])
              for( let i in skuskus){
                skulist = {id:'',s1:'',s2:'',price:'',stock_num:''};
                skulist.id =skuskus[i].skuId;
                if(skubase.length>1){
                  let s1 = skuskus[i].propPath.split(";")[0];
                  let s2 = skuskus[i].propPath.split(";")[1];
                  skulist.s1 = s1.split(":")[1];
                  skulist.s2 = s2.split(":")[1];
                }else if(skubase.length == 1){
                  skulist.s1 = skuskus[i].propPath.split(":")[1];
                  skulist.s2 = 0;
                }
                
                // console.log(skulist.s1,skulist.s2);
                for( let j in pitem){
                  if(pitem[j][0]==skulist.id){
                    skulist.price = pitem[j][1].price.priceMoney
                    skulist.stock_num = pitem[j][1].quantity
                  }
                }
                // console.log(skulist)
                this.sku.list.push(skulist)
              }
              //默认价格 库存
              this.sku.price = pitem[0][1].price.priceText;
              this.sku.stock_num = pitem[0][1].quantity;
              //获取产品参数
              let paramm = result.data.data.data.propsCut.split(" ");
              let paramp = result.data.data.data.props.groupProps[0].基本信息;
              let paramitem = {title:'',con:''};
              let paramcon = [];
              for(let i in paramm){
                paramitem = {title:'',con:''};
                paramitem.title = paramm[i];
                paramcon.push(paramitem)
              }

              for(let j in paramp){
                for(let k in paramp[j]){
                  paramcon[j].con = paramp[j][k];
                }
              }
              // console.log(paramcon)
              this.paramMsg = paramcon;

              //获取用户评价
              //用户总评价数
              this.eAll = result.data.data.data.rate.totalCount;
              //most评价
              let mMsg = result.data.data.data.rate.keywords;
              let mItem = {word:'',count:''};
              for(let i in mMsg){
                mItem = {word:'',count:''}
                mItem.word = mMsg[i].word;
                mItem.count= mMsg[i].count;
                this.most.push(mItem);
              }
              //获取详情页简评
              let eMsg = result.data.data.data.rate.rateList;
              let eitem = {pic:'',name:'',con:'',skuinfo:''}
              for(let i in eMsg){
                eitem = {pic:'',name:'',con:'',skuinfo:''}
                eitem.pic = eMsg[i].headPic;
                eitem.name = eMsg[i].userName;
                eitem.con = eMsg[i].content;
                eitem.skuinfo = eMsg[i].skuInfo;
                this.eItem.push(eitem)
              }

              //获取店铺信息
              let three = result.data.data.data.seller.evaluates2
              let sone={levelText:'',score:'',title:'',levelTextColor:'',scoreTextColor:'',titleColor:''}
              for(let i in three){
                sone={levelText:'',score:'',title:'',levelTextColor:'',scoreTextColor:'',titleColor:''}
                sone.levelText = three[i].levelText;
                sone.score = three[i].score;
                sone.title = three[i].title;
                sone.levelTextColor = three[i].levelTextColor;
                sone.scoreTextColor = three[i].scoreTextColor;
                sone.titleColor = three[i].titleColor;
                this.sthree.push(sone);
              }

              this.shopname = result.data.data.data.seller.shopName;
              this.shopicon = result.data.data.data.seller.shopIcon;
              this.shoptaoicon = result.data.data.data.seller.creditLevelIcon;
              



            }).catch(err => {
              console.log('err ==>',err)
            })
          }
        },
        //点击加入购物车后，把商品规格数据存进本地
        addToCar(){
          
        }
          
          

    }
</script>

<style lang="less" scoped>

</style>