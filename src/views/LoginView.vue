<template>
    <div class="credentials">
        <h1>LOG IN</h1>
        <div class="inputs">
            <label>EMAIL</label>
            <input type="text" v-model="email" />
            <label>PASSWORD</label>
            <input type="text" v-model="password" />
            <button v-on:click="login">LOG IN</button>
        </div>
        <div v-show="this.warning" class="warning">
            <p>Login failed</p>
        </div>
    </div>
</template>

<script>
import axios from 'axios'
export default {
    name: "LoginView",
    data() {
        return {
            email: '',
            password: '',
            warning: false
        }
    },
    methods: {
        async login() {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/users/login", {
                email: this.email,
                password: this.password
            }, {
                withCredentials: false,
                headers: {
                    'Access-Control-Allow-Origin': '*',
                    'Content-Type': 'application/json',
                }
            }).then((response) => {
                console.log(response)
                this.$sessionStorage.set('user-info', response.data)
                this.$router.push({ name: 'user', params: { userId: response.data.id } })
                this.$cookies.set('token', response.data.token)
            }).catch(error => {
                console.log(error)
                this.warning = true
            })
        }
    }
}
</script>