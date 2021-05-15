<template>
    <div>
        <h2>{{ response.status }}</h2>
        <pre>{{ response.data }}</pre>
    </div>
</template>

<script lang="ts">
import { AxiosResponse } from "axios";
import { Component, Prop, Vue } from "vue-property-decorator";

@Component
export default class ResponseViewer extends Vue {
    @Prop()
    response!: AxiosResponse<any>;
}
</script>

<style scoped>
pre {
    white-space: pre-wrap;
}
</style>
