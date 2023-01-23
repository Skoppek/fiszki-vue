<template>
    <div class="credentials island">
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
        <div v-show="this.warning.show" class="warning">
            <p>{{ this.warning.message }}</p>
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
            warning: {
                message: '',
                show: false
            }
        }
    },
    methods: {
        async signUp() {
            await axios.post(import.meta.env.VITE_BACKEND_URL + "/users", {
                name: this.name,
                email: this.email,
                password: this.password
            }).then((res) => {
                console.log(res)
                this.$cookies.set('loggedUser', res.data)
                this.$router.push({ name: 'login'})
            }).catch((err) => {
                if (err.response.status == 409) {
                    this.warning.message = 'Email already taken'
                    this.warning.show = true
                }
            })
        },
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

<style>
</style>