<template>
  <div class="p-fluid">
    <div class="p-field">
      <label for="url">URL</label>
      <InputText id="url" :value="url" readonly/>
    </div>
    <div class="p-field">
      <label for="url">IFrame Player</label>
      <InputText id="url" :value="iframe" readonly/>
    </div>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import InputText from 'primevue/inputtext/sfc'
export default {
    name: "Share",
    props: {
        url: String,
    },
    components: {
        InputText,
    },
    setup(props) {
        const iframe = computed(() => {
            return `<iframe style="border: solid 1px #ccc" width="560" height="315" src="${props.url}"></iframe>`
        })
        return {
            iframe
        }
    }
}
</script>

<style scoped>
label {
    margin-bottom: 10px;
}
.p-field {
    margin-bottom: 20px;
}
</style>