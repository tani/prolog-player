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
    <Button label="Save" @click="handleSave"/>
  </div>
</template>

<script>
import { computed } from '@vue/runtime-core';
import InputText from 'primevue/inputtext/sfc'
import Button from 'primevue/button/sfc'
export default {
    name: "Share",
    props: {
        url: String,
    },
    components: {
        InputText,
        Button
    },
    setup(props) {
        const iframe = computed(() => {
            return `<iframe style="border: solid 1px #ccc" width="560" height="315" src="${props.url}"></iframe>`
        })
        const handleSave = () => {
          window.history.pushState(null, document.title, props.url)
        }
        return {
            iframe,
            handleSave
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