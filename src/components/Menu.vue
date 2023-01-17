<template>
    <div class="menu">
        <button :disabled="this.active==='DiscoverView'"
        @click="this.$router.push({ name: 'sets'})">Discover</button>
        <button :disabled="this.active==='UserView'"
        @click="this.$router.push({ name: 'user', params: { userId: this.$cookies.get('loggedUser').user.id } })">My Account</button>
        <button class="logout" @click="logout()">Log Out</button>
    </div>
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

<style>
@import url(../main.css);

.menu {
    background-color: var(--second-color);
    padding: 1rem;
    display: flex;
    flex-direction: row;
}

.logout {
    order: 3;
    justify-self: end;
}


</style>