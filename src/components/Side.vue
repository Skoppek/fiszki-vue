<template>
    <div class="main">
        {{ this.side.main }}
    </div>
    <div class="secondary">
        {{ this.side.secondary }}
    </div>
    <div class="sentences" v-if="this.side.sentences">
        <div class="sentence"
            v-for="sentence in this.side.sentences">
            {{ sentence }}
        </div>
    </div>
</template>

<script>
export default {
    name: 'Side',
    props: {
        side: Object
    }
}
</script>
