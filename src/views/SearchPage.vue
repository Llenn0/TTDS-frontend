<template>
  <div class="search-container">
    <div class="top-content">
        <div class="search-title">
            eBook
        </div>
        <div class="search-input">
          <div class="input-content">
            <input type="text" v-model="inputValue" class="input-style">
            <div @click="searchResultFun" class="search-btn" @mouseenter="changeBtn(true)" @mouseout="changeBtn(false)">
              <img v-if="switchImgSearch == false" class="btn-style" src="../assets/s2.png" alt="">
              <img v-else class="btn-style" src="../assets/s1.png" alt="">
            </div>
            <div v-if="inputValue" @click="clearInput" class="cancel">
              <img class="btn-cancel-style" src="../assets/cha.png" alt="">
            </div>
          </div>
          <div class="top-right-img">
            <img class="top-img" src="../assets/book.png" alt="">
          </div>
        </div>

    </div>
    <div class="tab-list-container">
      <div class="tabs-content">
        <div class="tab-list" @click="switchTabFun(1)" :class="{'tab-active': switchTab == 1}">
          <img v-if="switchTab == 1" class="tab-icon" src="../assets/l2.png" alt="">
          <img v-if="switchTab == 2" class="tab-icon" src="../assets/l1.png" alt="">
          <div class="tab-name">List</div>
        </div>
        <div class="tab-table" @click="switchTabFun(2)" :class="{'tab-active': switchTab == 2}">
          <img v-if="switchTab == 1" class="tab-icon" src="../assets/l4.png" alt="">
          <img v-if="switchTab == 2" class="tab-icon" src="../assets/l3.png" alt="">
          <div class="tab-name">Table</div>
        </div>
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
    <div class="search-result">
      <div class="result-container">
        <div class="result-num">
          Books (500+)
        </div>
        <div v-if="switchTab == 1" class="result-list">
          <div class="list-item" v-for="(item, index) in searchResult" :key="index">
            <img class="list-item-img" :src="item.cover" alt="">
            <div class="list-item-right">
              <div class="list-item-name">
                {{ item.name }}
              </div>
              <div class="list-item-author">
                {{ item.author }}
              </div>
              <div class="list-item-intro">
                {{ ellipsis(item.intro) }}
              </div>
              <div class="list-item-text">
                <div class="list-item-year">
                  <span class="item-year-left">Year: </span> <span>{{ item.year }}</span> 
                </div>
                <div class="list-item-language">
                  <span class="item-language-left">Language: </span> <span>{{ item.language }}</span> 
                </div>
              </div>
            </div>
          </div>
        </div>
        <div v-else class="result-table">
          <el-table :data="newSearchResult" stripe style="width: 100%">
            <el-table-column prop="id" label="Author(s)" />
            <el-table-column prop="name" label="Title" />
            <el-table-column prop="year" label="Year" />
            <el-table-column prop="language" label="Language" />
          </el-table>
        </div>
        <el-pagination background layout="prev, pager, next" :total="1000" />
      </div>
      <div class="right-content">
        <div class="right-item">

        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "../utils/request.js"
import { ElMessage } from "element-plus"

