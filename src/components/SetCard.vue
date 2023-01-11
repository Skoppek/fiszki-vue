<template>
    <button class="set-card" @click="viewSet()">
        <p>{{ this.set._id }}</p>
        <h2>{{ this.set.name }}</h2>
        <h4 v-if="this.set.user">{{ this.set.user.name }}</h4>
        <p>{{ this.set.desc }}</p>
    </button>
</template>

<script>
export default {
    props: {
        set: Object
    },
    methods: {
        viewSet() {
            this.$router.push({ name: 'set', params: { setId: this.set._id } })
        }
    }
}
</script>

<style>
.set-card {
    width: 20vw;
    border: solid 2px black;
}
</style>