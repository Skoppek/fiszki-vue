<template>

</template>

<script>
export default {
    name: 'Learn',
    props: {
        set: [Object]
    },
    mounted() {
        // shuffle set
        for (let i = this.set.length - 1; i > 0; i--) {
            const j = Math.floor(Math.random() * (i + 1));
            const temp = this.set[i];
            this.set[i] = this.set[j];
            this.set[j] = temp;
        }
    }
}
</script>