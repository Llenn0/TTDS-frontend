<template>
  <div class="search-container">
    <div class="top-content">
        <div class="search-title" @click="gotoHome">
          GutenTag
        </div>
        <div class="search-input">
          <div class="input-content">
            <input type="text" :placeholder="inputPlaceholder" v-model="inputValue" class="input-style">
            <div @click="searchResultFun" class="search-btn" @mouseenter="changeBtn(true)" @mouseout="changeBtn(false)">
              <img v-if="switchImgSearch == false" class="btn-style" src="../assets/s2.png" alt="">
              <img v-else class="btn-style" src="../assets/s1.png" alt="">
            </div>
            <div v-if="inputValue" @click="clearInput" class="cancel">
              <img class="btn-cancel-style" src="../assets/cha.png" alt="">
            </div>
          </div>
          <div v-if="showDist" class="dist-input">
            <div class="dist-input-title">
              <span>Tolerance</span> <span class="dist-etitle">(1=exact match, not recommended for multilingual search)</span>
            </div>
            <div class="dist-container">
              <el-slider v-model="distValue" :min="1" :max="20" show-input size="small" />
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
        <div class="query-time">
          Search results in {{ toFixedNum(queryTime) }}s
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
    <div class="search-option-other">
      <div v-show="!showOtherOptions" @click="showOtherOptionsFun" class="serach-left-title">
        Search options
      </div>
      <div v-show="showOtherOptions" class="show-search-options">
        <!-- <div class="checkbox-style">
          <el-checkbox v-model="checkedOtherOptions" label="Exact matching" />
        </div> -->
        <div>
          <el-select
            v-model="languageValue"
            multiple
            placeholder="Select languages"
            style="width: 210px;margin-right:10px;"
            filterable
            clearable
            @change="setLocalLanguage"
          >
            <el-option
              v-for="(item, index) in languageList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        
        <div>
          <el-select
            v-model="subjectValue"
            multiple
            placeholder="Select subjects"
            style="width: 210px"
            filterable
            clearable
            @change="setLocalSubject"
          >
            <el-option
              v-for="(item, index) in subjectList"
              :key="index"
              :label="item"
              :value="item"
            />
          </el-select>
        </div>
        
      </div>
    </div>
    <div class="search-result">
      <div v-if="showResultNum == 1" class="bookshelf-img">
        <BookShelfImg />
        <div class="bookshelf-img-text">
          <img style="width:30px;height:30px;" src="/rights.png" alt="">
          <!-- <span>Searching...</span> -->
          Bookshelf
        </div>
      </div>
      <div v-else-if="showResultNum == 2" class="result-empty">
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
          Books ({{ totalNum }})
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
        
      </div>
    </div>
    <div class="pagenation-container">
      <el-pagination background @current-change="pageChange" layout="prev, pager, next" :total="totalNum" />
    </div>
    
  </div>
</template>

<script>
import axios from "../utils/request.js"
import { ElMessage } from "element-plus"
import BookShelfImg from '../components/BookShelfImg.vue'

