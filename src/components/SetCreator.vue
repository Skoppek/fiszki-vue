<template>
    <div class="set-creator modal">
        <div class="inputs">
            <label>NAME</label>
            <input type="text" v-model="name" />
            <label>DECRIPTION</label>
            <textarea v-model="desc" rows="3"></textarea>
            <div class="controls">
                <button @click="createSet">CREATE</button>
                <button @click="$emit('cancel')">CANCEL</button>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
    data() {
        return {
            name: '',
            desc: ''
        }
    },
    emits: [
        'cancel',
        'created'
    ],
    methods: {
        async createSet() {
            if (!this.name) {
                return
            }
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/sets", {
                name: this.name,
                desc: this.desc,
                token: this.$cookies.get('loggedUser').token
            }).then((res) => {
                this.$emit('created')
                this.$emit('cancel')
            }).catch((err) => {
                console.log(err)
            })
        }
    }
}
</script>