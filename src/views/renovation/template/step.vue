<template>
    <div class="step">
        <div class="stepBox" v-for="(item,index) in steps" :key="index">
            <div class="stepInfo">{{item.title}}</div>
            <van-icon class="arrow" name="arrow"/>
        </div>
    </div>
</template>
<script>
import api from '@/api'
export default {
    data(){
        return{
            steps:[]
        }
    },
    created(){
      api('renovation.getPhaseDataByTypeDictId',{typeDictId:this.$route.query.typeDictId}).then(res=>{
          this.steps=res
      }) 
    }
}
</script>>
<style lang="scss" scoped>
@import '@/commons/css/mixin.scss';
.step{
    display: flex;
    .stepBox{
        display: flex;
        flex: 1;
        align-items: center;
        margin-right: 16px;
        .stepInfo{
            height: 40px;
            line-height: 40px;
            width: 100%;
            text-align: center;
            font-size: 12px;
            position: relative;
            @include border-1px(#20b7b6,'all',4px,solid);
        }
        .arrow{
            font-size: 10px;
            color: #20B7B6;
        }

    }
}
</style>