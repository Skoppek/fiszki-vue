<template>
    <div class="card-card">
        <div class="island">
            <div class="card">
                <div class="known">
                    <div class="main">{{ this.card.known.main }}</div>
                    <div class="secondary">{{ this.card.known.secondary }}</div>
                </div>
                <div class="target">
                    <div class="main">{{ this.card.target.main }}</div>
                    <div class="secondary">{{ this.card.target.secondary }}</div>

                </div>

            </div>
            <div class="sentences">
                <div class="sentence" v-for="sentence in card.target.sentences">{{ sentence }}</div>
            </div>
            <div class="controls">
                <button v-if="this.isOwner" @click="isUpdating = true">Edit</button>
                <button v-if="this.isOwner" @click="deleteCard()">Delete</button>
            </div>
        </div>
        <teleport to="body">
            <div class="modal" v-if="isUpdating">
                <CardCreator
                :readyCard="this.card"
                @close="isUpdating = false"
                />
            </div>
        </teleport>
    </div>
</template>

<script setup>
import axios from 'axios';
import CardCreator from './CardCreator.vue';
</script>

<script>
export default {
    name: "CardCard",
    components: {
        CardCreator
    },
    data() {
        return {
            isUpdating: false
        }
    },
    props: {
        card: Object,
        isOwner: Boolean
    },
    methods: {
        async deleteCard() {
            await axios.delete(
                import.meta.env.VITE_BACKEND_URL +
                `/sets/${this.$route.params.setId}/cards/${this.card._id}`,
                {
                    data: { token: this.$cookies.get('loggedUser').token }
                }).
                then((res) => {
                    this.$emit('deleted')
                }).catch((res) => {
                    console.log(res)
                })
        }
    },
    emits: [
        'deleted'
    ]
}
</script>

<style>

</style>