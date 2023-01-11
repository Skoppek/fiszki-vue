<template>
    <UserPanel />
    <SetCard v-for="set in sets" :set="set" />
</template>

<script>
import SetCard from './SetCard.vue'
import UserPanel from './UserPanel.vue'
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
        UserPanel
    },
    methods: {
        load() {
            axios.get(import.meta.env.VITE_BACKEND_URL + `/sets`)
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