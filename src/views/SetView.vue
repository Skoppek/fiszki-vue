<template>
    <button v-if="showAdd" @click="creatorOpened = true">Add card</button>
    <teleport to="body">
        <CardCreator
            v-if="creatorOpened"
            @cancel="creatorOpened = false"
            @created="loadCards()"/>
    </teleport>
    <CardCard v-for="card in this.cards" :card="card"/>
</template>

<script>
import axios from 'axios'
import CardCard from '../components/CardCard.vue'
import CardCreator from '../components/CardCreator.vue'
export default {
    name: "SetView",
    components: {
        CardCard,
        CardCreator
    },
    data() {
        return {
            cards: [],
            creatorOpened: false,
            showAdd: false
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
        }
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