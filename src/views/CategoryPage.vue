<template>
    <div class="category-container">
        <div class="category-content">
            <h1 class="title-style">
                Detailed listings of all Bookshelves
            </h1>
            <h3>
                These are all specific bookshelves existing in our system
            </h3>
        </div>
    </div>
</template>
<script>
export default {
    name: 'category',
    data(){
        return {
            // categoryData: [
            //     {
            //         title: '6',
            //         data: [
            //             {
            //                 id: '420',
            //                 name: '6 Best Loved Spanish Literary Classics'
            //             }
            //         ]
            //     },
            //     {
            //         title: 'A',
            //         data: [
            //             {
            //                 id: '82',
            //                 name: 'Adventure'
            //             },
            //             {
            //                 id: '5',
            //                 name: 'Africa'
            //             },
            //             {
            //                 id: '6',
            //                 name: 'African American Writers'
            //             },
            //             {
            //                 id: '195',
            //                 name: "Ainslee's"
            //             },
            //             {
            //                 id: '196',
            //                 name: "American Revolutionary War"
            //             },
            //             {
            //                 id: '7',
            //                 name: "Anarchism"
            //             },
            //             {
            //                 id: '150',
            //                 name: 'Animal'
            //             },
            //             {
            //                 id: '151',
            //                 name: 'Animals-Domestic'
            //             },
            //             {
            //                 id: '152',
            //                 name: 'Animals-Wild'
            //             },
            //             {
            //                 id: '154',
            //                 name: 'Animals-Wild-Birds'
            //             },
            //             {
            //                 id: '155',
            //                 name: 'Animals-Wild-Insects'
            //             },
            //             {
            //                 id: '156',
            //                 name: 'Animals-Wild-Mammals'
            //             },
            //             {
            //                 id: '',
            //                 name: ''
            //             },
            //             {
            //                 id: '',
            //                 name: ''
            //             },
            //             {
            //                 id: '',
            //                 name: ''
            //             },
            //             {
            //                 id: '',
            //                 name: ''
            //             },
            //             {
            //                 id: '',
            //                 name: ''
            //             },
            //             {
            //                 id: '',
            //                 name: ''
            //             },
            //             {
            //                 id: '',
            //                 name: ''
            //             },
            //             {
            //                 id: '',
            //                 name: ''
            //             },
            //             {
            //                 id: '',
            //                 name: ''
            //             },

            //         ]
            //     },
            // ]
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
</style>