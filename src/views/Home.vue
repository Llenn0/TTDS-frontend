<template>
  <div class="home-container">
    <div class="home-content">
      <div class="light-content">
        <Light />
      </div>
      <div class="top-content">
        <div class="book-style">
          <BookStyleComp />
        </div>
        <div class="home-title">
          eBook
        </div>
      </div>
      <div class="input-content">
        <input :placeholder="inputPlaceholder" type="text" v-model="inputValue" class="input-style">
        <div class="search-btn" @click="gotoSearch" @mouseenter="changeBtn(true)" @mouseout="changeBtn(false)">
          <img v-if="switchImgSearch == false" class="btn-style" src="../assets/s2.png" alt="">
          <img v-else class="btn-style" src="../assets/s1.png" alt="">
        </div>
        <div v-if="inputValue" @click="clearInput" class="cancel">
          <img class="btn-cancel-style" src="../assets/cha.png" alt="">
        </div>
      </div>
      <div class="search-option">
        <div class="option-main" @click="showOption">
          <span>
            Search method: {{ selectValue }}
          </span>
          <img class="option-icon-style" v-if="!showOptionValue" src="../assets/j1.png" alt="">
          <img class="option-icon-style" v-else src="../assets/j2.png" alt="">
        </div>
        <div class="option-list fade" :class="{'show': showOptionValue}">
          <div class="option-item" @click="selectOption('Semantic Search')">
            <div>
              Semantic Search
            </div>
            <img v-if="selectValue == 'Semantic Search' " class="option-selected" src="../assets/d.png" alt="">
          </div>
          <div class="option-item" @click="selectOption('Keyword Search')">
            <div>Keyword Search</div>
            <img v-if="selectValue == 'Keyword Search' " class="option-selected" src="../assets/d.png" alt="">
          </div>
          <div class="option-item" @click="selectOption('Boolean Search')">
            <div>
              Boolean Search
            </div>
            <img v-if="selectValue == 'Boolean Search' " class="option-selected" src="../assets/d.png" alt="">
          </div>
          <div class="option-item" @click="selectOption('Phrase Search')">
            <div>
              Phrase Search
            </div>
            <img v-if="selectValue == 'Phrase Search' " class="option-selected" src="../assets/d.png" alt="">
          </div>
        </div>
      </div>
      <div class="bookshelf">
        <BookShelf />
      </div>
    </div>
    <div v-if="!this.$store.state.lightStatus" class="mask-layer"></div>
  </div>
</template>

<script>
import axios from "../utils/request.js"
import { ElMessage } from "element-plus"
import { ArrowRight, Search, Clock, Collection, Setting, SwitchButton } from '@element-plus/icons-vue'
import BookStyleComp from '../components/BookStyleComp.vue'
import BookShelf from '../components/BookShelf.vue'
import Light from '../components/Light.vue'

export default {
  name: "Home",
  data() {
    return {
      switchImgSearch: false,
      inputValue: '',
      inputPlaceholder: '',
      selectValue: 'Semantic Search',
      showOptionValue: false
    }
  },
  mounted() {
    this.setInputPlaceholder()
  },
  methods: {
    changeBtn(value){
      this.switchImgSearch = value
    },
    setInputPlaceholder(){
        let text = 'Search for title,author,ISBN...'
        let i = 0
        let timer = setInterval(() => {
            if(i > text.length){
                clearInterval(timer)
            } else {
                this.inputPlaceholder = text.substring(0,i)
                i++
            }
        }, 100);
    },
    clearInput(){
      this.inputValue = ''
    },
    gotoSearch(){
      this.$router.push({
        path: "/search",
        query: {
          "searchMethod": this.selectValue,
          "query": this.inputValue
        }
      })
    },
    showOption(){
      this.showOptionValue = !this.showOptionValue
    },
    selectOption(value){
      if(this.showOptionValue){
        this.selectValue = value
        this.showOptionValue = false
      }
    }
  },
  components: {
    BookStyleComp,
    BookShelf,
    Light
  }
}
</script>

<style scoped>

@font-face {
  font-family: 'HYMengQing';
  src: url(../assets/Zyphyte.ttf);
}
.fade{
  opacity: 0;
  z-index: -1 !important;
}
.show{
  opacity: 1 !important;
  z-index: 100 !important;
}
.search-option{
  margin-top: 20px;
  position: relative;
}
.option-main{
  display: flex;
  align-items: center;
  border: 1px solid #00000000;
  width: 280px;
  height: 28px;
  padding: 1px 10px;
  transition: all 0.3s;
  border-radius: 14px;
  padding-right: 0px;
  cursor: pointer;
}
.option-main:hover{
  background-color: #c9c9c9;
}
.option-icon-style{
  width: 25px;
  height: 25px;
}
.option-list{
  width: 270px;
  background-color: #fff;
  padding: 10px 0px;
  border-radius: 5px;
  box-shadow:0px 0px 3px #c5c5c5;
  position: absolute;
  left: 5px;
  top: 35px;
  z-index: 100;
  transition: opacity 0.3s ease-in-out;
}
.option-item{
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  cursor: pointer;
  padding: 0px 10px;
}
.option-item:hover{
  background-color: #cbf1cd;
}
.option-selected{
  width: 16px;
  height: 16px;
}

.home-container{
  display: flex;
  position: relative;
  min-height: 100vh;
  background-color: #eff0e9;
  justify-content: center;
}

.top-content{
  display: flex;
  align-items: center;
  margin-bottom: 30px;
  margin-top: 136px;
}
.light-content{
  height: 173px;
  z-index: 100;
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
}
.book-style{
  margin-left: 67px;
}
.home-title{
  color: #295143;
  font-size: 70px;
  font-weight: bold;
  font-family: 'HYMengQing';
  margin-left: 100px;
}

.input-content{
  position: relative;
}
.input-style{
  width: 600px;
  height: 45px;
  border-radius: 24px;
  border: 1px solid #b0b0b0;
  outline: none;
  caret-color: #d4d4d4;
  box-sizing: border-box;
  padding: 5px 10px;
  padding-right: 86px;
}
.search-btn{
  position: absolute;
  right: 0;
  top: 0;
  width: 50px;
  height: 45px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-top-right-radius: 24px;
  border-bottom-right-radius: 24px;
  transition: all 0.3s;
  cursor: pointer;
}
.search-btn:hover{
  background-color: #05800a;
}
.btn-style{
  width: 16px;
  height: 16px;
}

.btn-cancel-style{
  width: 13px;
  height: 13px;
}
.cancel{
  display: flex;
  justify-content: center;
  align-items: center;
  width: 30px;
  height: 30px;
  position: absolute;
  right: 51px;
  top: 8px;
  border-radius: 15px;
  cursor: pointer;
}
.cancel:hover{
  background-color: #eee;
}
.mask-layer{
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: #1d1d2aa0;
  z-index: 90;
}
</style>
