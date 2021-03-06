<template>
  <div class="p-fluid">
    <div class="p-field">
      <label for="limit">Limit</label>
      <InputNumber id="limit" v-model="settings.limit" @input="handleChange"/>
    </div>
    <div class="p-field">
      <label for="qeury">Query</label>
      <InputText id="query" v-model="settings.query" @input="handleChange"/>
    </div>
  </div>
</template>

<script>
import { reactive } from '@vue/runtime-core';
import InputNumber from 'primevue/inputnumber/sfc'
import InputText from 'primevue/inputtext/sfc'
export default {
    name: "Settings",
    emits: ['change','update:modelValue'],
    props: {
        modelValue: Object,
    },
    components: {
        InputNumber,
        InputText,
    },
    setup(props, {emit}) {
        const settings = reactive({
            query: props.modelValue.query,
            limit: props.modelValue.limit
        })
        const handleChange = () => {
            emit("change")
            emit("update:modelValue", settings)
        }
        return {
            settings,
            handleChange,
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