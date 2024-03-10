<template>
    <div class="category-container">
        <div class="category-content">
            <h1 class="title-style">
                Detailed listings of all Bookshelves
            </h1>
            <h3>
                These are all specific bookshelves existing in our system
            </h3>
            <div class="category-list">
                <div v-for="(item, index) in categoryData" :key="index" class="category-group">
                    <div class="group-title">
                        {{ item.title }}
                    </div>
                    <div class="group-item-list">
                        <ul>
                            <li @click="gotoResult(litem)" v-for="(litem,lindex) in item.data" :key="lindex" class="group-item">
                                {{ litem.category }}
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
<script>
export default {
    name: 'category',
    data(){
        return {
            categoryData: [
                {
                    title: 'B',
                    data: [
                        {
                            category: 'Biography'
                        }
                    ]
                },
                {
                    title: 'F',
                    data: [
                        {
                            category: 'Fiction'
                        }
                    ]
                },
                {
                    title: 'H',
                    data: [
                        {
                            category: 'Health and Lifestyle'
                        }
                    ]
                },
                {
                    title: 'L',
                    data: [
                        {
                            category: 'Literature, Drama and Poetry'
                        }
                    ]
                },
                {
                    title: 'O',
                    data: [
                        {
                            category: 'Other'
                        }
                    ]
                },
                {
                    title: 'P',
                    data: [
                        {
                            category: 'Periodicals'
                        }
                    ]
                },
                {
                    title: 'S',
                    data: [
                        {
                            category: 'Science and Technology'
                        },
                        {
                            category: 'Social Sciences'
                        }
                    ]
                }
            ]
        }
    },
    methods: {
        gotoResult(item){
            console.log(1111111111)
            this.$router.push({
                path: "/categoryResult",
                query: {
                "category": item.category
                }
            })
        }
    }
}
</script>
<style scoped>
.category-container{
    display: flex;
    position: relative;
    min-height: 100vh;
    background-color: #eff0e9;
    justify-content: center;
    padding-bottom: 30px;
}
.category-content{
    width: 600px;
}
.title-style{
    color: #978258;
}
.group-title{
    color: #978258;
    font-size: 21px;
    font-weight: bold;
}
.group-item{
    color: #162d50;
    font-size: 17px;
    text-decoration: underline;
    cursor: pointer;
    margin-bottom: 6px;
}
</style>