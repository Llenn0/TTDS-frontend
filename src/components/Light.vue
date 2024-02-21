<template>
    <div class="light-container" :class="{'on': isActive}">
        <div class="wire"></div>
        <div class="ceiling"></div>
        <div @click="switchStatus" class="bulb">
            <span :class="{'bulb-close': !this.$store.state.lightStatus}"></span>
            <span :class="{'bulb-close': !this.$store.state.lightStatus}"></span>
        </div>
    </div>
</template>

<script>
export default {
  name: "Light",
  data() {
    return {
        isActive: true
    }
  },
  mounted() {
    console.log(this.$store.state.count)
  },
  methods: {
    switchStatus(){
        this.isActive = !this.isActive
        this.$store.commit('changeLightStatus')
    }
  }
}
</script>

<style scoped>
*{
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
.light-container{   
    position: relative;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
}
.bulb{
    position: relative;
    width: 40px;
    height: 40px;
    background-color: #444;
    border-radius: 50%;
    z-index: 2;
    cursor: pointer;
}
.bulb::before{
    content: '';
    position: absolute;
    top: -31px;
    left: 11.5px;
    width: 17.5px;
    height: 20px;
    background-color: #444;
    border-top: 20px solid #000;
    border-radius: 10px;
}
.bulb span:nth-child(1){
    position: absolute;
    top: -8px;
    left: -2px;
    display: block;
    width: 15px;
    height: 15px;
    background: #eff0e9;
    transform: rotate(342deg);
    border-bottom-right-radius: 40px;
    box-shadow: 10px 10px 0 5px #444;
}
.bulb-close{
    background-color: #6a6a71a0 !important;
}
.bulb span:nth-child(2){
    position: absolute;
    top: -8px;
    left: 27px;
    display: block;
    width: 15px;
    height: 15px;
    background: #eff0e9;
    transform: rotate(112deg);
    border-bottom-right-radius: 40px;
    box-shadow: 10px 10px 0 5px #444;
}
.wire{
    position: absolute;
    top: 7px;
    left: 50%;
    bottom: 50%;
    width: 1px;
    height: 30px;
    background: #000;
    z-index: 1;
}
.ceiling{
    position: absolute;
    top: 7px;
    left: 50%;
    transform: translateX(-50%);
    width: 12px;
    height: 1px;
    background: #000;
    z-index: 1;
}

.light-container.on .bulb{
    background: #fff;
    box-shadow: 0 0 25px #fff;
}
.light-container.on .bulb::before{
    background: #fff;
}

.light-container.on .bulb::after{
    content: '';
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    width: 60px;
    height: 60px;
    background: #fff;
    border-radius: 50%;
    filter: blur(20px);
}
.light-container.on .bulb span:nth-child(1){
    box-shadow: 10px 10px 0 5px #fff;
}
.light-container.on .bulb span:nth-child(2){
    box-shadow: 10px 10px 0 5px #fff;
}

.light-container.on .bulb span:nth-child(1){
    background: transparent;
}
.light-container.on .bulb span:nth-child(2){
    background: transparent;
}
</style>