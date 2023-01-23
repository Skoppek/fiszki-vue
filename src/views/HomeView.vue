<template>
    <h1>Fiszki</h1>
    <div class="island">
        <div class="links">
            <router-link to="/signup">Sign Up</router-link>
            <router-link to="/login">Log In</router-link>
        </div>
    </div>
    <h4>Skop 19747 | Lebioda 19732</h4>
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