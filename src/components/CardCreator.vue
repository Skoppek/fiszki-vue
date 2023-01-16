<template>
    <div>
        <div class="inputs">
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
        </div>
        <button v-if="this.card" @click="updateCard()">DONE</button>
        <button v-else @click="addCard()">ADD</button>
        <button @click="$emit('close')">CANCEL</button>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: 'CardCreator',
    props: {
        readyCard: Object
    },
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
    created() {
        if (this.readyCard) {
            this.card = this.readyCard
        }
    },
    methods: {
        addSentence() {
            this.card.target.sentences.unshift(this.sentence)
        },
        async addCard() {
            if (!this.checkCard()) {
                return
            }
            this.card.token = this.$cookies.get('loggedUser').token
            await axios.post(import.meta.env.VITE_BACKEND_URL + `/sets/${this.$route.params.setId}/cards`, this.card)
                .then((response) => {
                    console.log(response)
                }).catch((err) => {
                    console.log(err)
                })
            this.$emit('added')
            this.$emit('close')
        },
        async updateCard() {
            if (!this.checkCard()) {
                return
            }
            this.card.token = this.$cookies.get('loggedUser').token
            await axios.put(import.meta.env.VITE_BACKEND_URL +
                `/sets/${this.$route.params.setId}/cards/${this.card._id}`,
                this.card )
                .then((response) => {
                    console.log(response)
                }).catch((err) => {
                    console.log(err)
                })
            this.$emit('added')
            this.$emit('close')
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
        'close',
        'added'
    ]
}
</script>