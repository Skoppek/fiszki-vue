<template>
    <div class="card">
        <div class="known">
            <div class="main">{{ this.card.known.main }}</div>
            <div class="secondary">{{ this.card.known.secondary }}</div>
        </div>
        <div class="target">
            <div class="main">{{ this.card.target.main }}</div>
            <div class="secondary">{{ this.card.target.secondary }}</div>
            <div class="sentences">
                <div class="sentence" v-for="sentence in card.target.sentences">{{ sentence }}</div>
            </div>
        </div>
        <button v-if="this.isOwner" @click="isUpdating = true">U</button>
        <button v-if="this.isOwner" @click="deleteCard()">X</button>
    </div>
    <teleport to="body">
        <div class="modal" v-if="isUpdating">
            <CardCreator
                :readyCard="this.card"
                @close="isUpdating = false"
            />
        </div>
    </teleport>
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
.card {
    display: grid;
    grid-template-columns: auto auto 3rem;
    grid-template-areas:
    "known target options";
    border: black solid 1px;
    border-radius: 10px;
    padding: 1rem;
}

.modal {
    position: absolute;
    top: 0;
    left: 0;
    background-color: rgba(0, 0, 0, 0.5);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.modal > div {
    background-color: #fff;
    padding: 50px;
    border: black 5px solid;
}
</style>