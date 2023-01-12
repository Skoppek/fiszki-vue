<template>
    <div class="card">
        <div class="known">
            <div class="main">{{ this.card.known.main }}</div>
            <div class="main">{{ this.card.target.secondary }}</div>
        </div>
        <div class="target">
            <div class="main">{{ this.card.target.main }}</div>
            <div class="secondary">{{ this.card.target.secondary }}</div>
            <div class="scroll-me">
                <div class="sentence" v-for="sentence in card.target.sentences">{{ sentence }}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "CardCard",
    props: {
        card: Object
    }
}
</script>