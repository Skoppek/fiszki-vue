<template>
    <button @click="isOpen = true">New set</button>
    <teleport to="body">
        <SetCreator v-if="isOpen" @cancel="isOpen = false" @created="load()" />
    </teleport>
    <div class="set-cards">
        <SetCard v-for="set in sets" :set="set" />
    </div>
</template>

<script>
import SetCard from './SetCard.vue'
import SetCreator from './SetCreator.vue'
import axios from 'axios'
export default {
    data() {
        return {
            sets: [],
            isOpen: false
        }
    },
    components: {
        SetCard,
        SetCreator
    },
    methods: {
        load() {
            let url = import.meta.env.VITE_BACKEND_URL + 'sets'
            if (this.$route.params.userId) {
                url = import.meta.env.VITE_BACKEND_URL + `/users/${this.$route.params.userId}/sets`
            }
            axios.get(url)
                .then((res) => {
                    this.sets = res.data
                }).catch((err) => {
                    console.log(err)
                })
        }
    },
    beforeMount() {
        this.load()
    }
}
</script>