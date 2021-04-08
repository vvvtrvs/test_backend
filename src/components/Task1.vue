<template>
<div>
    <h1>Task 1: Register User</h1>
    <div><label>User Name</label><input v-model="username" /></div>
    <div><label>Email</label><input v-model="email" /></div>
    <div><label>Phone</label><input v-model="phone" /></div>
    <div><label>Password</label><input type="password" autocomplete="new-password" v-model="password" /></div>
    <div><label>Age</label><input v-model="age" /></div>
    <button @click="run">Run</button>
    <response-viewer :response="result"/>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from 'axios'

@Component
export default class HelloWorld extends Vue {
    username = ""
    email = ""
    password = ""
    phone = ""
    age = ""
    result : AxiosResponse<any> | null = null;

    async run() {
        try {
            const resp = await axios.post('/register', {
                username: this.username,
                password: this.password,
                email: this.email,
                age: this.age,
                phone: this.phone,
            })
            this.result = resp;

            if(resp.data.accessToken) {
                this.$store.commit("SET_ACCESS_TOKEN", resp.data.accessToken);
            }
        } catch(e) {
            if(e.response) {
                this.result = e.response;
            } else {
                console.error(e);
            }
        }
    }
}
</script>

<style scoped>

</style>
