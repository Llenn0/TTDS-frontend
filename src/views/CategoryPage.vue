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
                            <li v-for="(litem,lindex) in item.data" :key="lindex" class="group-item">
                                {{ litem.name }}
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
                    title: '6',
                    data: [
                        {
                            id: '420',
                            name: '6 Best Loved Spanish Literary Classics'
                        }
                    ]
                },
                {
                    title: 'A',
                    data: [
                        {
                            id: '82',
                            name: 'Adventure'
                        },
                        {
                            id: '5',
                            name: 'Africa'
                        },
                        {
                            id: '6',
                            name: 'African American Writers'
                        },
                        {
                            id: '195',
                            name: "Ainslee's"
                        },
                        {
                            id: '196',
                            name: "American Revolutionary War"
                        },
                        {
                            id: '7',
                            name: "Anarchism"
                        },
                        {
                            id: '150',
                            name: 'Animal'
                        },
                        {
                            id: '151',
                            name: 'Animals-Domestic'
                        },
                        {
                            id: '152',
                            name: 'Animals-Wild'
                        },
                        {
                            id: '154',
                            name: 'Animals-Wild-Birds'
                        },
                        {
                            id: '155',
                            name: 'Animals-Wild-Insects'
                        },
                        {
                            id: '156',
                            name: 'Animals-Wild-Mammals'
                        },
                        {
                            id: '157',
                            name: 'Animals-Wild-Reptiles and Amphibians'
                        },
                        {
                            id: '153',
                            name: 'Animals-Wild-Trapping'
                        },
                        {
                            id: '8',
                            name: 'Anthropology'
                        },
                        {
                            id: '9',
                            name: 'Archaeology'
                        },
                        {
                            id: '10',
                            name: 'Architecture'
                        },
                        {
                            id: '112',
                            name: 'Argentina'
                        },
                        {
                            id: '197',
                            name: "Armour's Monthly Cook Book"
                        },
                        {
                            id: '11',
                            name: 'Art'
                        },
                        {
                            id: '160',
                            name: 'Arthurian Legends'
                        },
                        {
                            id: "198",
                            name: "Astounding Stories"
                        },
                        {
                            id: "101",
                            name: "Astronomy"
                        },
                        {
                            id: "199",
                            name: "Atheism"
                        },
                        {
                            id: "113",
                            name: "Australia"
                        }
                    ]
                },
                {
                    title: 'B',
                    data: [
                        {
                            id: "114",
                            name: "Bah\u00e1'\u00ed Faith"
                        },
                        {
                            id: "422",
                            name: "Banned Books List from the American Library Association"
                        },
                        {
                            id: "336",
                            name: "Banned Books from Anne Haight's list"
                        },
                        {
                            id: "200",
                            name: "Barnav\u00e4nnen"
                        },
                        {
                            id: "13",
                            name: "Best Books Ever Listings"
                        },
                        {
                            id: "159",
                            name: "Bestsellers, American, 1895-1923"
                        },
                        {
                            id: "15",
                            name: "Bibliomania"
                        },
                        {
                            id: "16",
                            name: "Biographies"
                        },
                        {
                            id: "201",
                            name: "Biology"
                        },
                        {
                            id: "202",
                            name: "Bird-Lore"
                        },
                        {
                            id: "203",
                            name: "Birds, Illustrated by Color Photography"
                        },
                        {
                            id: "204",
                            name: "Blackwood's Edinburgh Magazine"
                        },
                        {
                            id: "137",
                            name: "Boer War"
                        },
                        {
                            id: "115",
                            name: "Botany"
                        },
                        {
                            id: "205",
                            name: "British Law"
                        },
                        {
                            id: "206",
                            name: "Buchanan's Journal of Man"
                        },
                        {
                            id: "116",
                            name: "Buddhism"
                        },
                        {
                            id: "117",
                            name: "Bulgaria"
                        },
                        {
                            id: "207",
                            name: "Bulletin de Lille"
                        },
                    ]
                },
                {
                    title: 'C',
                    data: [
                        {
                            id: "181",
                            name: "CIA World Factbooks"
                        },
                        {
                            id: "148",
                            name: "Camping"
                        },
                        {
                            id: "118",
                            name: "Canada"
                        },
                        {
                            id: "208",
                            name: "Canon Law"
                        },
                        {
                            id: "209",
                            name: "Celtic Magazine"
                        },
                        {
                            id: "210",
                            name: "Chambers's Edinburgh Journal"
                        },
                        {
                            id: "211",
                            name: "Chemistry"
                        },
                        {
                            id: "212",
                            name: "Child's Own Book of Great Musicians"
                        },
                        {
                            id: "213",
                            name: "Children's Anthologies"
                        },
                        {
                            id: "214",
                            name: "Children's Biography"
                        },
                        {
                            id: "17",
                            name: "Children's Book Series"
                        },
                        {
                            id: "18",
                            name: "Children's Fiction"
                        },
                        {
                            id: "19",
                            name: "Children's History"
                        },
                        {
                            id: "215",
                            name: "Children's Instructional Books"
                        },
                        {
                            id: "20",
                            name: "Children's Literature"
                        },
                        {
                            id: "216",
                            name: "Children's Myths, Fairy Tales, etc."
                        },
                        {
                            id: "22",
                            name: "Children's Picture Books"
                        },
                        {
                            id: "217",
                            name: "Children's Religion"
                        },
                        {
                            id: "218",
                            name: "Children's Verse"
                        },
                        {
                            id: "119",
                            name: "Christianity"
                        },
                        {
                            id: "23",
                            name: "Christmas"
                        },
                        {
                            id: "24",
                            name: "Classical Antiquity"
                        },
                        {
                            id: "25",
                            name: "Contemporary Reviews"
                        },
                        {
                            id: "219",
                            name: "Continental Monthly"
                        },
                        {
                            id: "419",
                            name: "Cookbooks and Cooking"
                        },
                        {
                            id: "27",
                            name: "Crafts"
                        },
                        {
                            id: "28",
                            name: "Crime Fiction"
                        },
                        {
                            id: "29",
                            name: "Crime Nonfiction"
                        },

                        {
                            id: "220",
                            name: "Current History"
                        },
                        {
                            id: "120",
                            name: "Czech"
                        }
                    ]
                },
                {
                    title: 'D',
                    data: [
                        {
                            id: "377",
                            name: "DE Drama"
                        },
                        {
                            id: "376",
                            name: "DE Kinderbuch"
                        },
                        {
                            id: "375",
                            name: "DE Lyrik"
                        },
                        {
                            id: "374",
                            name: "DE Prosa"
                        },
                        {
                            id: "378",
                            name: "DE Sachbuch"
                        },
                        {
                            id: "221",
                            name: "De Aarde en haar Volken"
                        },
                        {
                            id: "30",
                            name: "Detective Fiction"
                        },
                        {
                            id: "222",
                            name: "Dew Drops"
                        },
                        {
                            id: "223",
                            name: "Donahoe's Magazine"
                        }
                        
                    ]
                },
                {
                    title: 'E',
                    data: [
                        {
                            id: "31",
                            name: "Early English Text Society"
                        },
                        {
                            id: "224",
                            name: "Ecology"
                        },
                        {
                            id: "138",
                            name: "Education"
                        },
                        {
                            id: "121",
                            name: "Egypt"
                        },
                        {
                            id: "emmys",
                            name: "Emmy's Picks Bookshelf"
                        },
                        {
                            id: "32",
                            name: "Engineering"
                        },
                        {
                            id: "139",
                            name: "English Civil War"
                        },
                        {
                            id: "33",
                            name: "Erotic Fiction"
                        },
                        {
                            id: "34",
                            name: "Esperanto"
                        }
                    ]
                },
                {
                    title: 'F',
                    data: [
                        {
                            id: "406",
                            name: "FR Beaux-Arts"
                        },
                        {
                            id: "382",
                            name: "FR Biographie, M\u00e9moires, Journal intime, Correspondance"
                        },
                        {
                            id: "306",
                            name: "FR Chansons"
                        },
                        {
                            id: "408",
                            name: "FR Chroniques"
                        },
                        {
                            id: "392",
                            name: "FR Contes"
                        },
                        {
                            id: "387",
                            name: "FR Droit et Justice"
                        },
                        {
                            id: "380",
                            name: "FR Education et Enseignement"
                        },
                        {
                            id: "307",
                            name: "FR Femmes"
                        },
                        {
                            id: "390",
                            name: "FR Guerres"
                        },
                        {
                            id: "309",
                            name: "FR Histoire"
                        },
                        {
                            id: "385",
                            name: "FR Humour"
                        },
                        {
                            id: "310",
                            name: "FR Illustrateurs"
                        },
                        {
                            id: "311",
                            name: "FR Jeunesse"
                        },
                        {
                            id: "407",
                            name: "FR La Premi\u00e8re Guerre Mondiale, 1914-1918"
                        },
                        {
                            id: "384",
                            name: "FR Langues"
                        },
                        {
                            id: "313",
                            name: "FR Litt\u00e9rature"
                        },
                        {
                            id: "337",
                            name: "FR Litt\u00e9rature francophone"
                        },
                        {
                            id: "416",
                            name: "FR Livres, Collections et Bibliophilie"
                        },
                        {
                            id: "315",
                            name: "FR Musique"
                        },
                        {
                            id: "417",
                            name: "FR M\u00e9tiers et Artisanat"
                        },
                        {
                            id: "395",
                            name: "FR Nouveaut\u00e9s"
                        },
                        {
                            id: "317",
                            name: "FR Nouvelles"
                        },
                        {
                            id: "383",
                            name: "FR Occultisme"
                        },
                        {
                            id: "318",
                            name: "FR Peinture"
                        },
                        {
                            id: "395",
                            name: "FR Peuples et Soci\u00e9t\u00e9s"
                        },
                        {
                            id: "317",
                            name: "FR Nouvelles"
                        },
                        {
                            id: "383",
                            name: "FR Occultisme"
                        },
                        {
                            id: "318",
                            name: "FR Peinture"
                        }
                    ]
                }
            ]
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