<template>
    <div>
        <div class="title">订单生成中...</div>
        <div class="body">
            <div class="addressBox" @click="isshow">
                <div class="admsg">
                    <div class="pic">
                        <van-icon name="location" color="#ff5801" size="30"/>
                    </div>
                    <div class="msg">
                        <div class="np">
                            <span class="name">{{newlist.name}}</span>
                            <span class="phone">{{newlist.tel}}</span>
                        </div>
                        <div class="address">{{newlist.address}}</div>
                    </div>
                </div>
            </div>

            <van-popup v-model="show" 
                :style="{ height: '90%' }"
                closeable
                close-icon="close"
                position="bottom">
                <van-address-list
                  v-model="chosenAddressId"
                  :list="list"
                  default-tag-text="默认"
                  @add="onAdd"
                  @edit="onEdit"
                  @select="onSelect"
                />

                <van-popup v-model="showtwo" 
                :style="{ height: '80%' }"
                closeable
                close-icon="close"
                position="bottom">
                    <van-address-edit
                      :area-list="areaList"
                      show-postal
                      show-delete
                      show-set-default
                      show-search-result
                      :search-result="searchResult"
                      :area-columns-placeholder="['请选择', '请选择', '请选择']"
                      @save="onSave"
                      @delete="onDelete"
                    />
                </van-popup>

                <van-popup v-model="showthree" 
                class="three"
                :style="{ height: '80%' }"
                closeable
                close-icon="close"
                position="bottom">
                    <van-field v-model="daimsg.name" label="收货人姓名" />
                    <van-field v-model="daimsg.tel" type="tel" label="手机号" />
                    <van-field v-model="daimsg.province"  label="省" />
                    <van-field v-model="daimsg.city" label="市" />
                    <van-field v-model="daimsg.county" label="区" />
                    <van-field v-model="daimsg.addressDetail" label="详细地址" />
                    <van-cell center title="是否选为默认地址">
                      <template #right-icon>
                        <van-switch v-model="daimsg.checked" size="24" />
                      </template>
                    </van-cell>
                    <van-button type="info" @click="save">保存当前数据</van-button>
                    <van-button type="danger" @click="deladdress">删除该地址</van-button>
                </van-popup>

            </van-popup>
            
            <div class="listBox">
                <div class="listItem" v-for="(item,index) in listing" :key="index">
                    <div class="sname">{{item.sname}}</div>
                    <div class="msgbox">
                        <div class="lpic">
                            <img :src="item.url">
                        </div>
                        <div class="text">
                            <div class="ltitle">{{item.title}}</div>
                            <div class="con">{{item.con}}</div>
                            <div class="price">
                                <span class="pprice">￥{{item.price}}</span>
                                <span class="num">x{{item.num}}</span>
                            </div>
                        </div>
                    </div>
                </div>

                <van-field
                  v-model="message"
                  rows="2"
                  autosize
                  label="留言"
                  type="textarea"
                  maxlength="50"
                  placeholder="请输入留言"
                  show-word-limit
                />

            </div>

        </div>

        <van-submit-bar :price="price" button-text="生成订单" @submit="commit">

        </van-submit-bar>
    </div>
</template>