export default {
    data(){
        return {
          selectValue: 'Semantic Search',
          showOptionValue: false,
          switchImgSearch: false,
          inputValue: '',
          switchTab: 1,
          searchResult: [
            {
              name: 'The Girl with the Louding Voice',
              author: 'Abi Dare',
              cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581128232l/50214741.jpg',
              year: '2020',
              language: 'English',
              intro: 'A powerful, emotional debut novel told in the unforgettable voice of a young Nigerian woman who is trapped in a life of servitude but determined to get an education so that she can escape and choose her own future.'
            },
            {
              name: 'The Girl with the Louding Voice',
              author: 'Abi Dare',
              cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581128232l/50214741.jpg',
              year: '2020',
              language: 'English',
              intro: 'A powerful, emotional debut novel told in the unforgettable voice of a young Nigerian woman who is trapped in a life of servitude but determined to get an education so that she can escape and choose her own future.'
            },
            {
              name: 'The Girl with the Louding Voice',
              author: 'Abi Dare',
              cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581128232l/50214741.jpg',
              year: '2020',
              language: 'English',
              intro: 'A powerful, emotional debut novel told in the unforgettable voice of a young Nigerian woman who is trapped in a life of servitude but determined to get an education so that she can escape and choose her own future.'
            },
            {
              name: 'The Girl with the Louding Voice',
              author: 'Abi Dare',
              cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581128232l/50214741.jpg',
              year: '2020',
              language: 'English',
              intro: 'A powerful, emotional debut novel told in the unforgettable voice of a young Nigerian woman who is trapped in a life of servitude but determined to get an education so that she can escape and choose her own future.'
            },
            {
              name: 'The Girl with the Louding Voice',
              author: 'Abi Dare',
              cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581128232l/50214741.jpg',
              year: '2020',
              language: 'English',
              intro: 'A powerful, emotional debut novel told in the unforgettable voice of a young Nigerian woman who is trapped in a life of servitude but determined to get an education so that she can escape and choose her own future.'
            },
            {
              name: 'The Girl with the Louding Voice',
              author: 'Abi Dare',
              cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581128232l/50214741.jpg',
              year: '2020',
              language: 'English',
              intro: 'A powerful, emotional debut novel told in the unforgettable voice of a young Nigerian woman who is trapped in a life of servitude but determined to get an education so that she can escape and choose her own future.'
            },
            {
              name: 'The Girl with the Louding Voice',
              author: 'Abi Dare',
              cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581128232l/50214741.jpg',
              year: '2020',
              language: 'English',
              intro: 'A powerful, emotional debut novel told in the unforgettable voice of a young Nigerian woman who is trapped in a life of servitude but determined to get an education so that she can escape and choose her own future.'
            },
            {
              name: 'The Girl with the Louding Voice',
              author: 'Abi Dare',
              cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581128232l/50214741.jpg',
              year: '2020',
              language: 'English',
              intro: 'A powerful, emotional debut novel told in the unforgettable voice of a young Nigerian woman who is trapped in a life of servitude but determined to get an education so that she can escape and choose her own future.'
            },
            {
              name: 'The Girl with the Louding Voice',
              author: 'Abi Dare',
              cover: 'https://i.gr-assets.com/images/S/compressed.photo.goodreads.com/books/1581128232l/50214741.jpg',
              year: '2020',
              language: 'English',
              intro: 'A powerful, emotional debut novel told in the unforgettable voice of a young Nigerian woman who is trapped in a life of servitude but determined to get an education so that she can escape and choose her own future.'
            },
          ],
          newSearchResult: []
        }
    },
    async mounted(){
      this.inputValue = this.$route.query.query
      this.selectValue = this.$route.query.searchMethod

      this.searchResultFun()
    },
    methods: {
      async searchResultFun(){
        let pathString = ''
        if(this.selectValue == '' || this.inputValue == ''){
          return
        }
        if(this.selectValue == 'Semantic Search'){
          pathString = '/semantic'
        }
        let res = await axios.post(pathString, {
          'query': this.inputValue
        })
        this.newSearchResult = res.data.docIds
      },
      changeBtn(value){
        this.switchImgSearch = value
      },
      clearInput(){
        this.inputValue = ''
      },
      switchTabFun(value){
        this.switchTab = value
        console.log(1)
      },
      ellipsis(value){
        if(!value) return ""
        if(value.length > 130){
            return value.slice(0,130) + "..."
        }
        return value
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
    }
}
</script>

<style scoped>

@font-face {
  font-family: 'Zyphyte';
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
  padding-left: 150px;
}

.option-main{
  display: flex;
  align-items: center;
  border: 1px solid #00000000;
  width: 281px;
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
  left: 155px;
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

.top-content{
  display: flex;
  padding: 20px;
  position: relative;
}
.search-title{
  color: #295143;
  font-size: 39px;
  font-weight: bold;
  font-family: 'Zyphyte';
  margin-left: 0px;
  margin-right: 25px;
}

.input-content{
  position: relative;
  width: 600px;
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
  box-shadow: 0px 0px 3px#c6c6c6;
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

.tab-list-container{
  border-bottom: 1px solid #c8c8c8;
}

.tab-icon{
  width: 19px;
  height: 19px;
  margin-right: 3px;
}
.tab-icon-2{
  width: 16px;
  height: 16px;
  margin-right: 3px;
}

.tabs-content{
  display: flex;
  padding-left: 150px;
}
.tab-list{
  display: flex;
  align-items: center;
  width: 60px;
  height: 40px;
  justify-content: center;
  cursor: pointer;
}
.tab-table{
  display: flex;
  align-items: center;
  width: 60px;
  height: 40px;
  justify-content: center;
  margin-left: 15px;
  cursor: pointer;
}
.tab-active{
  border-bottom: 4px solid #05800a;
  color: #05800a;
}
.tab-name{
  font-size: 17px;
}

.search-result{
  display: flex;
  padding-bottom: 30px;
} 
.result-container{
  width: 60vw;
}
.result-num{
  font-size: 17px;
  width: 200px;
  height: 45px;
  border: 1px solid #c4c4c4;
  border-bottom: none;
  text-align: center;
  box-sizing: border-box;
  padding: 10px;
  border-top-left-radius: 5px;
  border-top-right-radius: 5px;
  margin-top: 30px;
}
.list-item{
  border: 1px solid #c4c4c4;
  transition: all 0.3s;
}
.list-item:hover{
  box-shadow: 0px 0px 3px #05800a;
}
.list-item-img{
  width: 100px;
  height: 130px;
}
.list-item{
  display: flex;
  padding: 20px;
}
.list-item-right{
  margin-left: 20px;
  flex: 1;
}

.list-item-name{
  text-decoration: underline;
  font-size: 21px;
  cursor: pointer;
  margin-bottom: 10px;
}
.list-item-author{
  color: #3facce;
  font-style: italic;
}
.list-item-text{
  display: flex;
  justify-content: end;
}
.right-content{
  width: 40vw;
}
.result-container{
  padding-left: 150px;
  box-sizing: border-box;
}
.list-item-intro{
  height: 50px;
  overflow: hidden;
  margin-top: 10px;
}
.right-item{
  width: 350px;
  height: 310px;
  border: 1px solid #c4c4c4;
  margin-top: 75px;
  margin-left: 30px;
  border-radius: 8px;
}
.item-year-left{
  color: #858585;
}
.item-language-left{
  color: #858585;
  margin-left: 10px;
}
.result-list{
  margin-bottom: 30px;
}
.result-table{
  margin-bottom: 30px;
  border: 1px solid #c4c4c4;
}
.search-input{
  position: relative;
}
.top-img{
  width: 150px;
  height: 150px;
  position: absolute;
  right: -182px;
  top: -12px;
}
</style>