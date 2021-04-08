<template>
    <div id="app">
        <component v-for="key in items" :key="key" :is="key"/>
    </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
const components = require.context("./components/", true, /\.vue$/);

const componentDict = Object.fromEntries(components.keys().map(key => [
    key.slice(2, -4),
    components(key).default
]));

@Component({
    components: componentDict
})
export default class App extends Vue {
    items = Object.keys(componentDict)
}
</script>

<style>
#app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
}

pre {
    border: 1px solid gray;
    text-align: left;
}

label {
    width: 100px;
    display: inline-block;
}

input, textarea {
    width: 200px;
}
</style>
