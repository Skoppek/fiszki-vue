<template>
    <h1>{{ this.$cookies.get('loggedUser').user.name }}</h1>
    <button @click="this.$router.push({ name: 'sets'})">Discover</button>
    <button @click="this.$router.push({ name: 'user', params: { userId: this.$cookies.get('loggedUser').user.id } })">My flashcards</button>
    <button @click="logout()">Log out</button>
</template>

<script>
export default {
    name: 'UserPanel',
    methods: {
        logout() {
            this.$cookies.remove('loggedUser')
            this.$router.push({ name: 'home'})
        }
    }
}
</script>