<template>
    <div class="credentials">
        <h1>LOG IN</h1>
        <div class="inputs">
            <label>EMAIL</label>
            <input type="email" v-model="email" />
            <label>PASSWORD</label>
            <input type="password" v-model="password" />
            <button v-on:click="login">LOG IN</button>
        </div>
        <div v-show="this.warning.show" class="warning">
            <p>{{ this.warning.message }}</p>
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
            warning: {
                message: '',
                show: false
            }
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
            }).then((res) => {
                console.log(res)
                this.$cookies.set('loggedUser', res.data)
                this.$router.push({ name: 'user', params: { userId: res.data.user.id } })
            }).catch((err) => {
                console.log(err.response)
                if (err.response.status == 401) {
                    this.warning.message = 'Wrong credentials'
                    this.warning.show = true
                }
                else {
                    this.warning.message = 'Something went wrong'
                    this.warning.show = true
                }
            })
        }
    },
    beforeMount() {
        // redirects if user is already logged
        try {
            if (this.$cookies.isKey('loggedUser')) {
                this.$cookies.set('loggedUser', this.$cookies.get('loggedUser'))
                this.$router.push({ name: 'user', params: { userId: this.$cookies.get('loggedUser').user.id } })
            }
        }
        catch {
            console.log('Expired')
        }
    }
}
</script>