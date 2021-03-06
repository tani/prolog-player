<template>
<TabView>
  <TabPanel header="Result">
    <iframe :srcdoc="output" v-if="play"></iframe>
    <div v-else id="ready">
      <Button label="Play" icon="pi pi-play" class="p-button-rounded p-button-raised" @click="play=true" /><br/>
      <small>By pressing this button you are agreeing to our Terms of Use.</small>
    </div>
  </TabPanel>
  <TabPanel header="HTML">
    <Textarea v-model="input.html" @input="play=false"/>
  </TabPanel>
  <TabPanel header="CSS">
    <Textarea v-model="input.css" @input="play=false"/>
  </TabPanel>
  <TabPanel header="Prolog">
    <Textarea v-model="input.prolog" @input="play=false"/>
  </TabPanel>
  <TabPanel>
    <template #header>
      <i class="pi pi-cog"/>
    </template>
    <Settings v-model="settings" @change="play=false"/>
  </TabPanel>
  <TabPanel>
    <template #header>
      <i class="pi pi-share-alt"/>
    </template>
    <Share :url="url"/>
  </TabPanel>
  <TabPanel>
    <template #header>
      <i class="pi pi-info-circle"/>
    </template>
    <About />
  </TabPanel>
</TabView>
</template>

<script>
import TabView from "primevue/tabview/sfc"
import TabPanel from "primevue/tabpanel/sfc"
import Textarea from "primevue/textarea/sfc"
import Button from "primevue/button/sfc"
import { computed, reactive, ref } from "vue"
import template from "./template"
import Settings from "./components/Settings"
import Share from "./components/Share"
import About from "./components/About"
function getOrElse(url, key, defaultValue) {
  return url.searchParams.has(key) ? url.searchParams.get(key) : defaultValue
}
export default {
  name: 'App',
  setup() {
    const oURL = new URL(window.location.href)
    const input = reactive({
      html: getOrElse(oURL, 'html', '<h1>Hello, Prolog.</h1>'),
      css: getOrElse(oURL, 'css', 'h1 { font-size: 1em; }'),
      prolog: getOrElse(oURL, 'prolog', 'main.')
    })
    const settings = ref({
      query: getOrElse(oURL, 'query', 'main.'),
      limit: parseInt(getOrElse(oURL, 'limit', '1000'))
    })
    const play = ref(false)
    const output = computed(()=>{
      return template(input.html, input.css, input.prolog, settings.value.limit, settings.value.query)
    })
    const url = computed(()=>{
      const { protocol, host, pathname} = window.location
      const html = encodeURIComponent(input.html)
      const css  = encodeURIComponent(input.css)
      const prolog = encodeURIComponent(input.prolog)
      const limit = encodeURIComponent(settings.value.limit)
      const query = encodeURIComponent(settings.value.query)
      return `${protocol}//${host}${pathname}?html=${html}&css=${css}&prolog=${prolog}&limit=${limit}&query=${query}`
    })
    return {
      output,
      input,
      play,
      settings,
      url
    }
  },
  components: {
    Button,
    TabView,
    TabPanel,
    Settings,
    Textarea,
    Share,
    About
  }
}
</script>

<style>
#app iframe {
  border: solid 1px #ccc; 
  width: 100%;
  height: 100%;
}
.p-inputtextarea {
  font-family: 'Courier New', Courier, monospace !important;
  width: 100%;
  height: 100%;
}
.p-tabview {
  height: 100%;
}
.p-tabview-panels {
  height: calc(100% - 50px);
}
.p-tabview-panel {
  height: 100%;
}
html, body, #app {
  margin: 0;
  padding: 0;
  height: 100%;
}
#ready {
  display: flex;
  flex-direction: column;
  height: 100%;
  border: solid 1px #ccc;
  align-items: center;
  justify-content: center;
}
small {
  display: block;
  width: 50%;
  margin-top: 10px;
}
</style>
