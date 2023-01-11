<template>
    <h1>{{ this.$sessionStorage.get('user-info').name }}</h1>
    <button @click="this.$router.push({ name: 'sets'})">Discover</button>
    <button @click="this.$router.push({ name: 'user', params: { userId: this.$sessionStorage.get('user-info').id } })">My flashcards</button>
    <button @click="logout()">Log out</button>
</template>

<script>
export default {
    name: 'UserPanel',
    methods: {
        logout() {
            this.$sessionStorage.clear('user-info')
            this.$cookies.remove('token')
            this.$router.push({ name: 'home'})
        }
    }
}
</script>