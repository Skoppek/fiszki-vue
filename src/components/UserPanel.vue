<template>
    <h1>{{ this.$cookies.get('loggedUser').user.name }}</h1>
    <h3>{{ this.$cookies.get('loggedUser').user.email }}</h3>
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