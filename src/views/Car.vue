<template>
    <div class="car">
        <div class="bg">
            <div class="top">
                <div class="title">购物车({{shopCount}})</div>
                <div class="choose" @click="startdelete" v-if="this.delete==false">管理</div>
                <div class="choose" @click="startdelete" v-else>完成</div>
            </div>
            <div class="bottom">
                共有{{shopCount}}件宝贝
            </div>
        </div>
        <div class="bgg"></div>
        <van-checkbox-group v-model="result" ref="checkboxGroup" class="shopitem">
          <van-checkbox v-for="(item,index) in newcar" 
                    :key="index" 
                    :name="item.title" 
                    v-model="item.check"
                    @click="singleCheck(item.check,index)">
              <van-card
              :num="item.num"
              :price="item.price"
              :desc="item.con"
              :title="item.title"
              :thumb="item.url"
            >
            </van-card>
          </van-checkbox>

        </van-checkbox-group>

        
        <van-submit-bar :price="price" button-text="结算"  v-if="this.delete==false" @submit="commit">
          <van-checkbox  v-model="choose" @click="change">全选</van-checkbox>
        </van-submit-bar>
        <van-submit-bar   button-text="删除选项"  v-else  @click.native="delshop">
          <!-- <van-checkbox  v-model="choose" @click="change">全选</van-checkbox> -->
        </van-submit-bar>
    </div>
</template>

<script>
import'../assets/less/Car.less'
    export default {
        name:'Car',
        data() {
            return {
                index:0,
                result: [],
                choose:false,
                delete:false,
                //已加入购物车的商品id和类型id
                car:'',
                shopCount:'',
                //重新渲染的数据
                newcar:[],

                price:0,
            }
        },
        created(){
            //从localstroge获取mycar数据
            this.index =JSON.parse(localStorage.getItem("newOn")||"[]");
            this.car =JSON.parse(localStorage.getItem("allUserMsg")||"[]")[this.index];
            //计算有几件商品
            this.shopCount = this.car.mycar.length;
            this.getshopitem();
        },
        methods: {
            //全选
            change(){
                if(this.choose==false){
                    this.$refs.checkboxGroup.toggleAll(false);
                    for(let i in this.newcar){
                        this.singleCheck(true,i)
                    }
                    this.choose == true;
                }else if(this.choose == true){
                    for(let i in this.newcar){
                        this.singleCheck(false,i)
                    }
                    this.$refs.checkboxGroup.toggleAll(true);
                    this.choose == false;
                }
            },

            //通过car里的商品id和规格id获取商品的展示数据
            getshopitem(){
                
                let shopitem = {
                    id:'',
                    title:'',
                    con:'',
                    price:'',
                    num:'',
                    url:'',
                    sname:'',
                    check:false
                }
                for(let i in this.car.mycar){
                    this.axios({
                        method:'GET',
                        url:'http://api.tbk.dingdanxia.com/tbk/item_detailinfo',
                        params:{
                            apikey:'oBe89v0siikk31FsKFDBz0vH1veefYVb',
                            id:this.car.mycar[i].goodsid,
                        }
                    }).then(result =>{
                        console.log('result ==>', result);
                        shopitem = {id:'',title:'',con:'',price:'',num:'',url:'',sname:'',check:false}
                        let that =this;
                        shopitem.id = that.car.mycar[i].goodsid;
                        shopitem.sname = result.data.data.nick;
                        shopitem.title = result.data.data.title;
                        shopitem.price  = that.car.mycar[i].price/100;
                        shopitem.num = that.car.mycar[i].count;
                        shopitem.url = result.data.data.pict_url;
                        let conitem = result.data.data.sku_list.tbk_item_detail_sku;
                        for(let j in conitem){
                            if(this.car.mycar[i].skuid = conitem[j].sku_id){
                                let pin='';
                                if(Array.isArray(conitem[j].property_list.tbk_item_detail_sku_prop)==true){
                                    for(let k in conitem[j].property_list.tbk_item_detail_sku_prop){
                                       pin += conitem[j].property_list.tbk_item_detail_sku_prop[k].value_text;
                                    }
                                }else{
                                    pin = conitem[j].property_list.tbk_item_detail_sku_prop.value_text
                                }
                                shopitem.con = pin;
                            }
                        }
                        that.newcar.push(shopitem);
                        // console.log(that.newcar);
                    }).catch(err =>{
                        console.log('err ==>', err);
                    })
                }

            },
            //单选改变总计价
            singleCheck(checked,index){
                let p = this.newcar[index].price;
                // console.log(p)
                if (checked==true) {
                    this.newcar[index].check = false;
                    this.price -= (p)*100  
                }else if(checked==false){
                    this.newcar[index].check = true;
                    this.price += (p)*100
                }
            },
            //点击开启/关闭删除恩牛
            startdelete(){
                this.delete = !this.delete
            },
            //删除选中商品
            delshop(){
                let carmsg = JSON.parse(localStorage.getItem("allUserMsg")||"[]");
                let delcar = carmsg[this.index].mycar;
                for(let i in this.newcar){
                    if(this.newcar[i].check==true){
                        for(let k in delcar){
                            if(delcar[k].goodsid==this.newcar[i].id){
                                console.log(delcar[k].price)
                                delcar.splice(k,1)
                            }
                        }
                        let p = this.newcar[i].price
                        // delcar.splice(i,1)
                        this.newcar.splice(i,1)
                        
                        this.price -= (p)*100
                        this.shopCount--;
                    }
                }
                localStorage.setItem("allUserMsg", JSON.stringify(carmsg));
                console.log(this.newcar)
            },

            //提交订单，跳转到订单页面
            commit() {
                // console.log("提交");
                //sids: 勾选商品的购物袋sid集合
                let listing = [];
                let listmsg={id:'',num:'',price:'',con:'',title:'',url:'',sname:''}
                this.newcar.map(v => {
                    if (v.check) {
                        listmsg.id=v.id
                        listmsg.con = v.con
                        listmsg.price = v.price
                        listmsg.num = v.num
                        listmsg.title = v.title
                        listmsg.url = v.url
                        listmsg.sname = v.sname
                        listing.push(listmsg);
                    }
                })
                localStorage.setItem("Listing", JSON.stringify(listing));
                //跳转到结算页面且携带sids查询参数
                this.$router.push({name: 'Listing'});
            }

        },
    }
</script>

<style lang="less" scoped>

</style>