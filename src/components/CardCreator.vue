<template>
    <div class="creator">
        <div class="known input">
            <input class="main"
                :class="{warning: emptyKnown}"
                type="text"
                v-model="this.card.known.main"/>
            <input class="secondary"
                type="text"
                v-model="this.card.known.secondary"/>
        </div>
        <div class="target input">
            <input class="main"
                :class="{warning: emptyTarget}"
                type="text"
                v-model="this.card.target.main"/>
            <input class="secondary"
                type="text"
                v-model="this.card.target.secondary"/>
            <input class="sentence-input"
                type="text"
                v-model="this.sentence"
                @keyup.enter="addSentence()"/>
            <div class="sentences"
                v-for="(sentence, index) in this.card.target.sentences">
                <input class="sentence"
                    type="text"
                    v-model="this.card.target.sentences[index]"/>
                <button class="removeSentenceBtn"
                    @click="this.card.target.sentences.splice(index, 1)">X</button>
            </div>
        </div>
        <button @click="addCard()">ADD</button>
        <button @click="$emit('cancel')">CANCEL</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CardCreator',
    data() {
        return {
            card: {
                known: {
                    main: '',
                    secondary: ''
                },
                target: {
                    main: '',
                    secondary: '',
                    sentences: []
                }
            },
            sentence: '',
            emptyKnown: false,
            emptyTarget: false
        }
    },
    methods: {
        addSentence() {
            this.card.target.sentences.unshift(this.sentence)
        },
        async addCard() {
            this.card.token = this.$cookies.get('loggedUser').token
            await axios.post(import.meta.env.VITE_BACKEND_URL + `/sets/${this.$route.params.setId}/cards`, this.card)
                .then((response) => {
                    console.log(response)
                }).catch((err) => {
                    console.log(err)
                })
            this.$emit('created')
            this.$emit('cancel')
        },
        checkCard() {
            if (this.card.known.main === '') {
                emptyKnown = true
                return false
            }
            if (this.card.target.main === '') {
                emptyKnown = true
                return false
            }
            return true
        }
    },
    emits: [
        'cancel',
        'created'
    ]
}
</script>

<style>
.card-creator {
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

.inputs {
    background-color: #fff;
    padding: 50px;
    border: black 5px solid;
}
</style>