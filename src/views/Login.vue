<template>
    <div class="login">
        <van-nav-bar
          left-text="您需要登录才能继续访问"
          right-text="返回"
        > 
          <template #left>
              <div class="nav-left">您需要登录才能继续访问</div>
          </template>
          <template #right>
              <div class="nav-right">关闭</div>
          </template>
        </van-nav-bar>

        <div class="pic">
            <img src="../assets/img/tao2.png">
        </div>

        <van-form >
          <van-field
            v-model="userInfo.phone"
            name="用户名"
            label="用户名"
            placeholder="手机号/邮箱/会员名"
            :rules="[{ required: true, message: '请填写用户名' }]"
          />
          <van-field
            v-model="userInfo.password"
            :type="isPassword ? 'password' : 'text'"
            name="密码"
            label="密码"
            placeholder="请输入登录密码"
            :rules="[{ required: true, message: '请填写密码' }]"
            :right-icon="isPassword ? 'closed-eye' : 'eye-o'"
            @click-right-icon="togglePasswordType"
          />
          
          <div class="wen">
            <div class="left">短信验证码登录</div>
            <div class="right" @click="toggleRegisterBox">免费注册</div>
          </div>

          <div >
            <van-button round block type="info" native-type="submit" @click="login">
              登录
            </van-button>
          </div>
        </van-form>

        <!-- 注册 -->
    <van-popup class="register-box" v-model="isShow" position="bottom" closeable>
       <div class="register-title">注册</div>
       <van-form>

        <van-field
          v-model="userRegisterInfo.phone"
          name="手机号"
          label="手机号"
          placeholder="11位手机号"
          autocomplete="off"
        />

        <van-field
          v-model="userRegisterInfo.password"
          :type="isRegisterPassword ? 'password' : 'text'"
          name="密码"
          label="密码"
          placeholder="密码必须为字母开头"
          :right-icon="isRegisterPassword ? 'closed-eye' : 'eye-o'" 
          autocomplete="off"
          @click-right-icon="toggleRegsiterPasswordType"
        />

        <van-field
          v-model="userRegisterInfo.nickName"
          name="昵称"
          label="昵称"
          placeholder="昵称"
          autocomplete="off"
        />

        <div class="commit-btn register-btn">
          <van-button round block color="#ff7b00" @click="register">
            注册
          </van-button>
        </div>
      </van-form>

    </van-popup>
        

         
    </div>
</template>

<script>
import'../assets/less/login.less'

import {validForm} from '../assets/js/validForm'
import Vue from 'vue';
import { Toast } from 'vant';

Vue.use(Toast);

    export default {
        data(){
          return{
            isPassword : true,
            //用户登录信息
            userInfo: {
              phone: '',
              password: ''
            },

            //用户注册信息
            userRegisterInfo: {
              phone: '',
              password: '',
              nickName: ''
            },

            //是否显示注册框
            isShow: false,
            isRegisterPassword: true
          }
        },
        methods:{
          toggleRegisterBox() {
            this.isShow = true;
          },
          togglePasswordType(){
            this.isPassword = !this.isPassword;
          },
           toggleRegsiterPasswordType() {
            this.isRegisterPassword = !this.isRegisterPassword;
          },
          register() {
          //构造表单验证信息
          let o = {
            phone: {
              value: this.userRegisterInfo.phone,
              errorMsg: '手机号格式不正确',
              reg: /^1[3-9]\d{9}$/
            },
            password: {
              value: this.userRegisterInfo.password,
              errorMsg: '密码由数字字母下划线组合(6-16字符)',
              reg: /^[A-Za-z]\w{5,15}$/
            },
            nickName: {
              value: this.userRegisterInfo.nickName,
              errorMsg: '昵称由字母数字下划线汉字组合(1-10字符)',
              reg: /^[\w\u4e00-\u9fa5]{1,10}$/
            },
          };

          let isPass = validForm.valid(o);

          if (isPass) {
            //复制用户注册信息
            let userInfo = Object.assign({}, this.userRegisterInfo);


            //启动加载提示
            this.$toast.loading({
              //文本提示
              message: '加载中...',
              //禁止穿透点击
              forbidClick: true,
              //提示时间, 0: 没有时间限制
              duration: 1
            });

          // console.log(userInfo)
          let usermsg = {
            name:'',
            password:'',
            phone:'',
            mycar:[],
            collect:[],
            address:[],
            list:[]
          }
          let allMsg=[]
          usermsg.name = userInfo.nickName
          usermsg.password = userInfo.password
          usermsg.phone = userInfo.phone

          allMsg.push(usermsg)
          localStorage.setItem("allUserMsg", JSON.stringify(allMsg));

          }
        },

        //登录
        login() {
          //构造表单验证信息
          let o = {
            phone: {
              value: this.userInfo.phone,
              errorMsg: '手机号格式不正确',
              reg: /^1[3-9]\d{9}$/
            },
            password: {
              value: this.userInfo.password,
              errorMsg: '密码由数字字母下划线组合(6-16字符)',
              reg: /^[A-Za-z]\w{5,15}$/
            }
          };
  
          let isPass = validForm.valid(o);
          if (isPass) {
            //发起登录请求
            //复制用户注册信息
            let userInfo = Object.assign({}, this.userInfo);

  
            this.$toast.loading({
              message: '加载中...',
              forbidClick: true,
              duration: 1
            });
          let Lmsg =JSON.parse(localStorage.getItem("allUserMsg")||"[]");
            for(let i in Lmsg){
              if(Lmsg[i].phone == userInfo.phone){
                if(Lmsg[i].password == userInfo.password){
                  let index = i;
                  localStorage.setItem("newOn", JSON.stringify(index));
                  this.$router.push({name: 'menu'});
                }else{
                  Toast.fail('密码错误');
                }
              }else{
                Toast.fail('账号不存在');
              }
            }
          }
        },
      }
    }
</script>

<style lang="less" scoped>

</style>