<script>
import Vue from 'vue';
import { Toast ,AddressEdit} from 'vant';
Vue.use(AddressEdit)
.use(Toast);
import areaList from "../assets/js/area.js";
import'../assets/less/Listing.less'
    export default {
        name:'Listing',
        data(){
            return{
                newon:0,
                show:false,
                showtwo:false,
                showthree:false,
                price:0,
                chosenAddressId: '1',
                addressid:'1',
                //已有地址数据
                list: [
                ],
                //页表默认地址
                newlist:{
                    name:'',
                    tel:'',
                    address:''
                },
                //编辑地址数据
                areaList,
                searchResult: [],
                //点击编辑按钮后待编辑的数据
                daimsg:{
                    index:'',
                    tel: '',
                    name: '',
                    province:'',
                    city:'',
                    county:'',
                    addressDetail:'',
                    checked: false
                },
                //提交过来的listing数据
                listing:[],
                //留言框数据
                message:''
            }

        },
        created(){
            this.newon = JSON.parse(localStorage.getItem("newOn")||"[]");
            this.changeua();
            this.searchmo();
            this.getlisting();
            // console.log(this.addressid);
            // console.log(this.list);
        },
        methods:{
            isshow(){
                this.show= !this.show
            },
            isshowtwo(){
                this.showtwo = !this.showtwo
            },
            isshowthree(){
                this.showthree = !this.showthree
            },
            onAdd() {
                this.isshowtwo();
            },
            //点击编辑后，修改地址(读取index数据)
            onEdit(item, index) {
                this.daimsg={
                    index:'',
                    tel: '',
                    name: '',
                    province:'',
                    city:'',
                    county:'',
                    addressDetail:'',
                    checked: false
                }
                this.isshowthree();
                // console.log(item,index);
                this.daimsg.index = index
                this.daimsg.tel = item.tel
                this.daimsg.name =item.name
                this.daimsg.province = item.address.split(' ')[0]
                this.daimsg.city = item.address.split(' ')[1]
                this.daimsg.county = item.address.split(' ')[2]
                this.daimsg.addressDetail = item.address.split(' ')[3];
                this.daimsg.checked = item.isDefault
            },
            //修改地址保存
            save(){
                let usermsg = JSON.parse(localStorage.getItem("allUserMsg")||"[]");
                let uaddress = usermsg[this.newon].address;
                uaddress[this.daimsg.index].tel = this.daimsg.tel
                uaddress[this.daimsg.index].name = this.daimsg.name
                uaddress[this.daimsg.index].province = this.daimsg.province
                uaddress[this.daimsg.index].city = this.daimsg.city
                uaddress[this.daimsg.index].county = this.daimsg.county
                uaddress[this.daimsg.index].addressDetail = this.daimsg.addressDetail
                if(this.daimsg.checked==true){
                    for(let i in uaddress){
                        uaddress[i].isDefault = false;
                    }
                    for(let k in this.list){
                        this.list[k].isDefault = false;
                    }
                }
                uaddress[this.daimsg.index].isDefault = this.daimsg.checked
                localStorage.setItem("allUserMsg", JSON.stringify(usermsg));
                this.changeua();
                this.searchmo();
                Toast('修改地址成功');
            },
            //新增地址进local
            onSave(content) {
                // console.log(content);
                // return;
                let usermsg = JSON.parse(localStorage.getItem("allUserMsg")||"[]");
                let uaddress = usermsg[this.newon].address;
                let ua ={addressDetail:'',areaCode:'',city:'',county:'',isDefault:'',name:'',postalCode:'',province:'',tel:''};
                ua.addressDetail=content.addressDetail
                ua.areaCode=content.areaCode
                ua.city=content.city
                ua.county=content. county
                ua.isDefault=content.isDefault
                ua.name=content.name
                ua.postalCode=content.postalCode
                ua.province=content.province
                ua.tel=content.tel
                if(ua.isDefault==true){
                    for(let i in uaddress){
                        uaddress[i].isDefault = false;
                    }
                    for(let k in this.list){
                        this.list[k].isDefault = false;
                    }
                }
                uaddress.push(ua);
                localStorage.setItem("allUserMsg", JSON.stringify(usermsg));
                Toast('新增地址成功');
                this.changeua();
                this.searchmo();
            },
            // 读取地址并写成list的格式
            changeua(){
                this.list=[]
                let usermsg = JSON.parse(localStorage.getItem("allUserMsg")||"[]");
                let uaddress = usermsg[this.newon].address;
                let listitem={
                        id: '',
                        name: '',
                        tel: '',
                        address: '',
                        isDefault: '',
                    };
                for(let i in uaddress){
                    listitem={
                        id: '',
                        name: '',
                        tel: '',
                        address: '',
                        isDefault: '',
                    };
                    listitem.id =this.addressid;
                    this.addressid++;
                    listitem.name= uaddress[i].name;
                    listitem.tel =uaddress[i].tel;
                    listitem.address =uaddress[i].province+' '+uaddress[i].city+' '+uaddress[i].county+' '+uaddress[i].addressDetail;
                    listitem.isDefault = uaddress[i].isDefault;
                    this.list.push(listitem);
                }
            },
            onDelete() {

            },
            onSelect(item, index){
                this.newlist.name = item.name;
                this.newlist.tel = item.tel;
                this.newlist.address = item.address;
            },
            //进入页面后搜索默认地址
            searchmo(){
                for(let i in this.list){
                    if(this.list[i].isDefault==true){
                        this.newlist.name = this.list[i].name;
                        this.newlist.tel = this.list[i].tel;
                        this.newlist.address = this.list[i].address;
                    }
                }
            },
            //删除地址
            deladdress(){
                // console.log(this.daimsg.index)
                let usermsg = JSON.parse(localStorage.getItem("allUserMsg")||"[]");
                let uaddress = usermsg[this.newon].address;
                uaddress.splice(this.daimsg.index,1);
                localStorage.setItem("allUserMsg", JSON.stringify(usermsg));
                this.changeua();
                this.searchmo();
                Toast('该地址已经删除');
                this.isshowthree()
            },
            //获取正要提交的订单listing
            getlisting(){
                let listingmsg = JSON.parse(localStorage.getItem("Listing")||"[]");
                let listingitem = {title:'',con:'',price:'',url:'',num:'',sname:''}
                for(let i in listingmsg){
                    listingitem = {title:'',con:'',price:'',url:'',num:'',sname:''}
                    listingitem.title = listingmsg[i].title;
                    listingitem.con  = listingmsg[i].con 
                    listingitem.price  = listingmsg[i].price 
                    listingitem.url  = listingmsg[i].url
                    listingitem.num  = listingmsg[i].num 
                    listingitem.sname  = listingmsg[i].sname
                    this.listing.push(listingitem); 
                    this.price += (listingmsg[i].price*listingmsg[i].num)*100; 
                }
            },
            //提交生成订单
            commit(){
                let allListingMsg = {address:'',shoplisting:'',message:'',time:'',ispay:false}
                allListingMsg.address = this.newlist
                allListingMsg.shoplisting = this.listing
                allListingMsg.message = this.message
                let time = new Date()
                // console.log(time.toLocaleString())
                allListingMsg.time = time.toLocaleString()
                console.log(allListingMsg)
                
                let usermsg = JSON.parse(localStorage.getItem("allUserMsg")||"[]");
                let uaddress = usermsg[this.newon].list;
                uaddress.push(allListingMsg);
                localStorage.setItem("allUserMsg", JSON.stringify(usermsg));
                localStorage.removeItem('Listing');
                this.$router.push({name: 'List'});
            }
        },
        
    }
</script>

<style lang="less" scoped>

</style>