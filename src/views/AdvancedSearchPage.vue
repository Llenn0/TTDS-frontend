<template>
    <div class="search-container">
      <div class="top-content">
          <div class="search-title" @click="gotoHome">
              eBook
          </div>
  
      </div>
      <div class="tab-list-container">
        <div class="tabs-content">
          <div class="tab-list" @click="switchTabFun(1)" :class="{'tab-active': switchTab == 1}">
            <img v-if="switchTab == 1" class="tab-icon" src="../assets/l2.png" alt="">
            <img v-if="switchTab == 2" class="tab-icon" src="../assets/l1.png" alt="">
            <div class="tab-name">List</div>
          </div>
          <div class="query-time">
            Search results in {{ toFixedNum(queryTime) }}s
          </div>
        </div>
      </div>
      <div class="search-result">
        <div v-if="searchResult.length == 0" class="result-empty">
          <div>
            <img class="empty-img" src="/nocover.png" alt="">
          </div>
          <div class="empty-tips">
            <div class="empty-tips-title">
              Unfortunely we didn't find any books matching your search.
            </div>
            <div class="tips-list">
              <div>
                Try these tips:
              </div>
              <ul>
                <li>
                  Check that all words are spelled correctly.
                </li>
                <li>
                  Check search options.
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div v-else class="result-container">
          <div class="result-num">
            Books ({{ searchResult.length }})
          </div>
          <div v-if="switchTab == 1" class="result-list">
            <div @click="gotoInfo(item)" class="list-item" v-for="(item, index) in searchResult" :key="index">
              <img @error="imgError" class="list-item-img" :src="`https://www.gutenberg.org/cache/epub/${item.id}/pg${item.id}.cover.medium.jpg`" alt="">
              <div class="list-item-right">
                <div class="list-item-name">
                  {{ item.title }}
                </div>
                <div class="list-item-author">
                  {{ item.author }}
                </div>
                <div class="list-item-intro">
                  Subject: {{ ellipsis(item.subject) }}
                </div>
                <div class="list-item-text">
                  <div class="list-item-year">
                    <span class="item-year-left">In BookShelf: </span> <span>{{ item.bookshelf }}</span> 
                  </div>
                  <div class="list-item-language">
                    <span class="item-language-left">Language: </span> <span>{{ item.language }}</span> 
                  </div>
                </div>
              </div>
            </div>
          </div>
          <el-pagination background @current-change="pageChange" layout="prev, pager, next" :total="totalNum" />
        </div>
        <div class="right-content">
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
            inputPlaceholder: 'Search for title,author,ISBN...',
            showOptionValue: false,
            switchImgSearch: false,
            inputValue: '',
            switchTab: 1,
            searchResult: [],
            languageValue: [],
            subjectValue: [],
            showOtherOptions: false,
            checkedOtherOptions: false,
            queryTime: '',
            totalNum: '',
            currentPage: 1,
            advancedSearchData: {}
          }
      },
      async mounted(){
        this.advancedSearchData = JSON.parse(localStorage.getItem('advancedSearchData')) 
        this.searchResultFun()
      },
      methods: {
        toFixedNum(value){
          value += ''
          return value.length >= 4 ? value.substr(0, 5) : value;
        },
        imgError(e){
          e.srcElement.src = '/nocover.png'
        },
        gotoInfo(item){
          window.open(`https://www.gutenberg.org/ebooks/${item.id}`)
        },
        gotoHome(){
          this.$router.push('/')
        },
        pageChange(value){
          this.currentPage = value
          this.searchResultFun()
        },
        async searchResultFun(){
          let res = await axios.post('/advanced', {
            'author': this.advancedSearchData.author,
            'title': this.advancedSearchData.title,
            'subjects': this.advancedSearchData.subjects,
            'languages': this.advancedSearchData.languages,
            'page': this.currentPage,
            'numPerPage': 10
          })
          this.searchResult = res.data.books
          this.queryTime = res.data.queryTime
          this.totalNum = res.data.totalNum
          console.log('res: ', res)
        },
        ellipsis(value){
          if(!value) return ""
          if(value.length > 130){
              return value.slice(0,130) + "..."
          }
          return value
        },
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
    cursor: pointer;
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
    width: 70vw;
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
  
  
  .checkbox-style{
    margin-right: 10px;
    margin-left: 10px;
  }
  .show-search-options{
    display: flex;
  }
  .search-option-other{
    display: flex;
    margin-top: 15px;
    padding-left: 150px;
  }
  .serach-left-title{
    padding-left: 10px;
    cursor: pointer;
  }
  
  .query-time{
    padding-left: 20px;
    padding-top: 13px;
  }
  
  .result-empty{
    padding-left: 150px;
    width: 80vw;
    display: flex;
    margin-top: 30px;
  }
  .empty-img{
    width: 100px;
    height: 120px;
    margin-right: 10px;
  }
  .tips-list{
    margin-top: 15px;
  }
  .empty-tips-title{
    font-size: 18px;
  }
  </style>