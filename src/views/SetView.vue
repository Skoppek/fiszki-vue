<template>
    <button v-if="showAdd" @click="isCardCreatorOpened = true">Add card</button>
    <button @click="isLearning = true">Learn</button>
    <teleport to="body">
        <div class="modal" v-if="isCardCreatorOpened">
            <CardCreator
                @close="isCardCreatorOpened = false"
                @added="loadCards"
            />
        </div>
    </teleport>
    <teleport to="body" >
        <div class="modal" v-if="isLearning">
            <Learn
                :set="this.cards"
                @close="isLearning = false"/>
        </div>
    </teleport>
    <CardCard
        v-for="card in this.cards" :card="card" :isOwner="true" @deleted="loadCards" />
</template>

<script setup>
import axios from 'axios'
import CardCard from '../components/CardCard.vue'
import CardCreator from '../components/CardCreator.vue'
import Learn from '../components/Learn.vue'
</script>

<script>
export default {
    name: "SetView",
    components: {
        CardCard,
        CardCreator,
        Learn
    },
    data() {
        return {
            cards: [],
            isCardCreatorOpened: false,
            showAdd: false,
            isLearning: false
        }
    },
    async mounted() {
        this.loadCards()
    },
    methods: {
        async loadCards() {
            await axios.get(import.meta.env.VITE_BACKEND_URL + `/sets/${this.$route.params.setId}/cards`)
            .then((response) => {
                console.log(response)
                this.cards = response.data
            }).catch((err) => {
                console.log(err)
            })
        },
    },
    beforeMount() {
        axios.get(import.meta.env.VITE_BACKEND_URL + `/sets/${this.$route.params.setId}`)
            .then((response) => {
                this.showAdd = response.data.user === this.$cookies.get('loggedUser').user.id
            }).catch((err) => {
                console.log(err)
            })
    }
}
</script>

<style>
.modal {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal > div {
    background-color: #fff;
    padding: 50px;
    border: black 5px solid;
}
</style>