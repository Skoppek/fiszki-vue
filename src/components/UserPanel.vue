<template>
    <div class="user-panel">
        <div class="username">{{ this.$cookies.get('loggedUser').user.name }}</div>
        <div class="email">{{ this.$cookies.get('loggedUser').user.email }}</div>
    </div>
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