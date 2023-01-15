<template>
    <Menu :active="'UserView'"/>
    <UserPanel />
    <SetGallery />
</template>

<script>
import Menu from '../components/Menu.vue'
import UserPanel from '../components/UserPanel.vue'
import SetGallery from '../components/SetGallery.vue'

import axios from 'axios'
export default {
    name: "UserView",
    components: {
        UserPanel,
        SetGallery,
        Menu
    },
    data() {
        return {
            user: {},
        }
    },
    mounted() {
        this.loadUser()
    },
    methods: {
        async loadUser() {
            await axios.get(import.meta.env.VITE_BACKEND_URL + `/users/${this.$route.params.userId}`)
                .then((res) => {
                    this.user = res.data.user
                })
        }
    }
}
</script>