<template>
    <div >
        <van-tabs v-model="active" color="#ff852a">
          <van-tab title="全部">
              <div class="list">
                <div class="shopitem" v-for="(item,index) in allList" :key="index">
                    <div class="top">
                        <div class="lsname">{{item.shoplisting[0].sname}}</div>
                        <div class="time">{{item.time}}</div>
                    </div>
                    <div class="mid">
                        <div class="pic">
                            <img :src="item.shoplisting[0].url">
                        </div>
                        <div class="ltitle">{{item.shoplisting[0].title}}</div>
                        <div class="con">{{item.shoplisting[0].con}}</div>
                        <div class="price">
                            <span class="p">￥{{item.shoplisting[0].price}}</span>
                            <span class="n">x {{item.shoplisting[0].num}}</span>
                        </div>
                    </div>
                    <div class="ad">
                        <div class="ad-top">
                            <span class="uname">收货人: {{item.address.name}}</span>
                            <span class="uphone">{{item.address.tel}}</span>
                        </div>
                        <div class="ad-bot">地址: {{item.address.address}}</div>
                    </div>
                    <div class="bot" v-if="item.ispay==false">
                        <div class="que" @click="shou(item,index)">确认收货</div>
                        <div class="ing">卖家已发货</div>
                    </div>
                    <div class="bot" v-else>
                        <div class="ing">交易已完成</div>
                        <div class="check" @click="delList(item,index)">删除订单</div>
                    </div>
                </div>
            </div>
          </van-tab>

          <van-tab title="代付款">
              <div class="list">
                <div class="shopitem" v-for="(item,index) in nopayList" :key="index">
                    <div class="top">
                        <div class="lsname">{{item.shoplisting[0].sname}}</div>
                        <div class="time">{{item.time}}</div>
                    </div>
                    <div class="mid">
                        <div class="pic">
                            <img :src="item.shoplisting[0].url">
                        </div>
                        <div class="ltitle">{{item.shoplisting[0].title}}</div>
                        <div class="con">{{item.shoplisting[0].con}}</div>
                        <div class="price">
                            <span class="p">￥{{item.shoplisting[0].price}}</span>
                            <span class="n">x {{item.shoplisting[0].num}}</span>
                        </div>
                    </div>
                    <div class="ad">
                        <div class="ad-top">
                            <span class="uname">收货人: {{item.address.name}}</span>
                            <span class="uphone">{{item.address.tel}}</span>
                        </div>
                        <div class="ad-bot">地址: {{item.address.address}}</div>
                    </div>
                    <div class="bot" v-if="item.ispay==false">
                        <div class="que" @click="shou(item,index)">确认收货</div>
                        <div class="ing">卖家已发货</div>
                    </div>
                    
                </div>
            </div>
          </van-tab>

          <van-tab title="待评价">
              <div class="list">
                <div class="shopitem" v-for="(item,index) in ispayList" :key="index">
                   <div class="top">
                        <div class="lsname">{{item.shoplisting[0].sname}}</div>
                        <div class="time">{{item.time}}</div>
                    </div>
                    <div class="mid">
                        <div class="pic">
                            <img :src="item.shoplisting[0].url">
                        </div>
                        <div class="ltitle">{{item.shoplisting[0].title}}</div>
                        <div class="con">{{item.shoplisting[0].con}}</div>
                        <div class="price">
                            <span class="p">￥{{item.shoplisting[0].price}}</span>
                            <span class="n">x {{item.shoplisting[0].num}}</span>
                        </div>
                    </div>
                    <div class="ad">
                        <div class="ad-top">
                            <span class="uname">收货人: {{item.address.name}}</span>
                            <span class="uphone">{{item.address.tel}}</span>
                        </div>
                        <div class="ad-bot">地址: {{item.address.address}}</div>
                    </div>
                    <div class="bot">
                        <div class="ing">交易已完成</div>
                        <div class="check">删除订单</div>
                    </div>
                </div>
            </div>
          </van-tab>
        </van-tabs>

    </div>
</template>

<script>
import { Toast } from 'vant';

import'../assets/less/List.less'
    export default {
        name:'List',
        data(){
            return{
                active: 0,
                newon:0,
                allList:[],
                nopayList:[],
                ispayList:[],
            }
        },
        created(){
            this.newon = JSON.parse(localStorage.getItem("newOn")||"[]");
            this.getUserList();
        },
        methods:{
            //查询订单列表 并根据付款情况分类
            getUserList(){
                this.allList=[]
                this.nopayList=[]
                this.ispayList=[]
                let usermsg = JSON.parse(localStorage.getItem("allUserMsg")||"[]");
                let uaddress = usermsg[this.newon].list;
                // this.allList = uaddress;
                for(let i in uaddress){
                    if(uaddress[i].ispay==false){
                        this.nopayList.push(uaddress[i])
                        this.allList.push(uaddress[i])
                    }else if(uaddress[i].ispay==true){
                        this.ispayList.push(uaddress[i])
                        this.allList.push(uaddress[i])
                    }
                }
            },
            //确认收货
            shou(item,index){
                let usermsg = JSON.parse(localStorage.getItem("allUserMsg")||"[]");
                let uaddress = usermsg[this.newon].list;
                console.log(item,index);
                // console.log(item.time);
                // item.ispay = true
                for(let i in uaddress){
                    if(uaddress[i].time == item.time){
                        uaddress[i].ispay = true
                    }
                }
                localStorage.setItem("allUserMsg",JSON.stringify(usermsg));
                this.getUserList();
                Toast('已确认收货');
            },
            //删除订单
            delList(item,index){
                console.log(item.title)
            }
        }
    }
</script>

<style lang="less" scoped>

</style>