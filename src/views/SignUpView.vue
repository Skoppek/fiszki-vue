<template>
    <div class="credentials">
        <h1>Sign up</h1>
        <div class="inputs">
            <label>USERNAME</label>
            <input type="text" v-model="name" />
            <label>EMAIL</label>
            <input type="text" v-model="email" />
            <label>PASSWORD</label>
            <input type="text" v-model="password" />
            <button v-on:click="signUp">SIGN UP</button>
        </div>
        <div v-show="this.warning" class="warning">
            <p>Email already taken</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "SignUpView",
    data() {
        return {
            name: '',
            email: '',
            password: '',
            warning: false
        }
    },
    methods: {
        async signUp() {
            await axios.post("http://piec:5000/api/users", {
                name: this.name,
                email: this.email,
                password: this.password
            }).then((response) => {
                this.$sessionStorage.set('user-info', response.data)
                this.$router.push({ name: 'user', params: { userId: res.data._id } })
                this.$cookies.set('token', response.body.token)
            }).catch(error => {
                this.warning = true
            })
        }
    }
}
</script>

<style>

</style>