export default {
    data(){
        return {
          showResultNum: 1,
          selectValue: 'Semantic Search',
          inputPlaceholder: 'Enter your search query here',
          showOptionValue: false,
          switchImgSearch: false,
          inputValue: '',
          switchTab: 1,
          searchResult: [],
          languageValue: [],
          languageList: [
            "afrikaans",
            "arabic",
            "breton",
            "bulgarian",
            "catalan",
            "chinese",
            "czech",
            "danish",
            "dutch",
            "english",
            "esperanto",
            "estonian",
            "finnish",
            "french",
            "galician",
            "german",
            "greek",
            "hebrew",
            "hungarian",
            "icelandic",
            "interlingua",
            "inuktitut",
            "irish",
            "italian",
            "japanese",
            "korean",
            "latin",
            "lithuanian",
            "maori",
            "norwegian",
            "occitan",
            "persian",
            "polish",
            "portuguese",
            "romanian",
            "russian",
            "sanskrit",
            "serbian",
            "slovenian",
            "spanish",
            "swedish",
            "tagalog",
            "telugu",
            "tibetan",
            "welsh",
            "western frisian",
            "yiddish"
          ],
          subjectList: [
            "abbreviations",
            "abdomen",
            "ability",
            "abolitionists",
            "abortion",
            "absolution",
            "abstracting",
            "abstraction",
            "acacia",
            "acadia",
            "acadians",
            "accounting",
            "acetylene",
            "acids",
            "acrobatics",
            "acrobats",
            "acting",
            "actors",
            "actresses",
            "acupuncture",
            "adipocere",
            "adolescence",
            "adulthood",
            "adventists",
            "advertising",
            "aeronautics",
            "aesthetics",
            "afghanistan",
            "afghans",
            "africa",
            "afrikaners",
            "aging",
            "agnosticism",
            "agriculture",
            "agroforestry",
            "ainu",
            "air",
            "aircraft",
            "airplanes",
            "airships",
            "akkadians",
            "albania",
            "albigenses",
            "alchemy",
            "alcibiades",
            "alcohol",
            "alcoholism",
            "alfalfa",
            "algebra",
            "algorithms",
            "alkalies",
            "allegories",
            "allegory",
            "allusions",
            "almanacs",
            "alphabet",
            "alphabets",
            "alps",
            "altruism",
            "amazons",
            "ambassadors",
            "ambition",
            "ambrotype",
            "america",
            "americanisms",
            "americanization",
            "ammunition",
            "amphibians",
            "amphitheaters",
            "amputation",
            "amusements",
            "anabaptists",
            "anarchism",
            "anarchists",
            "anatidae",
            "anatomy",
            "anecdotes",
            "anesthesia",
            "anesthetics",
            "anger",
            "animals",
            "animism",
            "annihilationism",
            "antarctica",
            "antelopes",
            "anthropology",
            "anthroposophy",
            "antidotes",
            "antiques",
            "antisemitism",
            "antiseptics",
            "antitoxins",
            "ants",
            "apes",
            "apologetics",
            "apostasy",
            "apostles",
            "apparitions",
            "appendicitis",
            "appetizers",
            "apples",
            "aquaculture",
            "aquariums",
            "aquifoliaceae",
            "arabs",
            "arachnida",
            "archaeologists",
            "archaeology",
            "archery",
            "archimedes",
            "architecture",
            "argentina",
            "argon",
            "arianism",
            "ariocarpus",
            "aristophanes",
            "arithmetic",
            "arizona",
            "armenia",
            "armenians",
            "armies",
            "armor",
            "armorers",
            "arrowheads",
            "art",
            "arteries",
            "arteriosclerosis",
            "arthropoda",
            "artillery",
            "artists",
            "arts",
            "asbestos",
            "ascomycetes",
            "ashu",
            "asparagus",
            "aspleniaceae",
            "assassination",
            "assaying",
            "assignats",
            "asteroids",
            "asterolepididae",
            "astrology",
            "astronomers",
            "astronomy",
            "atheism",
            "athletics",
            "atlases",
            "atmosphere",
            "atoms",
            "atonement",
            "attention",
            "auditing",
            "auditions",
            "auroras",
            "authors",
            "authorship",
            "autobiographies",
            "autobiography",
            "autographs",
            "automatism",
            "automobiles",
            "autopsy",
            "autumn",
            "avars",
            "azores",
            "aztecs",
            "babism",
            "bacteria",
            "bacteriology",
            "badgers",
            "bagpipe",
            "bahais",
            "bailiffs",
            "baking",
            "balanidae",
            "ballades",
            "ballads",
            "ballet",
            "ballistics",
            "balloons",
            "balneology",
            "bamboo",
            "bananas",
            "baptism",
            "barbering",
            "barbers",
            "barium",
            "barns",
            "baseball",
            "bashfulness",
            "basques",
            "bastille",
            "baths",
            "batik",
            "bats",
            "battles",
            "bayonets",
            "beards",
            "bears",
            "beavers",
            "bedbugs",
            "beef",
            "beehives",
            "beekeepers",
            "beer",
            "bees",
            "beetles",
            "begging",
            "beghards",
            "beguines",
            "behavior",
            "belgium",
            "bells",
            "benevolence",
            "beowulf",
            "berries",
            "bestiaries",
            "beverages",
            "bible",
            "bibliography",
            "bibliomania",
            "bicycles",
            "bildungsromans",
            "bilingualism",
            "billiards",
            "bimetallism",
            "biochemistry",
            "bioethics",
            "biogeography",
            "biography",
            "biologists",
            "biology",
            "birdhouses",
            "birds",
            "birthdays",
            "bjarkarimur",
            "blasphemy",
            "blasting",
            "blind",
            "blockade",
            "blood",
            "blowpipe",
            "boatbuilding",
            "bohemianism",
            "boilers",
            "bonesetters",
            "bookbinding",
            "bookkeeping",
            "bookplates",
            "books",
            "bookstores",
            "boots",
            "boring",
            "botany",
            "boxes",
            "boxing",
            "boys",
            "braid",
            "brain",
            "brakna",
            "bran",
            "brasses",
            "brasswork",
            "brazil",
            "brazing",
            "bread",
            "breakfasts",
            "breast",
            "breastfeeding",
            "breeding",
            "brewing",
            "bribery",
            "bricklaying",
            "bridges",
            "britons",
            "broadsides",
            "bronze",
            "bubbles",
            "buccaneers",
            "buddhism",
            "buffaloes",
            "building",
            "buildings",
            "bulgaria",
            "bulldog",
            "bureaucracy",
            "burglary",
            "burgskaiatiur",
            "burial",
            "burlesques",
            "burma",
            "bushido",
            "bushrangers",
            "business",
            "butter",
            "butterflies",
            "byliny",
            "cabala",
            "cabbage",
            "cacao",
            "cactus",
            "cadmium",
            "cagots",
            "cake",
            "calculators",
            "calculus",
            "calendar",
            "calendars",
            "california",
            "calvinism",
            "cameos",
            "cameroon",
            "camorra",
            "camping",
            "canada",
            "canals",
            "canaries",
            "cancer",
            "candles",
            "cannibalism",
            "cant",
            "capillarity",
            "capital",
            "capitalism",
            "carbonari",
            "cardsharping",
            "caring",
            "carnivora",
            "carols",
            "carpentry",
            "carpets",
            "cartography",
            "castration",
            "casuistry",
            "catamarans",
            "cathedrals",
            "catholics",
            "cats",
            "cattle",
            "caucasus",
            "cauliflower",
            "causation",
            "cavalry",
            "caves",
            "cellists",
            "cello",
            "cells",
            "celluloid",
            "cellulose",
            "celts",
            "cement",
            "censorship",
            "cephalopoda",
            "chalk",
            "chamois",
            "chance",
            "change",
            "chapbooks",
            "character",
            "charades",
            "charities",
            "charity",
            "charters",
            "chartism",
            "chastity",
            "chautauquas",
            "checkers",
            "checks",
            "cheerfulness",
            "cheese",
            "chemistry",
            "chemists",
            "cherry",
            "chess",
            "chickadees",
            "chicory",
            "children",
            "chile",
            "chimes",
            "chimneys",
            "chimpanzees",
            "china",
            "chipmunks",
            "chiropractic",
            "chivalry",
            "chloroform",
            "chocolate",
            "cholera",
            "chorales",
            "christianity",
            "christmas",
            "chronology",
            "church",
            "cider",
            "cinchona",
            "cinematography",
            "ciphers",
            "circle",
            "circumcision",
            "circus",
            "cirripedia",
            "citizenship",
            "civics",
            "civilization",
            "clairvoyance",
            "clavichord",
            "clay",
            "cleaning",
            "clergy",
            "clerihews",
            "climatology",
            "clitoridectomy",
            "clouds",
            "clover",
            "clowns",
            "coal",
            "coca",
            "cocaine",
            "cockfighting",
            "cockroaches",
            "cocktails",
            "cocoa",
            "coelacanthiformes",
            "coffee",
            "coins",
            "collectivism",
            "collodion",
            "collotype",
            "colonate",
            "colonies",
            "colonization",
            "colophons",
            "color",
            "colors",
            "columns",
            "combustion",
            "comedies",
            "comedy",
            "comets",
            "commerce",
            "communism",
            "compass",
            "competition",
            "composers",
            "compost",
            "concrete",
            "conducting",
            "confectionery",
            "confession",
            "confiscations",
            "confucianism",
            "confucius",
            "conophis",
            "consanguinity",
            "conscience",
            "consciousness",
            "consolation",
            "constellations",
            "constipation",
            "contemplation",
            "continents",
            "contraception",
            "convents",
            "conversation",
            "conversion",
            "converts",
            "cookbooks",
            "cookies",
            "cooking",
            "cookware",
            "cooperation",
            "copper",
            "copperwork",
            "copyright",
            "corals",
            "cordage",
            "cork",
            "coronations",
            "corridos",
            "corsets",
            "cosmetics",
            "cosmogony",
            "cosmography",
            "cosmology",
            "costume",
            "cottages",
            "cotton",
            "cottontails",
            "counseling",
            "counterpoint",
            "courage",
            "courtesy",
            "courtship",
            "covenanters",
            "covenants",
            "coverlets",
            "cows",
            "coyote",
            "crackers",
            "cranberries",
            "crayfish",
            "creation",
            "creationism",
            "cremation",
            "creosote",
            "cricket",
            "crickets",
            "crime",
            "criminals",
            "criminology",
            "crinolines",
            "criticism",
            "crocheting",
            "croquet",
            "crosses",
            "crowds",
            "crows",
            "cruelty",
            "crusades",
            "crustacea",
            "cryptography",
            "crystallography",
            "crystals",
            "cuba",
            "cubism",
            "cubomedusae",
            "cucumbers",
            "cults",
            "culture",
            "curves",
            "cuttlefish",
            "cyatheaceae",
            "cycles",
            "cycling",
            "cyclotrons",
            "cyprinidae",
            "dacoits",
            "daguerreotype",
            "dairying",
            "dance",
            "dancers",
            "days",
            "deaconesses",
            "deaf",
            "deafness",
            "death",
            "degeneration",
            "deism",
            "deluge",
            "delusions",
            "democracy",
            "demonology",
            "dendrochronology",
            "dentistry",
            "deportation",
            "depressions",
            "derelicts",
            "deserts",
            "design",
            "despotism",
            "desserts",
            "detectives",
            "determinants",
            "devil",
            "diabetes",
            "dialogue",
            "dialogues",
            "diamonds",
            "diaries",
            "dice",
            "didache",
            "diet",
            "digestion",
            "dinosaurs",
            "diorama",
            "diphtheria",
            "diplomacy",
            "diplomats",
            "diptera",
            "disarmament",
            "disasters",
            "dislocations",
            "dissection",
            "distillation",
            "divination",
            "divorce",
            "dogfish",
            "dogma",
            "dogs",
            "doilies",
            "dolls",
            "donatists",
            "doorways",
            "dowsing",
            "draft",
            "drafts",
            "dragonflies",
            "dragons",
            "drainage",
            "drama",
            "dramatists",
            "draperies",
            "drawing",
            "dreams",
            "dressage",
            "dressmaking",
            "drift",
            "drops",
            "droseraceae",
            "drosophila",
            "drugs",
            "ducks",
            "dueling",
            "duty",
            "dwarfs",
            "dwellings",
            "dynamics",
            "earthquakes",
            "earthwork",
            "earthworms",
            "echinodermata",
            "eclipses",
            "economics",
            "ecstasy",
            "eden",
            "editorials",
            "education",
            "educators",
            "egoism",
            "elections",
            "electricity",
            "electrons",
            "electrophysiology",
            "electroplating",
            "electrotherapeutics",
            "electrotyping",
            "elephants",
            "elocution",
            "embalming",
            "emblems",
            "embroidery",
            "embryology",
            "emotions",
            "empathy",
            "encyclopedists",
            "endocrinology",
            "endoscopy",
            "enema",
            "engineering",
            "engineers",
            "england",
            "engravers",
            "engraving",
            "enlightenment",
            "entertaining",
            "enzymes",
            "epictetus",
            "epidemics",
            "epigrams",
            "epilepsy",
            "epiphany",
            "epitaphs",
            "equality",
            "equations",
            "ericas",
            "escapes",
            "eschatology",
            "escorial",
            "eskimos",
            "esperanto",
            "essays",
            "essenes",
            "etchers",
            "etching",
            "ether",
            "ethics",
            "ethnology",
            "ethnopsychology",
            "etiquette",
            "eucalyptus",
            "euchre",
            "eugenics",
            "eunuchs",
            "europe",
            "eurythmics",
            "euthenics",
            "evangelists",
            "evolution",
            "experience",
            "explorers",
            "explosions",
            "explosives",
            "expression",
            "expressionism",
            "extortion",
            "fables",
            "factorials",
            "fairies",
            "fairs",
            "faith",
            "falconry",
            "families",
            "family",
            "fanaticism",
            "fanfares",
            "fans",
            "farces",
            "fascism",
            "fasting",
            "fatigue",
            "fear",
            "feeds",
            "feminism",
            "fencing",
            "fenians",
            "fennomania",
            "fermentation",
            "ferns",
            "ferret",
            "fertilizers",
            "fetishism",
            "feudalism",
            "fever",
            "fiction",
            "fig",
            "fijians",
            "filibusters",
            "finance",
            "finches",
            "fingerprints",
            "finland",
            "finns",
            "firearms",
            "fireflies",
            "firemaking",
            "fireplaces",
            "fires",
            "fireworks",
            "fisheries",
            "fishes",
            "fishing",
            "fistula",
            "flagellants",
            "flagellation",
            "flags",
            "fleas",
            "flies",
            "flight",
            "floriculture",
            "flowers",
            "foals",
            "folklore",
            "food",
            "foot",
            "football",
            "footwear",
            "forecasting",
            "forgery",
            "forging",
            "fortification",
            "fortune",
            "fossils",
            "foundations",
            "fowling",
            "foxes",
            "foxtrots",
            "fractures",
            "france",
            "franciscans",
            "fraud",
            "freedom",
            "freemasonry",
            "freemasons",
            "freethinker",
            "friars",
            "friction",
            "friendship",
            "frogs",
            "fuegians",
            "fuel",
            "functions",
            "fungi",
            "furnaces",
            "furniture",
            "félibrige",
            "galen",
            "gambling",
            "games",
            "gantries",
            "gardening",
            "gardens",
            "gases",
            "gastroenteritis",
            "gastroenterology",
            "gastronomy",
            "gaza",
            "geese",
            "gelatin",
            "gems",
            "genealogy",
            "generals",
            "generosity",
            "genetics",
            "genius",
            "geography",
            "geology",
            "geometry",
            "geophysics",
            "geotropism",
            "geriatrics",
            "germans",
            "germany",
            "geysers",
            "ghosts",
            "giants",
            "gibraltar",
            "gin",
            "gingerbread",
            "ginseng",
            "girls",
            "girondists",
            "glaciers",
            "gladiolus",
            "glass",
            "glassware",
            "glaucoma",
            "globalization",
            "globes",
            "glossolalia",
            "gloves",
            "glue",
            "gnosticism",
            "god",
            "gold",
            "golf",
            "gonorrhea",
            "gorilla",
            "goths",
            "gout",
            "grain",
            "graining",
            "grandparenting",
            "grapes",
            "graphology",
            "grasses",
            "gravitation",
            "greenhouses",
            "greenland",
            "grenades",
            "grief",
            "groceries",
            "grotesque",
            "growth",
            "guano",
            "guatemala",
            "guilds",
            "gunnery",
            "gunpowder",
            "gunsmithing",
            "guyana",
            "gymnastics",
            "gynecology",
            "gyroscopes",
            "habaneras",
            "habit",
            "hair",
            "hairdressing",
            "hairwork",
            "haiti",
            "halloween",
            "hand",
            "handball",
            "handicraft",
            "handlooms",
            "happiness",
            "harems",
            "harnesses",
            "harpsichord",
            "hats",
            "hawaii",
            "hawaiians",
            "headgear",
            "headhunters",
            "health",
            "heat",
            "heathlands",
            "heating",
            "heaven",
            "hedonism",
            "hell",
            "hellenism",
            "helminths",
            "hemorrhoids",
            "hemp",
            "heraldry",
            "herbals",
            "herbs",
            "heredity",
            "heresy",
            "hermetism",
            "hermits",
            "hernia",
            "heroes",
            "heterostylism",
            "hicksites",
            "hinduism",
            "hindus",
            "hippocrates",
            "historiography",
            "history",
            "hittites",
            "hoaxes",
            "hockey",
            "holidays",
            "holiness",
            "home",
            "homeopathy",
            "homer",
            "homicide",
            "homoptera",
            "homosexuality",
            "honey",
            "honeybee",
            "honor",
            "horace",
            "hormones",
            "horology",
            "horsemanship",
            "horses",
            "horseshoeing",
            "hosiery",
            "hotels",
            "houseboats",
            "housefly",
            "housing",
            "huguenots",
            "humanism",
            "humanities",
            "humification",
            "huns",
            "hunting",
            "hurricanes",
            "hybridization",
            "hydrodynamics",
            "hydrogen",
            "hydrostatics",
            "hydrotherapy",
            "hygiene",
            "hyla",
            "hylidae",
            "hymenophyllaceae",
            "hymenoptera",
            "hymns",
            "hyperspace",
            "hypnotism",
            "hysteria",
            "ice",
            "icebergs",
            "iceland",
            "ichthyology",
            "idealism",
            "ido",
            "illegitimacy",
            "illuminati",
            "illustrators",
            "imagination",
            "immortality",
            "imperialism",
            "impressment",
            "imprisonment",
            "incantations",
            "incarnation",
            "incas",
            "incense",
            "incest",
            "inclosures",
            "indexes",
            "india",
            "indiana",
            "indians",
            "indigo",
            "individualism",
            "individuality",
            "indulgences",
            "industries",
            "infanticide",
            "infants",
            "inflammation",
            "influenza",
            "initials",
            "ink",
            "inkblots",
            "inquisition",
            "insects",
            "insomnia",
            "inspiration",
            "instinct",
            "insulin",
            "insurance",
            "integrals",
            "intellect",
            "interest",
            "internet",
            "intersexuality",
            "intrenchments",
            "invariants",
            "inventions",
            "inventors",
            "invertebrates",
            "investments",
            "iran",
            "ireland",
            "iridectomy",
            "ironwork",
            "irrigation",
            "irritability",
            "islam",
            "islands",
            "italy",
            "ivories",
            "jacobites",
            "jainism",
            "jam",
            "jamaica",
            "japan",
            "japanning",
            "jaundice",
            "jaws",
            "jelly",
            "jellyfishes",
            "jerusalem",
            "jesuits",
            "jethou",
            "jewelry",
            "jews",
            "jihad",
            "journalism",
            "joy",
            "judaism",
            "jungles",
            "jurisprudence",
            "justice",
            "kabuki",
            "kachinas",
            "kalevala",
            "kalmyks",
            "kansas",
            "karma",
            "kemalism",
            "ketchup",
            "kindergarten",
            "kindness",
            "kinship",
            "kissing",
            "kitchens",
            "knitting",
            "kolos",
            "kurds",
            "labadists",
            "labor",
            "labuan",
            "labyrinths",
            "lactation",
            "lagomorpha",
            "lampwork",
            "laozi",
            "larvae",
            "laryngoscopy",
            "lasers",
            "lathes",
            "laughter",
            "laundry",
            "law",
            "lawns",
            "lawyers",
            "layettes",
            "laziness",
            "lead",
            "leadership",
            "leadwork",
            "leather",
            "leatherwork",
            "leeches",
            "legends",
            "lemmings",
            "lemuria",
            "lent",
            "lepadidae",
            "lepidoptera",
            "leprosy",
            "leptodactylidae",
            "lettering",
            "lexicology",
            "liberalism",
            "liberia",
            "libertarianism",
            "liberty",
            "libraries",
            "lichens",
            "life",
            "light",
            "lighthouses",
            "lighting",
            "lightning",
            "lightships",
            "lime",
            "limericks",
            "linguists",
            "linoleum",
            "linotype",
            "linux",
            "lipograms",
            "liquids",
            "liquors",
            "literacy",
            "literature",
            "lithography",
            "lithuania",
            "litterateurs",
            "livestock",
            "lizards",
            "loaiasis",
            "locomotives",
            "logic",
            "longevity",
            "looms",
            "lotteries",
            "love",
            "lumbering",
            "luncheons",
            "lust",
            "lyctidae",
            "lynching",
            "lysias",
            "machinery",
            "madagascar",
            "madrigals",
            "mafulus",
            "magic",
            "magnetism",
            "magyars",
            "mahdism",
            "majolica",
            "malaria",
            "malingering",
            "malthusianism",
            "mammals",
            "mammoths",
            "management",
            "manchus",
            "mandates",
            "manu",
            "manufactures",
            "manures",
            "manuscripts",
            "marbling",
            "marches",
            "mares",
            "margarine",
            "marionettes",
            "markets",
            "maroons",
            "marquetry",
            "marriage",
            "martyrs",
            "masques",
            "massachusetts",
            "massage",
            "mastication",
            "masturbation",
            "materialism",
            "mathematicians",
            "mathematics",
            "matriarchy",
            "matter",
            "maxims",
            "mayas",
            "measles",
            "mechanics",
            "medals",
            "medicine",
            "meditations",
            "mediums",
            "melancholy",
            "melodrama",
            "melons",
            "memory",
            "menstruation",
            "menus",
            "mercury",
            "mesmerism",
            "metabolism",
            "metaphor",
            "metaphysics",
            "meteorites",
            "meteorology",
            "meteors",
            "methodism",
            "methodology",
            "mevleviyeh",
            "mexico",
            "mice",
            "microbiology",
            "microcomputers",
            "microphone",
            "microscopes",
            "microscopy",
            "microtus",
            "midwifery",
            "midwives",
            "midéwiwin",
            "militarism",
            "milk",
            "millinery",
            "mineralogy",
            "minoans",
            "minstrels",
            "mir",
            "miracles",
            "mirrors",
            "miscarriage",
            "miscegenation",
            "miscellanea",
            "misogyny",
            "missionaries",
            "missions",
            "mites",
            "mnemonics",
            "mockingbirds",
            "modeling",
            "moldavia",
            "mollusks",
            "monadology",
            "monarchy",
            "money",
            "monism",
            "monkeys",
            "monodramas",
            "monograms",
            "monophysites",
            "months",
            "moon",
            "moose",
            "moravians",
            "moriscos",
            "mormons",
            "morocco",
            "morphine",
            "mosaics",
            "mosques",
            "motels",
            "mothers",
            "motion",
            "motors",
            "mountaineering",
            "mountains",
            "mucilage",
            "muffs",
            "mulberry",
            "mules",
            "multatuli",
            "mummies",
            "mushrooms",
            "music",
            "musicians",
            "muskox",
            "mutiny",
            "myotis",
            "myriapoda",
            "mysticism",
            "myth",
            "mythology",
            "myxomycetes",
            "nagualism",
            "names",
            "namibia",
            "narcissism",
            "narcotics",
            "nationalism",
            "naturalism",
            "naturalists",
            "nature",
            "naturopathy",
            "navies",
            "navigation",
            "nebraska",
            "nebulae",
            "neckties",
            "needlework",
            "negotiation",
            "negrillos",
            "negritos",
            "neoplatonism",
            "nepotism",
            "netherlands",
            "netting",
            "neuralgia",
            "neurasthenia",
            "neuroses",
            "neurosyphilis",
            "neutrality",
            "newsboys",
            "newspapers",
            "nibelungen",
            "nibelungenlied",
            "nicotiana",
            "nightmares",
            "nitroglycerin",
            "niue",
            "nomads",
            "nonjurors",
            "nonviolence",
            "normans",
            "northmen",
            "nose",
            "nostalgia",
            "novelists",
            "novelle",
            "novenas",
            "numerals",
            "numismatics",
            "nurses",
            "nursing",
            "nutrition",
            "nuts",
            "oaths",
            "oatmeal",
            "obedience",
            "obelisks",
            "obesity",
            "obituaries",
            "obstetrics",
            "occultism",
            "occupations",
            "ocean",
            "octopuses",
            "olive",
            "olympics",
            "omens",
            "oniscidae",
            "onomastics",
            "ontology",
            "opals",
            "opera",
            "operetta",
            "ophthalmology",
            "opossums",
            "optimism",
            "oratorio",
            "orators",
            "oratory",
            "orchestra",
            "orchids",
            "ordeal",
            "orient",
            "orthopedics",
            "orthoptera",
            "osteocephalus",
            "otters",
            "outlaws",
            "owls",
            "oxen",
            "oxygen",
            "oysters",
            "pacifism",
            "paganism",
            "pageants",
            "paint",
            "painters",
            "painting",
            "paleobotany",
            "paleoclimatology",
            "paleography",
            "paleontology",
            "palestine",
            "palmistry",
            "palpation",
            "pamphlets",
            "pangermanism",
            "panislamism",
            "pantheism",
            "pantomime",
            "pantomimes",
            "papacy",
            "paperhanging",
            "papermaking",
            "papuans",
            "parables",
            "paradise",
            "paragrammatism",
            "paranoia",
            "paraphilias",
            "parapsychology",
            "parasites",
            "parasols",
            "parmenides",
            "parodies",
            "parody",
            "parrots",
            "parsees",
            "passeriformes",
            "passionists",
            "passover",
            "paste",
            "pasticcio",
            "pastry",
            "patarines",
            "patents",
            "pathology",
            "patriotism",
            "peace",
            "peach",
            "peanuts",
            "pearls",
            "pears",
            "peasants",
            "peat",
            "pebbles",
            "pecan",
            "pedantry",
            "peddling",
            "pelycosauria",
            "pendulum",
            "penguins",
            "penis",
            "penmanship",
            "pens",
            "perception",
            "perennials",
            "perfumes",
            "periodicals",
            "peritoneum",
            "persecution",
            "personality",
            "perspective",
            "pessimism",
            "pests",
            "petrarchism",
            "petroleum",
            "petrology",
            "pets",
            "peyote",
            "phallicism",
            "pharisees",
            "pharmacists",
            "pharmacognosy",
            "pharmacology",
            "pharmacy",
            "pheasants",
            "phenols",
            "philanthropists",
            "philippines",
            "philosophers",
            "philosophy",
            "phlogiston",
            "phonograph",
            "phosphorescence",
            "phosphorus",
            "photograms",
            "photography",
            "photogravure",
            "photolithography",
            "phototelegraphy",
            "phototherapy",
            "phrenology",
            "physicians",
            "physicists",
            "physics",
            "physiognomy",
            "physiology",
            "phytogeography",
            "pi",
            "pianists",
            "pianola",
            "pickles",
            "picts",
            "pies",
            "pietism",
            "pigeons",
            "pigments",
            "pike",
            "pillows",
            "pine",
            "pineapple",
            "pinnipedia",
            "pipistrellus",
            "pirates",
            "pistols",
            "pisé",
            "plagiarism",
            "plague",
            "planchette",
            "planets",
            "plants",
            "plastics",
            "plato",
            "play",
            "playwriting",
            "pleasure",
            "plotinus",
            "plows",
            "plum",
            "plumbing",
            "pneumonia",
            "poaching",
            "poetry",
            "poets",
            "poisoners",
            "poisoning",
            "poisons",
            "poker",
            "police",
            "polishes",
            "polkas",
            "pollen",
            "pollination",
            "polychromy",
            "polygamy",
            "polynesia",
            "ponies",
            "poor",
            "popcorn",
            "popes",
            "population",
            "populism",
            "pork",
            "pornography",
            "portraits",
            "portugal",
            "positivism",
            "posters",
            "potatoes",
            "pottery",
            "poultry",
            "poverty",
            "pragmatism",
            "prayer",
            "prayers",
            "preaching",
            "precognition",
            "predestination",
            "prefaces",
            "pregnancy",
            "prejudices",
            "presbyterianism",
            "prices",
            "primates",
            "princes",
            "princesses",
            "printers",
            "printing",
            "prisons",
            "privateering",
            "probabilities",
            "proechimys",
            "profiteering",
            "progress",
            "prohibition",
            "projectiles",
            "proofreading",
            "propaganda",
            "property",
            "prophecies",
            "prospecting",
            "prospectuses",
            "prostitution",
            "protagoras",
            "protectionism",
            "protestantism",
            "proverbs",
            "psalmody",
            "psychoanalysis",
            "psychology",
            "psychophysiology",
            "psychotherapy",
            "pteridophyta",
            "pterosauria",
            "ptychohyla",
            "publicity",
            "puddings",
            "pueblos",
            "punishment",
            "puppets",
            "purgatory",
            "puritans",
            "pushtuns",
            "puzzles",
            "pygmies",
            "pyramids",
            "pyrenomycetes",
            "pyrometry",
            "pythagoras",
            "quarantine",
            "quaternions",
            "queens",
            "quietism",
            "quilting",
            "quilts",
            "quotations",
            "rabbits",
            "race",
            "radiation",
            "radio",
            "radioactivity",
            "radiogenetics",
            "radiolaria",
            "radium",
            "railroads",
            "raisins",
            "rationalism",
            "rats",
            "readers",
            "reading",
            "realism",
            "reality",
            "reason",
            "reasoning",
            "rebuses",
            "recitations",
            "redemption",
            "referendum",
            "reformation",
            "reformatories",
            "reformers",
            "refrigerators",
            "reincarnation",
            "reithrodontomys",
            "relics",
            "religion",
            "religions",
            "reliquaries",
            "renaissance",
            "rent",
            "repairing",
            "repentance",
            "reprobation",
            "reproduction",
            "reptiles",
            "republics",
            "research",
            "respiration",
            "rest",
            "revelation",
            "revolutions",
            "revolvers",
            "rhizopoda",
            "rhogeessa",
            "riddles",
            "rifles",
            "rings",
            "riots",
            "ritual",
            "ritualism",
            "rivers",
            "roads",
            "robins",
            "robinsonades",
            "robots",
            "rocks",
            "rodents",
            "romances",
            "romania",
            "romanies",
            "romanticism",
            "rondeaus",
            "roofing",
            "rope",
            "rosary",
            "roses",
            "rosicrucians",
            "rotkäppchen",
            "rowing",
            "rubber",
            "rugs",
            "russia",
            "sabah",
            "sabbat",
            "sabbath",
            "sabers",
            "sabotage",
            "sacramentals",
            "sacraments",
            "safes",
            "sagas",
            "sahara",
            "sailboats",
            "sailing",
            "sailors",
            "sainetes",
            "salads",
            "salmon",
            "salt",
            "salts",
            "salvation",
            "samoyeds",
            "samplers",
            "sampo",
            "sanctification",
            "sandwiches",
            "sanitation",
            "satanism",
            "satellites",
            "satire",
            "sauces",
            "sausages",
            "sawmills",
            "scaffolding",
            "scandinavians",
            "scarabaeus",
            "scarlatina",
            "scatology",
            "schism",
            "scholasticism",
            "science",
            "scientists",
            "scorpions",
            "scotland",
            "scrofula",
            "sculpture",
            "scurvy",
            "sealing",
            "seamanship",
            "seashore",
            "seasons",
            "secession",
            "sects",
            "secularism",
            "sedition",
            "selenium",
            "selling",
            "semites",
            "separatists",
            "serbia",
            "sericulture",
            "sermons",
            "sewage",
            "sewerage",
            "sewing",
            "sex",
            "sexism",
            "shakers",
            "shamans",
            "shaving",
            "shawls",
            "sheep",
            "sheriffs",
            "shields",
            "shinto",
            "shipbuilding",
            "ships",
            "shipwrecks",
            "shoemakers",
            "shoes",
            "shooting",
            "shopping",
            "shotguns",
            "shrews",
            "sieges",
            "sikhs",
            "silhouettes",
            "silkworms",
            "silverwork",
            "simplicity",
            "sin",
            "singapore",
            "singers",
            "singing",
            "sins",
            "skeleton",
            "skepticism",
            "skirmishing",
            "skull",
            "skunks",
            "slang",
            "slavery",
            "slavs",
            "sleep",
            "sleepwalking",
            "sloths",
            "slovaks",
            "sloyd",
            "smallpox",
            "smell",
            "smilisca",
            "smoke",
            "smoking",
            "snakes",
            "soap",
            "soccer",
            "socialism",
            "socinianism",
            "sociolinguistics",
            "sociology",
            "socks",
            "soils",
            "soldiers",
            "solidarity",
            "solitude",
            "songbooks",
            "songsters",
            "sonnet",
            "sonnets",
            "sophocles",
            "soul",
            "sound",
            "soups",
            "sowams",
            "spain",
            "sparrows",
            "speculation",
            "speech",
            "spellers",
            "spermatogenesis",
            "sphere",
            "spices",
            "spiders",
            "spies",
            "spinning",
            "spirit",
            "spirits",
            "spiritualism",
            "spirituality",
            "splashes",
            "sponges",
            "sports",
            "spring",
            "squids",
            "squirrels",
            "starfishes",
            "stars",
            "statesmen",
            "steamboats",
            "steel",
            "stereochemistry",
            "stereoscope",
            "stimulants",
            "stocks",
            "stoics",
            "storms",
            "storytelling",
            "stoves",
            "strabismus",
            "strychnine",
            "students",
            "stupidity",
            "stupor",
            "stuttering",
            "subconsciousness",
            "success",
            "sudan",
            "suffering",
            "suffrage",
            "sufism",
            "sugar",
            "sugarcane",
            "suicide",
            "sulfonefluorescein",
            "sulfur",
            "sumerians",
            "sun",
            "sunday",
            "sundials",
            "supernatural",
            "superstition",
            "surfaces",
            "surgery",
            "swallows",
            "swastikas",
            "swearing",
            "sweaters",
            "sweatshops",
            "swimming",
            "swine",
            "switzerland",
            "swords",
            "symbolism",
            "syndicalism",
            "syphilis",
            "syrrhophus",
            "syrups",
            "table",
            "tableaux",
            "tablecloths",
            "taboo",
            "tactics",
            "tadpoles",
            "tailoring",
            "tales",
            "tangos",
            "tanning",
            "tannins",
            "taoism",
            "tapestry",
            "tariff",
            "tarot",
            "taste",
            "tatars",
            "tatting",
            "tattooing",
            "taxidermy",
            "tea",
            "teachers",
            "teaching",
            "tearooms",
            "telegraph",
            "teleology",
            "telepathy",
            "telephone",
            "telescopes",
            "temperament",
            "temperance",
            "templars",
            "temples",
            "temptation",
            "tennis",
            "terrorism",
            "textbooks",
            "th",
            "theater",
            "theism",
            "theocritus",
            "theodicy",
            "theology",
            "theosophy",
            "therapeutics",
            "thermodynamics",
            "thieves",
            "thunderstorms",
            "ticks",
            "tides",
            "time",
            "tipping",
            "tithes",
            "toasts",
            "tobacco",
            "toleration",
            "tomatoes",
            "tonga",
            "tools",
            "tops",
            "torpedoes",
            "torture",
            "totemism",
            "tourists",
            "toxicology",
            "toxins",
            "toys",
            "tractors",
            "trademarks",
            "tragedies",
            "tragedy",
            "tragicomedy",
            "tramps",
            "translations",
            "transliteration",
            "transmigration",
            "transportation",
            "trapping",
            "trapshooting",
            "travel",
            "travelers",
            "treaties",
            "trees",
            "tribes",
            "tricks",
            "tricksters",
            "trilobites",
            "trinidad",
            "trinity",
            "troglodytes",
            "tropics",
            "troubadours",
            "trout",
            "trucking",
            "truth",
            "tuaregs",
            "tuberculin",
            "tuberculosis",
            "tundras",
            "tunneling",
            "tunnels",
            "turkey",
            "turkeys",
            "turquoise",
            "turtles",
            "twins",
            "tympanuchus",
            "typesetting",
            "typhoons",
            "u",
            "ukheidar",
            "ukraine",
            "ukrainians",
            "umbrellas",
            "underachievers",
            "unemployed",
            "unicorns",
            "unitarianism",
            "unitarians",
            "universalism",
            "upholstery",
            "uruguay",
            "usury",
            "utilitarianism",
            "utopias",
            "vaccination",
            "vaishnavism",
            "valentines",
            "value",
            "values",
            "vampires",
            "vandals",
            "vanilla",
            "vaudeville",
            "vedanta",
            "vedas",
            "vegetables",
            "vegetarianism",
            "vendetta",
            "venezuela",
            "venom",
            "ventilation",
            "versification",
            "vertebrates",
            "vespertilionidae",
            "vice",
            "views",
            "vignettes",
            "vikings",
            "villages",
            "vinegar",
            "violin",
            "violinists",
            "virgil",
            "virtue",
            "vision",
            "vitamins",
            "viticulture",
            "vivisection",
            "vocabulary",
            "voice",
            "volcanoes",
            "voles",
            "wages",
            "wagons",
            "wahhabiyah",
            "waldenses",
            "walking",
            "wallachia",
            "wallpaper",
            "walnut",
            "waltzes",
            "wampum",
            "war",
            "warranty",
            "wasps",
            "water",
            "waterfalls",
            "waterfowl",
            "watermarks",
            "waves",
            "waxworks",
            "wealth",
            "weapons",
            "weasels",
            "weather",
            "weaving",
            "welding",
            "wells",
            "weltschmerz",
            "werewolves",
            "whales",
            "whaling",
            "wheat",
            "whiskey",
            "whist",
            "widows",
            "wigmakers",
            "wigs",
            "will",
            "wills",
            "winds",
            "winter",
            "wire",
            "wisdom",
            "witchcraft",
            "wives",
            "wolves",
            "women",
            "wood",
            "woodlots",
            "woodpeckers",
            "woodwork",
            "work",
            "workshops",
            "worms",
            "worry",
            "wrestlers",
            "wrestling",
            "yachting",
            "yachts",
            "yeast",
            "yezidis",
            "yodels",
            "yoga",
            "youth",
            "yugoslavia",
            "yugoslavs",
            "zapus",
            "zebras",
            "zhuangzi",
            "zines",
            "zionism",
            "zoogeography",
            "zoologists",
            "zoology",
            "zoos",
            "zoroastrianism"
          ],
          subjectValue: [],
          showOtherOptions: false,
          checkedOtherOptions: false,
          queryTime: '',
          totalNum: '',
          currentPage: 1,
          showDist: false,
          distValue: 3
        }
    },
    async mounted(){
      this.inputValue = this.$route.query.query
      this.selectValue = this.$route.query.searchMethod
      this.distValue = parseInt(this.$route.query.dist)

      if(this.$route.query.searchMethod == 'Phrase Search'){
        this.showDist = true
      }

      this.languageValue = JSON.parse(localStorage.getItem('language'))
      this.subjectValue = JSON.parse(localStorage.getItem('subject'))

      if(this.languageValue != []){
        this.showOtherOptions = true
      }

      window.addEventListener('keydown', this.handleKeyDown)

      this.searchResultFun()
    },
    beforeMount(){
      window.removeEventListener('keydown', this.handleKeyDown)
    },
    methods: {
      toFixedNum(value){
        value += ''
        return value.length >= 4 ? value.substr(0, 5) : value;
      },
      imgError(e){
        e.srcElement.src = '/nocover.png'
      },
      handleKeyDown(event){
        if(event.key == 'Enter'){
          this.searchResultFun()
        }
      },
      setLocalLanguage(){
        localStorage.setItem('language',JSON.stringify(this.languageValue))
      },
      setLocalSubject(){
        localStorage.setItem('subject',JSON.stringify(this.subjectValue))
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
      showOtherOptionsFun(){
        this.showOtherOptions = true
      },
      async searchResultFun(){
        this.showResultNum = 1
        let pathString = ''
        if(this.selectValue == '' || this.inputValue == ''){
          this.showResultNum = 2
          return
        }
        if(this.selectValue == 'Semantic Search'){
          pathString = '/semantic'
        } else if(this.selectValue == 'Keyword Search'){
          pathString = '/keyword'
        } else if(this.selectValue == 'Boolean Search'){
          pathString = '/boolean'
        } else if(this.selectValue == 'Phrase Search'){
          pathString = '/phrase'
        }
        
        let distSend = this.distValue
        if(this.distValue == ''){
          distSend = 3
        }
        let res = await axios.post(pathString, {
          'query': this.inputValue,
          'languages': this.languageValue,
          'subjects': this.subjectValue,
          'page': this.currentPage,
          'numPerPage': 10,
          'dist': parseInt(distSend)
        })
        this.searchResult = res.data.books
        this.queryTime = res.data.queryTime
        this.totalNum = res.data.totalNum
        if(this.searchResult.length == 0){
          this.showResultNum = 2
        } else {
          this.showResultNum = 3
        }
        console.log('res: ', res)
        console.log('err_msg: ', res.data.err_msg)
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
          if(value == 'Boolean Search'){
            this.inputPlaceholder = 'Enter query with boolean operators AND, OR, NOT'
          } else {
            this.inputPlaceholder = 'Enter your search query here'
          }
          if(value == 'Phrase Search'){
            this.showDist = true
          } else {
            this.showDist = false
          }
        }
      }
    },
    components: {
      BookShelfImg
    }
}
</script>

<style scoped>

@font-face {
  font-family: 'Zyphyte';
  src: url(../assets/Zyphyte.ttf);
}

.dist-etitle{
  color: #878787;
  font-size: 13px;
}

.dist-container{
  width: 240px;
}

.pagenation-container{
  padding-left: 150px;
  padding-bottom: 45px;
}

.bookshelf-img{
  position: absolute;
  transform: scale(0.4);
  left: 152px;
  top: 55px;
  cursor: pointer;
}
.bookshelf-img-text{
  display: flex;
  justify-content: center;
  font-size: 22px;
  transform: scale(1.5);
  margin-top: 5px;
}

.dist-input{
  margin-top: 10px;
  margin-left: 10px;
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
  font-size: 16px;
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
  position: relative;
  min-height: 500px;
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