<template>
    <div>
        <div class="counter">{{ cardIndex }} / {{ shuffledSet.length }}</div>
        <div class="card" v-if="!isCompleted">
            <div class="known">
                <Side :side="shuffledSet[cardIndex].known"/>
            </div>
            <div class="target">
                <input
                    v-if="!isGuessed"
                    type="text"
                    :class="{ shake: isWrong }"
                    @keyup.enter="tryWord"
                    v-model="guessWord">
                <div v-else :class="{ correct: isCorrect}">
                    <Side :side="shuffledSet[cardIndex].target"/>
                    <button @click="loadNext">NEXT</button>
                </div>
            </div>
        </div>
        <div class="summary" v-if="isCompleted">
            <h3>You've scored:</h3>
            <h1>{{ numOfGuessed }} / {{ shuffledSet.length }}</h1>
        </div>
        <button @click="$emit('close')">CANCEL</button>
    </div>
</template>

<script setup>
import Side from './Side.vue'
</script>

<script>
export default {
    name: 'Learn',
    data() {
        return {
            shuffledSet: this.shuffle(this.set),
            isCompleted: false,
            cardIndex: 0,
            guessWord: '',
            isWrong: false,
            isGuessed: false,
            numOfGuessed: 0,
            tries: 0,
            isCorrect: false,
        }
    },
    props: {
        set: [Object]
    },
    methods: {
        shuffle(arr) {
            let shuffledArr = arr.map((x) => x)
            for (let i = shuffledArr.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                const temp = shuffledArr[i];
                shuffledArr[i] = shuffledArr[j];
                shuffledArr[j] = temp;
            }
            console.log(shuffledArr)
            return shuffledArr;
        },
        resetTry() {
            this.guessWord = ''
            this.isWrong = false
            this.isGuessed = false
            this.tries = 0
            this.isCorrect = false
        },
        tryWord() {
            if (this.guessWord === '') {
                this.shake()
                return
            }
            if (this.guessWord != this.shuffledSet[this.cardIndex].target.main) {
                this.tries++
                if (this.tries == 3) {
                    this.isGuessed = true
                }
                this.shake()
                return
            }

            this.numOfGuessed++
            this.isCorrect = true
            this.isGuessed = true
        },
        loadNext() {
            this.cardIndex++
            this.resetTry()

            if (this.cardIndex === this.shuffledSet.length) {
                this.isCompleted = true
            }
        },
        shake() {
            this.isWrong = true
            setTimeout(() => {
                this.isWrong = false
            }, 1000)
        }
    },
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

.correct {
    background-color: green;
}
</style>