<template>
    <button :disabled="this.active==='DiscoverView'"
        @click="this.$router.push({ name: 'sets'})">Discover</button>
    <button :disabled="this.active==='UserView'"
         @click="this.$router.push({ name: 'user', params: { userId: this.$cookies.get('loggedUser').user.id } })">My Account</button>
    <button @click="logout()">Log Out</button>
</template>

<script>
export default {
    name: 'Menu',
    props: {
        active: String
    },
    methods: {
        logout() {
            this.$cookies.remove('loggedUser')
            this.$router.push({ name: 'home'})
        }
    }
}
</script>