<template>
    <h1>HomeHome</h1>
    <router-link to="/signup">Sign Up</router-link>
    <router-link to="/login">Log In</router-link>
</template>

<script>
export default {
    name: 'HomeView',
    beforeMount() {
        // redirects if user is already logged
        try {
            if (this.$cookies.isKey('loggedUser')) {
                this.$cookies.set('loggedUser', this.$cookies.get('loggedUser'))
                this.$router.push({ name: 'user', params: { userId: this.$cookies.get('loggedUser').user.id } })
            }
        }
        catch (err) {
            console.log(err)
        }
    }
}
</script>