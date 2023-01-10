<template>
    <button @click="isOpen = true">New set</button>
    <teleport to="body">
        <SetCreator v-if="isOpen" @cancel="isOpen = false" @created="load()" />
    </teleport>
    <SetCard v-for="set in sets" :set="set" />
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
    props: {
        url: String
    },
    components: {
        SetCard,
        SetCreator
    },
    methods: {
        load() {
            axios.get('http://piec:5000/api/users/63bb3eb30ec30033603ceb0a/sets')
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