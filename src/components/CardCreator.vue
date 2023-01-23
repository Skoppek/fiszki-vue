<template>
    <div class="card-creator">
        <div class="inputs">
            <div class="known">
                <label>Known word</label>
                <input class="main"
                    :class="{warning: emptyKnown}"
                    type="text"
                    v-model="this.card.known.main"/>
                <label>Known secondary</label>
                <input class="secondary"
                    type="text"
                    v-model="this.card.known.secondary"/>
            </div>
            <div class="target">
                <label>Target word</label>
                <input class="main"
                    :class="{warning: emptyTarget}"
                    type="text"
                    v-model="this.card.target.main"/>
                <label>Target secondary</label>
                <input class="secondary"
                    type="text"
                    v-model="this.card.target.secondary"/>
            </div>

        </div>
        <div class="sentences">
            <label>Examples</label>
            <input class="sentence-input"
                type="text"
                v-model="this.sentence"
                @keyup.enter="addSentence()"
                :class="{shake: isFull}"/>
            <div class="sentence"
                v-for="(sentence, index) in this.card.target.sentences">
                <input class="sentence-input"
                    type="text"
                    v-model="this.card.target.sentences[index]"
                />
                <button class="removeSentenceBtn"
                    @click="this.card.target.sentences.splice(index, 1)">X</button>
            </div>
        </div>
        <div class="controls">
            <button v-if="this.readyCard" @click="updateCard()">DONE</button>
            <button v-else @click="addCard()">ADD</button>
            <button @click="$emit('close')">CANCEL</button>
        </div>
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
            emptyTarget: false,
            isFull: false
        }
    },
    created() {
        if (this.readyCard) {
            this.card = this.readyCard
        }
    },
    methods: {
        addSentence() {
            if (this.card.target.sentences.length >= 5) {
                this.shake()
                return
            }
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
        },
        shake() {
            this.isFull = true
            setTimeout(() => {
                this.isFull = false
            }, 1000)
        }
    },
    emits: [
        'close',
        'added'
    ]
}
</script>

<style>
.shake {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>