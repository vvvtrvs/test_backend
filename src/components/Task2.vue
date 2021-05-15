<template>
    <div>
        <h1>Task 2: Login User</h1>
        <div><label>Email</label><input v-model="email" type="email" /></div>
        <div>
            <label>Password</label
            ><input
                type="password"
                autocomplete="new-password"
                v-model="password"
            />
        </div>
        <button @click="run">Run</button>
        <response-viewer :response="result" />

        <h1>My Profile</h1>
        <button @click="run2">Run</button>
        <response-viewer :response="result2" />

        <div>
            <button @click="run3">Logout</button>
        </div>

        <h1>Get Other Users</h1>
        <div><label>Email</label><input v-model="email2" type="email" /></div>
        <button @click="run4">Run</button>
        <response-viewer :response="result4" />
    </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from "axios";

@Component
export default class HelloWorld extends Vue {
    email = "";
    email2 = "";
    password = "";
    result: AxiosResponse<any> | null = null;
    result2: AxiosResponse<any> | null = null;
    result4: AxiosResponse<any> | null = null;

    async run() {
        try {
            const resp = await axios.post("/login", {
                email: this.email,
                password: this.password,
            });
            this.result = resp;

            if (resp.data.accessToken) {
                this.$store.commit("SET_ACCESS_TOKEN", resp.data.accessToken);
            }
        } catch (e) {
            if (e.response) {
                this.result = e.response;
            } else {
                console.error(e);
            }
        }
    }

    async run2() {
        try {
            const resp = await axios.get("/me", {
                headers: {
                    Authorization: this.$store.state.accessToken
                        ? `Bearer ${this.$store.state.accessToken}`
                        : "",
                },
            });
            this.result2 = resp;
        } catch (e) {
            if (e.response) {
                this.result2 = e.response;
            } else {
                console.error(e);
            }
        }
    }

    run3() {
        this.$store.commit("SET_ACCESS_TOKEN", null);
    }

    async run4() {
        try {
            const resp = await axios.get(`/users/${this.email2}`, {});
            this.result4 = resp;
        } catch (e) {
            if (e.response) {
                this.result4 = e.response;
            } else {
                console.error(e);
            }
        }
    }
}
</script>

<style scoped></style>
