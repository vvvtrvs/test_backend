<template>
<div>
    <h1>Example 2</h1>
    <input v-model="msg" />
    <button @click="run">Run</button>
    <response-viewer :response="result"/>
</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from "vue-property-decorator";
import axios, { AxiosResponse } from 'axios'

@Component
export default class HelloWorld extends Vue {
    result : AxiosResponse<any> | null = null;
    msg = ""

    async run() {
        try {
            this.result = await axios.post('/hello', {
                msg: this.msg,
            });
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
