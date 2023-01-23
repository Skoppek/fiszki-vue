<template>
    <button class="set-card" @click="viewSet()">
        <div class="set-name">{{ this.set.name }}</div>
        <div class="set-author" v-if="this.set.user">{{ this.set.user.name }}</div>
        <div class="set-description">{{ this.set.desc }}</div>
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

</style>