<template>
    <UserPanel :user="user" />
    <SetGallery :url="this.url" />
</template>

<script>
import UserPanel from '../components/UserPanel.vue'
import SetGallery from '../components/SetGallery.vue'

import axios from 'axios'
export default {
    name: "UserView",
    components: {
        UserPanel,
        SetGallery
    },
    data() {
        return {
            user: {},
            url: ""
        }
    },
    mounted() {
        this.loadUser()
        this.url = `http://piec:5000/api/users/${this.$route.params.userId}/sets`
    },
    methods: {
        async loadUser() {
            await axios.get(`http://piec:5000/api/users/${this.$route.params.userId}`)
                .then((res) => {
                    this.user = res.data.user
                })
        }
    }
}
</script>