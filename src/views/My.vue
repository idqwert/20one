<template>
    <div class="my"> 
        <div class="top"></div>
        <div class="body">
            <div class="itemone" @click="tui">
                退出账号
            </div>
        </div>
    </div>
</template>

<script>
import'../assets/less/My.less'
import { Dialog } from 'vant';
    export default {
        name:'My',
        data(){
            return{
                
            }
        },
        methods:{
            tui(){
                Dialog.confirm({
                  title: '确定退出账号吗',
                  message: ' ',
                  theme: 'round-button',
                }).then(() => {
                    // console.log("tuichul")
                    localStorage.removeItem('newOn');
                    this.$router.push({name: 'Login'});
                }).catch(() => {
                    return;             
                });
                
            }
        }
        
    }
</script>

<style lang="less" scoped>

</style>