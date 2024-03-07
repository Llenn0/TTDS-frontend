<template>
    <div class="book-shelf-container">
        <div class="book-list">
           <img @click="gotoInfo(item)" v-for="(item, index) in bookIds" :key="index" class="book" @error="imgError" :src="`https://www.gutenberg.org/cache/epub/${item}/pg${item}.cover.medium.jpg`" />
        </div>
        <div class="bookshelf"></div>
    </div>
</template>

<script>
export default {
    name: 'BookShelf',
    data(){
        return {
            bookIds: []
        }
    },
    mounted(){
        this.bookIds.push(this.createNum())
        this.bookIds.push(this.createNum())
        this.bookIds.push(this.createNum())
        this.bookIds.push(this.createNum())
        console.log('bookIds: ', this.bookIds)
    },
    methods:{
        imgError(e){
            e.srcElement.src = '/nocover.png'
        },
        gotoInfo(item){
            window.open(`https://www.gutenberg.org/ebooks/${item}`)
        },
        createNum(){
            let code = ''
            let codeLength = 4
            let random = [0,1,2,3,4,5,6,7,8,9]

            for(let i = 0;i < codeLength; i++){
                let index = Math.floor(Math.random() * 9)

                code += random[index]
            }

            return code
        },
    }
}
</script>

<style scoped>
.book-list{
    display: flex;
    justify-content: center;
    margin-top: 30px;
}
.book{
    width: 130px;
    height: 170px;
    margin: 0 10px;
    box-shadow: 0px 0px 9px #787878;
    -moz-box-shadow: 0px 0px 9px #787878;
    -webkit-box-shadow: 0px 0px 9px #787878;
    transition: all 0.3s ease;
    z-index: 2;
    cursor: pointer;
}
.book:hover{
    transform: scale(1.1);
}
.bookshelf {
    width: 600px;
    display: flex;
    justify-content: center;
    flex-shrink: 0;
    z-index: 1;
    position: relative;
    height: 0px;
    box-sizing: border-box;
    border-bottom: 16px solid #e4e3e3;
    border-left: 20px solid transparent;
    border-right: 20px solid transparent;
    pointer-events: all;
  }
  
  .bookshelf::before {
    content: "";
    position: absolute;
    top: 16px;
    background: linear-gradient(90deg, #eeeeee 0%, #ffffff 100%);
    height: 26px;
    width: calc(100% + 40px);
    box-shadow: 0px -1px 6px rgba(0, 0, 0, 0.05), 0px 4px 16px rgba(0, 0, 0, 0.25);
    z-index: 2;
  }
  
  .bookshelf::after {
    content: "";
    height: 80px;
    width: calc(100% + 40px);
    position: absolute;
    top: 42px;
    display: block;
    background: linear-gradient(180deg, #dedede 0%, rgba(255, 255, 255, 0) 100%);
    -webkit-clip-path: polygon(0% 0%, 100% 0%, 97% 100%, 3% 100%);
            clip-path: polygon(0% 0%, 100% 0%, 97% 100%, 3% 100%);
    z-index: -1;
  }
</style>
