<template>
    <div class="newHouse">
        <div class="main">
            <img src="@/assets/images/newHouse.png" alt="">
            <div class="section stepBox">
                <p>装修流程</p>
                <step/>
            </div>
            <div class="section section2">
                <img src="@/assets/images/newHouse2.png" alt="">
            </div>
            <div class="section section3">
                <img src="@/assets/images/newHouse3.png" alt="">
            </div>
        </div>
    </div>
</template>
<script>
import step from './template/step'
export default {
    components:{
        step
    }
}
</script>>
<style lang="scss" scoped>
.newHouse{
    min-height: 100vh;
    width: 100%;
    .main{
        position: relative;
        font-size: 0;
        >img{
            width: 100%;
        }
        .section{
            >img{
                width: 100%;
            }
            &.stepBox{
            position: absolute;
            top: 283px;
            left: 10px;
            height: 132px;
            background: #fff;
        }
        }
        
    }
}
</style>