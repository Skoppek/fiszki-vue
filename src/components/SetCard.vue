<template>
    <div class="set-card">
        <h2>{{ this.set.name }}</h2>
        <h4 v-show="this.set.userName">{{ this.set.userName }}</h4>
        <p>{{ this.set.desc }}</p>
    </div>
</template>

<script>
export default {
    props: {
        set: Object
    }
}
</script>

<style>
.set-card {
    width: 20vw;
    border: solid 2px black;
}
</style>