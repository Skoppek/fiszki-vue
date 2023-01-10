<template>
    <div class="set-creator">
        <div class="inputs">
            <label>NAME</label>
            <input type="text" v-model="name" />
            <label>DECRIPTION</label>
            <textarea v-model="desc" rows="3"></textarea>
            <button @click="createSet">CREATE</button>
            <button @click="$emit('cancel')">CANCEL</button>
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
            await axios.post(`http://piec:5000/api/sets`, {
                name: this.name,
                desc: this.desc,
                token: this.$cookies.get('token')
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

<style>
.set-creator {
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